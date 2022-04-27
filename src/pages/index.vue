<template>
  <div class="buttons">
    <Button id="login" label="Login" styles="blurple" :options="logOptions" :loading="isButtonLoading" @click="log" />
    {{ user }}
    <Button id="testUsers" label="Test Users - 1" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testUsers" />
    <Button id="testSubjects" label="Test Subjects - 1" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testSubjects" />
    <Button id="testUsers-2" label="Test Users - 2" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testUsersB" />
    <Button id="testSubjects-2" label="Test Subjects - 2" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testSubjectsB" />
  </div>
</template>

<script setup lang="ts">
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { Store } from '~/logic/data/firestore/interface/Store'
import { login, user } from '~/logic/data/auth/auth-manager'
import { db } from '~/logic/data/firebase'

const store = new Store()
const isButtonLoading = ref(false)

const logOptions = reactive({ disabled: false })

const log = async() => {
  await login()
  // if (loginResult.authInfo.answer) {
  //   const userResult = loginResult.auth.user
  //   user.value = { uid: userResult.uid, displayName: userResult.displayName, email: userResult.email }
  // }
  console.log(user)
}

const testUsers = async() => {
  const uid = user.value?.uid ? user.value.uid : 'null'
  const ref = doc(db, 'users', uid)
  await setDoc(ref, { uid: user.value?.uid, displayName: user.value?.displayName, email: user.value?.email })
  console.log((await getDoc(ref)).data())
}

const testSubjects = async() => {
  const ref = collection(db, 'subjects')
  const docRef = await addDoc(ref, { name: 'Français' })
  console.log((await getDoc(docRef)).data())
}

const testUsersB = async() => {
  const uid = user.value?.uid ? user.value.uid : 'null'
  const doc = await store.getCollection('users', false).getDocument(uid)
  await doc.set({ uid: user.value?.uid, displayName: user.value?.displayName, email: user.value?.email })
  console.log(await doc.get())
}

const testSubjectsB = async() => {
  const doc = await store.getCollection('subjects', false).createDocument({ name: 'Anglais' })
  console.log(await doc.get())
}

</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
