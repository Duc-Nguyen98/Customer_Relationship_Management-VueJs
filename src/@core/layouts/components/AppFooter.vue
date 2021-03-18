<template>
  <p class="clearfix mb-0">
    <b>
      <span class="float-md-left d-block d-md-inline-block mt-25">Hand-crafted &amp; Made with <b-link
        class="ml-25"
        href="#"
        target="_blank"
      >ANT </b-link> Team
        <feather-icon
          icon="HeartIcon"
          size="21"
          class="text-danger stroke-current"
        />
      </span>
    </b>
    <b>
      <span class="float-md-right d-none d-md-block">
        COPYRIGHT  © {{ new Date().getFullYear() }}
        <b-link
          class="ml-25"
          href="#"
          target="_blank"
        >CVV</b-link>
        <span class="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
    </b>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
