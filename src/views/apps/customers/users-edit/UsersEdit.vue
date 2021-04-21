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

    <b-tabs v-if="userData" pills>
      <!-- Tab: Info Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Info Account</span>
        </template>
        <user-edit-tab-information :user-info="userData" class="mt-2 pt-75" />
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
import UserEditTabInformation from "./UserEditTabInformation.vue";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserEditTabInformation,
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

    store
      .dispatch("app-customers/fetchUser", { _id: router.currentRoute.params.id })
      .then((response) => {
        userData.value = response.data.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          userData.value = undefined;
        }
      });

    return {
      userData,
    };
  },
};
</script>

<style>
</style>
