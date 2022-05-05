<template>
  <div class="Footer">
    <div class="text">
      Sans toi j'apprends pas
    </div>
    <div class="social-networks">
      <div class="link" i="carbon-logo-instagram" @click="openUrl('https://www.instagram.com/mdl.fde/?hl=fr')" />
      <div class="link" i="carbon-logo-twitter" @click="openUrl('https://twitter.com/lycee_fde?s=20&t=bCjvzdO46ZvvhVfPJquR1A')" />
      <div class="link" i="carbon-logo-facebook" @click="openUrl('https://www.facebook.com/lycee.francoisdestaing')" />
      <div class="link" i="carbon-logo-youtube" @click="openUrl('https://www.youtube.com/channel/UC3O1XDgHnQw9PeTl5Sp8SAw')" />
      <div class="link" i="ic-baseline-tiktok" @click="openUrl('https://francoisdestaing.fr/pronote/')" />
    </div>
    <div class="other">
      <div class="link" @click="openUrl('https://francoisdestaing.fr/pronote/')">
        Pronote
      </div>
      <div>|</div>
      <div class="link" @click="openUrl('https://francoisdestaing.fr/')">
        Site du lycée
      </div>
      <div>|</div>
      <div class="link" @click="changeRoute('terms')">
        CGU
      </div>
      <div class="returnPipe">
        |
      </div>
      <div class="link" @click="changeRoute('about-us')">
        About-us
      </div>
      <div>|</div>
      <div class="link" @click="changeRoute('contact')">
        Contact
      </div>
      <div>|</div>
      <div class="link" @click="changeRoute('faq')">
        FAQ
      </div>
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
  position: absolute;
}

.text {
  text-align: center;
  font-size: 3vh;
  padding: 4vh 0;

}

.social-networks {
  display: flex;
  justify-content: space-around;
  font-size: 4vh;
  padding: 3vh 0;
}

.other {
  display: flex;
  justify-content: center;
  gap: 1vh;
  font-size: 2vh;
  justify-items: flex-end;
  padding: 3vh 0;
  flex-wrap: wrap;
}

.link {
  cursor: pointer;
}

@media screen and (max-width: 520px){
  .returnPipe {
    display: none;
  }
}

</style>
