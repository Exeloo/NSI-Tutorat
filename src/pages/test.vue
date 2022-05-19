<template>
  <div class="content">
    <Chat />
  </div>
</template>

<script setup lang="ts">
const isSideBarDeploy = ref(false)

</script>

<style scoped>
.content {
  margin-bottom: 50px;
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
