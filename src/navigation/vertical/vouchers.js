export default [
    {
        header: 'Manage Vouchers',
    },
    {
        title: 'Groups Voucher',
        icon: 'UserIcon',
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
]
