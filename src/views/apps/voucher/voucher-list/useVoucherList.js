import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

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
    { key: 'voucherCode', label: 'Voucher code', formatter: title, sortable: false },
    { key: 'classified', label: 'Classified', sortable: true },
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
  const sortBy = ref('stt')
  const isSortDirDesc = ref(false)
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

  const refetchData = (idGroup) => {
    group.value = idGroup
    fetchListVouchers(idGroup)
  }

  watch([currentPage, perPage, searchQuery, classified, status], () => {
    refetchData(group.value)
  })

  const time = ref(null)
  const isBusy = ref(null)
  const fetchListVouchers = (idGroup) => {
    isBusy.value = true
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
      store
          .dispatch('app_voucher/fetchListVouchers', {
            _id: idGroup, queryParams: {
              q: searchQuery.value,
              perPage: perPage.value,
              page: currentPage.value,
              status: status.value,
              classified: classified.value,
            }
          })
          .then(response => {
            const {groupVoucherItems, countGroupVoucherItems} = response.data
            groupVoucherItems.map((obj, index) => obj.stt = index+1)
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

  const addVouchersInGroup = (_id, vouchers) => {
    store
        .dispatch('app_voucher/addVouchersInGroup', {_id: _id, voucherCode: vouchers})
        .then(response => {
          if (response.data.success) {
            alert("success", "Add vouchers successfully.")
            fetchListVouchers(group.value)
          } else {
            alert("danger", "Add vouchers failed.")
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
    if (all.value) {
      Vouchers.value.map(obj => {
        chooseOne(obj._id)
      })
    } else {
      selected.value = []
    }
  }

  const changeStatusVouchersInGroup = (status) => {
    store
        .dispatch('app_voucher/changeStatusVouchersInGroup', {status: status, VoucherIdArray: {VoucherIdArray: selected.value}})
        .then(response => {
          if (response.data.success) {
            alert("success", "Change status vouchers successfully.")
            selected.value = []
            all.value = false
            fetchListVouchers(group.value)
          } else {
            alert("danger", "Change status vouchers failed.")
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

  const deleteVouchersInGroup = () => {
    store
        .dispatch('app_voucher/deleteVouchersInGroup', {VoucherIdArray: selected.value})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete vouchers successfully.")
            selected.value = []
            all.value = false
            fetchListVouchers(group.value)
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

  const deleteOneSoftVouchersInGroup = (_id) => {
    store
        .dispatch('app_voucher/deleteOneSoftVouchersInGroup', {_id: _id})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete vouchers successfully.")
            selected.value = []
            all.value = false
            fetchListVouchers(group.value)
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

  const deleteOneVouchersInGroup = id => {
    store
        .dispatch('app_voucher/deleteOneVouchersInGroup', {_id: id})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete voucher successfully.")
            fetchListVouchers(group.value)
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

  const deleteVouchersInAddGroup = (key) => {
      Vouchers.value = Vouchers.value.filter((obj, index) => index != key)
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
    return 'light-warning'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Unreleased'
    if (stt === 1) return 'Release'
    if (stt === 2) return 'Expired'
    return 'Unreleased'
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

  return {
    one,
    all,
    selected,
    chooseOne,
    chooseAll,
    checkClassified,
    resolveUserClassifiedVariant,
    fetchListVouchers,
    deleteVouchersInGroup,
    deleteOneVouchersInGroup,
    deleteOneSoftVouchersInGroup,
    addVouchersInGroup,
    checkStatus,
    changeStatusVouchersInGroup,
    deleteVouchersInAddGroup,
    Vouchers,
    tableColumns,
    perPage,
    currentPage,
    totalVouchers,
    dataMeta,
    perPageOptions,
    searchQuery,
    isSortDirDesc,
    sortBy,
    refVouchersListTable,

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,
    // Extra Filters
    classified,
    status,
    alert,
    isBusy,
  }
}
