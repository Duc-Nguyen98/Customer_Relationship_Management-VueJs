import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchVouchers(ctx, { queryParams }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `voucher/group/list`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchVouchersDel(ctx, { queryParams }) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/trash`, { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchVoucher(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `/services/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    sendSMS(ctx, smsData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + '/services', { user: smsData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteVoucherSoft(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `voucher/group/delete-soft/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreVoucher(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `voucher/group/trash/restore/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteVoucher(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `voucher/group/delete/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
