<template>
  <div v-if="isPageLoading" class="loading">
    <Loading />
    <div class="loading-text">
      Chargement en cours, veuillez patienter...
    </div>
  </div>
  <div v-else-if="isError">
    {{ error }}
  </div>
  <div v-else class="entries">
    <div>
      <div class="title">
        {{ t('firstLogin.title') }}
      </div>
      <div class="sub-title">
        {{ t('firstLogin.subTitle') }}
      </div>
      <div class="param-required">
        {{ t('paramRequired') }}
      </div>
    </div>
    <Select id="niveau" v-model="models.value.level" label="Niveau Scolaire" :options="selectOptions.niveau" @change="onNiveauChange" />
    <Select v-if="models.value.level && options.classe" id="classe" v-model="models.value.class" label="Classe" :options="options.classe" @change="updateSubjects" />
    <div v-if="hasSpe(false)" class="multi-entries">
      <Select id="spe-a" v-model="models.value.spe.a" label="Première spécialité" :options="options.spe.a" :search="true" @change="onSpeChange" />
      <Select id="spe-b" v-model="models.value.spe.b" label="Deuxième spécialité" :options="options.spe.b" :search="true" @change="onSpeChange" />
      <Select id="spe-c" v-model="models.value.spe.c" :label="hasSpe(true) ? 'Troisième spécialité' : 'Spécialité arrêtée l\'année dernière'" :options="options.spe.c" :search="true" @change="onSpeChange" />
    </div>
    <Select v-if="isTechno()" id="techno" v-model="models.value.techno" label="Filiaire Technologique" :options="options.techno" :search="true" />
    <div class="multi-entries">
      <Select id="lva" v-model="models.value.lv.a" label="Langue Vivante A" :options="options.lv.a" @change="onLvChange" />
      <Select id="lvb" v-model="models.value.lv.b" label="Langue Vivante B" :options="options.lv.b" @change="onLvChange" />
    </div>
    <Select v-if="models.value.level && optionOptions" id="options" v-model="models.value.option" label="Option" :options="optionOptions" tags :required="false" @change="updateSubjects" />
    <div v-if="models.value.lv.a || models.value.lv.b" class="multi-entries">
      <Select id="euro" v-model="models.value.section.lang" label="Section Européenne" :options="options.section" :required="false" @change="updateSubjects" />
      <Select v-if="models.value.section.lang === 'angl-euro' && models.value.niveau !== 'seconde'" id="dnl" v-model="models.value.section.dnl" label="DNL" :options="selectOptions.section.dnl" @change="updateSubjects" />
    </div>
    <div class="multi-entries">
      <div v-if="options.subjects.good" class="multi-entries">
        <Checkbox id="help" v-model="models.value.tutorat.helper.wish" styles="blurple" label="Voudriez-vous devenir tuteur de quelqu'un ?" />
        <div v-if="models.value.tutorat.helper.wish && options.subjects.good">
          <Select id="help" v-model="models.value.tutorat.helper.subjects" label="Les matières dans lesquelles vous pourriez aider" :options="options.subjects.helper" tags search @change="updateSubjects" />
          <Select id="goodSubject" v-model="models.value.subjects.good" label="Autres matières dans lesquelles vous êtes à l'aise" :options="options.subjects.good" tags search :required="false" @change="updateSubjects" />
        </div>
      </div>
      <div v-if="options.subjects.good" class="multi-entries">
        <Checkbox id="receive" v-model="models.value.tutorat.receiver.wish" styles="blurple" label="Voudriez-vous recevoir de l'aide ?" />
        <div v-if="models.value.tutorat.receiver.wish && options.subjects.bad">
          <Select id="receive" v-model="models.value.tutorat.receiver.subjects" label="Les matières dans lesquelles vous voudriez vous faire aider" :options="options.subjects.receiver" tags search @change="updateSubjects" />
          <Select id="badSubject" v-model="models.value.subjects.bad" label="Les matières dans lesquelles vous êtes moins à l'aise" :options="options.subjects.bad" tags search :required="false" @change="updateSubjects" />
        </div>
      </div>
    </div>
    <div class="submit">
      <Button id="submit" label="Envoyer" styles="blurple" :options="buttonOptions" :loading="isButtonLoading" @click="onButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { login, user } from '~/logic/data/auth/auth-manager'
