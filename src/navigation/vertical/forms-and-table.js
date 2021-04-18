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
        route: 'apps-users-list',
        icon: 'UserIcon',
    },
    {
        title: 'Table Services',
        route: 'apps-services-list',
        icon: 'CodesandboxIcon',
    },
    // {
    //   title: 'Table Customers',
    //   icon: 'UserIcon',
    //   children: [
    //     {
    //       title: 'List',
    //       route: 'apps-users-list',
    //     },
    //     {
    //       title: 'View',
    //       route: { name: 'apps-users-view', params: { id: 21 } },
    //     },
    //     {
    //       title: 'Add',
    //       route: { name: 'apps-users-add' },
    //     },
    //   ],
    // },
]
