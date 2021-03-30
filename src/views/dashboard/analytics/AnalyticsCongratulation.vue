<template>
  <b-card v-if="data" text-variant="center" class="card card-congratulations">
    <!-- images -->
    <b-img
      :src="require('@/assets/images/elements/decore-left.png')"
      class="congratulations-img-left"
    />
    <b-img
      :src="require('@/assets/images/elements/decore-right.png')"
      class="congratulations-img-right"
    />
    <!--/ images -->

    <b-avatar variant="primary" size="70" class="shadow mb-2">
      <feather-icon size="28" icon="UserIcon" />
    </b-avatar>
    <h1 class="mb-1 mt-50 text-white">Hello {{ data.name }},</h1>
    <b-card-text class="m-auto w-75">
      Welcome to the <strong>Management System</strong> of <strong>CRM</strong>.
      Designed and built by the <strong>ANT - CVV team</strong>
    </b-card-text>
  </b-card>
</template>

<script>
import { BCard, BImg, BAvatar, BCardText } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BAvatar,
    BImg,
    BCardText,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
