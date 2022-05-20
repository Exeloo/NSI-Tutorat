
<template>
  <div class="cal-container">
    <VCal
      class="cal"
      active-view="week"
      :disable-views="['years']"
      :min-date="minDate"
      :max-date="maxDate"
      locale="fr"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
    >
      <template #today-button>
        coucou
      </template>
    </VCal>
  </div>
</template>

<script setup lang="ts">

const getYears = () => {
  const now = new Date()
  if (now.getMonth() < 8) return [now.getFullYear() - 1, now.getFullYear()]
  return [now.getFullYear(), now.getFullYear() + 1]
}
const years = getYears()

const minDate = new Date()
minDate.setFullYear(years[0], 8, 1)

const maxDate = new Date()
maxDate.setFullYear(years[1], 7, 31)

const specialHours = reactive({
  1: [
    { from: 9 * 60, to: 10 * 60, class: 'buisy-hours' },
    { from: 12 * 60, to: 13 * 60, class: 'buisy-hours' },
    { from: 13 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
  ],
  2: [
    { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
    { from: 13 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
  ],
  3: [
    { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
  ],
  4: [
    { from: 8 * 60, to: 13 * 60, class: 'buisy-hours' },
    { from: 14 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
  ],
  5: [
    { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
    { from: 13 * 60 + 30, to: 16 * 60 + 30, class: 'buisy-hours' },
  ],
})

// https://antoniandre.github.io/vue-cal/?ref=madewithvuejs.com
</script>

<style scoped>
.cal-container {
  margin: 0 15px 15px 15px;

}
.cal {
  background-color: var(--main-background);
  width: 1200px;
  height: 660px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
