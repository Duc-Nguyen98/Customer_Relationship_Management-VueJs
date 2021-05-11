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
        title: 'Group Customers',
        icon: 'UsersIcon',
        children: [
            {
                title: 'List Group',
                route: 'apps-groups-customers-list',
            },
            {
                title: 'L-Group Delete',
                route: 'apps-groups-customers-list-del',
            },
            {
                title: 'Add',
                route: 'apps-groups-customers-add',
            },
        ],
    },
    {
        title: 'Shops',
        icon: 'HomeIcon',
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
