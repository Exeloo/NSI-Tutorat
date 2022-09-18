<template>
  <div class="school-init-container">
    <div>
      <div class="school-init-title">
        {{ t('firstLogin.title') }}
      </div>
      <div class="school-init-sub-title">
        {{ t('firstLogin.subTitle') }}
      </div>
      <div class="school-init-param-required">
        {{ t('param-required') }}
      </div>
    </div>
    <Select id="niveau" v-model="models.value.level" :label="t('firstLogin.forms.level')" :options="selectOptions.niveau" @change="onNiveauChange" />
    <Select v-if="models.value.level && options.classe" id="classe" v-model="models.value.class" :label="t('firstLogin.forms.class')" :options="options.classe" @change="updateSubjects" />
    <div v-if="hasSpe(false)">
      <Select id="spe-a" v-model="models.value.spe.a" :label="t('firstLogin.forms.spe.a')" :options="options.spe.a" :search="true" @change="onSpeChange" />
      <Select id="spe-b" v-model="models.value.spe.b" :label="t('firstLogin.forms.spe.b')" :options="options.spe.b" :search="true" @change="onSpeChange" />
      <Select id="spe-c" v-model="models.value.spe.c" :label="hasSpe(true) ? t('firstLogin.forms.spe.c') : t('firstLogin.forms.spe.c-bis')" :options="options.spe.c" :search="true" @change="onSpeChange" />
    </div>
    <Select v-if="isTechno()" id="techno" v-model="models.value.techno" :label="t('firstLogin.forms.techno')" :options="selectOptions.techno" :search="true" />
    <div class="lv">
      <Select id="lva" v-model="models.value.lv.a" :label="t('firstLogin.forms.lv.a')" :options="options.lv.a" @change="onLvChange" />
      <Select id="lvb" v-model="models.value.lv.b" :label="t('firstLogin.forms.lv.b')" :options="options.lv.b" @change="onLvChange" />
    </div>
    <Select v-if="models.value.level && optionOptions" id="options" v-model="models.value.option" :label="t('firstLogin.forms.option')" :options="optionOptions" tags :required="false" @change="updateSubjects" />
    <div v-if="models.value.lv.a || models.value.lv.b">
      <Select id="euro" v-model="models.value.section.lang" :label="t('firstLogin.forms.section.euro')" :options="options.section" :required="false" @change="updateSubjects" />
      <Select v-if="models.value.section.lang === 'angl-euro' && models.value.niveau !== 'seconde'" id="dnl" v-model="models.value.section.dnl" :label="t('firstLogin.forms.section.dnl')" :options="selectOptions.section.dnl" @change="updateSubjects" />
    </div>
    <div v-if="models.value.level">
      <div>
        <Checkbox id="help" v-model="models.value.tutorat.helper.wish" styles="blurple" :label="t('firstLogin.forms.subjects.help.wish')" />
        <div v-if="models.value.tutorat.helper.wish && options.subjects.good">
          <Select id="help" v-model="models.value.tutorat.helper.subjects" :label="t('firstLogin.forms.subjects.help.subject')" :options="options.subjects.helper" tags search @change="updateSubjects" />
          <Select id="goodSubject" v-model="models.value.subjects.good" :label="t('firstLogin.forms.subjects.good')" :options="options.subjects.good" tags search :required="false" @change="updateSubjects" />
        </div>
      </div>
      <div>
        <Checkbox id="receive" v-model="models.value.tutorat.receiver.wish" styles="blurple" :label="t('firstLogin.forms.subjects.receive.wish')" />
        <div v-if="models.value.tutorat.receiver.wish && options.subjects.bad">
          <Select id="receive" v-model="models.value.tutorat.receiver.subjects" :label="t('firstLogin.forms.subjects.receive.subject')" :options="options.subjects.receiver" tags search @change="updateSubjects" />
          <Select id="badSubject" v-model="models.value.subjects.bad" :label="t('firstLogin.forms.subjects.bad')" :options="options.subjects.bad" tags search :required="false" @change="updateSubjects" />
        </div>
      </div>
    </div>
    <div class="school-init-submit">
      <Button id="submit" :label="t('send')" styles="blurple" :options="buttonOptions" :loading="isButtonLoading" @click="onButtonClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { user, userLogin } from '~/logic/data/auth/auth-manager'
