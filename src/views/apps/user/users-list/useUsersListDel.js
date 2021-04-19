import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersListDel() {
  // Use toast
  const toast = useToast()

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [

    { key: 'stt', label: 'STT', sortable: false },
    { key: 'name', label: 'NAME', formatter: title, sortable: true },
    { key: 'telephone', label: 'TELEPHONE', sortable: true },
    { key: 'email', label: 'EMAIL', sortable: true },
    { key: 'birthDay', label: 'BIRTHDAY', sortable: true },
    { key: 'gender', label: 'GENDER', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const role = ref(null)
  const gender = ref(null)
  const active = ref(null)
  const Users = ref([])

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    }
  })

  const refetchData = () => {
    fetchUsers()
  }

  watch([currentPage, perPage, searchQuery, role, gender, active], () => {
    refetchData()
  })

  const fetchUsers = () => {
    store
      .dispatch('app-user/fetchUsersDel', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        role: role.value,
        gender: gender.value,
        active: active.value,
      })
      .then(response => {
        const { users, totalRecords } = response.data
        totalUsers.value = totalRecords
        Users.value = users
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

  const deleteUser = id => {
    store
        .dispatch('app-user/deleteUserR', { _id: id })
        .then(response => {
          if (response.data.success) {
            alert("success", "Delete user successfully.")
            fetchUsers()
          } else {
            alert("danger", "Delete user failed.")
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

  const restoreUser = id => {
    store
        .dispatch('app-user/restoreUser', { _id: id })
        .then(response => {
          if (response.data.success) {
            alert("success", "Restore user successfully.")
            fetchUsers()
          } else {
            alert("danger", "Restore user failed.")
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

  fetchUsers()
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

  return {
    fetchUsers,
    Users,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    refetchData,
    deleteUser,
    restoreUser,
    // Extra Filters
    role,
    gender,
    active,
  }
}
