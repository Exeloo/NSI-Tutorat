<template>
  <div class="search-box" :class="searchBoxClass">
    <input v-model="inputValue" type="text" placeholder="Search" required @input="onInputChange">
    <IcRoundSearch class="icon-search" />
  </div>
</template>

<script setup lang="ts">
const searchBoxClass = ref({
  emptyInput: true,
})
let timeout: NodeJS.Timeout
const inputValue = ref()
const onInputChange = () => {
  if (!searchBoxClass.value.emptyInput) {
    if (inputValue.value === '') {
      timeout = setTimeout(() => {
        searchBoxClass.value.emptyInput = true
      }, 5000)
      return
    }
    clearTimeout(timeout)
    return
  }
  if (inputValue.value !== '')
    searchBoxClass.value.emptyInput = false
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: consolas;
}

.search-box {
  position: relative;
  width: 30vw;
  height: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.75s;
  overflow: hidden;
  color: var(--main-text-color);
}

.search-box:hover {
  width: 40vw;
}

.search-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0.3vw;
  height: 100%;
  background: linear-gradient(var(--searchbox-searchbox-before-background-a), var(--searchbox-searchbox-before-background-a), var(--searchbox-searchbox-before-background-b));
  filter: blur(1px);
  z-index: 1;
}

.search-box::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0.3vw;
  height: 100%;
  background: var(--searchbox-searchbox-after-background);
  filter: blur(1px);
}

.emptyInput {
  width: 3vw;
  color: transparent;
}

.search-box input {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 1vw 3vw 1vw 1.5vw;
  outline: none;
  font-size: 1vw;
  background: linear-gradient(var(--searchbox-searchbox-background-a), var(--searchbox-searchbox-background-b));
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1),
  15px 15px 15px rgba(0,0,0,0.1),
  20px 20px 20px rgba(0,0,0,0.1),
  30px 30px 30px rgba(0,0,0,0.1),
  inset 1px 1px 2px var(--main-background);
}

.search-box:hover input,
.search-box:hover input::placeholder {
  color: var(--main-text-color);
}

.icon-search {
  position: absolute;
  right: 0.7vw;
  color: var(--main-text-color);
  font-size: 1.3vw;
  cursor: pointer;
}

</style>
