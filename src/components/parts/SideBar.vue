<script setup lang="ts">

const router = useRouter()

const changeRoute = (route: string) => {
  router.push(`/${encodeURIComponent(route)}`)
}

</script>

<template>
  <div class="SideBar">
    <div class="menu">
      <div class="item">
        <div class="item" @click="changeRoute('dashboard')">
          <div class="i" i="ic-baseline-computer" />Dashboard
        </div>
        <div class="item" @click="changeRoute('planning')">
          <div class="i" i="ic-baseline-calendar-month" />Planning
        </div>
        <div class="item" @click="changeRoute('relations')">
          <div class="i" i="ic-baseline-people-alt" />Relations
        </div>
        <div class="item" @click="changeRoute('settings')">
          <div class="i" i="ic-baseline-settings" />Parametres
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped >

</style>
