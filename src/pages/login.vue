<template>
  <div v-if="true" class="entries">
    <Select id="niveau" v-model="models.niveau" label="Niveau Scolaire" :options="selectOptions.niveau" @change="onNiveauChange" />
    <Select v-if="models.niveau && options.classe" id="classe" v-model="models.classe" label="Classe" :options="options.classe" />
    <div v-if="hasSpe(false)">
      <Select id="spe-a" v-model="models.spe.a" label="Première spécialité" :options="options.spe.a" :search="true" @change="onSpeChange" />
      <Select id="spe-b" v-model="models.spe.b" label="Deuxième spécialité" :options="options.spe.b" :search="true" @change="onSpeChange" />
      <Select id="spe-c" v-model="models.spe.c" :label="hasSpe(true) ? 'Troisième spécialité' : 'Spécialité arrêté cette année'" :options="options.spe.c" :search="true" @change="onSpeChange" />
    </div>
    <div>
      <Select id="lva" v-model="models.lv.a" label="Langue Vivante A" :options="options.lv.a" @change="onLvChange" />
      <Select id="lvb" v-model="models.lv.b" label="Langue Vivante B" :options="options.lv.b" @change="onLvChange" />
    </div>
    <Select v-if="models.niveau && optionOptions" id="classe" v-model="models.option" label="Option" :options="optionOptions" />
    <div v-if="models.lv.a || models.lv.b">
      <Select id="euro" v-model="models.section.lang" label="Section Européenne" :options="options.section" />
      <Select v-if="models.section.lang === 'angl' && models.niveau !== 'seconde'" id="dnl" v-model="models.section.dnl" label="DNL" :options="selectOptions.section.dnl" />
    </div>
    <div>
      <Select id="goodSubject" v-model="models.goodSubject" label="Les matières dans lesquelles vous êtes à l'aise" :options="selectOptions.spe" tags />
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { getOption, models, optionOptions, options, selectOptions } from '~/logic/form/login'

const hasSpe = (third: boolean) => {
  return models.niveau === 'premiere-g' || (models.niveau === 'terminal-g' && !third)
}

const onNiveauChange = () => {
  if (!models.niveau) options.classe = undefined
  else options.classe = selectOptions.classe.get(models.niveau)
  models.classe = ''
  optionOptions.value = getOption(models.niveau, models.spe)
}

const onSpeChange = () => {
  options.spe.a = selectOptions.spe.filter(e => models.spe.b !== e.value && models.spe.c !== e.value)
  options.spe.b = selectOptions.spe.filter(e => models.spe.a !== e.value && models.spe.c !== e.value)
  options.spe.c = selectOptions.spe.filter(e => models.spe.a !== e.value && models.spe.b !== e.value)
  optionOptions.value = getOption(models.niveau, models.spe)
}

const onLvChange = () => {
  options.lv.a = selectOptions.lv.filter(e => models.lv.b !== e.value)
  options.lv.b = selectOptions.lv.filter(e => models.lv.a !== e.value)
  options.section = selectOptions.section.lang.filter(e => models.lv.a === e.value || models.lv.b === e.value)
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.entries * {
  margin-bottom: 20px;
}

.entries {
    width: min(400px);
}
</style>

<route lang="yaml">
meta:
  layout: form
</route>
