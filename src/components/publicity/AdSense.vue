<template>
  <ins
    class="adsbygoogle"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"
    :data-ad-format="adFormat"
    :style="adStyle"
    data-full-width-responsive="true"
  />
</template>

<script>
export default {
  name: 'AdSense',
  props: {
    adClient: {
      type: String,
      required: true,
      default: 'ca-pub-6428634986742685',
    },
    adSlot: {
      type: String,
      required: true,
      default: '4765162396',
    },
    adFormat: {
      type: String,
      required: false,
      default: 'auto',
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block',
    },
  },
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  },
}
</script>

<style scoped>

</style>
