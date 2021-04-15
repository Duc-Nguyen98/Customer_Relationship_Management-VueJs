import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchEmails(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'mail/task', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    createEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + 'mail/task/create', payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    updateEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + 'mail/task/update-multi', payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + 'mail/task/delete-multi', payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    updateStarredEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `mail/task/is-starred/${payload.emailIds}`, payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    updateEmailLabels(ctx, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `mail/task/detail/${payload.emailIds[0]}`, payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    paginateEmail(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/email/paginate-email', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
