export default [
  {
    header: 'Forms & Tables',
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
        title: 'View',
        route: { name: 'apps-users-view', params: { id: 21 } },
      },
      {
        title: 'Add',
        route: { name: 'apps-users-add'},
      },
    ],
  },
]
