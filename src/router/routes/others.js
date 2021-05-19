export default [
  {
    path: '/permission-Control',
    name: 'access-control',
    component: () => import('@/views/extensions/acl/PermissionControl.vue'),
    meta: {
      resource: 'ACL',
      action: 'write',
    },
  },
]
