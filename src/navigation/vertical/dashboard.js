export default [
  {
    title: 'Dashboards',
    icon: 'HomeIcon',
    tag: '1',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Analytics',
        route: 'dashboard-analytics',
        resource: 'Dashboard',
        action: 'read',
      },
      {
        title: 'eCommerce',
        route: 'dashboard-others',
        tag: 'B',
        tagVariant: 'light-warning',
        resource: 'Dashboard',
        action: 'read',
      },
    ],
  },
]
