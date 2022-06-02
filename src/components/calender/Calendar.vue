<template>
  <div class="calendar-container">
    <div class="calendar-days-container">
      <div v-for="day in days" :key="day" class="calendar-day-container">
        {{ day }}
      </div>
    </div>
    <div class="calendar-times-container">
      <div v-for="time in times" :key="time" class="calendar-time-container">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

</script>

<style scoped>
.calendar-container {
  width: 90%;
}

.calendar-days-container {
  display: flex;
  flex: 1 1 0;
  border: 1px solid;
  border-radius: 2px;
  border-color: #c1c1c1;
}

.calendar-day-container {
  text-align: center;
  flex: 1 1 0;
}

.calendar-time-container {
  font-size: 12px;
  border: 1px solid;
  border-color: #c1c1c1;
  height: 30px;
}

</style>
