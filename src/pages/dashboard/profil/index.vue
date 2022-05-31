<template>
  <div class="content">
    <div class="non-modifiable">
      <img class="pp" :src="user.avatar" alt="">
      <div class="user-name">
        <div>{{ user.displayName }}</div>
        <div class="email">
          {{ user.email }}
        </div>
      </div>
    </div>
    <div class="modifiable">
      <div class="element description">
        <div class="sub-element">
          <div class="sub-text">
            Description: test
          </div>
        </div>
        <div class="noName">
          <div>
            {{ user.description }}
          </div>
          <div><button class="modif-button" i="carbon-pen" @click="modify('desc')" /></div>
        </div>
      </div>
      <div class="element">
        <div class="euh-non">
          <div class="sub">
            <div class="under-text">
              Âge:
            </div>
            <div class="age">
              {{ age }}
            </div>
            <button class="modif-button" i="carbon-pen" @click="modify('age')" />
          </div>
        </div>
        <div class="noName">
          <div />
        </div>
      </div>
      <div class="element">
        <div v-if="updating !== 'genre'">
          <div class="sub-element">
            Genre:
          </div>
          <button class="modif-button" i="carbon-pen" @click="modify('genre')" />
        </div>
        <div v-else>
          <Select id="genre" v-model="genreModel" label="" :options="genres" @change="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import firebase from 'firebase/compat'
import { user } from '~/logic/data/auth/auth-manager'
import Timestamp = firebase.firestore.Timestamp
const updating = ref()
const modify = (which: string) => {
  updating.value = which
}
const genreModel = ref(user.value?.genre)
const genres = [
  { label: 'Masculin', value: 'm' },
  { label: 'Féminin', value: 'f' },
  { label: 'Non précisé', value: 'n' },
]

const now = new Date()
const age = new Date(now.getTime() - user.value?.birthday.toDate().getTime()).getFullYear() - 1970
</script>

<style scoped>

.non-modifiable {
  display: flex;
  gap: 20px;
  align-items: center;
}

.pp {
  border-radius: 50%;

}

.user-name {
  font-size: 30px;
}

.email{
  font-size: 15px;
}

.element {
  padding-top: 35px;
}

.modifiable {
  padding: 10px;
}

.modif-button {
  font-size: 18px;
  width: 40px;
}

.sub-element {
  display: flex;
  justify-content: space-between;
  text-decoration: underline;
}

.sub {
  display: flex;
}

.description {
  gap: 10px;
}

.noName {
  display: flex;
  align-items: center;
}

.under-text {
  text-decoration: underline;
  padding-right: 10px;
}

</style>

<route lang="yaml">
meta:
  layout: profil
</route>
