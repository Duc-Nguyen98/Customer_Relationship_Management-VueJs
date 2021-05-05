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
    { key: 'selected', label: 'All', class: 'all'},
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'voucherCode', label: 'Voucher code', sortable: true },
    { key: 'classified', label: 'Classified', sortable: true },
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
  const classified = ref(null)
  const status = ref(null)
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

  watch([currentPage, perPage, searchQuery, classified, status], () => {
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
          classified: classified.value
    }})
      .then(response => {
        const { groupVoucherItems, countGroupVoucherItems } = response.data
        totalVouchers.value = countGroupVoucherItems
        Vouchers.value = groupVoucherItems
        isBusy.value = false
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching voucher list',
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

  const deleteOneSoftVouchersInGroup = id => {
    store
        .dispatch('app_voucher/deleteOneSoftVouchersInGroup', {_id: id})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete voucher successfully.")
            fetchHisListVouchers(group.value)
          } else {
            alert("danger", "Delete voucher failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching voucher list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserStatusVariant = stt => {
    if (stt === 3) return 'light-warning'
    if (stt === 4) return 'light-success'
    if (stt === 5) return 'light-danger'
    return 'light-warning'
  }

  const checkStatus = stt => {
    if (stt === 3) return 'Applying'
    if (stt === 4) return 'Apply Success'
    if (stt === 5) return 'Apply Error'
    return 'Applying'
  }

  const resolveUserClassifiedVariant = stt => {
    if (stt === 0) return 'light-info'
    if (stt === 1) return 'light-success'
    return 'light-info'
  }

  const checkClassified = stt => {
    if (stt === 0) return 'Trade Voucher'
    if (stt === 1) return 'Gift Voucher'
    return 'Trade Voucher'
  }

  const selected = ref([])
  const one = ref(false)
  const all = ref(false)

  const deleteSoftVouchersInGroup = () => {
    store
        .dispatch('app_voucher/deleteSoftVouchersInGroup', {VoucherIdArray: selected.value})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete vouchers successfully.")
            selected.value = []
            all.value = !all.value
            fetchHisListVouchers(group.value)
          } else {
            alert("danger", "Delete vouchers failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching vouchers list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
  }

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

  return {
    checkClassified,
    resolveUserClassifiedVariant,
    fetchHisListVouchers,
    deleteOneSoftVouchersInGroup,
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
    deleteSoftVouchersInGroup,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    classified,
    status,
    alert,
    isBusy,
    one,
    all,
    selected,
    chooseOne,
    chooseAll,
  }
}
