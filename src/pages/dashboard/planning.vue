
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
      :events="events"
    />
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

const events = [
  {
    start: '2022-05-24 10:30',
    end: '2022-05-24 13:30',
    title: 'Need to go shopping',
    content: '<i class="v-icon material-icons">shopping_cart</i>',
    class: 'leisure',
  },
  {
    start: '2022-05-24 15:00',
    end: '2022-05-24 17:00',
    title: 'Golf with John',
    content: '<i class="v-icon material-icons">golf_course</i>',
    class: 'sport',
  },
  {
    start: '2022-05-23 16:30',
    end: '2022-05-23 18:30',
    title: 'Dad\'s birthday!',
    content: '<i class="v-icon material-icons">cake</i>',
    class: 'sport',
  },
]

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

.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
