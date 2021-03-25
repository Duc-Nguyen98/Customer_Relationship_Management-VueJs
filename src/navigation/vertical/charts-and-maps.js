export default [
  {
    header: 'Charts & Exports',
  },
  {
    title: 'Charts',
    icon: 'PieChartIcon',
    tag: '3',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Users',
        children: [
          {
            title: 'Data Chart',
            route: 'charts-apex-chart232',
          },
          {
            title: 'Data Export',
            route: 'charts-echart233',
          },
        ],
      },
      {
        title: 'Customers',
        children: [
          {
            title: 'Data Chart',
            route: 'charts-apex-chart23',
          },
          {
            title: 'Data Export',
            route: 'charts-echart23',
          },
        ],
      },
      {
        title: 'Transactions',
        children: [
          {
            title: 'Data Chart',
            route: 'charts-apex-chart23',
          },
          {
            title: 'Data Export',
            route: 'charts-echart23',
          },
        ],
      },
    ],
  },
]
