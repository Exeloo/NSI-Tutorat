<template>
  <div class="nav">
    <div class="top-bar">
      <TopBar />
    </div>
  </div>
  <div class="body">
    <div class="side-bar">
      <SideBar v-model="isSideBarDeploy" />
    </div>
    <div class="main">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
const isSideBarDeploy = ref(false)

</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 5;
}

.side-bar {
  position: fixed;
}

.top-bar {
  flex: 100%;
}

.main {
  padding-left: 7.7vh;
  width: 100%;

}

</style>
