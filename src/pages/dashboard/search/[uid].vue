<template>
  <div class="search-container">
    {{ uid }}

    {{ publicUser }}
  </div>
</template>

<script setup lang="ts">
import { getForcedUsers, getUsers } from '~/logic/data/firestore/datas/Users'
import { toggleLoadingPage } from '~/main'

const props = defineProps({
  uid: {
    required: true,
    type: String,
  },
})

const users = ref<Map<string, UserData>>(getUsers())
const error = ref('')
const publicUser = ref(users.value.get(props.uid))
const f = async() => {
  toggleLoadingPage(true)
  users.value = await getForcedUsers(true)
  toggleLoadingPage(false)
  publicUser.value = users.value.get(props.uid)
  if (!publicUser.value)
    error.value = 'L\'utilisateur n\'existe pas, veuillez contacter un administrateur !'
}
if (users.value.size === 0 || !publicUser.value)
  f()

setTimeout(() => {
  window.scrollTo({ top: 0 })
}, 100)

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
  layout: search
</route>
