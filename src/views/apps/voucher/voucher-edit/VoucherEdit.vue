<template>
  <component :is="groupsData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="groupsData === undefined">
      <h4 class="alert-heading">Error fetching group voucher data</h4>
      <div class="alert-body">
        No group voucher found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-group-voucher-list' }">
          Groups voucher
        </b-link>
        for Groups.
      </div>
    </b-alert>

    <b-tabs v-if="groupsData" pills>
      <!-- Tab: Info Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Info  Groups Voucher</span>
        </template>
        <voucher-edit-tab-information :groupinfo="groupsData" class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import voucherStoreModule from "../voucherStoreModule";
import VoucherEditTabInformation from "./VoucherEditTabInformation.vue";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    VoucherEditTabInformation,
  },
  setup() {
    const groupsData = ref(null);

    const SERVICES_APP_STORE_MODULE_NAME = "app_voucher";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, voucherStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app_voucher/fetchGVoucher", { _id: router.currentRoute.params.id })
      .then((response) => {
        groupsData.value = response.data.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          groupsData.value = undefined;
        }
      });

    return {
      groupsData,
    };
  },
};
</script>

<style>
</style>
