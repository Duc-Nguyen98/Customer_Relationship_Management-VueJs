<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs pills>
      <!-- Tab: New Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">New Account</span>
        </template>
        <user-add-tab-information class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import userStoreModule from "../userStoreModule";
import UserAddTabInformation from "./UserAddTabInformation.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserAddTabInformation,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-customers";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

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
