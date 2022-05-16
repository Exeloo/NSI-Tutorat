<template>
  <div class="gray row" >
    <div class="row-content">
        Bienvenue sur le site du <br/>tutorat de François d'Estaing
        <img class="fde-logo" src="../../public/logo_fde.png">
    </div>

  </div>
  <div class="white row" >
    <div class="row-content">
      <img class="book" src="../../public/book.png">
      Pour apprendre et <br/> progresser ensemble
    </div>

  </div>
  <div class="gray row" >
    <div class="row-content">
      Trouver de l'aide <br/> et en donner
      <img class="book" src="../../public/loupe.png">
    </div>

  </div>
  <div class="white row" >
    <div class="row-content last">
      Pret a commencer ?
      <GoogleAuth />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: space-around;

  font-size: 5.5vh;
  padding-top: 10vh;
}

.gray {
  background-color: var(--secondary-background);
}

.white {
  background-color: var(--main-background);
}

.row-content{
  display: flex;
}

.book {
 width: 300px;
}
last {
  display: flex;

</style>

<route lang="yaml">
meta:
  layout: home
</route>
