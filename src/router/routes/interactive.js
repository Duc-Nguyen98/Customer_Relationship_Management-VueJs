export default [

    // *===============================================---*
    // *--------- VOUCHER ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/group/voucher/list',
        name: 'apps-group-voucher-list',
        component: () => import('@/views/apps/voucher/voucher-list/VoucherListGroups.vue'),
        meta: {
            resource: 'groupVouchers',
            action: 'write',
        },
    },
    {
        path: '/apps/group/voucher/list/del',
        name: 'apps-group-voucher-list-del',
        component: () => import('@/views/apps/voucher/voucher-list/VoucherListGroupsDel.vue'),
        meta: {
            resource: 'groupVouchers',
            action: 'delete',
        },
    },
    {
        path: '/apps/group/voucher/add',
        name: 'apps-group-voucher-add',
        component: () => import('@/views/apps/voucher/voucher-add/VoucherAdd.vue'),
        meta: {
            resource: 'groupVouchers',
            action: 'create',
        },
    },
    {
        path: '/apps/group/voucher/view/:id',
        name: 'apps-group-voucher-view',
        component: () => import('@/views/apps/voucher/voucher-view/VoucherView.vue'),
        meta: {
            resource: 'groupVouchers',
            action: 'update',
        },
    },
    {
        path: '/apps/group/voucher/edit/:id',
        name: 'apps-group-voucher-edit',
        component: () => import('@/views/apps/voucher/voucher-edit/VoucherEdit.vue'),
        meta: {
            resource: 'groupVouchers',
            action: 'update',
        },
    },

    // *===============================================---*
    // *--------- GROUPS CUSTOMERS ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/groups-customers/list',
        name: 'apps-groups-customers-list',
        component: () => import('@/views/apps/groupCustomers/groupCustomers-list/groupCustomersList.vue'),
        meta: {
            resource: 'groupCustomers',
            action: 'write',
        },
    },
    {
        path: '/apps/groups-customers/list/del',
        name: 'apps-groups-customers-list-del',
        component: () => import('@/views/apps/groupCustomers/groupCustomers-list/groupCustomersListDel.vue'),
        meta: {
            resource: 'groupCustomers',
            action: 'delete',
        },
    },
    {
        path: '/apps/groups-customers/add',
        name: 'apps-groups-customers-add',
        component: () => import('@/views/apps/groupCustomers/groupCustomers-add/groupCustomersAdd.vue'),
        meta: {
            resource: 'groupCustomers',
            action: 'create',
        },
    },
    {
        path: '/apps/groups-customers/edit/:id',
        name: 'apps-groups-customers-edit',
        component: () => import('@/views/apps/groupCustomers/groupCustomers-edit/groupCustomersEdit.vue'),
        meta: {
            resource: 'groupCustomers',
            action: 'update',
        },
    },

    // *===============================================---*
    // *--------- SHOPS ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/shops/list',
        name: 'apps-shops-list',
        component: () => import('@/views/apps/shops/shops-list/ShopsList.vue'),
        meta: {
            resource: 'shops',
            action: 'write',
        },
    },
    {
        path: '/apps/shops/list/del',
        name: 'apps-shops-list-del',
        component: () => import('@/views/apps/shops/shops-list/ShopsListDel.vue'),
        meta: {
            resource: 'shops',
            action: 'delete',
        },
    },
    {
        path: '/apps/shops/add',
        name: 'apps-shops-add',
        component: () => import('@/views/apps/shops/shops-add/ShopsAdd.vue'),
        meta: {
            resource: 'shops',
            action: 'create',
        },
    },
    {
        path: '/apps/shops/edit/:id',
        name: 'apps-shops-edit',
        component: () => import('@/views/apps/shops/shops-edit/ShopsEdit.vue'),
        meta: {
            resource: 'shops',
            action: 'update',
        },
    },
]
