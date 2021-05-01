export default [
    {
        header: 'Manage Interactive',
    },
    {
        title: 'Groups Voucher',
        icon: 'BookmarkIcon',
        children: [
            {
                title: 'G-Voucher',
                route: 'apps-group-voucher-list',
            },
            {
                title: 'G-Voucher Delete',
                route: 'apps-group-voucher-list-del',
            },
            {
                title: 'Add',
                route: 'apps-group-voucher-add',
            },
        ],
    },
    {
        title: 'Shops',
        icon: 'ShoppingBagIcon',
        children: [
            {
                title: 'List Shops',
                route: 'apps-shops-list',
            },
            {
                title: 'L-Shops Delete',
                route: 'apps-shops-list-del',
            },
            {
                title: 'Add',
                route: 'apps-shops-add',
            },
        ],
    },
]
