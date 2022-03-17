<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main>
    <div text-4xl>
      <div i="ic-round-warning-amber" class="icon" />
    </div>
    <router-view />
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">
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
