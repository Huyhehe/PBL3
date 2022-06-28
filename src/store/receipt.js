import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    receiptList: [],
    selectedList: [],
    lineChartList: [],
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
    SET_SELECTED_LIST(state, payload) {
      let flag = true;
      state.selectedList.map((item) => {
        if (item.commodityId == payload.commodityId) {
          flag = false;
          item.quantity += 1;
        }
      });
      if (flag) {
        payload.quantity = 1;
        console.log(payload);
        state.selectedList.push(payload);
      }
    },
    REMOVE_SELECTED_ITEM(state, id) {
      state.selectedList = state.selectedList.filter(
        (item) => item.commodityId != id
      );
    },
    CHANGE_SELECTED_QUANTITY(state, payload) {
      state.selectedList.map((item) => {
        if (item.commodityId == payload.id) {
          if (payload.flag) {
            item.quantity += 1;
          } else {
            item.quantity -= 1;
            if (item.quantity == 0) {
              this.commit("REMOVE_SELECTED_ITEM", payload.id);
            }
          }
        }
      });
    },
    RESET_SELECTED_LIST(state) {
      state.selectedList = [];
    },
    ADD_RECEIPT(state, data) {
      console.log(data);
    },
    SET_LINECHART_LIST(state, data) {
      state.lineChartList = data;
    },
  },
  getters: {
    getAllReceipt: (state) => state.receiptList,
    getSelectedList: (state) => state.selectedList,
    getLineChartList: (state) => state.lineChartList,
  },
  actions: {
    async getAllReceipt({ commit }) {
      try {
        const jwt = localStorage.getItem("jwt");
        const res = await axios.get(`${BASE}/api/Receipt/receipt-sales`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        commit("SET_LIST", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async addReceipt({ commit }, receipt) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.post(
          `${BASE}/api/Receipt/add-receipt`,
          receipt,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("ADD_RECEIPT", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getLineChartData({ commit }, payload) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          `${BASE}/api/Receipt/revenue/${payload.fromDate}/${payload.toDate}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_LINECHART_LIST", res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
