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
    deleteGroupsCustomer(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `customer/group/delete-soft/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteGroupsCustomerR(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `customer/group/delete/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreGroupsCustomer(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `customer/group/trash/restore/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteManyGroupsCustomer(ctx, GroupCustomerIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `customer/group/delete/many/group`, GroupCustomerIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteSoftManyGroupsCustomer(ctx, GroupCustomerIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `customer/group/delete-soft/many/group`, GroupCustomerIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreManyGroupsCustomer(ctx, GroupCustomerIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `customer/group/restore/many/group`, GroupCustomerIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
