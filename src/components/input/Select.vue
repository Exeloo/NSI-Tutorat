<template>
  <div class="select">
    <label :for="`select-${props.id}`">{{ props.label }}</label>
    <VSelect
      :id="`select-${props.id}`"
      v-model="value"
      :reduce="(e: any) => e.value" :options="options" :searchable="search" :multiple="tags" @update:modelValue="() => update('change', null)"
    />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Array],
    required: true,
  },
  search: {
    type: Boolean,
    required: false,
    default: false,
  },
  tags: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const update = defineEmits(['update:modelValue', 'change'])

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (v: string) => {
    update('update:modelValue', v)
  },
})

</script>

<style scoped>
.select {
  width: 90%;
}
</style>
