import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchShops(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'shop/list', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchShopsDel(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + 'shop/list/trash', { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchShop(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `shop/detail/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addShop(ctx, shopData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + 'shop/create', shopData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateUser(ctx, { userData, _id }) {
      return new Promise((resolve, reject) => {
        axios
            .put(process.env.VUE_APP_ROOT_API + `customer/update/${_id}`, userData)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteShop(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `shop/delete-soft/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteShopR(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `shop/delete/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreShop(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `shop/trash/restore/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    uploadCustomer(ctx, { file, _id }) {
      let data = new FormData()
      data.append('file', file)
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + `customer/upload/${_id}`, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
