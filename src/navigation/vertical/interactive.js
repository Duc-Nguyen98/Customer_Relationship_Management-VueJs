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
            },
            {
                title: 'G-Voucher-Trash',
                route: 'apps-group-voucher-list-del',
            },
            {
                title: 'G-Add',
                route: 'apps-group-voucher-add',
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
            },
            {
                title: 'G-Customer Trash',
                route: 'apps-groups-customers-list-del',
            },
            {
                title: 'G-Customer Add',
                route: 'apps-groups-customers-add',
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
            },
            {
                title: 'G-Services Trash',
                route: 'apps-services-list-sms-del',
            },
            {
                title: 'G-Services Add',
                route: 'apps-services-add',
            },
        ],
    },
]
