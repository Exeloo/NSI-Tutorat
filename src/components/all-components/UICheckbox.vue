<template>
  <label>
    <input type="checkbox">
    <div class="icon">
      <div class="shadow"></div>
      <div class="iconBox">
        <IcRoundPowerSettingsNew />
      </div>
    </div>
  </label>

</template>

<script>
export default {
  name: 'UICheckbox',
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

label {
  position: relative;
  width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

label::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 4px;
  background: var(--ui-checkbox-bar-color);
  border-radius: 4px;
}

label input {
  position: absolute;
  appearance: none;
}

.icon {
  position: absolute;
  left: 0;
  width: 60px;
  height: 100%;
  transition: 0.5s;
}

label input:checked ~ .icon {
  left: 60px;
}

.icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  background: linear-gradient(var(--ui-checkbox-icon-before-background-a), var(--ui-checkbox-icon-before-background-a), var(--ui-checkbox-icon-before-background-b));
  filter: blur(1px);
  z-index: 1;
}

.icon::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  background: var(--ui-checkbox-icon-after-background);
  filter: blur(1px);
}

.iconBox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(var(--ui-checkbox-iconbox-background-a), var(--ui-checkbox-iconbox-background-b));
  box-shadow: 5px 5px 5px rgba(0,0,0,0.1),
    15px 15px 15px rgba(0,0,0,0.1),
    20px 20px 20px rgba(0,0,0,0.1),
    30px 30px 30px rgba(0,0,0,0.1),
    inset 1px 1px 2px var(--main-background);
}

.iconBox * {
  color: var(--main-text-color);
  font-size: 1.5em;
  transition: 0.5s;
}

label input:checked ~ .icon .iconBox * {
  color: var(--ui-checkbox-icon-color-on);
  filter: drop-shadow(0 0 5px rgba(0, 255, 226, 0.39)) drop-shadow(0 0 10px rgba(0, 255, 226, 0.71));
}
</style>
