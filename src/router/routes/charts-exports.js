export default [
  {
    path: '/charts-and-maps/charts/apex-chart',
    name: 'charts-apex-chart',
    component: () => import('@/views/charts-and-maps/charts/apex-chart/ApexChart.vue'),
    meta: {
      pageTitle: 'Apex Chart',
      breadcrumb: [
        {
          text: 'Extensions',
        },
        {
          text: 'Apex Chart',
          active: true,
        },
      ],
    },
  },
  {
    path: '/charts-and-maps/charts/chartjs',
    name: 'charts-chartjs',
    component: () => import('@/views/charts-and-maps/charts/chartjs/Chartjs.vue'),
    meta: {
      pageTitle: 'Chartjs',
      breadcrumb: [
        {
          text: 'Extensions',
        },
        {
          text: 'Chartjs',
          active: true,
        },
      ],
    },
  },
  {
    path: '/charts-and-maps/charts/echart',
    name: 'charts-echart',
    component: () => import('@/views/charts-and-maps/charts/echart/Echart.vue'),
    meta: {
      pageTitle: 'Echart',
      breadcrumb: [
        {
          text: 'Extensions',
        },
        {
          text: 'Echart',
          active: true,
        },
      ],
    },
  },
  {
    path: '/statistics-customer',
    name: 'statistics-customer',
    component: () => import('@/views/charts-and-maps/charts/customs/CustomersChart.vue'),
    meta: {
      pageTitle: 'Statistics customer',
      breadcrumb: [
        {
          text: 'Statistics',
        },
        {
          text: 'Customer',
          active: true,
        },
      ],
    },
  },
  {
    path: '/statistics-services',
    name: 'statistics-services',
    component: () => import('@/views/charts-and-maps/charts/customs/ServicesChart.vue'),
    meta: {
      pageTitle: 'Statistics services',
      breadcrumb: [
        {
          text: 'Statistics',
        },
        {
          text: 'Services',
          active: true,
        },
      ],
    },
  },
]
