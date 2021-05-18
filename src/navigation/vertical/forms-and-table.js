export default [
    {
        header: 'Users & Customers ...',
    },
    {
        title: 'M-Customers',
        icon: 'UserIcon',
        children: [
            {
                title: 'List',
                route: 'apps-customers-list',
                resource: 'customers',
                action: 'read',
            },
            {
                title: 'List-Delete',
                route: 'apps-customers-list-del',
                resource: 'customers',
                action: 'delete',
            },
            {
                title: 'Add',
                route: 'apps-customers-add',
                resource: 'customers',
                action: 'create',
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
                resource: 'users',
                action: 'read',
            },
            {
                title: 'List Delete',
                route: 'apps-users-list-del',
                resource: 'users',
                action: 'delete',
            },
            {
                title: 'Add',
                route: 'apps-users-add',
                resource: 'users',
                action: 'create',
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
                resource: 'shops',
                action: 'read',
            },
            {
                title: 'L-Shops Delete',
                route: 'apps-shops-list-del',
                resource: 'shops',
                action: 'delete',
            },
            {
                title: 'Add',
                route: 'apps-shops-add',
                resource: 'shops',
                action: 'create',
            },
        ],
    },
]
