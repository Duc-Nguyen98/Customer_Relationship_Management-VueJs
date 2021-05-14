export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
    meta: {
      resource: 'customers',
      action: 'read',
    },
  },
  {
    path: '/dashboard/others',
    name: 'dashboard-others',
    component: () => import('@/views/pages/miscellaneous/ComingSoon.vue'),
    meta: {
      resource: 'customers',
      action: 'delete',
    },
  },
]
