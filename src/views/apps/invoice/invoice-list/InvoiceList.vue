<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>
        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <v-select
              v-model="statusFilter"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              class="invoice-filter-select"
              placeholder="Select Status"
            >
              <template #selected-option="{ label }">
                <span class="text-truncate overflow-hidden">
                  {{ label }}
                </span>
              </template>
            </v-select>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="Services"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
      :busy="isBusy"
    >

      <!-- Column: Status -->
      <template #cell(statusSend)="data">
        <b-avatar
                :id="`invoice-row-${data.item._id}`"
                size="32"
                :variant="`light-${resolveServiceStatusVariant(data.value).variant}`"
        >
          <feather-icon
                  :icon="resolveServiceStatusVariant(data.value).icon"
                  size="18"
          />
        </b-avatar>
        <b-tooltip
                :target="`invoice-row-${data.item._id}`"
                placement="top"
        >
          <p class="mb-0">
            Created by: {{ data.item.details.createBy }}
          </p>
          <p class="mb-0">
            Balance: {{ data.item.price ? data.item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : '0 VND' }}
          </p>
          <p class="mb-0">
            Due Date: {{ convertDate(data.item.dateAutomaticallySent) }}
          </p>
        </b-tooltip>
      </template>

      <!-- Column: Title -->
      <template #cell(titleServices)="data">
        <b-media>
          <b-link class="font-weight-bold d-block text-nowrap" >
            {{ data.value }}
          </b-link>
          <small class="text-muted" v-if="data.item.idServices">@ISC{{ data.item.idServices }}</small>
        </b-media>
      </template>

      <!-- Column: Receiver -->
      <template #cell(receiver)="data">
        <b-media>
          <b-link class="font-weight-bold d-block text-nowrap">
            {{ data.item.nameCustomer }}
          </b-link>
          <small class="text-muted"> @CS{{ data.item.idCustomer }}</small>
        </b-media>
      </template>

      <!-- Column: Type -->
      <template #cell(typeServices)="data">
        <b-badge :variant="resolveServiceTypeVariant(data.value)">{{ checkType(data.value) }}</b-badge>
      </template>

      <!-- Column: Status -->
      <template #cell(status)="data">
        <b-badge :variant="'light-'+resolveServiceStatusVariant(data.item.statusSend).variant">{{ checkStatus(data.item.statusSend) }}</b-badge>
      </template>

      <!-- Column: birthDate -->
      <template #cell(dateAutomaticallySent)="data">
        {{ convertDate(data.value) }}
      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalServices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import useInvoicesList from './useInvoiceList'

import invoiceStoreModule from '../invoiceStoreModule'
import moment from "moment";

export default {
  components: {
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
    BTooltip,

    vSelect,
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME)) store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME)
    })

    const statusOptions = [
      'Downloaded',
      'Draft',
      'Paid',
      'Partial Payment',
      'Past Due',
    ]

    const {
      Services,
      totalServices,
      tableColumns,
      perPage,
      currentPage,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      isBusy,
      statusFilter,
      checkType,
      checkStatus,
      resolveServiceStatusVariant,
      resolveServiceTypeVariant,
      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = useInvoicesList()

    const convertDate = (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm')
    }

    return {
      Services,
      totalServices,
      tableColumns,
      perPage,
      currentPage,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      isBusy,
      statusFilter,
      checkType,
      checkStatus,
      resolveServiceStatusVariant,
      resolveServiceTypeVariant,
      refetchData,

      statusOptions,
      convertDate,
      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
