<template>
  <div>
<!--     Filters-->
    <voucher-list-filters
      :status.sync="status"
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
            md="3"
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
          <b-col cols="12" md="9">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                      v-model="searchQuery"
                      class="d-inline-block mr-1"
                      placeholder="Search..."
              />

              <!--              Start add voucher -->

              <b-button
                      class="mr-1"
                      variant="primary"
                      :to="{name: 'apps-group-voucher-add'}"
              >
                <span class="text-nowrap"
                ><feather-icon icon="PlusCircleIcon"
                /> Group voucher</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refVoucherListTable"
        class="position-relative"
        :items="Vouchers"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
        :busy="isBusy"
      >

        <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
        <template #head(selected)="scope">
          <b-form-checkbox
                  class="float-left"
                  id="cupdateheckbox-1"
                  name="checkbox-1"
                  :checked="all"
                  @change="chooseAll()"
          >
          </b-form-checkbox>
          <span class="ml-2 cursor-pointer" v-if="selected.length > 0 || all" @click="deleteSoftManyGroups"><feather-icon icon="TrashIcon" /></span>
        </template>

        <!-- Column: Delete -->
        <template #cell(selected)="data">
          <b-form-checkbox
                  :id="data.item._id"
                  :checked="all"
                  @change="chooseOne(data.item._id)"
          ></b-form-checkbox>
        </template>

        <!-- Column: STT -->
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>

        <!-- Column: Title -->
        <template #cell(title)="data">
          <b-link
                  :to="{
                name: 'apps-group-voucher-edit',
                params: { id: data.item._id },
              }"
                  class="font-weight-bold d-block text-nowrap"
          >
            {{ data.value }}
          </b-link>
          <small class="text-muted">@CS{{ data.item.idGroupVoucher }}</small>
        </template>

        <!-- Column: Note -->
        <template #cell(note)="data">
         <span v-html="data.value"></span>
        </template>

          <!-- Column: Created at -->
        <template #cell(created_at)="data">
          {{ convertDate(data.item.created.time) }}
        </template>

        <!-- Column: Created by -->
        <template #cell(created_by)="data">
          <div class="text-nowrap">
            <feather-icon
                    :icon="resolveUserRoleIcon(data.item.created.createBy)"
                    size="18"
                    class="mr-50"
                    :class="`text-${resolveUserRoleVariant(data.item.created.createBy)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.created.createBy }}</span>
          </div>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge :variant="resolveUserStatusVariant(data.value)">{{ checkStatus(data.value) }}</b-badge>
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
                name: 'apps-group-voucher-edit',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="deleteVoucherSoft(data.item._id)"
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
              :total-rows="totalVoucher"
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
    BPagination, BFormCheckbox,
  } from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import useVoucherListGroups from "./useVoucherListGroups";
import VoucherListFilters from "./VoucherListFilters";
import VoucherAddMultil from "../voucher-add/VoucherAddMultil";
import VoucherAddAuto from "../voucher-add/VoucherAddAuto";
import VoucherAddExcel from "../voucher-add/VoucherAddExcel";
import voucherStoreModule from "../voucherStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    VoucherAddMultil,
    VoucherAddAuto,
    VoucherAddExcel,
    VoucherListFilters,
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
    const SERVICES_APP_STORE_MODULE_NAME = "app_voucher";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, voucherStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    });

    const statusOptions = [
      { label: "Choose 1 status", value: null },
      { label: "Inactive", value: 0 },
      { label: "Active", value: 1 },
    ];

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const {
      Vouchers,
      tableColumns,
      perPage,
      currentPage,
      totalVoucher,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVoucherListTable,
      refetchData,
      deleteVoucherSoft,
      deleteSoftManyGroups,
      checkStatus,
        checkClassified,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
       resolveUserClassifiedVariant,

      // Extra Filters
        classified,
      status,
      isBusy,
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
    } = useVoucherListGroups();

    return {
      Vouchers,
      tableColumns,
      perPage,
      currentPage,
      totalVoucher,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refVoucherListTable,
      convertDate,
      refetchData,
      deleteVoucherSoft,
      deleteSoftManyGroups,
      checkStatus,
        checkClassified,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      resolveUserClassifiedVariant,

      statusOptions,

      // Extra Filters
      classified,
      status,
      isBusy,
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
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
