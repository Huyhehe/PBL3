import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    receiptList: [],
    selectedList: [],
    lineChartList: [],
    addReceiptSuccessful: false,
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
    SET_ADD_RECEIPT_STATUS(state, status) {
      state.addReceiptSuccessful = status;
    },
    SET_REVENUE_EXCEL_FILE(state, data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "revenue.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
  },
  getters: {
    getAllReceipt: (state) => state.receiptList,
    getSelectedList: (state) => state.selectedList,
    getLineChartList: (state) => state.lineChartList,
    getAddReceiptSuccessful: (state) => state.addReceiptSuccessful,
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
      console.log(receipt);
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
        commit("SET_ADD_RECEIPT_STATUS", true);
      } catch (e) {
        console.log(e);
        commit("SET_ADD_RECEIPT_STATUS", false);
        commit("SET_WARNING_MESSAGE", e.response.data);
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
    async downloadRevenue({ commit }, { fromDate, toDate }) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          `${BASE}/api/Receipt/export-revenue/${fromDate}/${toDate}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_REVENUE_EXCEL_FILE", res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
