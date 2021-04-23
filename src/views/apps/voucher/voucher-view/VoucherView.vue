<template>
  <div>
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="voucherData === undefined">
      <h4 class="alert-heading">Error fetching services data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-voucher-list' }">
          Services List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="voucherData">
      <!-- First Row -->
      <b-row>
        <b-col cols="12" xl="12" lg="12" md="12">
          <voucher-view-voucher-card :service-data="voucherData" />
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
import { ref, onUnmounted } from "@vue/composition-api";
import { BRow, BCol, BAlert, BLink } from "bootstrap-vue";
import voucherStoreModule from "../voucherStoreModule";
import VoucherViewVoucherCard from "./VoucherViewVoucherCard.vue";

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    // Local Components
    VoucherViewVoucherCard,
  },
  setup() {
    const voucherData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-voucher";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, voucherStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-voucher/fetchServices", { id: router.currentRoute.params.id })
      .then((response) => {
        serviceData.value = response.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          userData.value = undefined;
        }
      });

    return {
      voucherData,
    };
  },
};
</script>

<style>
</style>
