<template>
  <div v-if="pageState.id === 'error'" class="login-error">
    <div class="login-error-message">
      {{ pageState.value }}
    </div>
    <div>
      <Button id="conexion" label="Se connecter" styles="blurple" :options="{disabled: false}" :loading="isButtonLoading" @click="userLogin()" />
    </div>
  </div>
  <SchoolInit v-else-if="pageState.id === 'school'" />
  <PlanningInit v-else-if="pageState.id === 'planning'" />
  <div v-else class="loading">
    <Loading />
    <div class="loading-text">
      Chargement en cours, veuillez patienter...
    </div>
  </div>
</template>

<script setup lang="ts">
import { result, user, userLogin } from '~/logic/data/auth/auth-manager'
import { pageState, togglePageState } from '~/logic/pages/login'

const router = useRouter()
const isButtonLoading = ref(false)

const i = setInterval(async() => {
  if (pageState.value.id === 'loading') {
    if (result.value.result) {
      router.push('/dashboard')
      clearInterval(i)
      return
    }
    if (result.value.error === 'noResults') {
      await userLogin()
      return
    }
    if (result.value.error === 'email') {
      togglePageState({ id: 'error', value: 'Adresse email invalide, veuillez utiliser votre compte google pedagogiefde !' })
      return
    }
    if (result.value.error === 'cookies') {
      togglePageState({ id: 'error', value: 'Vous avez un problème de cookies, veuillez désactiver vos protections contre les cookies sur ce site. Merci' })
      return
    }
    if (result.value.error === 'result') {
      togglePageState({ id: 'error', value: 'Erreur 404... Contactez un administrateur !' })
      return
    }
    togglePageState({ id: result.value.error, value: '' })
  }
}, 4000)

setTimeout(() => {
  window.scrollTo({ top: 0 })
}, 100)

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

.login-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.login-error-message {
  color: var(--color-danger);
  padding-top: 50px;
  text-align: center;
}

</style>

<route lang="yaml">
meta:
  layout: form
</route>
