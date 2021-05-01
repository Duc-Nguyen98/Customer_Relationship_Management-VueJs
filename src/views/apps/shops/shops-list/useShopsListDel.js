import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useShopsListDel() {
  // Use toast
  const toast = useToast();

  const refShopListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'stt', label: 'STT', sortable: false },
    { key: 'name', label: 'NAME', formatter: title, sortable: true },
    { key: 'telephoneShop', label: 'TELEPHONE SHOP', sortable: true },
    { key: 'mail', label: 'EMAIL', sortable: true },
    { key: 'ownerShop', label: 'Owner Shop', sortable: true },
    { key: 'region', label: 'REGION', sortable: true },
    { key: 'status', label: 'STATUS', sortable: true },
    { key: 'actions' },
  ]

  const perPage = ref(10)
  const totalShops = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const status = ref(null)
  const region = ref(null)
  const Shops = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refShopListTable.value ? refShopListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalShops.value,
    }
  })

  const refetchData = () => {
    fetchShopsDel()
  }

  watch([currentPage, perPage, searchQuery, region, status], () => {
    refetchData()
  })

  const time = ref(null);
  const isBusy = ref(null);

  const fetchShopsDel = (ctx, callback) => {
    isBusy.value = true;
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
      store
          .dispatch('app-shops/fetchShopsDel', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            region: region.value,
            status: status.value,
          })
          .then(response => {
            const { data, totalRecords } = response.data
            totalShops.value = totalRecords
            Shops.value = data
            isBusy.value = false
          })
          .catch(() => {
            toast({
              component: ToastificationContent,
              props: {
                title: 'Error fetching users list',
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

  const deleteShop = id => {
    store
      .dispatch('app-customers/deleteShopR', { _id: id })
      .then(response => {
        if (response.data.success) {
          alert("success", "Delete customer successfully.")
          fetchUsers()
        } else {
          alert("danger", "Delete customer failed.")
        }
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const restoreShop = id => {
    store
        .dispatch('app-customers/restoreShop', { _id: id })
        .then(response => {
          if (response.data.success) {
            alert("success", "Restore customer successfully.")
            fetchUsers()
          } else {
            alert("danger", "Restore customer failed.")
          }
        })
        .catch(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Error fetching users list',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        })
  }

  fetchShopsDel()
  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  const checkRegion = (key) => {
    switch (key) {
      case 0:
        return "TP.Ha Noi";
        break;
      case 1:
        return "TP.Ho Chi Minh";
        break;
      default:
        return "TP.Ha Noi";
        break;
    }
  }

  const checkStatus = stt => {
    if (stt === 0) return 'Inactive'
    if (stt === 1) return 'Active'
    return 'Inactive'
  }

  return {
    fetchShopsDel,
    deleteShop,
    restoreShop,
    Shops,
    tableColumns,
    perPage,
    currentPage,
    totalShops,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refShopListTable,

    resolveUserStatusVariant,
    refetchData,
    checkRegion,
    checkStatus,
    // Extra Filters
    time,
    isBusy,
    status,
    region,
    alert,
  }
}
