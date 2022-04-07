<template>
  <div class="layout">
    <div class="side-bar">
      <SideBar v-model="isSideBarDeploy" />
    </div>

    <div class="top-bar">
      <TopBar />
    </div>
  </div>
  <div class="content">
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
  {{ isSideBarDeploy }}
  <Footer />
</template>

<script setup lang="ts">
const isSideBarDeploy = ref(false)


</script>

<style scoped>
.layout {
  display: flex;
  width: 100%;
  position: fixed;
}

.top-bar {
  flex: 100%;
}

</style>

<route lang="yaml">
meta:
  layout: test
</route>
