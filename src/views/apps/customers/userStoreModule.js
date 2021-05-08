import axios from '@axios'

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
};

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'customer/list', { params: queryParams }, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsersDel(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + 'customer/list/trash', { params: queryParams }, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `customer/detail/${_id}`, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + 'customer/create', userData, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateUser(ctx, { userData, _id }) {
      return new Promise((resolve, reject) => {
        axios
            .put(process.env.VUE_APP_ROOT_API + `customer/update/${_id}`, userData, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `customer/delete-soft/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteUserR(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `customer/delete/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `customer/trash/restore/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    uploadCustomer(ctx, { file, _id }) {
      let data = new FormData()
      data.append('file', file)
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + `customer/upload/${_id}`, data, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
