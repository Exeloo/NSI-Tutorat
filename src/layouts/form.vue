<template>
  <main>
    <div class="form">
      <router-view />
    </div>
  </main>
  <Footer />
</template>

<style>
main {
  display: flex;
  justify-content: center;
  margin-top: 8vw;
  width: 100%;
}

.form {
  padding-top: max(3vw, 10px);
  width: min(90%, 700px);
  background: var(--main-background);
  display: grid;
  justify-content: center;
}
</style>
