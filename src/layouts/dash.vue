<template>
  <div v-if="isSideBarDeploy" class="blackoverlay" />
  <nav class="nav">
    <div class="top-bar">
      <TopBar />
    </div>
  </nav>
  <div class="body">
    <div class="side-bar">
      <SideBar v-model="isSideBarDeploy" />
    </div>
    <div class="content" :class="{sideBarEnabled: isSideBarDeploy}">
      <main class="main">
        <router-view />
      </main>
      <footer class="footer">
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">

const isSideBarDeploy = ref(false)

</script>

<style scoped>

.side-bar {
  position: fixed;
  z-index: 999;
}

.top-bar {
  flex: 100%;
}

.content {
  padding: 0.5vh 0 0 7.8vh;
  width: 100%;
}

.sideBarEnabled {
  pointer-events: none;
}

@media screen and (max-width: 520px){
  .content {
    padding: 7.9vh 0 0 0;
    width: 100%;
  }
}

</style>
