<template>
  <div class="bar">
    <div class="rounded p-3 flex items-center">
      <div class="icon" i="ic-outline-school" />
      <div class="title">
        Tutorat Fde
      </div>
    </div>
    <GoogleAuth />
  </div>
</template>

<script>
</script>

<style scoped>
.bar {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: min(4vw, 18px);
  background-color: var(--secondary-background);
  color: var(--secondary-text-color);
}


.bar .title {
  font-size: min(4vw, 22px);
  margin-left: 0.5rem;
  display: flex;
}

.bar * {
  display: flex;
  align-self: flex-end;

}
</style>
