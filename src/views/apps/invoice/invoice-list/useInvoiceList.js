import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {title} from "@core/utils/filter";

export default function useInvoicesList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'statusSend', label: 'Status send', sortable: false },
    { key: 'titleServices', label: 'TITLE', formatter: title, sortable: false },
    { key: 'receiver', label: 'Customer', sortable: false },
    { key: 'voucherCode', label: 'Voucher Code', sortable: false },
    { key: 'typeServices', label: 'TYPE', sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'dateAutomaticallySent', label: 'Created at', sortable: false },
  ]

  const perPage = ref(10)
  const totalServices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)
  const Services = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalServices.value,
    }
  })

  const refetchData = () => {
    fetchInvoices()
  }

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData()
  })

  const time = ref(null)
  const isBusy = ref(null)
  const fetchInvoices = (ctx, callback) => {
    isBusy.value = true
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
    store
      .dispatch('app-invoice/fetchInvoices', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { services, totalRecords } = response.data.data
        totalServices.value = totalRecords
        services.map((obj, index) => obj.stt = index+1)
        Services.value = services
        isBusy.value = false
        console.log(services)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching invoices' list",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
    },searchQuery.value ? 1000 : 0)
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

  const resolveServiceTypeVariant = type => {
    if (type === 0) return 'light-warning'
    if (type === 1) return 'light-success'
    if (type === 2) return 'light-primary'
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const checkType = type => {
    if (type === 0) return 'SMS'
    if (type === 1) return 'Mail'
    if (type === 2) return 'SMS & Mail'
    return 'SMS'
  }

  const resolveServiceStatusVariant = stt => {
    if (stt === 0) return { variant: 'warning', icon: 'SendIcon' }
    if (stt === 1) return { variant: 'success', icon: 'CheckCircleIcon' }
    if (stt === 2) return { variant: 'danger', icon: 'ArrowDownCircleIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Pending'
    if (stt === 1) return 'Sended'
    if (stt === 2) return 'Cancel'
    return 'Pending'
  }

  return {
    fetchInvoices,
    tableColumns,
    perPage,
    currentPage,
    totalServices,
    Services,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    checkType,
    checkStatus,
    resolveServiceStatusVariant,
    resolveServiceTypeVariant,
    statusFilter,
    isBusy,
    resolveInvoiceStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  }
}
