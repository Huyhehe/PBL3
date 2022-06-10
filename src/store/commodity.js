import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    commodityList: [],
  },
  getters: {
    getAllCommodity: (state) => state.commodityList,
  },
  mutations: {
    SET_COMMODITY_LIST(state, commodityList) {
      state.commodityList = commodityList;
    },
    ADD_COMMODITY(state, data) {
      console.log(data);
    },
    DELETE_COMMODITY(state, data) {
      console.log(data);
    },
  },
  actions: {
    async fetchCommodityList({ commit }) {
      try {
        const jwt = localStorage.getItem("jwt");
        const res = await axios.get(`${BASE}/api/Commodity/commodity`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        commit("SET_COMMODITY_LIST", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async addCommodity({ commit }, newCommodity) {
      try {
        console.log(newCommodity);
        const jwt = localStorage.getItem("jwt");
        const res = await axios.post(
          `${BASE}/api/Commodity/add-commodity`,
          newCommodity,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("ADD_COMMODITY", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCommodity({ commit }, id) {
      const jwt = localStorage.getItem("jwt");
      const res = await axios.delete(
        `${BASE}/api/Commodity/delete-commodity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      commit("DELETE_COMMODITY", res.data);
    },
  },
};
