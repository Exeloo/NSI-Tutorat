<template>
  <div class="Footer">
    <div class="left">
      Sans toi j'apprends pas
    </div>
    <div class="right">
      <div class="top">
        <div i="carbon-logo-youtube" @click="openUrl('https://www.youtube.com/channel/UC3O1XDgHnQw9PeTl5Sp8SAw')" />
        <div i="carbon-logo-twitter" @click="openUrl('https://twitter.com/lycee_fde?s=20&t=bCjvzdO46ZvvhVfPJquR1A')" />
        <div i="carbon-logo-facebook" @click="openUrl('https://www.facebook.com/lycee.francoisdestaing')" />
        <div i="carbon-logo-instagram" @click="openUrl('https://www.instagram.com/mdl.fde/?hl=fr')" />
        <div i="ic-baseline-tiktok" @click="openUrl('https://www.instagram.com/mdl.fde/?hl=fr')" />
      </div>

      <div class="bottom">
        <div class="bottom-part">
          <div class="item">
            <div i="ic-outline-school" @click="openUrl('https://francoisdestaing.fr/pronote/')" />
            <div>Site du lycée</div>
          </div>
          <div class="item">
            <div i="arcticons-pronote" @click="openUrl('https://francoisdestaing.fr/pronote/')" />
            <div>Pronote</div>
          </div>
          <div class="item">
            <div i="ic-outline-info" @click="changeRoute('about-us')" />
            <div>A propos</div>
          </div>
        </div>
        <div class="bottom-part">
          <div class="item">
            <div i="ic-outline-local-post-office" @click="changeRoute('about-us')" />
            <div>Contacts</div>
          </div>
          <div class="item">
            <div i="ic-round-question-mark" @click="changeRoute('about-us')" />
            <div>FAQ</div>
          </div>
          <div class="item">
            <div i="carbon-document" @click="changeRoute('about-us')" />
            <div>CGU</div>
          </div>
        </div>
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
  height: 250px;
  background-color: var(--color-dark-gray);
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
  flex-wrap: wrap;

}

.top {
  display: flex;
  font-size: 30px;
  cursor: pointer;
  gap: 1rem;
  justify-content: center;
}

.left {
  text-align: center;
  font-size: 30px;
  font-weight: 550;
  padding-top: 40px;

}

.right {
  width: 400px;
}

.other {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  cursor: pointer;
  justify-items: flex-end;
}

.bottom {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
}

.item {
  gap: 1rem;
  display: flex;
}

</style>
