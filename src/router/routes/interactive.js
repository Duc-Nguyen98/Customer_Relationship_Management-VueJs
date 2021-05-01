export default [
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
