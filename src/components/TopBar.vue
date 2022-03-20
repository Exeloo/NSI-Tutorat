<script lang="ts">
import GoogleAuth from "~/components/auth/GoogleAuth.vue";

export default {
  components: {GoogleAuth}
}
</script>

<template>
  <div class="TopBar">
    <div class="rounded p-3 flex items-center">
      <div class="icon" i="ic-outline-school"></div>
      <div class="text">Tutorat Fde</div>
    </div>
    <button class="rounded p-3 flex items-center">
      <div class="icon" i="carbon-notification" />
      <div class="text">Notifications</div>
    </button>

    <button class="rounded p-3 flex items-center">
      <div class="icon" i="ic-round-account-circle" />
      <div class="text">Nom Prenom</div>
    </button>
  </div>
</template>

<style scoped>

.TopBar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 50px;
  background-color: var(--secondary-background);
}

button * {
  display: inline-block;
}

.TopBar button {
  border-radius: 5px;
  font-size: 2rem;
  background: var(--secondary-background);
  border: white;
}

.TopBar .text {
  font-size: 1.1rem;
  margin-left: 0.5rem;
}

.TopBar .icon {
  font-size: 2rem;
}

.TopBar title{
  font-size: 2rem;
  display: inline-block;
}
</style>
