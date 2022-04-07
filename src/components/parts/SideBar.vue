<template>
  <div class="SideBar">
    <div class="menu">
      <div class="main">
        <div class="item" @click="changeRoute('dashboard')">
          <div class="a">
            <div class="i" i="ic-baseline-computer" />
            <div>
              Dashboard
            </div>
          </div>
        </div>
        <div class="item" @click="changeRoute('planning')">
          <div class="a">
            <div class="i" i="ic-baseline-calendar-month" />
            <div>
              Planning
            </div>
          </div>
        </div>
        <div class="item">
          <div class="a sub-btn" @click="toggleSide">
            <div>
              <div class="i" i="ic-baseline-people-alt" />
              <div>
                Relations
              </div>
            </div>
            <div class="dropdown" :class="dropdownClass.relation" i="ic-baseline-keyboard-arrow-right" />
          </div>
          <div v-if="subMenu" class="sub-menu">
            <div class="sub-item" @click="changeRoute('chat')">
              <div class="a">
                <div class="i" i="ic-baseline-chat" />
                <div>
                  Chat
                </div>
              </div>
            </div>
            <div class="sub-item" @click="changeRoute('find-tutorant')">
              <div class="a">
                <div class="i" i="healthicons-magnifying-glass" />
                <div>
                  Trouver un tutorant
                </div>
              </div>
            </div>
            <div class="sub-item" @click="changeRoute('profile')">
              <div class="a">
                <div class="i" i="carbon-user" />
                <div>
                  Mon profil
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settings">
        <div class="item settings">
          <div class="a">
            <div class="i" i="ic-baseline-settings" />
            <div>
              Parametres
            </div>
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

const toggleSide = (_: any, force: boolean | undefined = undefined) => {
  if (force === undefined)
    subMenu.value = !subMenu.value

  else
    subMenu.value = force

  dropdownClass.relation.rotate = subMenu.value
  value.value = subMenu.value
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
  top: 0;
  left: 0;
  overflow-y: auto;
}

.SideBar .menu {
  width: 100%;
  height: 80%;
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.SideBar .main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.SideBar .menu .item .a:hover {
  background: var(--secondary-background);
  transition: 0.5s ease;
}

.SideBar .menu .item .a .dropdown {
  right: 0;
  margin: 20px;
  transition: 0.5s ease;
  justify-self: flex-end;
}

.SideBar .menu .item .sub-menu .a{
  padding-left: 50px;
}

.SideBar .menu .item {
  transition: 0.5s ease;
}

.sub-menu {
  background-color: var(--secondary-bar-color);
}

.rotate {
  transform: rotate(90deg);
}

.settings {
  justify-self: flex-end;
}

.sub-items {
  display: flex;
  justify-content: space-between;
}

.sub-btn {
  justify-content: space-between;
}

.sub-btn div {
  align-items: center;
  display: flex;
  gap: 1.25rem;
}
</style>
