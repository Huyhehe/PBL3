import router from "@/router";
import axios from "axios";

export default {
  state: {
    auth: {
      isAuthenticated: false,
    },
    user: {},
    listEmp: {},
    singleEmp: {},
    token: "",
  },
  mutations: {
    SIGN_IN(state, { userAccount, userPassword }) {
      state.listEmp.map((emp) => {
        if (emp.account == userAccount) {
          state.user = emp;
        }
      });
      if (userPassword === state.user.password) {
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
    UPDATE_USER(state, user) {
      if (state.user.id == user.id) {
        state.user = user;
      }
    },
    TEST(state, { user, jwt }) {
      state.token = "bearer " + jwt;
      state.user = user;
      console.log(user);
      router.push("/");
    },
  },
  getters: {
    isAuthenticated: (state) => state.auth.isAuthenticated,
    isManager: (state) => state.user.level.isManager,
    userName: (state) => state.user.name,
    getListEmp: (state) => state.listEmp,
    getEmp: (state) => state.singleEmp,
    getUser: (state) => state.user,
  },
  actions: {
    async loginRequest({ commit }, { userAccount, userPassword }) {
      try {
        const res = await axios.post(
          "https://shopguitarapi.azurewebsites.net/Auth/login",
          { userName: userAccount, password: userPassword }
        );
        const jwt = res.data;

        const user = await axios.get(
          "https://shopguitarapi.azurewebsites.net/Auth/login",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("TEST", { user, jwt });
      } catch (err) {
        console.error(err);
      }
    },
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
    async updateEmp({ commit, dispatch }, payload) {
      const id = payload.id;
      const user = payload.user;
      try {
        const res = await axios.put(`http://localhost:3000/users/${id}`, user);
        commit("UPDATE_USER", res.data);
        dispatch("fetchEmpList");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
