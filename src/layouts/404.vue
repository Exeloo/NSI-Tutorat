<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main>
    <div>
      <div i="ic-round-warning-amber" class="icon" />
    </div>
    <router-view />
    <div>
      <button @click="router.back()">
        Retour
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding-top: 10vh;
  color: var(--main-text-color);
}

.icon {
  display: inline-block;
  font-size: 8vh;
}
</style>
