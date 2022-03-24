<template>
  <main>
    <router-view />

  </main>
  <Footer />
</template>

<style>
main {
  display: grid;
  justify-items: center;
  margin-top: 6vw;
  width: min(90%, 600px);
  background: var(--secondary-background);
}
</style>
