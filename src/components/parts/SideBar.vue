<template>
  <div class="SideBar" :class="isMenuOpen ? 'sideBarEnable' : ''">
    <div class="toggle-menu" @click="toggleSideBar">
      <div v-if="isMenuOpen" class="toggle-on toggle-btn">
        <div i="carbon-exit" />
      </div>
      <div v-else class="toggle-off toggle-btn">
        <div i="ic-round-menu" />
      </div>
    </div>
    <div class="menu" :class="isMenuOpen ? 'menuEnable' : ''">
      <div>
        <div class="item single-item" @click="changeRoute('')">
          <div class="i" i="ic-baseline-computer" />
          <div class="text">
            Dashboard
          </div>
        </div>
        <div class="item single-item" @click="changeRoute('planning')">
          <div class="i" i="ic-baseline-calendar-month" />
          <div class="text">
            Planning
          </div>
        </div>
        <div class="item">
          <div class="sub-btn" @click="toggleSubMenu">
            <div>
              <div class="i" i="ic-baseline-people-alt" />
              <div class="text">
                Relations
              </div>
            </div>
            <div class="dropdown" :class="dropdownClass.relation" i="ic-baseline-keyboard-arrow-right" />
          </div>
          <div v-if="subMenu" class="sub-menu">
            <div class="sub-item single-item" @click="changeRoute('chat')">
              <div class="i" i="ic-baseline-chat" />
              <div class="text">
                Chat
              </div>
            </div>

            <div class="sub-item single-item" @click="changeRoute('find-tutorant')">
              <div class="i" i="healthicons-magnifying-glass" />
              <div class="text">
                Trouver un tutorant
              </div>
            </div>
            <div class="sub-item single-item" @click="changeRoute('profile')">
              <div class="i" i="carbon-user" />
              <div class="text">
                Mon profil
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="item  single-item">
          <div class="i" i="ic-baseline-settings" />
          <div class="text">
            Parametres
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const router = useRouter()

const isMenuOpen = ref(false)
const sidebarClass = reactive({
  sideBarEnable: false,
})

const subMenu = ref(false)

const dropdownClass = reactive({
  relation: {
    rotate: false,
  },
})

const changeRoute = (r: string, dashboard = true) => {
  const route = dashboard ? '/dashboard/' : '/'
  router.push(route.concat(r))
}

const update = defineEmits(['update:modelValue'])

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (v: string) => {
    update('update:modelValue', v)
  },
})

const toggleSubMenu = (_: any, force: boolean | undefined = undefined) => {
  if (force === undefined)
    subMenu.value = !subMenu.value

  else
    subMenu.value = force

  dropdownClass.relation.rotate = subMenu.value
  if (subMenu.value)
    toggleSideBar(undefined, true)
}

const toggleSideBar = (_: any, force: boolean | undefined = undefined) => {
  if (force === undefined)
    isMenuOpen.value = !isMenuOpen.value

  else
    isMenuOpen.value = force
  if (!isMenuOpen.value)
    toggleSubMenu(undefined, false)
  value.value = isMenuOpen.value
  sidebarClass.sideBarEnable = isMenuOpen.value
}

</script>

<style scoped >

.SideBar {
  font-size: 2.2vh;
  background-color: var(--main-bar-color);
  color: var(--secondary-text-color);
  width: 7.7vh;
  height: 100vh;
  top: 0;
  left: 0;
  box-shadow: 0 0.3vh 1.2vh 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: 0.5s ease;
}

.sideBarEnable {
  width: 35vh;
}

.dropdown {
  margin: 2vh;
  transition: 0.5s ease;
}

.i {
  position: fixed;
}

.item {
  cursor: pointer;
  color: var(--main-text-color);
  line-height: 7vh;
  transition: 0.5s ease;
}

.menu {
  width: 100%;
  height: 70%;
  margin-top: 9vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rotate {
  transform: rotate(90deg);
}

.single-item {
  padding: 5px 2.8vh;
  display: flex;
  align-items: center;
}

.single-item:hover {
  background: var(--secondary-background);
  transition: 0.5s ease;
}

.sub-btn div {
  align-items: center;
  display: flex;
}

.sub-btn {
  padding: 5px 2.8vh;
  display: flex;
  gap: 7vh;

}

.sub-btn:hover {
  background: var(--secondary-background);
  transition: 0.5s ease;
}

.sub-item {
  padding-left: 50px;
}

.sub-menu {
  width: 100%;
  background-color: var(--secondary-bar-color);
}

.text {
  padding-left: 5vh;
}

.toggle-btn {
  padding: 10px;
}

.toggle-btn:hover {
  background-color: var(--secondary-bar-color);
  transition: 0.5s ease;
  border-radius: 50%;
}

.toggle-menu {
  width: 100%;
  color: var(--main-text-color);
  margin-top: 9vh;
  font-size: 3.5vh;
  display: flex;
  flex-direction: column;
}

.toggle-off {
  align-self: center;
}

.toggle-on {
  margin-right: 2.2vh;
  align-self: flex-end;
}

@media screen and (max-width: 520px){
  .SideBar {
    background-color: transparent;
    box-shadow: none;
  }

  .sideBarEnable {
    background-color: var(--main-bar-color);
    box-shadow: 0 0.3vh 1.2vh 0 rgba(0, 0, 0, 0.4);
  }

  .menu {
    display: none;
  }

  .menuEnable {
    display: flex;
  }

  .toggle-menu {
    margin-top: 6vh;
  }

}

</style>
