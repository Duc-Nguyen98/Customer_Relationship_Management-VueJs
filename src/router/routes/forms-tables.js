export default [

  // *===============================================---*
  // *--------- Customers ---- ---------------------------------------*
  // *===============================================---*
  {
    path: '/apps/customers/list',
    name: 'apps-customers-list',
    component: () => import('@/views/apps/customers/users-list/UsersList.vue'),
    meta: {
      resource: 'customers',
      action: 'read',
    },
  },
  {
    path: '/apps/customers/list/del',
    name: 'apps-customers-list-del',
    component: () => import('@/views/apps/customers/users-list/UsersListDel.vue'),
    meta: {
      resource: 'customers',
      action: 'delete',
    },
  },
  {
    path: '/apps/customers/view/:id',
    name: 'apps-customers-view',
    component: () => import('@/views/apps/customers/users-view/UsersView.vue'),
    meta: {
      resource: 'customers',
      action: 'update',
    },
  },
  {
    path: '/apps/customers/add',
    name: 'apps-customers-add',
    component: () => import('@/views/apps/customers/users-add/UsersAdd.vue'),
    meta: {
      resource: 'customers',
      action: 'create',
    },
  },
  {
    path: '/apps/customers/edit/:id',
    name: 'apps-customers-edit',
    component: () => import('@/views/apps/customers/users-edit/UsersEdit.vue'),
    meta: {
      resource: 'customers',
      action: 'update',
    },
  },

  // *===============================================---*
  // *--------- USER ---- ---------------------------------------*
  // *===============================================---*

  {
    path: '/apps/users/list',
    name: 'apps-users-list',
    component: () => import('@/views/apps/user/users-list/UsersList.vue'),
    meta: {
      resource: 'users',
      action: 'read',
    },
  },
  {
    path: '/apps/users/list/del',
    name: 'apps-users-list-del',
    component: () => import('@/views/apps/user/users-list/UsersListDel.vue'),
    meta: {
      resource: 'users',
      action: 'delete',
    },
  },
  {
    path: '/apps/users/add',
    name: 'apps-users-add',
    component: () => import('@/views/apps/user/users-add/UsersAdd.vue'),
    meta: {
      resource: 'users',
      action: 'add',
    },
  },
  {
    path: '/apps/users/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/user/users-view/UsersView.vue'),
    meta: {
      resource: 'users',
      action: 'update',
    },
  },
  {
    path: '/apps/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/apps/user/users-edit/UsersEdit.vue'),
    meta: {
      resource: 'users',
      action: 'update',
    },
  },

  // *===============================================---*
  // *--------- SERVICES SMS ---- ---------------------------------------*
  // *===============================================---*

  {
    path: '/apps/services/list/sms',
    name: 'apps-services-list-sms',
    component: () => import('@/views/apps/services/sms/services-list/ServicesListSMS.vue'),
    meta: {
      resource: 'services',
      action: 'read',
    },
  },
  {
    path: '/apps/services/list/sms/del',
    name: 'apps-services-list-sms-del',
    component: () => import('@/views/apps/services/sms/services-list/ServicesListSMSDel.vue'),
    meta: {
      resource: 'services',
      action: 'delete',
    },
  },
  {
    path: '/apps/services/add',
    name: 'apps-services-add',
    component: () => import('@/views/apps/services/sms/services-add/ServicesAdd.vue'),
    meta: {
      resource: 'services',
      action: 'create',
    },
  },
  {
    path: '/apps/services/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/services/sms/services-view/ServicesView.vue'),
    meta: {
      resource: 'services',
      action: 'update',
    },
  },
  {
    path: '/apps/services/edit/:id',
    name: 'apps-services-edit',
    component: () => import('@/views/apps/services/sms/services-edit/ServicesEdit.vue'),
    meta: {
      resource: 'services',
      action: 'update',
    },
  },
]
