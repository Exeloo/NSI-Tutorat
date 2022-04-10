<script lang="ts">
</script>

<template>
  <div class="TopBar">
    <div class="title">
      <div class="icon" i="ic-outline-school" />
      <div class="text">
        Tutorat Fde
      </div>
    </div>
    <div>
      <button class="">
        <div class="icon" i="carbon-notification" />
        <div class="text">
          Notifications
        </div>
      </button>

      <button class="">
        <div class="icon" i="ic-round-account-circle" />
        <div class="text">
          Nom Prenom
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>

.TopBar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 18px;
  background-color: var(--main-background);
  color: var(--secondary-text-color);
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

button {
  display: flex;
  align-items: center;
  padding: 0.75rem;
}

.TopBar * {
  display: flex;
}

.TopBar .title {
  font-size: 22px;
  display: flex;
  align-items: center;
  padding: 0.75rem;
}

.TopBar .text {
  margin-left: 0.5rem;
}

@media screen and (max-width: 520px){
  .TopBar .text{
    font-size: 0;
  }
}

</style>
