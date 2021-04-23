<template>
  <component :is="serviceData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="serviceData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs v-if="serviceData" pills>
      <!-- Tab: Info Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Info Service</span>
        </template>
        <voucher-edit-tab-information :userinfo="serviceData" class="mt-2 pt-75" />
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
    const userData = ref(null);

    const SERVICES_APP_STORE_MODULE_NAME = "app-voucher";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, voucherStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-voucher/fetchService", { id: router.currentRoute.params.id })
      .then((response) => {
        serviceData.value = response.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          userData.value = undefined;
        }
      });

    return {
      serviceData,
    };
  },
};
</script>

<style>
</style>
