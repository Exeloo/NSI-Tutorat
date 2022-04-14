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
      <div class="tiktok" i="ic-baseline-tiktok" @click="openUrl('https://francoisdestaing.fr/pronote/')"/>

    </div>
    <div class="other">
      <div @click="openUrl('https://francoisdestaing.fr/pronote/')">Pronote</div>
      <div>|</div>
      <div @click="openUrl('https://francoisdestaing.fr/')">Site du lycée</div>
      <div>|</div>
      <div @click="changeRoute('terms')">CGU</div>
      <div class="returnPipe">|</div>
      <div @click="changeRoute('about-us')">About-us</div>
      <div>|</div>
      <div @click="changeRoute('contact')">Contact</div>
      <div>|</div>
      <div @click="changeRoute('faq')">FAQ</div>
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
  min-height: 35vh;
  background-color: var(--color-dark-gray);
  color: #ffffff;

}

.text {
  text-align: center;
  font-size: 4.3vh;
  padding: 2vh 0;

}

.social-networks {
  display: flex;
  justify-content: space-around;
  font-size: 7vh;
  cursor: pointer;
  padding: 3vh 0;
}

.other {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 3vh;
  cursor: pointer;
  justify-items: flex-end;
  padding: 3vh 0;
  flex-wrap: wrap;
}

@media screen and (max-width: 520px){
  .returnPipe {
    display: none;
  }
}

</style>
