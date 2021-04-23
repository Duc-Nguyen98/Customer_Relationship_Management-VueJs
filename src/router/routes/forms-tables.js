export default [

  // *===============================================---*
  // *--------- Customers ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/customers/list',
    name: 'apps-customers-list',
    component: () => import('@/views/apps/customers/users-list/UsersList.vue'),
  },
  {
    path: '/apps/customers/list/del',
    name: 'apps-customers-list-del',
    component: () => import('@/views/apps/customers/users-list/UsersListDel.vue'),
  },
  {
    path: '/apps/customers/view/:id',
    name: 'apps-customers-view',
    component: () => import('@/views/apps/customers/users-view/UsersView.vue'),
  },
  {
    path: '/apps/customers/add',
    name: 'apps-customers-add',
    component: () => import('@/views/apps/customers/users-add/UsersAdd.vue'),
  },
  {
    path: '/apps/customers/edit/:id',
    name: 'apps-customers-edit',
    component: () => import('@/views/apps/customers/users-edit/UsersEdit.vue'),
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*

  {
    path: '/apps/users/list',
    name: 'apps-users-list',
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
  },
  {
    path: '/apps/users/list/del',
    name: 'apps-users-list-del',
    component: () => import('@/views/apps/user/users-list/UsersListDel.vue'),
  },
  {
    path: '/apps/users/add',
    name: 'apps-users-add',
    component: () => import('@/views/apps/user/users-add/UsersAdd.vue'),
  },
  {
    path: '/apps/users/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/user/users-view/UsersView.vue'),
  },
  {
    path: '/apps/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/apps/user/users-edit/UsersEdit.vue'),
  },

  // *===============================================---*
  // *--------- SERVICES SMS ---- ---------------------------------------*
  // *===============================================---*

  {
    path: '/apps/services/list/sms',
    name: 'apps-services-list-sms',
    component: () => import('@/views/apps/services/sms/services-list/ServicesListSMS.vue'),
  },
  {
    path: '/apps/services/add/sms',
    name: 'apps-users-add-sms',
    component: () => import('@/views/apps/services/sms/services-add/ServicesAdd.vue'),
  },
  {
    path: '/apps/services/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/services/sms/services-view/ServicesView.vue'),
  },
  {
    path: '/apps/services/edit/:id',
    name: 'apps-services-edit',
    component: () => import('@/views/apps/services/sms/services-edit/ServicesEdit.vue'),
  },

  // *===============================================---*
  // *--------- VOUCHER ---- ---------------------------------------*
  // *===============================================---*

  {
    path: '/apps/voucher/list',
    name: 'apps-voucher-list',
    component: () => import('@/views/apps/voucher/voucher-list/VoucherList.vue'),
  },
  {
    path: '/apps/voucher/add',
    name: 'apps-voucher-add',
    component: () => import('@/views/apps/voucher/voucher-add/VoucherAdd.vue'),
  },
  {
    path: '/apps/voucher/view/:id',
    name: 'apps-voucher-view',
    component: () => import('@/views/apps/voucher/voucher-view/VoucherView.vue'),
  },
  {
    path: '/apps/voucher/edit/:id',
    name: 'apps-voucher-edit',
    component: () => import('@/views/apps/voucher/voucher-edit/VoucherEdit.vue'),
  },
]
