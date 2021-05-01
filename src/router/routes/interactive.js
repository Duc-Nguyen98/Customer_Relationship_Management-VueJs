export default [

    // *===============================================---*
    // *--------- VOUCHER ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/group/voucher/list',
        name: 'apps-group-voucher-list',
        component: () => import('@/views/apps/voucher/voucher-list/VoucherListGroups.vue'),
    },
    {
        path: '/apps/group/voucher/list/del',
        name: 'apps-group-voucher-list-del',
        component: () => import('@/views/apps/voucher/voucher-list/VoucherListGroupsDel.vue'),
    },
    {
        path: '/apps/group/voucher/add',
        name: 'apps-group-voucher-add',
        component: () => import('@/views/apps/voucher/voucher-add/VoucherAdd.vue'),
    },
    {
        path: '/apps/group/voucher/view/:id',
        name: 'apps-group-voucher-view',
        component: () => import('@/views/apps/voucher/voucher-view/VoucherView.vue'),
    },
    {
        path: '/apps/group/voucher/edit/:id',
        name: 'apps-group-voucher-edit',
        component: () => import('@/views/apps/voucher/voucher-edit/VoucherEdit.vue'),
    },

    // *===============================================---*
    // *--------- SHOPS ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/shops/list',
        name: 'apps-shops-list',
        component: () => import('@/views/apps/shops/shops-list/ShopsList.vue'),
    },
    {
        path: '/apps/shops/list/del',
        name: 'apps-shops-list-del',
        component: () => import('@/views/apps/shops/shops-list/ShopsListDel.vue'),
    },
    {
        path: '/apps/shops/add',
        name: 'apps-shops-add',
        component: () => import('@/views/apps/shops/shops-add/ShopsAdd.vue'),
    },
    {
        path: '/apps/shops/edit/:id',
        name: 'apps-shops-edit',
        component: () => import('@/views/apps/shops/shops-edit/ShopsEdit.vue'),
    },
]
