import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useVoucherList() {
  // Use toast
  const toast = useToast()

  const refVouchersListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'voucherCode', label: 'Voucher code', sortable: true },
    { key: 'nameCustomerUse', label: 'Customers use', sortable: true },
    { key: 'nameLocationUse', label: 'Location use', sortable: true },
    { key: 'usedDate', label: 'Used day', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'created', label: 'Created At', sortable: false },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalVouchers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const isSortDirDesc = ref(true)
  const type = ref(null)
  const status = ref(1)
  const Vouchers = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refVouchersListTable.value ? refVouchersListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalVouchers.value,
    }
  })
  const group = ref(null);

  const refetchData = (_id) => {
    group.value = _id
    fetchHisListVouchers(_id)
  }

  watch([currentPage, perPage, searchQuery, type, status], () => {
    refetchData(group.value)
  })

  const time = ref(null);
  const isBusy = ref(null);
  const fetchHisListVouchers = (_id) => {
    isBusy.value = true
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
    store
      .dispatch('app_voucher/fetchHisListVouchers', {_id: _id, queryParams: {
          q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          status: status.value,
    }})
      .then(response => {
        const { groupVoucherItems, countGroupVoucherItems } = response.data
        totalVouchers.value = countGroupVoucherItems
        Vouchers.value = groupVoucherItems
        console.log(groupVoucherItems)
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching services list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
    }, searchQuery.value ? 1000 : 0)
  }

  const alert = (variant, message) => {
    v.$toast({
      component: ToastificationContent,
      props: {
        title: "Notification",
        icon: "BellIcon",
        text: "👋 " + message,
        variant,
      },
    });
  }

  const deleteService = id => {
    store
        .dispatch('app_voucher/deleteService', {_id: id})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete services successfully.")
            fetchVouchers()
          } else {
            alert("danger", "Delete services failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching services list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserRoleVariant = role => {
    if (role === 'subscriber') return 'primary'
    if (role === 'author') return 'warning'
    if (role === 'maintainer') return 'success'
    if (role === 'editor') return 'info'
    if (role === 'admin') return 'danger'
    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role === 'subscriber') return 'UserIcon'
    if (role === 'author') return 'SettingsIcon'
    if (role === 'maintainer') return 'DatabaseIcon'
    if (role === 'editor') return 'Edit2Icon'
    if (role === 'admin') return 'ServerIcon'
    return 'UserIcon'
  }

  const resolveUserStatusVariant = stt => {
    if (stt === 0) return 'light-warning'
    if (stt === 1) return 'light-success'
    if (stt === 2) return 'light-danger'
    if (stt === 3) return 'light-info'
    return 'light-warning'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Inactive'
    if (stt === 1) return 'Active'
    if (stt === 2) return 'Active success'
    if (stt === 3) return 'Active error'
    return 'Inactive'
  }

  const resolveUserClassifiedVariant = stt => {
    if (stt === 0) return 'info'
    if (stt === 1) return 'success'
    return 'info'
  }

  const checkClassified = stt => {
    if (stt === 0) return 'Trade Voucher'
    if (stt === 1) return 'Gift Voucher'
    return 'Trade Voucher'
  }

  return {
    checkClassified,
    resolveUserClassifiedVariant,
    fetchHisListVouchers,
    deleteService,
    checkStatus,
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

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    type,
    status,
    alert,
    isBusy,
  }
}
