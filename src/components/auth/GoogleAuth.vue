<template>
  <div class="google-auth">
    <div v-if="authLoading" class="loading">
      <Loading />
    </div>
    <div v-else-if="!user" class="login">
      <button class="bg-gray-100 rounded p-3 flex items-center" @click="login">
        <div class="icon" i="carbon-logo-google" />
        <div class="text">
          Se connecter avec Google
        </div>
      </button>
    </div>
    <button
      v-else
      class="logout"
      title="Se déconnecter"
      @click="logout"
    >
      <div i="ic-baseline-log-out" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth, authLoading, user } from '~/logic/data/firebase'

const provider = new GoogleAuthProvider()
const logout = () => {
  auth.signOut()
}
const login = () => {
  authLoading.value = true
  signInWithRedirect(auth, provider)
}

</script>

<style scoped>

.loading {
  display: flex;
}

.login {
  display: flex;
  gap: 2rem;
}

.login .icon {
  font-size: 2rem;
}
.login .text {
  font-size: 1.1rem;
  margin-left: 0.5rem;
}

.logout {
  background-color: #ff5252;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

</style>
