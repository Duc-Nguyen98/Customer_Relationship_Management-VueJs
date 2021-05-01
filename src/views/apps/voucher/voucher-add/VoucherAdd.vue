<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <b-tabs pills>
      <!-- Tab: New Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">New Group Voucher</span>
        </template>
        <form-wizard-vertical class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store";
import voucherStoreModule from "../voucherStoreModule";
import FormWizardVertical from './FormWizardVertical.vue'
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    FormWizardVertical,
  },
  setup() {
    const userData = ref(null);

    const SERVICE_APP_STORE_MODULE_NAME = "app_voucher";

    // Register module
    if (!store.hasModule(SERVICE_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICE_APP_STORE_MODULE_NAME, voucherStoreModule);

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

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

