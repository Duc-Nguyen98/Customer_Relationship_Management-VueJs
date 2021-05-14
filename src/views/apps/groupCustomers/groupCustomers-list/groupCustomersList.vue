<template>
  <div>
    <!-- Filters -->
    <group-customers-list-filters
      :status.sync="status"
      :star.sync="star"
      :status-options="statusOptions"
      :star-options="starOptions"
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
                      :to="{ name: 'apps-shops-add' }"
              >
                <span class="text-nowrap"
                ><feather-icon icon="PlusCircleIcon"
                /></span>
              </b-button>
              <b-button
                      variant="primary"
                      :to="{ name: 'apps-shops-list-del' }"
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
        ref="refGcListTable"
        class="position-relative scrollbar"
        :items="Shops"
        responsive
        :fields="tableColumns"
        primary-key="stt"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        :busy="isBusy"
        hover
      >
        <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
        <template #head(selected)="scope">
          <b-form-checkbox
                  class="float-left"
                  id="cupdateheckbox-1"
                  name="checkbox-1"
                  @input="chooseAll()"
          >
          </b-form-checkbox>
          <span class="ml-2 cursor-pointer" v-if="selected.length > 0 || all" @click="deleteSoftManyGroupsCustomer"><feather-icon icon="TrashIcon" /></span>
        </template>

        <!-- Column: Delete -->
        <template #cell(selected)="data">
          <b-form-checkbox
                  :id="data.item._id"
                  :checked="all"
                  @change="chooseOne(data.item._id)"
          ></b-form-checkbox>
        </template>

        <!-- Column: User -->
        <template #cell(name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="api + data.item.avatar"
                :text="avatarText(data.item.name)"
                variant="light-primary"
                :to="{
                  name: 'apps-shops-edit',
                  params: { id: data.item._id },
                }"
              />
            </template>
            <b-link
              :to="{
                name: 'apps-shops-edit',
                params: { id: data.item._id },
              }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
            <small class="text-muted">@SA{{ data.item.idShop }}</small>
          </b-media>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge :variant="resolveUserStatusVariant(data.value)">{{ checkStatus(data.value) }}</b-badge>
        </template>

        <!-- Column: Star -->
        <template #cell(star)="data">
          <b-badge :variant="`light-${pillStar(data.value)}`">
            <feather-icon
                  icon="StarIcon"
                  size="16"
                  :class="`text-${pillStar(data.value)}`"
            />
          </b-badge>
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

            <b-dropdown-item
              :to="{
                name: 'apps-groups-customers-edit',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="PlusCircleIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="deleteGroupsCustomer(data.item._id)"
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
              :total-rows="totalShops"
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
  BFormCheckbox,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import groupCustomersListFilters from "./groupCustomersListFilters.vue";
import useGroupCustomersList from "./useGroupCustomersList";
import groupCustomersStoreModule from "../groupCustomersStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";

// Notification
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { useToast } from 'vue-toastification/composition'


export default {
  components: {
    ToastificationContent,
    groupCustomersListFilters,
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
    BFormCheckbox,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {

    const toast = useToast()

    const api = process.env.VUE_APP_ROOT_API
    const USER_APP_STORE_MODULE_NAME = 'app-groups-customers'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, groupCustomersStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const starOptions = [
      { label: 'Choose a star', value: null },
      { label: 'No Star', value: 0 },
      { label: 'Star', value: 1 },
    ]

    const pillStar = (star) => {
      switch (star) {
        case 0:
          return 'success'
          break;
        case 1:
          return 'warning'
          break;
      }
    }

    const statusOptions = [
      { label: 'Choose a status', value: null },
      { label: 'Inactive', value: 0 },
      { label: 'Active', value: 1 },
    ]

    const convertDate = (date) => {
      return moment(date).format('DD-MM-YYYY')
    }

    const {
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      deleteSoftManyGroupsCustomer,
      Shops,
      tableColumns,
      perPage,
      currentPage,
      totalShops,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refGcListTable,
      refetchData,
      deleteGroupsCustomer,
      checkStatus,

      // UI
      resolveUserStatusVariant,

      // Extra Filters
      isBusy,
      status,
      star,
    } = useGroupCustomersList();

    return {
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      deleteSoftManyGroupsCustomer,
      api,
      toast,
      Shops,
      tableColumns,
      perPage,
      currentPage,
      totalShops,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refGcListTable,
      checkStatus,
      convertDate,
      refetchData,
      deleteGroupsCustomer,
      pillStar,

      // Filter
      avatarText,

      // UI
      resolveUserStatusVariant,

      starOptions,
      statusOptions,

      // Extra Filters
      isBusy,
      status,
      star,
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
