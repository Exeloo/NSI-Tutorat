<template>
  <div class="search-container">
    <div class="search-filters">
      <div class="search-filters-title">
        Filtres
      </div>
      <div class="search-filters-checkboxs">
        <Checkbox id="times" v-model="filter.times" styles="blurple" label="Horaires communes" />
        <Checkbox id="level" v-model="filter.level" styles="blurple" label="Niveau scolaire supérieur ou égal" />
        <Checkbox id="filiaire" v-model="filter.filiaire" styles="blurple" label="Même filiaire (générale et technologique)" />
      </div>
    </div>
    <div v-for="user in users.values()" :key="user.uid">
      {{ user }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getForcedUsers, getUsers } from '~/logic/data/firestore/datas/Users'
import { toggleLoadingPage } from '~/main'

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

</script>

<style scoped>
.search-container {
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  margin: 0 15px 15px;
}

.search-filters {
  padding: 30px;
}

.search-filters-title {
  font-size: 23px;
  padding-bottom: 10px;
}

.search-filters-checkboxs > * {
  display: inline-block;
  padding-right: 10vw;
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
