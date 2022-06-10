import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    receiptList: [],
  },
  mutations: {
    SET_LIST(state, data) {
      if (data != null) {
        for (const index in data) {
          // data[index].date = new Date(new Date(data[index].date).setHours(7))
          //   .toISOString()
          //   .split(0, 10);
          data[index].date = new Date(data[index].date)
            .toLocaleDateString()
            .replace("/", "-")
            .replace("/", "-");
        }
      }
      state.receiptList = data;
    },
  },
  getters: {
    getAllReceipt: (state) => state.receiptList,
  },
  actions: {
    async getAllReceipt({ commit }) {
      try {
        const jwt = localStorage.getItem("jwt");
        const res = await axios.get(`${BASE}/api/Receipt/receipt`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        commit("SET_LIST", res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
