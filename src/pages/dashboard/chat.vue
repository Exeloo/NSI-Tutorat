<template>
  <div class="content">
    <Chat />
    This is a chat
  </div>
</template>

<script setup lang="ts">

setTimeout(() => {
  window.scrollTo({ top: 0 })
}, 100)

</script>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
