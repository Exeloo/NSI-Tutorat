<template>
  <div class="bar">
    <div class="fde">
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
  background-color: var(--main-background);
  padding: 8px 4vw;
}

.fde {
  display: flex;
  align-items: center;
  color: var(--main-text-color);
  padding: 10px;
}

.bar .icon {
  font-size: 1.8rem;
}
.bar .title {
  font-size: 1.2rem;
  margin-left: 1rem;
}

@media screen and (max-width: 520px){
  .bar .title {
    font-size: 0;
  }
}
</style>
