<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
      <h4 class="alert-heading">Error fetching shop data</h4>
      <div class="alert-body">
        No shop found with this shop id. Check
        <b-link class="alert-link" :to="{ name: 'apps-shops-list' }">
          Shop List
        </b-link>
        for other shops.
      </div>
    </b-alert>

    <b-tabs pills>
      <!-- Tab: New Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">New Shop</span>
        </template>
        <shop-add-tab-information class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import shopStoreModule from "../shopStoreModule";
import ShopAddTabInformation from "./ShopAddTabInformation.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    ShopAddTabInformation,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-customers";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, shopStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    return {
      userData,
    };
  },
};
</script>

<style>
</style>
