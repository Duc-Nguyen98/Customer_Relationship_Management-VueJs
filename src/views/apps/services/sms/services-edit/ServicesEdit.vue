<template>
  <component :is="serviceData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="serviceData === undefined">
      <h4 class="alert-heading">Error fetching services data</h4>
      <div class="alert-body">
        No services found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-services-list-sms' }">
          Services List
        </b-link>
        for other services.
      </div>
    </b-alert>

    <b-tabs v-if="serviceData" pills>
      <!-- Tab: Info Account -->
      <b-tab active>
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Info Service</span>
        </template>
        <services-edit-tab-information :serviceinfo="serviceData" class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import servicesStoreModule from "../servicesStoreModule";
import servicesEditTabInformation from "./ServicesEditTabInformation.vue";


export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    servicesEditTabInformation,
  },
  setup() {
    const serviceData = ref(null);

    const SERVICES_APP_STORE_MODULE_NAME = "app-services";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, servicesStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-services/fetchService", { _id: router.currentRoute.params.id })
      .then((response) => {
        serviceData.value = response.data.data
      })
      .catch((error) => {
        if (error.response.status === 404) {
          serviceData.value = undefined;
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
