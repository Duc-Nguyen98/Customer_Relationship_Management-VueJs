export default [
    {
        header: 'Users & Customers ...',
    },
    {
        title: 'M-Customers',
        icon: 'UserIcon',
        resource: 'customers',
        action: 'manage',
        children: [
            {
                title: 'List',
                route: 'apps-customers-list',
            },
            {
                title: 'List-Delete',
                route: 'apps-customers-list-del',
            },
            {
                title: 'Add',
                route: 'apps-customers-add',
            },
        ],
    },
    {
        title: 'M-Users',
        icon: 'UserIcon',
        children: [
            {
                title: 'List',
                route: 'apps-users-list',
            },
            {
                title: 'List Delete',
                route: 'apps-users-list-del',
            },
            {
                title: 'Add',
                route: 'apps-users-add',
            },
        ],
    },
    {
        title: 'M-Shops',
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
