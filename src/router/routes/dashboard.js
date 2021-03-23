export default [
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/analytics/Analytics.vue'),
  },
  {
    path: '/dashboard/other',
    name: 'dashboard-ecommerce',
    component: () => import('@/views/pages/miscellaneous/ComingSoon.vue'),
  },
]
