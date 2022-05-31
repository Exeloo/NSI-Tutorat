<template>
  <!-- {{ pageState }} -->
  <div v-if="pageState.id === 'loading'" class="loading">
    <Loading />
    <div class="loading-text">
      Chargement en cours, veuillez patienter...
    </div>
  </div>
  <div v-else-if="pageState.id === 'error'">
    {{ pageState.value }}
  </div>
  <SchoolInit v-else />
</template>

<script setup lang="ts">
import { login, user } from '~/logic/data/auth/auth-manager'
import { pageState, togglePageState } from '~/logic/pages/login'

const router = useRouter()
const isButtonLoading = ref(false)

const isIntervaled = ref(true)

const i = setInterval(async() => {
  if (pageState.value.id === 'loading') {
    const loginResult = await login()
    if (loginResult.result) {
      clearInterval(i)
      router.push('/dashboard')
      return
    }
    if (loginResult.error === 'email') {
      togglePageState({ id: 'error', value: 'Adresse email invalide, veuillez utiliser votre compte google pedagogiefde !' })
      return
    }
    togglePageState({ id: loginResult.error, value: '' })
  }
}, 4000)

</script>

<style scoped>
.entries * {
  margin: 40px 0;
}

.entries {
    width: min(550px, 90%);
}

.title {
  font-size: 22px;
  font-weight: 550;
}

.sub-title {
  margin-top: 20px;
  font-size: 14px;
  color: var(--secondary-text-color);
}

.loading {
  text-align: center;
  margin-top: 90px;
}

.multi-entries {
  margin: 70px 0;
}

.loading-text {
  margin-top: 4vh
}

.param-required {
  color: var(--color-danger);
  font-size: 12px;
  font-style: italic;
  margin-bottom: 50px;
}

</style>

<route lang="yaml">
meta:
  layout: form
</route>
