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
    // *--------- VOUCHER ---- ---------------------------------------*
    // *===============================================---*

    {
        path: '/apps/shop/list',
        name: 'apps-shop-list',
        component: () => import('@/views/apps/shops/shops-list/ShopsList.vue'),
    },
    {
        path: '/apps/shop/list/del',
        name: 'apps-shop-list-del',
        component: () => import('@/views/apps/shops/shops-list/ShopsListDel.vue'),
    },
    {
        path: '/apps/shop/add',
        name: 'apps-shop-add',
        component: () => import('@/views/apps/shops/shops-add/ShopsAdd.vue'),
    },
    {
        path: '/apps/shop/edit/:id',
        name: 'apps-shop-edit',
        component: () => import('@/views/apps/shops/shops-edit/ShopsEdit.vue'),
    },
]
