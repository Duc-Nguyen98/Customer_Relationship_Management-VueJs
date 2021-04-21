<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <b-tabs pills>
      <!-- Tab: New Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">New SMS</span>
        </template>
        <services-add-tab-information class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store";
import servicesStoreModule from "../servicesStoreModule";
import ServicesAddTabInformation from "./ServicesAddTabInformation.vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    ServicesAddTabInformation,
  },
  setup() {
    const userData = ref(null);

    const SERVICE_APP_STORE_MODULE_NAME = "app-services-sms";

    // Register module
    if (!store.hasModule(SERVICE_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICE_APP_STORE_MODULE_NAME, servicesStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICE_APP_STORE_MODULE_NAME);
    });

    // store
    //   .dispatch("app-user/addUser", { })
    //   .then((response) => {
    //     userData.value = response.data;
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 404) {
    //       userData.value = undefined;
    //     }
    //   });

    return {
      userData,
    };
  },
};
</script>

<style>
</style>
