<template>
  <SideBar />
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
</script>

<style scoped>

</style>
