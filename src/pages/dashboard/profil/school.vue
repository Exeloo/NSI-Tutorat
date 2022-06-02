<template>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Niveau:
        </div>
        <div class="age">
          {{ getSchoolLabel('niveau', user.school.level) }}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('level')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Classe:
        </div>
        <div class="age">
          {{ getSchoolLabel('classe', user.school.class, user.school.level)}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('class')" />
      </div>
    </div>
  </div>
  <div class="element" v-if=" user.school.techno === '' && user.school.level !== 'seconde'">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Spécialités:
        </div>
        <div class="age">
          <div>- {{ getSchoolLabel('spe', user.school.spe.a) }}</div>
          <div class="paul">- {{ getSchoolLabel('spe', user.school.spe.b) }} <button class="modif-button" i="carbon-pen" @click="modify('spe')" /></div>
          <div v-if="user.school.level === 'terminal-g'" class="give-up">- {{ getSchoolLabel('spe', user.school.spe.c) }}</div>
          <div v-else>- {{ getSchoolLabel('spe', user.school.spe.c) }}</div>
        </div>

      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Langues:
        </div>
        <div class="age">
          {{ getSchoolLabel('lv', user.school.lv.a) }} -
          {{ getSchoolLabel('lv', user.school.lv.b) }}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('lv')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Options:
        </div>
        <div class="age" v-for="u in user.school.option">
          {{ getSchoolLabel('option', u, user.school.level) }}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
  <div class="element" v-if="user.school.section">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Section européene:
        </div>
        <div class="age">
          {{ getSchoolLabel('section',user.school.section.lang, "lang" ) }}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
  <div class="element" v-if="user.school.section.lang === 'angl-euro' && user.school.level !== 'seconde'">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          Dnl:
        </div>
        <div class="age">
          {{ getSchoolLabel('section',user.school.section.dnl, "dnl" )}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from '~/logic/data/auth/auth-manager'
import {getSchoolLabel} from "~/logic/profil/school/school-manager";
const updating = ref()

const modify = (which: string) => {
  updating.value = which
}

</script>

<style scoped>


.under-text {
  text-decoration: underline;
  padding-right: 10px;
}


.sub {
  display: flex;
}

.modif-button {
  font-size: 18px;
  width: 40px;
  margin-left: 15px;
}

.element {
  padding-top: 10px;
}

.give-up {
  font-style: italic;
}

.paul {
  display: flex;
  align-self: center;
}

</style>

<route lang="yaml">
meta:
  layout: profil
</route>
