import router from "@/router";
import axios from "axios";

export default {
  state: {
    auth: {
      isAuthenticated: false,
    },
    user: {
      id: 1,
      name: "Nguyễn Thành Huy",
      level: {
        isManager: true,
      },
      account: "huyhehe",
      password: "123456",
    },
    listEmp: {},
    singleEmp: {},
  },
  mutations: {
    SIGN_IN(state, { userAccount, userPassword }) {
      if (
        userAccount == state.user.account &&
        userPassword == state.user.password
      ) {
        state.auth.isAuthenticated = true;
      }

      sessionStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.auth.isAuthenticated)
      );

      if (state.auth.isAuthenticated) {
        router.push("/");
      }
    },
    SIGN_OUT(state) {
      state.auth.isAuthenticated = false;
      sessionStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.auth.isAuthenticated)
      );
      sessionStorage.removeItem("loaded");
    },
    SET_AUTHENTICATED(state) {
      if (sessionStorage.getItem("isAuthenticated") != null) {
        state.auth.isAuthenticated = JSON.parse(
          sessionStorage.getItem("isAuthenticated")
        );
      }
    },
    SET_EMP_LIST(state, listEmp) {
      state.listEmp = listEmp;
      for (const emp in listEmp) {
        if (listEmp[emp].account == state.user.account) {
          listEmp[emp].status = "Online";
          break;
        }
      }
    },
    SET_SINGLE_EMP(state, id) {
      for (const index in state.listEmp) {
        if (id - 1 == index) {
          state.singleEmp = state.listEmp[index];
        }
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.auth.isAuthenticated,
    isManager: (state) => state.user.level.isManager,
    userName: (state) => state.user.name,
    getListEmp: (state) => state.listEmp,
    getEmp: (state) => state.singleEmp,
  },
  actions: {
    checkLogin({ commit }, { userAccount, userPassword }) {
      commit("SIGN_IN", { userAccount, userPassword });
    },
    async fetchEmpList({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/users");
        commit("SET_EMP_LIST", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
