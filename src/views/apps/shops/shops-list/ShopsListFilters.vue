<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>Filters</h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col cols="12" md="6" class="mb-md-0 mb-2">
          <label>Region</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="region"
            :options="regionOptions"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:region', val)"
          />
        </b-col>
        <b-col cols="12" md="6" class="mb-md-0 mb-2">
          <label>Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="status"
            :options="statusOptions"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:status', val)"
          />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BRow, BCol } from "bootstrap-vue";
import vSelect from "vue-select";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    status: {
      type: [Number, null],
      default: null,
    },
    region: {
      type: [Number, null],
      default: null,
    },
    statusOptions: {
      type: Array,
      required: true,
    },
    regionOptions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
