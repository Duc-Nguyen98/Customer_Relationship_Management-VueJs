import axios from '@axios'

export default {
  namespaced: true,
  state: {
    allSystem: [],
    allCustomers: [],
    allVouchers: [],
  },
  getters: {},
  mutations: {
    updateSystems(state, systems) {
      state.allSystem = systems
    },
    updateCustomers(state, customers) {
      state.allCustomers = customers
    },
    saveVouchers(state, vouchers) {
      state.allVouchers = vouchers
    },
  },
  actions: {
    //Fetch data
    fetchVouchers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `voucher/group/list`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchListVouchers(ctx, {_id, queryParams}) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/list/voucher/item/${_id}`, { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchHisListVouchers(ctx, {_id, queryParams}) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/history/voucher/item/${_id}`, { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchVouchersDel(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/trash`, { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchGVoucher(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `voucher/group/detail/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchSystems(ctx) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/list/shop`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchCustomers(ctx) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/list/customer`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchListVouchersTrash(ctx, {_id, queryParams}) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + `voucher/group/history/trash/voucher/item/${_id}`, { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },

    //Add data

    sendSMS(ctx, smsData) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + '/services', { user: smsData })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    addVoucherGroup(ctx, voucherGroup) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + 'voucher/group/create', voucherGroup)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    addListVouchersGroup(ctx, voucherGroup) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + 'voucher/group/create/voucher', voucherGroup)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    addVouchersInGroup(ctx, {_id, voucherCode}) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + `voucher/group/update/many/voucher/add/${_id}`, {voucherCode})
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },

    //Update

    updateVoucherGroup(ctx, {_id, GroupDataInfo}) {
      return new Promise((resolve, reject) => {
        axios
            .put(process.env.VUE_APP_ROOT_API + `voucher/group/update/${_id}`, GroupDataInfo)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    changeStatusVouchersInGroup(ctx, {status, VoucherIdArray}) {
      return new Promise((resolve, reject) => {
        axios
            .put(process.env.VUE_APP_ROOT_API + `voucher/group/change/status/many/voucher/${status}`, VoucherIdArray)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },

    //Trash

    //Group Vouchers
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

    //Vouchers
    deleteVouchersInGroup(ctx, VoucherIdArray) {
      console.log(VoucherIdArray)
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `voucher/group/delete/many/voucher`, VoucherIdArray)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteSoftVouchersInGroup(ctx, VoucherIdArray) {
      console.log(VoucherIdArray)
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `voucher/group/delete-soft/many/voucher`, VoucherIdArray)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
