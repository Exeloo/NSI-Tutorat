<template>
  <div class="Footer">
    <div class="text">
      Sans toi j'apprends pas
    </div>
    <div class="social-networks">
      <div class="instagram" i="carbon-logo-instagram" @click="openUrl('https://www.instagram.com/mdl.fde/?hl=fr')"/>
      <div class="twitter" i="carbon-logo-twitter" @click="openUrl('https://twitter.com/lycee_fde?s=20&t=bCjvzdO46ZvvhVfPJquR1A')"/>
      <div class="facebook" i="carbon-logo-facebook" @click="openUrl('https://www.facebook.com/lycee.francoisdestaing')"/>
      <div class="youtube" i="carbon-logo-youtube" @click="openUrl('https://www.youtube.com/channel/UC3O1XDgHnQw9PeTl5Sp8SAw')"/>

    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const changeRoute = (r: string) => {
  router.push(r)
}

const openUrl = (r: string) => {
  window.open(r)
}

</script>

<style scoped>

.Footer {
  width: 100%;
  height: 250px;
  background-color: var(--color-blurple);
  color: #ffffff;
}

.text {
  text-align: center;
  font-size: 25px;

}

.social-networks {
  display: flex;
  justify-content: space-around;
  font-size: 40px;
}

</style>
