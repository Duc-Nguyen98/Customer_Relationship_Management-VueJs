export default [
    {
        header: 'Users & Customers ...',
    },
    {
        title: 'Table Customers',
        icon: 'UserIcon',
        resource: 'customers',
        action: 'manage',
        children: [
            {
                title: 'List',
                route: 'apps-customers-list',
                resource: 'customers',
                action: 'manage',
            },
            {
                title: 'List-Delete',
                route: 'apps-customers-list-del',
                resource: 'customers',
                action: 'manage',
            },
            {
                title: 'Add',
                route: 'apps-customers-add',
                resource: 'customers',
                action: 'manage',
            },
        ],
    },
    {
        title: 'Table Users',
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
        title: 'Table Services',
        icon: 'CodesandboxIcon',
        children: [
            {
                title: 'List',
                route: 'apps-services-list-sms',
            },
            {
                title: 'List Delete',
                route: 'apps-services-list-sms-del',
            },
            {
                title: 'Add',
                route: 'apps-services-add',
            },
        ],
    },

]
