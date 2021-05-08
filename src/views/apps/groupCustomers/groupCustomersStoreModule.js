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
    fetchGC(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'customer/group/list', { params: queryParams }, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchGCDel(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + 'customer/group/list/trash', { params: queryParams }, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchOneGC(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `customer/group/detail/${_id}`, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addGC(ctx, gcData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + 'customer/group/create', gcData, config)
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
    deleteShop(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `shop/delete-soft/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteShopR(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `shop/delete/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreShop(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `shop/trash/restore/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteManyShop(ctx, shopIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `shop/delete/many/shop`, shopIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteSoftManyShop(ctx, shopIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `shop/delete-soft/many/shop`, shopIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreManyShop(ctx, shopIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `shop/restore/many/shop`, shopIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
