import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useVoucherDel() {
  // Use toast
  const toast = useToast()

  const refVouchersListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'selected', label: 'All', class: 'all'},
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'voucherCode', label: 'Voucher code', formatter: title, sortable: false },
    { key: 'status', label: 'Status', sortable: false },
    { key: 'created', label: 'Created At', sortable: false },
    { key: 'created_by', label: 'Created By', sortable: false },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalVouchers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const isSortDirDesc = ref(true)
  const type = ref(null)
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

  const refetchData = (idGroup) => {
    group.value = idGroup
    fetchListVouchers(idGroup)
  }

  watch([currentPage, perPage, searchQuery, type, status], () => {
    refetchData(group.value)
  })

  const time = ref(null);
  const isBusy = ref(null);
  const fetchListVouchersTrash = (idGroup) => {
    isBusy.value = true
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
      store
          .dispatch('app_voucher/fetchListVouchersTrash', {
            _id: idGroup, queryParams: {
              q: searchQuery.value,
              perPage: perPage.value,
              page: currentPage.value,
              status: status.value,
            }
          })
          .then(response => {
            const {groupVoucherItems, countGroupVoucherItems} = response.data
            totalVouchers.value = countGroupVoucherItems
            Vouchers.value = groupVoucherItems
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

  const selected = ref([])
  const one = ref(false)
  const all = ref(false)

  const deleteVouchersInGroup = (_id) => {
    selected.value.push(_id)
    store
        .dispatch('app_voucher/deleteVouchersInGroup', {VoucherIdArray: selected.value})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete vouchers successfully.")
            fetchListVouchersTrash(group.value)
          } else {
            alert("danger", "Delete vouchers failed.")
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

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserStatusVariant = stt => {
    if (stt === 0) return 'light-warning'
    if (stt === 1) return 'light-success'
    if (stt === 2) return 'light-danger'
    return 'light-warning'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Unreleased'
    if (stt === 1) return 'Release'
    if (stt === 2) return 'Expired'
    return 'Unreleased'
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
    one,
    all,
    selected,
    chooseOne,
    chooseAll,
    checkClassified,
    resolveUserClassifiedVariant,
    fetchListVouchersTrash,
    deleteVouchersInGroup,
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

    resolveUserStatusVariant,
    refetchData,
    // Extra Filters
    type,
    status,
    alert,
    isBusy,
  }
}
