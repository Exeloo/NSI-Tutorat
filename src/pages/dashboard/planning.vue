
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

// const specialHours = reactive({
//   1: [
//     { from: 9 * 60, to: 10 * 60, class: 'buisy-hours' },
//     { from: 12 * 60, to: 13 * 60, class: 'buisy-hours' },
//     { from: 13 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
//   ],
//   2: [
//     { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
//     { from: 13 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
//   ],
//   3: [
//     { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
//   ],
//   4: [
//     { from: 8 * 60, to: 13 * 60, class: 'buisy-hours' },
//     { from: 14 * 60 + 30, to: 17 * 60 + 30, class: 'buisy-hours' },
//   ],
//   5: [
//     { from: 8 * 60, to: 12 * 60, class: 'buisy-hours' },
//     { from: 13 * 60 + 30, to: 16 * 60 + 30, class: 'buisy-hours' },
//   ],
// })

const events = [
  {
    start: '2022-05-23 9:00',
    end: '2022-05-23 10:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-23 12:00',
    end: '2022-05-23 13:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-23 13:30',
    end: '2022-05-23 17:30',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-24 8:00',
    end: '2022-05-24 12:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-24 13:30',
    end: '2022-05-24 17:30',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-25 8:00',
    end: '2022-05-25 12:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-26 8:00',
    end: '2022-05-26 13:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-26 14:30',
    end: '2022-05-26 17:30',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-27 8:00',
    end: '2022-05-27 12:00',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-27 13:30',
    end: '2022-05-27 16:30',
    title: 'Cours',
    content: '',
    class: 'cours',
  },
  {
    start: '2022-05-23 10:00',
    end: '2022-05-23 12:00',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-23 17:30',
    end: '2022-05-23 18:30',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-24 12:00',
    end: '2022-05-24 13:00',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-24 17:30',
    end: '2022-05-24 18:30',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-25 13:00',
    end: '2022-05-25 17:30',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-26 13:30',
    end: '2022-05-26 14:30',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-26 17:30',
    end: '2022-05-26 18:30',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-27 12:00',
    end: '2022-05-27 13:00',
    title: 'Libre',
    content: '',
    class: 'free',
  },
  {
    start: '2022-05-27 16:30',
    end: '2022-05-27 17:30',
    title: 'Libre',
    content: '',
    class: 'free',
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
  width: 80vw;
  height: 660px;
  font-size: 13px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}

.vuecal__event.cours {background-color: rgba(253, 66, 66, 0.566);border: 1px solid rgb(238, 89, 89);color: #fff;}
.vuecal__event.free {background-color: rgba(82, 179, 92, 0.434);border: 1px solid rgb(93, 226, 83);color: #fff;}

@media screen and (max-width: 520px){
  .cal {
    width: 99%;
  }
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
