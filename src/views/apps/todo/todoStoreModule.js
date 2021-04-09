import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTasks(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_ROOT_API + 'todo/task', { params: payload })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addTask(ctx, task) {
      return new Promise((resolve, reject) => {
        axios
          .patch('/todo/task/create', task)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateTask(ctx, {taskData}) {
      return new Promise((resolve, reject) => {
        axios
          .put(process.env.VUE_APP_ROOT_API + `todo/task/update/${taskData._id}`, taskData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateStatusTask(ctx, task) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `todo/task/change/${task._id}`, task)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    removeTask(ctx, _id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(process.env.VUE_APP_ROOT_API + `todo/task/delete-soft/${_id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
