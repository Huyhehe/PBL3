import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    receiptList: [],
    selectedList: [],
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
      payload.quantity = 1;
      for (const index in state.selectedList) {
        if (state.selectedList[index].commodityId == payload.commodityId) {
          flag = false;
          state.selectedList[index].quantity += 1;
          console.log("same");
        }
      }
      if (flag) {
        state.selectedList.push(payload);
      }
    },
    REMOVE_SELECTED_ITEM(state, id) {
      state.selectedList = state.selectedList.filter(
        (item) => item.commodityId != id
      );
    },
    CHANGE_SELECTED_QUANTITY(state, payload) {
      for (const index in state.selectedList) {
        if ((state.selectedList[index].commodityId = payload.id)) {
          if (payload.flag) {
            state.selectedList[index].quantity += 1;
          } else {
            state.selectedList[index].quantity -= 1;
            if (state.selectedList[index].quantity == 0) {
              this.commit("REMOVE_SELECTED_ITEM", payload.id);
            }
          }
        }
      }
    },
  },
  getters: {
    getAllReceipt: (state) => state.receiptList,
    getSelectedList: (state) => state.selectedList,
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
