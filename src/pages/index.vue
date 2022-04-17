<template>
  <Button id="login" label="Login" styles="blurple" :options="logOptions" :loading="isButtonLoading" @click="log" />
  {{ user }}
  <Button id="testUsers" label="Test Users" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testUsers" />
  <Button id="testSubjects" label="Test Subjects" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="testSubjects" />
</template>

<script setup lang="ts">
import { Store } from '~/logic/data/firestore/interface/Store'
import { login } from '~/logic/data/auth/auth-system'

const store = new Store()
const isButtonLoading = ref(false)

const logOptions = reactive({ disabled: false })
const user = ref<{ uid: null | string; displayName: null | string; email: null | string }>({ uid: null, displayName: null, email: null })

const log = async() => {
  const loginResult = await login()
  if (loginResult.authInfo.answer) {
    const userResult = loginResult.auth.user
    user.value = { uid: userResult.uid, displayName: userResult.displayName, email: userResult.email }
  }
}

const testUsers = async() => {
  const uid = user.value.uid ? user.value.uid : 'null'
  const doc = store.getCollection('users', false).getDocument(uid)
  doc.set({ uid: user.value.uid, displayName: user.value.displayName, email: user.value.email })
  console.log(await doc.get())
}

const testSubjects = async() => {
  const col = store.getCollection('subjects', false)
  const doc = await col.createDocument({ name: 'Français' })
  console.log(await doc.get())
}
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