import { getOption, getSubjects, models, optionOptions, options, selectOptions, setModels } from '~/logic/form/login'
import { isValidChoices } from '~/logic/profil/school/school-manager'

const { t } = useI18n()
const router = useRouter()

const isButtonLoading = ref(false)
const isPageLoading = ref(true)
const isError = ref(false)
const error = ref<string>()

const isNotValid = ref(true)

const buttonOptions = reactive({
  disabled: isNotValid,
})

setTimeout(async() => {
  if (!user.value || !user.value.exist) login()
}, 10000)
let i: NodeJS.Timeout
const clear = () => {
  clearInterval(i)
}

i = setInterval(async() => {
  if (user.value && user.value.exist) {
    if (!await user.value.validation()) {
      isPageLoading.value = false
      setModels((await user.value.get()).school)
      clear()
    }
    else {
      clear()
      router.push('dashboard')
    }
  }
}, 4000)

const onButtonClick = async() => {
  isNotValid.value = !isValidChoices(models.value)
  if (isNotValid.value || !user.value || !user.value.exist) return
  isButtonLoading.value = true
  await user.value.set({ school: models.value })
  if (await user.value.validation()) { router.push('dashboard') }
  else {
    error.value = 'Une erreur est survenue'
    isError.value = true
  }
}

const hasSpe = (third: boolean) => {
  return models.value.level === 'premiere-g' || (models.value.level === 'terminal-g' && !third)
}

const isTechno = () => {
  return models.value.level === 'premiere-t' || models.value.level === 'terminal-t'
}

const updateSubjects = () => {
  options.subjects.helper = getSubjects(models.value).filter(e => ![...models.value.subjects.bad, ...models.value.subjects.good, ...models.value.tutorat.receiver.subjects].includes(e.value))
  options.subjects.receiver = getSubjects(models.value).filter(e => ![...models.value.subjects.bad, ...models.value.subjects.good, ...models.value.tutorat.helper.subjects].includes(e.value))
  options.subjects.good = getSubjects(models.value).filter(e => ![...models.value.subjects.bad, ...models.value.tutorat.helper.subjects, ...models.value.tutorat.receiver.subjects].includes(e.value))
  options.subjects.bad = getSubjects(models.value).filter(e => ![...models.value.subjects.good, ...models.value.tutorat.helper.subjects, ...models.value.tutorat.receiver.subjects].includes(e.value))
}

const updateValidation = () => {
  updateSubjects()
  isNotValid.value = !isValidChoices(models.value)
}

watch(models, updateValidation)

const onNiveauChange = () => {
  if (!models.value.level) options.classe = undefined
  else options.classe = selectOptions.classe.get(models.value.level)
  models.value.class = ''
  optionOptions.value = getOption(models.value.level, models.value.spe)
  updateSubjects()
}

const onSpeChange = () => {
  options.spe.a = selectOptions.spe.filter(e => ![models.value.spe.b, models.value.spe.c].includes(e.value))
  options.spe.b = selectOptions.spe.filter(e => ![models.value.spe.a, models.value.spe.c].includes(e.value))
  options.spe.c = selectOptions.spe.filter(e => ![models.value.spe.a, models.value.spe.b].includes(e.value))
  optionOptions.value = getOption(models.value.level, models.value.spe)
  updateSubjects()
}

const idToLang = (e: string) => e.split('-')[0]

const onLvChange = () => {
  options.lv.a = selectOptions.lv.filter(e => models.value.lv.b !== e.value)
  options.lv.b = selectOptions.lv.filter(e => models.value.lv.a !== e.value)
  options.section = selectOptions.section.lang.filter(
    l => Object.values(models.value.lv)
      .map(id => idToLang(id))
      .includes(idToLang(l.value)),
  )
  updateSubjects()
}

</script>

<style scoped>
.entries * {
  margin: 40px 0;
}

.entries {
    width: min(550px, 90%);
}

.title {
  font-size: 22px;
  font-weight: 550;
}

.sub-title {
  margin-top: 20px;
  font-size: 14px;
  color: var(--secondary-text-color);
}

.loading {
  text-align: center;
  margin-top: 90px;
}

.multi-entries {
  margin: 70px 0;
}

.loading-text {
  margin-top: 4vh
}

.param-required {
  color: var(--color-danger);
  font-size: 12px;
  font-style: italic;
  margin-bottom: 50px;
}

</style>

<route lang="yaml">
meta:
  layout: form
</route>
