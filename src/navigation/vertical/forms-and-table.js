export default [
    {
        header: 'Users & Customers ...',
    },
    {
        title: 'Table Customers',
        icon: 'UserIcon',
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
        title: 'Table Users',
        icon: 'UserIcon',
        children: [
            {
                title: 'List',
                route: 'apps-users-list',
            },
            {
                title: 'List-Delete',
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
                title: 'List SMS',
                route: 'apps-services-list-sms',
            },
            {
                title: 'List Email',
                route: 'apps-services-list-email',
            },
            {
                title: 'Add',
                route: 'apps-services-add',
            },
        ],
    },

]
