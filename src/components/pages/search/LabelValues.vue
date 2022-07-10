<template>
  <div class="container">
    <div class="label">
      {{ label }} :
    </div>
    <div v-for="item in value" :key="item" class="value">
      - {{ getSchoolLabel(item) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSchoolLabel } from '~/logic/profil/school/school-manager'

const props = defineProps({
  label: {
    type: String,
  },
  value: {
    type: Array,
  },
})

</script>

<style scoped>
.value {
  padding-left: 20px;
}
</style>
