<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>Filters</h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col cols="12" md="6" class="mb-md-0 mb-2">
          <label>Type Support</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="group"
            :options="groupOptions"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:group', val)"
          />
        </b-col>
        <b-col cols="12" md="6" class="mb-md-0 mb-2">
          <label>Type Services</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="gender"
            :options="genderOptions"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:gender', val)"
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
    group: {
      type: [Number, null],
      default: null,
    },
    gender: {
      type: [Number, null],
      default: null,
    },
    groupOptions: {
      type: Array,
      required: true,
    },
    genderOptions: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
