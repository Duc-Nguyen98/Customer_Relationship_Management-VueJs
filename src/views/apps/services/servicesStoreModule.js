import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchServices(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'services/list', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchService(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `/services/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addService(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + '/services', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    deleteService(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `services/delete-soft/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
