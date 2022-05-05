<template>
  <div class="TopBar">
    <div class="title">
      <div class="icon" i="ic-outline-school" />
      <div class="text">
        Tutorat Fde
      </div>
    </div>
    <div>
      <button class="">
        <div class="icon" i="carbon-notification" />
        <div class="text">
          Notifications
        </div>
      </button>

      <button class="">
        <div class="icon" i="ic-round-account-circle" />
        <div class="text">
          {{ user.value.data.value.displayName }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" await>
import { login, softLogin, user } from '~/logic/data/auth/auth-manager'
const router = useRouter()

if (!user.value || !user.value.exist || !user.value.valid) {
  setTimeout(async() => {
    await softLogin()
    if (!user.value || !user.value.exist || !user.value.valid) {
      router.push('login')
      setTimeout(() => {
        login()
      }, 1000)
    }
  }, 500)
}
</script>

<style scoped>

.TopBar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 2.5vh;
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

button {
  display: flex;
  align-items: center;
  padding: 2vh;
}

.TopBar * {
  display: flex;
}

.TopBar .title {
  display: flex;
  align-items: center;
  padding: 1.5vh;
  cursor: default;
}

.TopBar .text {
  margin-left: 1vh;
}

@media screen and (max-width: 520px){
  .TopBar .text{
    font-size: 0;
  }
}

</style>
