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
    fetchTasks(ctx, payload) {
        if (payload.tag != undefined) {
          return new Promise((resolve, reject) => {
            axios
                .get(process.env.VUE_APP_ROOT_API + 'todo/task/tag', { params: payload }, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
          })
        } else {
          return new Promise((resolve, reject) => {
            axios
                .get(process.env.VUE_APP_ROOT_API + 'todo/task', { params: payload }, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
          })
      }
    },
    addTask(ctx, task) {
      return new Promise((resolve, reject) => {
        axios
          .patch('/todo/task/create', task, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateTask(ctx, {taskData}) {
      return new Promise((resolve, reject) => {
        axios
          .put(process.env.VUE_APP_ROOT_API + `todo/task/update/${taskData._id}`, taskData, config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateStatusTask(ctx, task) {
      return new Promise((resolve, reject) => {
        axios
            .patch(process.env.VUE_APP_ROOT_API + `todo/task/change/${task._id}`, task, config)
            .then(response => resolve(response))
            .catch(error => reject(error))
      })
    },
    removeTask(ctx, task) {
      if (task.isDeleted) {
        return new Promise((resolve, reject) => {
          axios
              .delete(process.env.VUE_APP_ROOT_API + `todo/task/delete/${task._id}`, config)
              .then(response => resolve(response))
              .catch(error => reject(error))
        })
      } else {
        return new Promise((resolve, reject) => {
          axios
              .delete(process.env.VUE_APP_ROOT_API + `todo/task/delete-soft/${task._id}`, config)
              .then(response => resolve(response))
              .catch(error => reject(error))
        })
      }
    },
  },
}
