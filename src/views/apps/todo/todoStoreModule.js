import axios from "@axios";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTasks(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/todo", { params: payload })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    addTask(ctx, taskData) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/todo", { task: taskData })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    updateTask(ctx, { task }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/todo/${task.id}`, { task })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    removeTask(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://localhost:3000/todo/${id}`)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
  },
};
