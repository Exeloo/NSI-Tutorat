<template>
  <div v-if="isPageLoading">
    <Loading />
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
    </div>
    <Select id="niveau" v-model="models.niveau" label="Niveau Scolaire" :options="selectOptions.niveau" @change="onNiveauChange" />
    <Select v-if="models.niveau && options.classe" id="classe" v-model="models.classe" label="Classe" :options="options.classe" @change="updateSubjects" />
    <div v-if="hasSpe(false)" class="multi-entries">
      <Select id="spe-a" v-model="models.spe.a" label="Première spécialité" :options="options.spe.a" :search="true" @change="onSpeChange" />
      <Select id="spe-b" v-model="models.spe.b" label="Deuxième spécialité" :options="options.spe.b" :search="true" @change="onSpeChange" />
      <Select id="spe-c" v-model="models.spe.c" :label="hasSpe(true) ? 'Troisième spécialité' : 'Spécialité arrêté cette année'" :options="options.spe.c" :search="true" @change="onSpeChange" />
    </div>
    <div class="multi-entries">
      <Select id="lva" v-model="models.lv.a" label="Langue Vivante A" :options="options.lv.a" @change="onLvChange" />
      <Select id="lvb" v-model="models.lv.b" label="Langue Vivante B" :options="options.lv.b" @change="onLvChange" />
    </div>
    <Select v-if="models.niveau && optionOptions" id="options" v-model="models.option" label="Option" :options="optionOptions" tags @change="updateSubjects" />
    <div v-if="models.lv.a || models.lv.b" class="multi-entries">
      <Select id="euro" v-model="models.section.lang" label="Section Européenne" :options="options.section" @change="updateSubjects" />
      <Select v-if="models.section.lang === 'angl-euro' && models.niveau !== 'seconde'" id="dnl" v-model="models.section.dnl" label="DNL" :options="selectOptions.section.dnl" @change="updateSubjects" />
    </div>
    <div class="multi-entries">
      <Select v-if="options.subjects.good" id="goodSubject" v-model="models.subjects.good" label="Les matières dans lesquelles vous êtes à l'aise" :options="options.subjects.good" tags search @change="updateSubjects" />
      <Select v-if="options.subjects.bad" id="badSubject" v-model="models.subjects.bad" label="Les matières dans lesquelles vous êtes moins à l'aise" :options="options.subjects.bad" tags search @change="updateSubjects" />
      <div v-if="options.subjects.good" class="multi-entries">
        <Checkbox id="help" v-model="models.helper.wish" styles="blurple" label="Voudriez-vous devenir tuteur de quelqu'un ?" />
        <Select v-if="models.helper.wish" id="help" v-model="models.helper.subjects" label="Les matières dans lesquelles vous pourriez aider" :options="options.subjects.good" tags search @change="updateSubjects" />
      </div>
      <div v-if="options.subjects.good" class="multi-entries">
        <Checkbox id="receive" v-model="models.receiver.wish" styles="blurple" label="Voudriez-vous recevoir de l'aide ?" />
        <Select v-if="models.receiver.wish" id="receive" v-model="models.receiver.subjects" label="Les matières dans lesquelles vous voudriez vous faire aider" :options="options.subjects.bad" tags search @change="updateSubjects" />
      </div>
    </div>
    <div class="submit">
      <Button id="submit" label="Envoyer" styles="blurple" :options="buttonOptions" :loading="isButtonLoading" @click="onButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUser, login } from '~/logic/data/auth/auth-system'
import { getOption, getSubjects, isValidForm, models, optionOptions, options, selectOptions } from '~/logic/form/login'

const { t } = useI18n()

const isButtonLoading = ref(false)
const isPageLoading = ref(true)
const isError = ref(false)
const error = ref<string>()

const log = async() => {
  const loginResult = await login()

  if (loginResult.answer) {
    console.log(1)
    if (getUser().value.isValid()) {
      console.log(2)
      isPageLoading.value = false
    }
  }
  else {
    console.log(3)
    isPageLoading.value = false
    isError.value = true
    error.value = loginResult.reason
    console.log(error.value)
    console.log(isPageLoading.value, isError.value)
  }
}
log()

const isNotValid = ref(true)

const buttonOptions = reactive({
  disabled: isNotValid,
})

const onButtonClick = () => {
  isNotValid.value = !isValidForm()
  if (isNotValid.value) return
  isLoading.value = true
}

const hasSpe = (third: boolean) => {
  return models.niveau === 'premiere-g' || (models.niveau === 'terminal-g' && !third)
}

const updateValidation = () => {
  isNotValid.value = !isValidForm()
}

watch(models, updateValidation)

const updateSubjects = () => {
  options.subjects.good = getSubjects(models).filter(e => ![...models.subjects.bad, ...models.receiver.subjects].includes(e.value))
  options.subjects.bad = getSubjects(models).filter(e => ![...models.subjects.good, ...models.helper.subjects].includes(e.value))
}

const onNiveauChange = () => {
  if (!models.niveau) options.classe = undefined
  else options.classe = selectOptions.classe.get(models.niveau)
  models.classe = ''
  optionOptions.value = getOption(models.niveau, models.spe)
  updateSubjects()
}

const onSpeChange = () => {
  options.spe.a = selectOptions.spe.filter(e => ![models.spe.b, models.spe.c].includes(e.value))
  options.spe.b = selectOptions.spe.filter(e => ![models.spe.a, models.spe.c].includes(e.value))
  options.spe.c = selectOptions.spe.filter(e => ![models.spe.a, models.spe.b].includes(e.value))
  optionOptions.value = getOption(models.niveau, models.spe)
  updateSubjects()
}

const idToLang = (e: string) => e.split('-')[0]

const onLvChange = () => {
  options.lv.a = selectOptions.lv.filter(e => models.lv.b !== e.value)
  options.lv.b = selectOptions.lv.filter(e => models.lv.a !== e.value)
  options.section = selectOptions.section.lang.filter(
    l => Object.values(models.lv)
      .map(id => idToLang(id))
      .includes(idToLang(l.value)),
  )
  updateSubjects()
}

</script>

<style scoped>
.entries * {
  padding-top: 20px;
  margin-bottom: 20px;
}

.entries {
    width: min(550px, 90%);
}

.title {
  font-size: 22px;
  font-weight: 550;
}

.sub-title {
  font-size: 14px;
  color: var(--secondary-text-color);
  margin-bottom: 50px;
}

.multi-entries {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<route lang="yaml">
meta:
  layout: form
</route>
