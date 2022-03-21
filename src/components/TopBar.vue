<script lang="ts">
</script>

<template>
  <div class="TopBar">
    <div class="rounded p-3 flex items-center">
      <div class="icon" i="ic-outline-school" />
      <div class="text">
        Tutorat Fde
      </div>
    </div>
    <div>
      <button class="rounded p-3 flex items-center">
        <div class="icon" i="carbon-notification" />
        <div class="text">
          Notifications
        </div>
      </button>

      <button class="rounded p-3 flex items-center">
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
  font-size: min(4vw, 18px);
  background-color: var(--secondary-background);
  color: var(--secondary-text-color);
}

button * {
  display: inline-block;
}

.TopBar * * {
  display: inline-block;
}

.TopBar .text {
  font-size: min(4vw, 18px);
  margin-left: 0.5rem;
}
</style>
