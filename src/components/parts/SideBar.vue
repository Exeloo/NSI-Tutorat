<template>
  <div class="SideBar">
    <div class="menu">
      <div class="item" @click="changeRoute('dashboard')">
        <div class="a">
          <div class="i" i="ic-baseline-computer" />Dashboard
        </div>
      </div>
      <div class="item" @click="changeRoute('planning')">
        <div class="a">
          <div class="i" i="ic-baseline-calendar-month" />Planning
        </div>
      </div>
      <div class="item">
        <a class="sub-btn" @click="toggleSide"><div class="i" i="ic-baseline-people-alt" />Relation<div class="dropdown" i="ic-baseline-keyboard-arrow-right" /></a>
        <div v-if="subMenu" class="sub-menu">
          <div class="sub-item" @click="changeRoute('chat')">
            <div class="a">
              <div class="i" i="ic-baseline-chat" />
              Chat
            </div>
          </div>
          <div class="sub-item" @click="changeRoute('find-tutorant')">
            <div class="a">
              <div class="i" i="healthicons-magnifying-glass" />
              Trouver un tutorant
            </div>
          </div>
          <div class="sub-item" @click="changeRoute('find-tutoré')">
            <div class="a">
              <div class="i" i="healthicons-magnifying-glass" />
              Trouver un tutoré
            </div>
          </div>
        </div>
        <div class="item">
          <div class="a">
            <div class="i" i="ic-baseline-settings" />Parametres
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter()

const subMenu = ref(false)

const changeRoute = (route: string) => {
  router.push(`/${encodeURIComponent(route)}`)
}

const toggleSide = () => {
  subMenu.value = !subMenu.value
}

</script>

<style scoped >

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
}

.SideBar {
  font-size: min(4vw, 18px);
  background-color: var(--main-bar-color);
  color: var(--secondary-text-color);
  width: 290px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.SideBar .menu {
  width: 100%;
  margin-top: 80px;
  display: inline-block;
}

.SideBar .menu .item {
  position: relative;
  cursor: pointer;

}

.SideBar .menu .item .a {
  color: var(--main-text-color);
  font-size: min(4vw, 18px);
  padding: 5px 30px;
  line-height: 60px;
  display: block;
}
.SideBar .menu .item a {
  color: var(--main-text-color);
  font-size: min(4vw, 18px);
  padding: 5px 30px;
  line-height: 60px;
  display: block;
}

.SideBar .menu .item a:hover {
  background: var(--secondary-background);
  transition: 0.5s ease;
}

.SideBar .menu .item .i {
  display: inline-block;
  margin-right: 15px;
}

.SideBar .menu .item .a:hover {
  background: var(--secondary-background);
  transition: 0.5s ease;
}

.SideBar .menu .item a .dropdown {
  display: inline-block;
  position: absolute;
  right: 0;
  margin: 20px;
  transition: 0.5s ease;
}

.SideBar .menu .item .sub-menu .a{
  padding-left: 50px;
}
</style>
