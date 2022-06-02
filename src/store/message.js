import axios from "axios";

export default {
  state: {
    messages: [],
  },
  mutations: {
    SET_ALL_MESSAGE(state, data) {
      state.messages = data;
    },
  },
  getters: {
    getMessageList: (state) => state.messages,
  },
  actions: {
    async getAllMessage({ commit }) {
      const res = await axios.get("http://localhost:3000/message");
      commit("SET_ALL_MESSAGE", res.data);
    },
  },
};
