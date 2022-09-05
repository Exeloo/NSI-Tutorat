<template>
  <div class="profil-index-container">
    <div class="profil-index-title">
      <img :src="user.avatar" alt="" class="profil-index-title-avatar">
      <div>
        <div class="profil-index-title-name">
          {{ user.displayName }}
        </div>
        <div class="profil-index-title-email">
          {{ user.email }}
        </div>
      </div>
    </div>
    <div class="profil-index-items">
      <div class="profil-index-item">
        <div class="profil-index-item-label">
          Description :
        </div>
        <div v-if="!updating" class="profil-index-item-value">
          {{ user.description ? user.description : '-' }}
        </div>
        <div v-else class="profil-index-item-input">
          <textarea v-model="model.description" class="profil-index-item-text-area" />
        </div>
      </div>
      <div class="profil-index-item">
        <div class="profil-index-item-label">
          Date de naissance :
        </div>
        <div v-if="!updating" class="profil-index-item-value">
          {{ user.birthday ? `${convertDate(user.birthday.toDate().getUTCDate())}/${convertDate(user.birthday.toDate().getUTCMonth() + 1)}/${user.birthday.toDate().getUTCFullYear()}` : '-' }}
        </div>
        <div v-else class="profil-index-item-input">
          <input v-model="model.birthday" type="date" class="profil-index-item-date">
        </div>
      </div>
      <div class="profil-index-item">
        <div class="profil-index-item-label">
          Genre :
        </div>
        <div v-if="!updating" class="profil-index-item-value">
          {{ user.gender ? getSchoolLabel(user.gender) : '-' }}
        </div>
        <div v-else class="profil-index-item-input profil-index-item-gender">
          <Select id="genre" v-model="model.gender" label="" :options="genres" :required="false" />
        </div>
      </div>
    </div>
    <div class="profil-index-buttons">
      <div v-if="!updating">
        <Button id="modify" label="Modifier le profil" styles="blurple" :options="{disabled: false}" @click="updating = true" />
      </div>
      <div v-else>
        <Button id="complete" label="Valider les modifications" styles="success" :options="{disabled: !hasDifferencies()}" :loading="isButtonLoading" @click="onValidation" />
        <Button id="undo" label="Annuler les modifications" styles="danger" :options="{disabled: isButtonLoading}" @click="onUndo" />
      </div>
    </div>
    <div class="profil-index-returns">
      <div v-if="changeReturn" class="cal-val-return cal-val-good">
        Modification(s) effectuée(s) !
      </div>
      <div v-else-if="changeReturn === false" class="cal-val-return cal-val-bad">
        Erreur de modification, veuillez réessayer !
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import firebase from 'firebase/compat'

import { getSchoolLabel } from '~/logic/profil/school/school-manager'
import { user } from '~/logic/data/auth/auth-manager'

import { setUser } from '~/logic/data/auth/user'

import Timestamp = firebase.firestore.Timestamp

const updating = ref(false)
const isButtonLoading = ref(false)
const changeReturn = ref()

const toggleUpdating = (v: boolean) => {
  updating.value = v
}
const newUser = JSON.parse(JSON.stringify(user.value))
const birth = user.value.birthday ? user.value.birthday.toDate() : null
const convertDate = (nb: number) => {
  if (nb < 10)
    return `0${nb}`
  return nb
}
const model = reactive({
  description: newUser.description ?? '',
  birthday: birth ? `${birth.getUTCFullYear()}-${convertDate(birth.getUTCMonth() + 1)}-${convertDate(birth.getUTCDate())}` : '',
  gender: newUser.gender ?? '',
})
const genres = [
  { label: 'Masculin', value: 'm' },
  { label: 'Féminin', value: 'f' },
  { label: 'Non précisé', value: 'n' },
]

const hasDifferencies = () => {
  const isDifferentDate = (user.value.birthday || model.birthday) && (
    (!user.value.birthday && model.birthday) || (user.value.birthday && !model.birthday) || new Date(model.birthday).getTime() !== user.value.birthday.toDate().getTime()
  )
  return model.description !== user.value.description || model.gender !== user.value.gender || isDifferentDate
}

const onValidation = async() => {
  if (!hasDifferencies()) return
  isButtonLoading.value = true
  const data = { ...model, birthday: model.birthday ? new Date(model.birthday) : '' }
  try {
    await setUser(user.value.uid, data)
    user.value = { ...user.value, ...data, birthday: data.birthday ? new Timestamp(Math.floor(data.birthday.getTime() / 1000), 0) : '' }
    changeReturn.value = true
    updating.value = false
  }
  catch (e) {
    console.error(e)
    changeReturn.value = false
  }
  isButtonLoading.value = false
  setTimeout(() => {
    changeReturn.value = undefined
  }, 10000)
}

const onUndo = () => {
  updating.value = false
  const nUser = JSON.parse(JSON.stringify(user.value))
  model.description = nUser.description
  model.birthday = `${birth.getUTCFullYear()}-${convertDate(birth.getUTCMonth() + 1)}-${convertDate(birth.getUTCDate())}`
  model.gender = nUser.gender
}

setTimeout(() => {
  window.scrollTo({ top: 0 })
}, 100)

</script>

<style scoped>

.profil-index-container {
  width: 100%;
}

.profil-index-title {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2rem;
}

.profil-index-title-avatar {
  border-radius: 50%;
}

.profil-index-title-name {
  font-size: 22px;
}

.profil-index-item-value {
  margin: 0 0 20px 20px;
}

.profil-index-item-text-area {
  border: none;
  outline: none;
  resize: none;
  border: solid 1px rgba(60,60,60,0.26);
  border-radius: 4px;
  width: 85%;
  height: 98px;
}

.profil-index-item-date {
  border: solid 1px rgba(60,60,60,0.26);
  border-radius: 4px;
  padding: 3px 10px;
}

.profil-index-item-gender {
  max-width: 200px;
}

.profil-index-item-input {
  margin: 5px 0 20px 10px;
}

.profil-index-buttons {
  margin: 25px 0 10px 0;
}

.profil-index-buttons > * {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.profil-index-returns {
  display: flex;
  justify-content: flex-end;
}

.cal-val-return {
  font-size: 10px;
}

.cal-val-good {
  color: var(--color-success)
}

.cal-val-bad {
  color: var(--color-danger)
}

</style>

<route lang="yaml">
meta:
  layout: profil
</route>
