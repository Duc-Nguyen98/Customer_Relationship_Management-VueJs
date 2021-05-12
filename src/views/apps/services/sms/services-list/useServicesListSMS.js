import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useServicesListSMS() {
  // Use toast
  const toast = useToast()

  const refServicesListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'selected', label: 'All', class: 'all'},
    { key: 'stt', label: 'STT', sortable: true },
    { key: 'titleServices', label: 'TITLE', formatter: title, sortable: false },
    { key: 'receiver', label: 'Customer', sortable: false },
    { key: 'voucherCode', label: 'Voucher Code', sortable: false },
    { key: 'typeServices', label: 'TYPE', sortable: false },
    { key: 'statusSend', label: 'Status', sortable: false },
    { key: 'dateAutomaticallySent', label: 'Date Auto Sent', sortable: false },
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
    fetchServices()
  }

  watch([currentPage, perPage, searchQuery, type, status], () => {
    refetchData()
  })

  const fetchServices = (ctx, callback) => {
    store
      .dispatch('app-services-sms/fetchServices', {type: 'sms', queryParams: {
      q: searchQuery.value,
          perPage: perPage.value,
          page: currentPage.value,
          sort: sortBy.value,
          type: type.value,
          status: status.value,
    }})
      .then(response => {
        const { services, totalRecords } = response.data
        totalServices.value = totalRecords
        Services.value = services
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

  const deleteSoftService = id => {
    store
        .dispatch('app-services-sms/deleteSoftService', {_id: id})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete soft service successfully.")
            fetchServices()
          } else {
            alert("danger", "Delete soft service failed.")
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

  fetchServices()
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

  const resolveServiceTypeVariant = type => {
    if (type === 0) return 'warning'
    if (type === 1) return 'success'
    if (type === 2) return 'primary'
    return 'primary'
  }

  const checkType = type => {
    console.log(type)
    if (type === 0) return 'SMS'
    if (type === 1) return 'Mail'
    if (type === 2) return 'SMS & Mail'
    return 'SMS'
  }

  const resolveStatusTypeVariant = stt => {
    if (stt === 0) return 'warning'
    if (stt === 1) return 'success'
    return 'warning'
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Pending'
    if (stt === 1) return 'Sended'
    return 'Pending'
  }

  const selected = ref([])
  const one = ref(false)
  const all = ref(false)

  const chooseOne = (event, item) => {
    one.value = !one.value;
    if (selected.value.indexOf(item) != -1) {
      selected.value = selected.value.filter(val => val != item)
    } else {
      selected.value.push(item)
    }
  }

  const chooseAll = () => {
    all.value = !all.value
    Services.value.map(obj => {
      chooseOne(obj._id)
    })
  }

  const deleteSoftManyServices = () => {
    store
        .dispatch('app-services-sms/deleteSoftManyServices', {ServicesIdArray: selected.value})
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete customers successfully.")
            selected.value = []
            all.value = false
            fetchServices()
          } else {
            alert("danger", "Delete customers failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching customers list',
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
    deleteSoftManyServices,
    fetchServices,
    deleteSoftService,
    checkType,
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
    resolveServiceTypeVariant,
    resolveStatusTypeVariant,
    refetchData,

    // Extra Filters
    type,
    status,
    alert,
  }
}
