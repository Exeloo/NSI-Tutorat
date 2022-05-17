<template>
  <div class="gray row">
    <div class="row-content">
      <div class="row-text">
        Bienvenue sur le site du tutorat de François d'Estaing
      </div>
      <div class="row-img">
        <img class="fde-logo" src="/logo_fde.png">
      </div>
    </div>
  </div>
  <div class="white row">
    <div class="row-content">
      <div class="row-img">
        <img src="/book.png">
      </div>
      <div class="row-text">
        Pour apprendre et progresser ensemble
      </div>
    </div>
  </div>
  <div class="gray row">
    <div class="row-content">
      <div class="row-text">
        Trouver de l'aide <br> et en donner
      </div>
      <div class="row-img">
        <img src="/loupe.png">
      </div>
    </div>
  </div>
  <div class="white row">
    <div class="row-content last">
      <div>
        Prêt à commencer ?
      </div>
      <GoogleAuth />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.row {
  width: 100%;
  font-size: 5.5vh;
  height: 375px;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
}

.gray {
  background-color: var(--secondary-background);
}

.white {
  background-color: var(--main-background);
}

.row-content{
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.last {
  flex-direction: column;
  justify-self: center;
  gap: 2rem;
  display: flex;
  align-items: center;
}

.row-text {
  width: 582px;
  display: flex;
  align-items: center;
}

.row-img {
  width: 400px;
}

</style>

<route lang="yaml">
meta:
  layout: home
</route>
