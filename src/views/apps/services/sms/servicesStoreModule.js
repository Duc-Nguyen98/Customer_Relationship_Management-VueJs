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
    fetchServices(ctx, {type, queryParams}) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `services/list?`, { params: queryParams }, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchServicesDel(ctx, {type, queryParams}) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `services/list/trash?`, { params: queryParams }, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchService(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `services/${_id}`, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchVoucherGroup(ctx) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `services/list/group-voucher`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchVouchers(ctx, { idGroupVoucher }) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `services/list/group-voucher/voucher-items/${idGroupVoucher}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    addService(ctx, smsData) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + 'services/create', smsData, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    sendSMS(ctx, smsData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + 'services', { user: smsData }, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteSoftService(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `services/delete-soft/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteSoftManyServices(ctx, ServicesIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `services/delete-soft/many/services`, ServicesIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteManyServices(ctx, ServicesIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `services/trash/delete/many/services`, ServicesIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreManyServices(ctx, ServicesIdArray) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `services/trash/restore/many/services`, ServicesIdArray, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteService(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `services/delete/${_id}`, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
