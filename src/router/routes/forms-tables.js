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
    path: '/apps/users/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/apps/user/users-view/UsersView.vue'),
  },
  {
    path: '/apps/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/apps/user/users-edit/UsersEdit.vue'),
  },

]
