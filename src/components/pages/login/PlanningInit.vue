<template>
  <div class="planning-init-container">
    <div class="planning-init-calendar-container">
      <Calendar />
    </div>
    <div class="planning-init-calendar-input-container">
      <InputCalendar />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.planning-init-container {
  width: 100%;
}

.planning-init-container > * {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
