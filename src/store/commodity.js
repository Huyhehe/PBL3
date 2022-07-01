import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    commodityList: [],
    commoditySoldList: [],
    addSuccessful: false,
    updateSuccessful: false,
    singleCommodity: {},
  },
  getters: {
    getAllCommodity: (state) => state.commodityList,
    getAddSuccessful: (state) => state.addSuccessful,
    getCommoditySoldList: (state) => state.commoditySoldList,
    getSingleCommodityItem: (state) => state.singleCommodity,
  },
  mutations: {
    SET_COMMODITY_LIST(state, commodityList) {
      state.commodityList = commodityList;
    },
    ADD_COMMODITY(state, data) {
      console.log(data);
      if (data == false) {
        this.addSuccessful = false;
      }
    },
    DELETE_COMMODITY(state, data) {
      console.log(data);
    },
    ADD_COMMODITY_BY_EXCEL(state, data) {
      console.log(data);
    },
    SET_COMMODITY_SOLD_LIST(state, data) {
      console.log(data);
      state.commoditySoldList = data;
    },
    SET_SINGLE_COMMODITY(state, data) {
      state.singleCommodity = data;
    },
    UPDATE_COMMODITY(state, data) {
      console.log(data);
    },
    SET_STORAGE_EXCEL_FILE(state, data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "storage.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    SET_SOLD_COMMODITY_EXCEL_FILE(state, data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sold_commodity.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
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
        console.log(e.response.data.title);
        commit("SET_WARNING_MESSAGE", e.response.data.title);
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
    async addCommodityByExcel({ commit }, formData) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.post(
          `${BASE}/api/Commodity/add-commodity-from-excel-file`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("ADD_COMMODITY_BY_EXCEL", res.data);
      } catch (e) {
        console.log(e);
        commit("SET_WARNING_MESSAGE", e.response.data.title);
      }
    },
    async getCommoditySold({ commit }, payload) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          `${BASE}/api/Commodity/commodity-sold/${payload.fromDate}/${payload.toDate}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_COMMODITY_SOLD_LIST", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getSingleCommodity({ commit }, id) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(`${BASE}/api/Commodity/commodity/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        commit("SET_SINGLE_COMMODITY", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async updateCommodity({ commit }, formData) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.put(
          `${BASE}/api/Commodity/update-commodity`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("UPDATE_COMMODITY", res.data);
      } catch (e) {
        console.log(e.response.data);
      }
    },
    async downloadStorageFile({ commit }) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          `${BASE}/api/Commodity/export-commodities-to-excel`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_STORAGE_EXCEL_FILE", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async downloadStorageFileByDate({ commit }, { fromDate, toDate }) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          `${BASE}/api/Commodity/export-commodities-sold-to-excel/${fromDate}/${toDate}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_SOLD_COMMODITY_EXCEL_FILE", res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
