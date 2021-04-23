<template>
  <div>
    <!-- Filters -->
    <services-list-filters
      :type.sync="type"
      :status.sync="status"
      :type-options="typeOptions"
      :status-options="statusOptions"
    />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                      v-model="searchQuery"
                      class="d-inline-block mr-1"
                      placeholder="Search..."
              />
              <b-button
                      class="mr-1"
                      variant="primary"
                      :to="{ name: 'apps-users-add-sms' }"
              >
                <span class="text-nowrap"
                ><feather-icon icon="PlusCircleIcon"
                /></span>
              </b-button>

              <b-button
                      class="mr-1"
                      variant="primary"
                      :to="{ name: 'apps-customers-add' }"
              >
                <span class="text-nowrap"
                ><feather-icon icon="Trash2Icon"
                /></span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="Services"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: STT -->
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>

        <!-- Column: birthDate -->
        <template #cell(birthDate)="data">
          {{ convertDate(data.value) }}
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge pill :variant="resolveUserStatusVariant(data.value)" class="badge-glow">{{ checkStatus(data.value) }}</b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
<!--            <b-dropdown-item-->
<!--              :to="{-->
<!--                name: 'apps-services-view-sms',-->
<!--                params: { id: data.item._id },-->
<!--              }"-->
<!--            >-->
<!--              <feather-icon icon="FileTextIcon" />-->
<!--              <span class="align-middle ml-50">Details</span>-->
<!--            </b-dropdown-item>-->

            <b-dropdown-item
              :to="{
                name: 'apps-services-edit-sms',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="PlusCircleIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="deleteService(data.item._id)"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted"
              >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span
            >
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              :value="currentPage"
              :total-rows="totalServices"
              :per-page="perPage"
              align="right"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              last-text="Last"
              class="mt-1 mb-0"
              @input="(value) => (currentPage = value)"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import ServicesListFilters from "./ServicesListFilters.vue";
import useVoucherList from "./useServicesListSMS";
import servicesStoreModule from "../servicesStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Vue from "vue";
import {ToastPlugin} from "bootstrap-vue";

Vue.use(ToastPlugin)
const v = new Vue()

export default {
  components: {
    ServicesListFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const SERVICES_APP_STORE_MODULE_NAME = "app-services-sms";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, servicesStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    });

    const typeOptions = [
      { label: "Khách hàng thường", value: 0 },
      { label: "khách hàng thân thiết", value: 1 },
      { label: "Khách hàng tiềm năng", value: 2 },
    ];

    const statusOptions = [
      { label: "Pending", value: 0 },
      { label: "Send", value: 1 },
    ];

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const {
      Services,
      tableColumns,
      perPage,
      currentPage,
      totalServices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refServicesListTable,
      refetchData,
      deleteService,
      checkStatus,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      type,
      status,
    } = useServicesListSMS();

    return {
      Services,
      tableColumns,
      perPage,
      currentPage,
      totalServices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refServicesListTable,
      convertDate,
      refetchData,
      deleteService,
      checkStatus,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      typeOptions,
      statusOptions,

      // Extra Filters
      type,
      status,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
