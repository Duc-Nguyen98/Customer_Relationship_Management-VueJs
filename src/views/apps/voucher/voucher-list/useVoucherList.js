import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useVoucherList() {
  // Use toast
  const toast = useToast()

  const refServicesListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'title', label: 'TITLE', formatter: title, sortable: false },
    { key: 'type', label: 'TYPE', sortable: true },
    { key: 'name', label: 'NAME', sortable: false },
    { key: 'telephone', label: 'TELEPHONE', sortable: false },
    { key: 'status', label: 'STATUS', sortable: false },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalServices = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const type = ref(null)
  const status = ref(null)
  const Services = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refServicesListTable.value ? refServicesListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalServices.value,
    }
  })

  const refetchData = () => {
    fetchVouchers()
  }

  watch([currentPage, perPage, searchQuery, type, status], () => {
    refetchData()
  })

  const fetchVouchers = (ctx, callback) => {
    store
      .dispatch('app-voucher/fetchVouchers', {type: 'sms', queryParams: {
      q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sort: sortBy.value,
          type: type.value,
          status: status.value,
    }})
      .then(response => {
        const { users, totalRecords } = response.data
        totalServices.value = totalRecords
        Services.value = users
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
        .dispatch('app-voucher/deleteService', {_id: id})
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
    if (stt === 0) return 'warning'
    if (stt === 1) return 'success'
    return 'primary'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Pending'
    if (stt === 1) return 'Send'
    return 'primary'
  }

  return {
    fetchVouchers,
    deleteService,
    checkStatus,
    Services,
    tableColumns,
    perPage,
    currentPage,
    totalServices,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refServicesListTable,

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    type,
    status,
    alert,
  }
}
