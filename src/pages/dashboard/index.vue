<template>
  <div class="container">
    <div class="planning">
      Planning
    </div>
    <div class="notif">
      Notifications
    </div>
    <div class="msgs">
      Messages
    </div>
    <div class="profil">
      Mon profil de tutorant
    </div>
    <div class="find">
      Trouver un tutorant
    </div>
    <div class="settings">
      Réglages
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.container {
  margin: 10px 20px 20px 20px;
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: minmax(150px, auto);
  /* grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr); */
}

.container > div {
  background-color: var(--main-background);
  width: auto;

}

.planning {
  grid-column: 1/5;
  grid-row: 1/4;
}

.notif {
  grid-column: 5/7;
  grid-row: 1/3;
}

.msgs {
  grid-column: 5/7;
  grid-row: 3/5;
}

.find {
  grid-column: 3/4;
  grid-row: 4;
}

.profil {
  grid-column: 1/3;
  grid-row: 4;
}

</style>

<route lang="yaml">
meta:
  layout: dash
</route>
