<template>
  <main>
    <div class="form">
      <router-view />
    </div>
  </main>
  <Footer />
  <UICheckbox />
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
  padding-bottom: max(3vw, 10px);
  width: min(90%, 800px);
  background: var(--main-background);
  display: flex;
  justify-content: center;
  margin-bottom: 400px;
}
</style>
