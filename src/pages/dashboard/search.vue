<template>
  <div class="search-container">
    <div class="search-title-container">
      <div class="search-title-main">
        Trouver un tutorant
      </div>
      <div class="search-title-sub">
        Vous souhaitez trouver un tutorant, n'hésitez pas à séléctionner la personne qui vous convient le mieux !
      </div>
      <div v-if="!user.school.tutorat.receiver.wish" class="search-title-error">
        <div class="search-title-error-text">
          Vous avez dit que vous ne vouliez pas recevoir d'aide, si vous souhaitez trouver un tutorant, veuillez modifier votre profil !
        </div>
        <div class="search-title-go-to-profile" @click="router.push('/dashboard/profil/school')">
          Modifier son profil
        </div>
      </div>
    </div>
    <div v-if="user.school.tutorat.receiver.wish" class="search-filters">
      <div class="search-filters-title">
        Filtres
      </div>
      <div class="search-filters-checkboxs">
        <Checkbox id="times" v-model="filter.times" styles="blurple" label="Horaires communes" />
        <Checkbox id="level" v-model="filter.level" styles="blurple" label="Niveau scolaire supérieur ou égal" />
        <Checkbox id="filiaire" v-model="filter.filiaire" styles="blurple" label="Même filiaire (générale et technologique)" />
      </div>
    </div>
    <div v-if="user.school.tutorat.receiver.wish">
      <div v-for="user in users.values()" :key="user.uid">
        {{ user }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getForcedUsers, getUsers } from '~/logic/data/firestore/datas/Users'
import { toggleLoadingPage } from '~/main'
import { user } from '~/logic/data/auth/auth-manager'

const router = useRouter()

const filter = reactive({ level: true, times: true, filiaire: true })

const users = ref<Map<string, UserData>>(getUsers(false))
if (users.value.size === 0) {
  const f = async() => {
    toggleLoadingPage(true)
    users.value = await getForcedUsers(true)
    toggleLoadingPage(false)
  }
  f()
}

// const perfect

</script>

<style scoped>
.search-container {
  margin: 0 15px 15px;
}

.search-title-container {
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  padding: 25px;
}

.search-title-main {
  font-size: 27px;
}

.search-title-sub {
  font-size: 13px;
}

.search-title-error {
  margin: 80px 0 300px 0;
}

.search-title-error-text {
  font-size: 15px;
  color: var(--color-danger);
  font-style: italic;
}

.search-filters {
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

.search-filters {
  padding: 30px;
}

.search-filters-title {
  font-size: 23px;
  padding-bottom: 10px;
}

.search-filters-checkboxs {
  padding-left: 20px;
}

.search-filters-checkboxs > * {
  display: inline-block;
  padding-right: 10vw;
  color: #404040;
}

.search-title-go-to-profile {
  margin: 50px 0 0 40px;
  padding: 5px 10px;
  width: fit-content;
  border-radius: 10px;
  border: 1px solid;
  border-color: #666666;
  color: var(--secondary-text-color);
  cursor: pointer;
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
