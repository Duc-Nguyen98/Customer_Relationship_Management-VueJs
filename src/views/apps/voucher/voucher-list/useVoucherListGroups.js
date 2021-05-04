import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useVoucherListGroups() {
  // Use toast
  const toast = useToast()

  const refVoucherListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'selected', label: 'All', class: 'all'},
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'title', label: 'Name Group', formatter: title, sortable: true },
    { key: 'note', label: 'Note', sortable: true },
    { key: 'status', label: 'Status Voucher', sortable: true },
    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'created_by', label: 'Created By', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalVoucher = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const classified = ref(null)
  const status = ref(null)
  const Vouchers = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refVoucherListTable.value ? refVoucherListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalVoucher.value,
    }
  })

  const refetchData = () => {
    fetchVouchers()
  }

  watch([currentPage, perPage, searchQuery, classified, status], () => {
    refetchData()
  })

  const time = ref(null);
  const isBusy = ref(null);
  const fetchVouchers = (ctx, callback) => {
    isBusy.value = true
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
      store
          .dispatch('app_voucher/fetchVouchers', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            classified: classified.value,
            status: status.value,
          })
          .then(response => {
            const {groupVouchers, countGroupVoucher} = response.data
            Vouchers.value = groupVouchers
            totalVoucher.value = countGroupVoucher
            isBusy.value = false
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
    toast({
      component: ToastificationContent,
      props: {
        title: "Notification",
        icon: "BellIcon",
        text: "👋 " + message,
        variant,
      },
    });
  }

  const deleteVoucherSoft = id => {
    store
        .dispatch('app_voucher/deleteVoucherSoft', {_id: id})
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

  fetchVouchers()
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
    if (stt === 0) return 'primary'
    if (stt === 1) return 'success'
    return 'primary'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Inactive'
    if (stt === 1) return 'Active'
    return 'primary'
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

  const selected = ref([])
  const one = ref(false)
  const all = ref(false)

  const chooseOne = (item) => {
    one.value = !one.value;
    if (selected.value.indexOf(item) != -1) {
      selected.value = selected.value.filter(val => val != item)
    } else {
      selected.value.push(item)
    }
  }

  const chooseAll = () => {
    all.value = !all.value
    Vouchers.value.map(obj => {
      chooseOne(obj._id)
    })
  }

  const deleteSoftManyGroups = () => {
    store
        .dispatch('app_voucher/deleteSoftManyGroups', {GroupIdArray: selected.value})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete group vouchers successfully.")
            selected.value = []
            fetchVouchers()
          } else {
            alert("danger", "Delete group vouchers failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching group vouchers list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
  }

  return {
    one,
    all,
    selected,
    chooseOne,
    chooseAll,
    fetchVouchers,
    deleteVoucherSoft,
    deleteSoftManyGroups,
    checkStatus,
    checkClassified,
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

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,
    resolveUserClassifiedVariant,
    // Extra Filters
    classified,
    status,
    alert,
    isBusy,
  }
}
