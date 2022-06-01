<template>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          niveau:
        </div>
        <div class="age">
          {{ user.school.level }}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('level')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          classe:
        </div>
        <div class="age">
          {{ user.school.class}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('class')" />
      </div>
    </div>
  </div>
  <div class="element" v-if=" user.school.techno === '' && user.school.level !== 'seconde'">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          spé:
        </div>
        <div class="age">
          {{ user.school.spe.a }}
          {{ user.school.spe.b }}
          <div v-if="user.school.level === 'terminal-g'">({{ user.school.spe.c }})</div>
          <div v-else>{{ user.school.spe.c }}</div>
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('spe')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          langues:
        </div>
        <div class="age">
          {{ user.school.lv.a}}
          {{ user.school.lv.b}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('lv')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          option:
        </div>
        <div class="age">
          {{ user.school.option}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          option:
        </div>
        <div class="age">
          {{ user.school.option}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
  <div class="element">
    <div class="euh-non">
      <div class="sub">
        <div class="under-text">
          dnl:
        </div>
        <div class="age">
          {{ user.school.dnl}}
        </div>
        <button class="modif-button" i="carbon-pen" @click="modify('option')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from '~/logic/data/auth/auth-manager'
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
}

.element {
  padding-top: 10px;
}


</style>

<route lang="yaml">
meta:
  layout: profil
</route>
