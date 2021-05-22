<template>
  <div>
    <!-- Filters -->
    <shops-list-filters
      :status.sync="status"
      :region.sync="region"
      :status-options="statusOptions"
      :region-options="regionOptions"
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
        ref="refShopListTable"
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
         <div class="d-flex justify-center">
           <b-form-checkbox
                   class="float-left"
                   id="cupdateheckbox-1"
                   name="checkbox-1"
                   :checked="all"
                   :key="'cupdateheckbox'"
                   @change="chooseAll()"
           >
           </b-form-checkbox>
           <span class="ml-2 float-left cursor-pointer" v-if="selected.length > 0 || all" @click="deleteSoftManyShop"><feather-icon icon="TrashIcon" /></span>
         </div>
        </template>

        <!-- Column: Delete -->
        <template #cell(selected)="data">
          <b-form-checkbox
                  :id="data.item._id"
                  :key="data.item._id"
                  :checked="selected.length > 0 && all"
                  @change="chooseOne(data.item._id)"
          ></b-form-checkbox>
        </template>

        <!-- Column: User -->
        <template #cell(name)="row">
          <b-media vertical-align="center" @click="row.toggleDetails">
            <template #aside>
              <b-avatar
                size="32"
                :src="api + row.item.avatar"
                :text="avatarText(row.item.name)"
                variant="light-primary"
                :to="{
                  name: 'apps-shops-edit',
                  params: { id: row.item._id },
                }"
              />
            </template>
            <b-link
              class="font-weight-bold d-block text-nowrap"
            >
              {{ row.item.name }}
            </b-link>
            <small class="text-muted">@SA{{ row.item.idShop }}</small>
          </b-media>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Created by  : </strong>{{ row.item.created.createBy }}
              </b-col>
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Address : </strong>{{ row.item.address }}
              </b-col>
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Created at : </strong>{{ convertDate(row.item.created.time) }}
              </b-col>
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Fanpage : </strong><a :href="row.item.fanpage">{{ row.item.fanpage }}</a>
              </b-col>
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Fax : </strong>{{ row.item.fax }}
              </b-col>
              <b-col
                      md="4"
                      class="mb-1"
              >
                <strong>Note : </strong>{{ row.item.note }}
              </b-col>
            </b-row>
          </b-card>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge :variant="`light-${resolveUserStatusVariant(data.value)}`">{{ checkStatus(data.value) }}</b-badge>
        </template>

        <!-- Column: Region -->
        <template #cell(region)="data">
          <b-badge :variant="`light-${pillRegion(data.value)}`">{{ checkRegion(data.value) }}</b-badge>
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
                    v-if="canViewVerticalNavMenuLink({action: 'update', subject: 'shop'})"
              :to="{
                name: 'apps-shops-edit',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="PlusCircleIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
                    v-if="canViewVerticalNavMenuLink({action: 'delete', subject: 'shop'})"
              @click="deleteShop(data.item._id)"
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
  import { useUtils as useAclUtils } from '@core/libs/acl'
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
import ShopsListFilters from "./ShopsListFilters.vue";
import useShopsList from "./useShopsList";
import shopStoreModule from "../shopStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";

// Notification
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { useToast } from 'vue-toastification/composition'


export default {
  components: {
    ToastificationContent,
    ShopsListFilters,
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
    const USER_APP_STORE_MODULE_NAME = 'app-shops'
    const { canViewVerticalNavMenuLink } = useAclUtils()
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, shopStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    })

    const regionOptions = [
      { label: 'Choose a region', value: null },
      { label: 'TP.Ha Noi', value: 0 },
      { label: 'TP.Ho Chi Minh', value: 1 },
    ]

    const pillRegion = (region) => {
      switch (region) {
        case 0:
          return 'primary'
          break;
        case 1:
          return 'success'
          break;
      }
    }

    const statusOptions = [
      { label: "Choose a status", value: null },
      { label: "Inactive", value: 0 },
      { label: "Active", value: 1 },
    ];

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const {
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      deleteSoftManyShop,
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
      refShopListTable,
      refetchData,
      deleteShop,
      checkRegion,
      checkStatus,

      // UI
      resolveUserStatusVariant,

      // Extra Filters
      isBusy,
      status,
      region,
    } = useShopsList();

    return {
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      deleteSoftManyShop,
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
      refShopListTable,
      checkRegion,
      checkStatus,
      convertDate,
      refetchData,
      deleteShop,
      pillRegion,

      // Filter
      avatarText,

      // UI
      resolveUserStatusVariant,
      canViewVerticalNavMenuLink,
      regionOptions,
      statusOptions,

      // Extra Filters
      isBusy,
      status,
      region,
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
