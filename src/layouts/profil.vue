<template>
  <nav class="nav">
    <InfoBar />
  </nav>
  <main class="main">
    <div class="info">
      <div class="side-menu">
        <div class="title">
          Profile
        </div>
        <button class="left-button">
          Informations personnelles
        </button>
        <button class="left-button">
          Informations scolaires
        </button>
        <button class="left-button">
          Mes relations
        </button>
        <button class="left-button">
          Notifications
        </button>
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
  padding: max(3vw, 20px) 40px;
  width: min(90%, 1000px);
  min-height: max(300px, 30vw);
  background: var(--main-background);
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 29vh;
}

.side-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-width: 0 1px 0 0;
  border-color: #808080;
}

.left-button {
  padding: 15px 30px;
}

.main {
  display: flex;
}

.title {
  margin-bottom: 20px;
  margin-left: 20px;
}

</style>
