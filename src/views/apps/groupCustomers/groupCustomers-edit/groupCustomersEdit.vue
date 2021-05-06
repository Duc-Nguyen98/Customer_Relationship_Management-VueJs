<template>
  <component :is="shopData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="shopData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-shops-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs v-if="shopData" pills>
      <!-- Tab: Info Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Infomation Shop</span>
        </template>
        <group-customers-edit-tab-information :shop-info="shopData" class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import groupCustomersStoreModule from "../groupCustomersStoreModule";
import groupCustomersEditTabInformation from "./groupCustomersEditTabInformation.vue";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    groupCustomersEditTabInformation,
  },
  setup() {
    const shopData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-groups-customers";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, groupCustomersStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-groups-customers/fetchOneGC", { _id: router.currentRoute.params.id })
      .then((response) => {
        shopData.value = response.data.data;
        console.log(shopData.value)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          shopData.value = null;
        }
      });

    return {
      shopData,
    };
  },
};
</script>

<style>
</style>
