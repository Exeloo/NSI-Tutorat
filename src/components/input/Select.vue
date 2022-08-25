<template>
  <div class="select">
    <label :for="`select-${props.id}`">{{ props.label }}<div v-if="required" class="required">*</div></label>
    <VSelect
      :id="`select-${props.id}`"
      v-model="value"
      :reduce="(e: any) => e.value"
      :options="options"
      :searchable="search"
      :multiple="tags"
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
    required: false,
    default: '',
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
  required: {
    type: Boolean,
    required: false,
    default: true,
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

watch(value, () => update('change', null))

</script>

<style scoped>
.select {
  width: 90%;
}

.required {
  color: var(--color-danger);
  display: inline-block;
  margin-left: 4px;
}
</style>
