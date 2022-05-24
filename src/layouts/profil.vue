<template>
  <nav class="nav">
    <InfoBar />
  </nav>
  <main class="main">
    <div class="info">
      <div class="side-menu">
        <button class="left-button">Informations personnelles</button>
        <button class="left-button">Informations scolaires</button>
        <button class="left-button">Mes relations</button>
        <button class="left-button">Notifications</button>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </main>
  <footer class="footer">
    <Footer />
  </footer>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  padding-top: 8vw;
  width: 100%;
}

.info {
  padding-top: max(3vw, 20px);
  padding-bottom: max(3vw, 10px);
  width: min(90%, 1000px);
  min-height: max(300px, 30vw);
  background: var(--main-background);
  display: flex;
  justify-content: center;
  margin-bottom: 29vh;
}

.side-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-width: 0 1px 1px 1px;
  height: 100%;
}

.left-button {
  padding: 3.5vh;
  height: 100%;
  border-width: 1px 0 0 0;
}

.main {
  display: flex;
}

</style>

