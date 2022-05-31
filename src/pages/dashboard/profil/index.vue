<template>
  <div class="content">
    <div class="non-modifiable">
      <img class="pp" :src="user.value.data.avatar" alt=""/>
      <div class="user-name">
        <div>{{ user.value.data.displayName}}</div>
        <div class="email">{{ user.value.data.email }}</div>
      </div>
    </div>
    <div class="modifiable" >
      <div class="element description">
        <div class="sub-element">
          <div class="sub-text">Description:</div>
        </div>
        <div class="noName">
          <div>{{ user.value.data.description }}</div>
          <div><button class="modif-button" i="carbon-pen" @click="modify('desc')"/></div>
        </div>
      </div>
      <div class="element">
        <div class="sub-element">
          <div class="sub-text">Âge:</div>
        </div>
        <div class="noName">
          <div>{{ age }}</div>
          <button class="modif-button" i="carbon-pen" @click="modify('age')"/>
        </div>
      </div>
      <div class="element">
        <div v-if="updating !== 'genre'">
          <div class="sub-element">Genre: </div>
          <button class="modif-button" i="carbon-pen" @click="modify('genre')"/>
        </div>
        <div v-else>
          <Select id="genre" v-model="genreModel" label="" :options="genres" @change="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {user} from "~/logic/data/auth/auth-manager";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
console.log(user.value.data.avatar)
const updating = ref()
const modify = (which: string ) => {
  updating.value = which
}
const genreModel = ref(user.value.data.genre)
const genres = [
  { label: 'Masculin', value: 'm'},
  { label: 'Féminin', value: 'f'},
  { label: 'Non précisé', value: 'n'}
]

console.log(user.value.data.age)

const now = new Date()
const age = new Date(now.getTime() - user.value.data.birthday.toDate().getTime()).getFullYear() - 1970
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

.description {
  gap: 10px;
}

.noName {
  display: flex;
  align-items: center;
}
</style>

<route lang="yaml">
meta:
  layout: profil
</route>
