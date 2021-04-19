import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'user/list', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsersDel(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_ROOT_API + 'user/list/trash', { params: queryParams })
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + `user/detail/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_ROOT_API + `user/create`, userData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    activeUser(ctx, { active, _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `user/active/${_id}`, {active: active})
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `user/delete-soft/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    deleteUserR(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_ROOT_API + `user/delete/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    restoreUser(ctx, { _id }) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `user/trash/restore/${_id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    uploadUser(ctx, { file, _id }) {
      let data = new FormData()
      data.append('file', file)
      return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_ROOT_API + `user/upload/${_id}`, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
  },
}
