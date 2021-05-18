export default [
    {
        header: 'Manage Interactive',
    },
    {
        title: 'MG-Voucher',
        icon: 'BookmarkIcon',
        children: [
            {
                title: 'G-Voucher-List',
                route: 'apps-group-voucher-list',
                resource: 'groupVouchers',
                action: 'read',
            },
            {
                title: 'G-Voucher-Trash',
                route: 'apps-group-voucher-list-del',
                resource: 'groupVouchers',
                action: 'delete',
            },
            {
                title: 'G-Add',
                route: 'apps-group-voucher-add',
                resource: 'groupVouchers',
                action: 'create',
            },
        ],
    },
    {
        title: 'MG-Customers',
        icon: 'UsersIcon',
        children: [
            {
                title: 'G-Customer List',
                route: 'apps-groups-customers-list',
                resource: 'groupCustomers',
                action: 'read',
            },
            {
                title: 'G-Customer Trash',
                route: 'apps-groups-customers-list-del',
                resource: 'groupCustomers',
                action: 'delete',
            },
            {
                title: 'G-Customer Add',
                route: 'apps-groups-customers-add',
                resource: 'groupCustomers',
                action: 'create',
            },
        ],
    },
    {
        title: 'MG-Services',
        icon: 'Share2Icon',
        children: [
            {
                title: 'G-Services List',
                route: 'apps-services-list-sms',
                resource: 'services',
                action: 'read',
            },
            {
                title: 'G-Services Trash',
                route: 'apps-services-list-sms-del',
                resource: 'services',
                action: 'delete',
            },
            {
                title: 'G-Services Add',
                route: 'apps-services-add',
                resource: 'services',
                action: 'create',
            },
        ],
    },
]
