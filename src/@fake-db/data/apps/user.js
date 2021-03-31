import mock from '@/@fake-db/mock'
import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
const data = {
  users: [
    {
      C_ID: 1,
      C_Name: 'DucND',
      C_Adress: 'Hà Nội',
      C_Email: 'mphobao@gmail.com',
      C_DoB: '22/03/19992',
      C_Phone: '0336181809',
      C_CreatedDate: '',
      C_CreatedBy: 'admin',
      C_ModifyBy: '',
      C_ModifyDate: '',
      C_Note: 'chú thích',
      C_ProvinceID: 10,
      C_ProvinceName: 'Hà Nội',
      C_DistrictID: 10,
      C_DistrictName: 'Hoàng Mai',
      C_WardID: 10,
      C_WardName: 'Thanh Trì',
      C_ServicesList: [
        {
          S_ServicesID: 11,
          S_ServicesType: 20,
          S_ServicesName: 'Cuộc gọi',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 0,
          S_ServicesMoney: 0,
        },
        {
          S_ServicesID: 10,
          S_ServicesType: 20,
          S_ServicesName: 'Đơn hàng',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 100,
          S_ServicesMoney: 100000000,
        },
      ],
    },
    {
      C_ID: 2,
      C_Name: 'AnhTu',
      C_Adress: 'Hà Nội',
      C_Email: 'mphobao@gmail.com',
      C_DoB: '22/03/19992',
      C_Phone: '0336181809',
      C_CreatedDate: '',
      C_CreatedBy: 'admin',
      C_ModifyBy: '',
      C_ModifyDate: '',
      C_Note: 'chú thích',
      C_ProvinceID: 10,
      C_ProvinceName: 'Hà Nội',
      C_DistrictID: 10,
      C_DistrictName: 'Hoàng Mai',
      C_WardID: 10,
      C_WardName: 'Thanh Trì',
      C_ServicesList: [
        {
          S_ServicesID: 11,
          S_ServicesType: 20,
          S_ServicesName: 'Cuộc gọi',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 0,
          S_ServicesMoney: 0,
        },
        {
          S_ServicesID: 10,
          S_ServicesType: 20,
          S_ServicesName: 'Đơn hàng',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 100,
          S_ServicesMoney: 100000000,
        },
      ],
    },
    {
      C_ID: 3,
      C_Name: 'HuyenHam',
      C_Adress: 'TP.Hồ Chí Minh',
      C_Email: 'mphobao@gmail.com',
      C_DoB: '22/03/19992',
      C_Phone: '0336181809',
      C_CreatedDate: '',
      C_CreatedBy: 'admin',
      C_ModifyBy: '',
      C_ModifyDate: '',
      C_Note: 'chú thích',
      C_ProvinceID: 10,
      C_ProvinceName: 'Hà Nội',
      C_DistrictID: 10,
      C_DistrictName: 'Hoàng Mai',
      C_WardID: 10,
      C_WardName: 'Thanh Trì',
      C_ServicesList: [
        {
          S_ServicesID: 11,
          S_ServicesType: 20,
          S_ServicesName: 'Cuộc gọi',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 0,
          S_ServicesMoney: 0,
        },
        {
          S_ServicesID: 10,
          S_ServicesType: 20,
          S_ServicesName: 'Đơn hàng',
          S_ServicesDate: '22/03/1992',
          S_ServicesNote: '',
          S_ServicesAmount: 100,
          S_ServicesMoney: 100000000,
        },
      ],
    },
  ],
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return Users
// ------------------------------------------------
mock.onGet('/apps/user/users').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const {
    q = '',
    perPage = 10,
    page = 1,
    sortBy = 'id',
    sortDesc = false,
    // role = null,
    // plan = null,
    // status = null,
  } = config.params
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.users.filter(
    user =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      (user.C_Name.toLowerCase().includes(queryLowered) || user.C_Adress.toLowerCase().includes(queryLowered)),
  )
  /* eslint-enable */

  /* user.role === (role || user.role) &&
  user.currentPlan === (plan || user.currentPlan) &&
  user.status === (status || user.status) */

  const sortedData = filteredData.sort(sortCompare(sortBy))
  if (sortDesc) sortedData.reverse()

  return [
    200,
    {
      users: paginateArray(sortedData, perPage, page),
      total: filteredData.length,
    },
  ]
})

// ------------------------------------------------
// POST: Add new user
// ------------------------------------------------
mock.onPost('/apps/user/users').reply(config => {
  // Get event from post data
  const { user } = JSON.parse(config.data)

  // Assign Status
  // user.status = 'active'

  const { length } = data.users
  let lastIndex = 0
  if (length) {
    lastIndex = data.users[length - 1].id
  }
  user.id = lastIndex + 1

  data.users.push(user)

  return [201, { user }]
})

// ------------------------------------------------
// GET: Return Single User
// ------------------------------------------------
mock.onGet(/\/apps\/user\/users\/\d+/).reply(config => {
  // Get event id from URL
  let userId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(e => e.id === userId)
  const user = data.users[userIndex]

  if (user) return [200, user]
  return [404]
})
