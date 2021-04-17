<template>
  <div>
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="serviceData === undefined">
      <h4 class="alert-heading">Error fetching services data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
          Services List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="serviceData">
      <!-- First Row -->
      <b-row>
        <b-col cols="12" xl="12" lg="12" md="12">
          <services-view-services-card :service-data="serviceData" />
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
import servicesStoreModule from "../servicesStoreModule";
import ServicesViewServicesCard from "./ServicesViewServicesCard.vue";

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    // Local Components
    ServicesViewServicesCard,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-services";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, servicesStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-services/fetchServices", { id: router.currentRoute.params.id })
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
