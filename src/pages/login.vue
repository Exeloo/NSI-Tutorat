<template>
  <div v-if="true">
    <div>
      <label>Nom Prénom</label>
      <input type="text">
    </div>



  </div>
  <div v-else>
    <Loading />
  </div>

</template>

<script setup lang="ts">

const router = useRouter()
</script>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: form
</route>
