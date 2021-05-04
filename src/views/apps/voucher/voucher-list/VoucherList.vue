<template>
  <div>
<!--     Filters-->
    <vouchers-filters v-if="_id != null"
                      :classified.sync="classified"
                      :classified-options="classifiedOptions"
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
                      v-b-modal.modal-lg
              >
                <span class="text-nowrap"
                ><feather-icon icon="PlusCircleIcon"
                /> Voucher</span>
              </b-button>

              <b-modal id="modal-lg" size="lg" title="Add Vouchers" hide-footer>
                <VoucherAddMultil :_id="idGroup" @update="dataVoucher" />
              </b-modal>

              <!--              End add voucher -->

              <b-button
                      class="mr-1"
                      variant="primary"
                      v-b-modal.modal-lg2
              >
                <span class="text-nowrap"
                ><feather-icon icon="PlusCircleIcon"
                /> Voucher Automatic</span>
              </b-button>

              <b-modal id="modal-lg2" size="lg" title="Add Vouchers Automatic" hide-footer>
                <VoucherAddAuto :_id="idGroup" @update="dataVoucher" />
              </b-modal>

            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refVouchersListTable"
        class="position-relative"
        :busy="isBusy"
        :items="Vouchers"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
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

          <span class="ml-2 cursor-pointer" v-if="selected.length > 0 || all" @click="deleteVouchersInGroup(null)"><feather-icon icon="TrashIcon" /></span>
          <v-select
                  v-if="selected.length > 0 || all"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="statusOptions"
                  :clearable="false"
                  @input="changeStatus($event)"
                  class="per-page-selector d-inline-block mx-50"
          />
        </template>

        <!-- Column: Delete -->
        <template #cell(selected)="data" v-if="idGroup">
          <b-form-checkbox
                  :id="data.item._id"
                  :checked="all"
                  @input="chooseOne(data.item._id)"
          ></b-form-checkbox>
        </template>

        <!-- Column: STT -->
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>


        <!-- Column: voucherCode -->
        <template #cell(voucherCode)="data">
          <span class="cursor-pointer">{{ data.value }} <br />
            <small class="text-muted">@GVC{{ data.item.idVoucher }}</small>
          </span>
        </template>

        <!-- Column: Classified -->
        <template #cell(classified)="data">
          <b-badge pill :variant="resolveUserClassifiedVariant(data.value)">{{ checkClassified(data.value) }}</b-badge>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge pill :variant="resolveUserStatusVariant(data.value)">{{ checkStatus(data.value) }}</b-badge>
        </template>

<!--         Column: Created by -->
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

        <!-- Column: STT -->
        <template #cell(created)="data">
          {{ convertDate(data.value.time) }}
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
                name: 'apps-voucher-edit',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="PlusCircleIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="deleteVouchersInGroup(data.item._id)"
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
              :total-rows="totalVouchers"
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
  BFormCheckbox,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, watch, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import useVoucherList from "./useVoucherList";
import VouchersFilters from "./VouchersFilters";
import VoucherAddMultil from "../voucher-add/VoucherAddMultil";
import VoucherAddAuto from "../voucher-add/VoucherAddAuto";
import VoucherAddExcel from "../voucher-add/VoucherAddExcel";
import voucherStoreModule from "../voucherStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    VouchersFilters,
    VoucherAddMultil,
    VoucherAddAuto,
    VoucherAddExcel,
    BFormCheckbox,
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
  props: {
    _id: {
      default: null
    },
    idGroup: {
      default: null
    }
  },
  setup({_id, idGroup}) {

    const SERVICES_APP_STORE_MODULE_NAME = "app_voucher";

    // Register module
    if (!store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
      store.registerModule(SERVICES_APP_STORE_MODULE_NAME, voucherStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(SERVICES_APP_STORE_MODULE_NAME))
        store.unregisterModule(SERVICES_APP_STORE_MODULE_NAME);
    })

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    }

    const classifiedOptions = [
      { label: "Choose 1 classified", value: null },
      { label: "Trade Voucher", value: 0 },
      { label: "Gift Voucher", value: 1 },
    ];

    const statusOptions = [
      { label: "Choose a status", value: null },
      { label: "Unreleased", value: 0 },
      { label: "Release", value: 1 },
      { label: "Expired", value: 2 },
    ]

    const {
      Vouchers,
      tableColumns,
      perPage,
      currentPage,
      totalVouchers,
      dataMeta,
      perPageOptions,
      searchQuery,
      isSortDirDesc,
      refVouchersListTable,
      refetchData,
      deleteVouchersInGroup,
      addVouchersInGroup,
      checkStatus,
      changeStatus,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      checkClassified,
      resolveUserClassifiedVariant,
      // Extra Filters
      classified,
      status,
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      isBusy,
    } = useVoucherList()

    if (idGroup != null) {
      refetchData(idGroup)
    }
    const dataVouchers = ref({})
    const dataVoucher = (vouchers) => {
      if (_id == null) {
        Vouchers.value = [...Vouchers.value, ...vouchers.items]
        store.commit('app_voucher/saveVouchers', vouchers)
      } else {

        const data = {
          voucherCode: vouchers.items,
          ...vouchers.vouchers,
        }
        console.log(data)
        addVouchersInGroup(_id, data)
      }
    }

    return {
      one,
      all,
      selected,
      chooseOne,
      chooseAll,
      Vouchers,
      dataVouchers,
      dataVoucher,
      addVouchersInGroup,
      tableColumns,
      perPage,
      currentPage,
      totalVouchers,
      dataMeta,
      perPageOptions,
      searchQuery,
      isSortDirDesc,
      refVouchersListTable,
      convertDate,
      refetchData,
      deleteVouchersInGroup,
      checkStatus,
      changeStatus,
      checkClassified,
      resolveUserClassifiedVariant,
      classifiedOptions,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      classified,
      status,
      statusOptions,
      isBusy,
    };
  }
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
