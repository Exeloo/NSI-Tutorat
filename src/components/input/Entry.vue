<template>
  <div class="entry">
    <label :for="`entry-${entry.id}`">{{ entry.label }}</label>
    <input :id="`entry-${entry.id}`" v-model="model" :type="entry.type" :placeholder="entry.placeholder">
    {{ entry.model }}
    {{ entry.placeholder }}
  </div>
</template>

<script lang="ts" setup>
const entry = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  model: {
    type: ref,
    required: true,
  },
})

const model = entry.model
</script>

<style scoped>
.entry * {
  display: block;
}

input {
  background-color: var(--secondary-background);
}
</style>
