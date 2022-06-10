import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    messages: [],
  },
  mutations: {
    SET_ALL_MESSAGE(state, data) {
      for (const index in data) {
        const datePost =
          new Date(data[index].datePost)
            .toLocaleDateString()
            .replace("/", "-")
            .replace("/", "-") +
          " " +
          new Date(data[index].datePost).toLocaleTimeString();

        data[index].datePost = datePost;

        if (data[index].dateUpdate != null) {
          const dateUpdate =
            new Date(data[index].dateUpdate)
              .toLocaleDateString()
              .replace("/", "-")
              .replace("/", "-") +
            " " +
            new Date(data[index].dateUpdate).toLocaleTimeString();

          data[index].dateUpdate = dateUpdate;
        }
      }
      state.messages = data;
    },
    ADD_MESSAGE(state, data) {
      state.messages.push(data);
    },
    DELETE_MESSAGE(state, data) {
      console.log(data);
    },
    EDIT_MESSAGE(state, data) {
      console.log(data);
    },
  },
  getters: {
    getMessageList: (state) => state.messages,
  },
  actions: {
    async getAllMessage({ commit }) {
      const jwt = localStorage.getItem("jwt");
      const res = await axios.get(`${BASE}/api/Notification/notification`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      commit("SET_ALL_MESSAGE", res.data);
    },
    async addMessage({ commit }, message) {
      const jwt = localStorage.getItem("jwt");
      const res = await axios.post(
        `${BASE}/api/Notification/add-notification`,
        message,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(res.data);
      commit("ADD_MESSAGE", res.data);
    },
    async deleteMessage({ commit }, id) {
      const jwt = localStorage.getItem("jwt");
      const res = await axios.delete(
        `${BASE}/api/Notification/delete-notification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      commit("DELETE_MESSAGE", res.data);
    },
    async editMessage({ commit }, payload) {
      const jwt = localStorage.getItem("jwt");
      const editedMessage = payload.editedMessage;
      await axios.put(
        `${BASE}/api/Notification/update-notification`,
        editedMessage,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      commit("EDIT_MESSAGE", "updated");
    },
  },
};
