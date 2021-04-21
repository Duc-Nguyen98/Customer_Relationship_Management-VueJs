import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersListDel() {
  // Use toast
  const toast = useToast();

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'stt', label: 'STT', sortable: false },
    { key: 'name', label: 'NAME', formatter: title, sortable: true },
    { key: 'telephone', label: 'TELEPHONE', sortable: true },
    { key: 'email', label: 'EMAIL', sortable: true },
    { key: 'birthDay', label: 'BIRTHDAY', sortable: true },
    { key: 'gender', label: 'GENDER', sortable: true },
    { key: 'groups', label: 'GROUPS', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const group = ref(null)
  const gender = ref(null)
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

  watch([currentPage, perPage, searchQuery, group, gender], () => {
    refetchData()
  })

  const time = ref(null);
  const isBusy = ref(null);
  const fetchUsers = (ctx, callback) => {
    isBusy.value = true;
    if (time.value) {
      clearTimeout(time.value)
    }
    time.value = setTimeout(() => {
      store
          .dispatch('app-customers/fetchUsersDel', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sort: sortBy.value,
            gender: gender.value,
            group: group.value,
          })
          .then(response => {
            const { data, totalRecords } = response.data
            totalUsers.value = totalRecords
            Users.value = data
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

  const deleteUser = id => {
    store
      .dispatch('app-customers/deleteUserR', { _id: id })
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

  const restoreUser = id => {
    store
        .dispatch('app-customers/restoreUser', { _id: id })
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

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  const checkGroup = (key) => {
    switch (key) {
      case 0:
        return "Normal customers";
        break;
      case 1:
        return "Loyal customers";
        break;
      case 2:
        return "Potential customers";
        break;
    }
  }

  return {
    fetchUsers,
    deleteUser,
    restoreUser,
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
    resolveUserStatusVariant,
    refetchData,
    checkGroup,
    // Extra Filters
    time,
    isBusy,
    group,
    gender,
    alert,
  }
}