import type { Option } from '~/logic/pages/login/school.login'
import { getOption, getSubjects, models, optionOptions, options, selectOptions, setModels } from '~/logic/pages/login/school.login'
import { isValidChoices } from '~/logic/profil/school/school-manager'
import { setUser } from '~/logic/data/auth/user'
import { togglePageState } from '~/logic/pages/login'

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

const onButtonClick = async() => {
  isNotValid.value = !isValidChoices(models.value)
  if (isNotValid.value) return
  isButtonLoading.value = true
  await setUser(user.value.uid, { school: models.value })
  togglePageState({ id: 'loading', value: '' })
  await userLogin()
}

const hasSpe = (third: boolean) => {
  return models.value.level === 'premiere-g' || (models.value.level === 'terminal-g' && !third)
}

const isTechno = () => {
  return models.value.level === 'premiere-t' || models.value.level === 'terminal-t'
}

const updateSubjects = () => {
  if (!optionOptions.value)
    onNiveauChange()
  if (optionOptions.value.filter(({ value }: Option) => models.value.option.includes(value)).length <= 0 && models.value.option.length > 0)
    models.value.option = []
  options.subjects.helper = getSubjects(models.value).filter(({ value }: Option) => ![...models.value.subjects.bad, ...models.value.subjects.good, ...models.value.tutorat.receiver.subjects].includes(value))
  options.subjects.receiver = getSubjects(models.value).filter(({ value }: Option) => ![...models.value.subjects.bad, ...models.value.subjects.good, ...models.value.tutorat.helper.subjects].includes(value))
  options.subjects.good = getSubjects(models.value).filter(({ value }: Option) => ![...models.value.subjects.bad, ...models.value.tutorat.helper.subjects, ...models.value.tutorat.receiver.subjects].includes(value))
  options.subjects.bad = getSubjects(models.value).filter(({ value }: Option) => ![...models.value.subjects.good, ...models.value.tutorat.helper.subjects, ...models.value.tutorat.receiver.subjects].includes(value))
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
  options.spe.a = selectOptions.spe.filter(({ value }: Option) => ![models.value.spe.b, models.value.spe.c].includes(value))
  options.spe.b = selectOptions.spe.filter(({ value }: Option) => ![models.value.spe.a, models.value.spe.c].includes(value))
  options.spe.c = selectOptions.spe.filter(({ value }: Option) => ![models.value.spe.a, models.value.spe.b].includes(value))
  optionOptions.value = getOption(models.value.level, models.value.spe)
  updateSubjects()
}

const idToLang = (e: string) => e.split('-')[0]

const onLvChange = () => {
  options.lv.a = selectOptions.lv.filter(({ value }: Option) => models.value.lv.b !== value)
  options.lv.b = selectOptions.lv.filter(({ value }: Option) => models.value.lv.a !== value)
  options.section = selectOptions.section.lang.filter(
    l => Object.values(models.value.lv)
      .map(id => idToLang(id))
      .includes(idToLang(l.value)),
  )
  updateSubjects()
}

</script>

<style scoped>
.school-init-container {
    width: min(550px, 90%);
}

.school-init-container * {
  margin: 20px 0;
}

.school-init-container > * {
  margin: 30px 0;
}

.school-init-container > * > * {
  margin: 15px 0;
}

.school-init-title {
  font-size: 22px;
  font-weight: 550;
}

.school-init-sub-title {
  margin-top: 20px;
  font-size: 14px;
  color: var(--secondary-text-color);
}

.school-init-param-required {
  color: var(--color-danger);
  font-size: 12px;
  font-style: italic;
  margin-bottom: 50px;
}

.lv {
  display: flex;
  /* flex-wrap: wrap; */
  gap: 2rem;
  width: 90%;
}

</style>
