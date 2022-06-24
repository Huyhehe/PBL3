import router from "@/router";
import axios from "axios";
const BASE = "https://shopguitar.azurewebsites.net";

export default {
  state: {
    auth: {
      isAuthenticated: false,
    },
    user: {},
    listEmp: {},
    singleEmp: {},
    warningMessage: "",
    registerSuccessful: false,
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
      state.user = {};
      state.listEmp = {};
      state.singleEmp = {};
      state.auth.isAuthenticated = false;
      sessionStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.auth.isAuthenticated)
      );
      sessionStorage.removeItem("loaded");
      localStorage.removeItem("jwt");
    },
    SET_AUTHENTICATED(state) {
      if (sessionStorage.getItem("isAuthenticated") != null) {
        state.auth.isAuthenticated = JSON.parse(
          sessionStorage.getItem("isAuthenticated")
        );
      }
    },
    SET_EMP_LIST(state, listEmp) {
      if (listEmp != null) {
        for (const index in listEmp) {
          listEmp[index].dateOfBirth = new Date(
            new Date(listEmp[index].dateOfBirth).setHours(7)
          )
            .toISOString()
            .slice(0, 10);
        }
        state.listEmp = listEmp;
      }
    },
    SET_SINGLE_EMP(state, id) {
      for (const index in state.listEmp) {
        if (id == state.listEmp[index].id) {
          state.singleEmp = state.listEmp[index];
        }
      }
    },
    UPDATE_USER(state, user) {
      console.log(user);
      if (state.user.id == user.id) {
        state.user = user;
      }
    },
    SET_USER(state, user) {
      state.user = user;
      state.user.dateOfBirth = new Date(new Date(user.dateOfBirth).setHours(7))
        .toISOString()
        .slice(0, 10);
      state.auth.isAuthenticated = true;
      sessionStorage.setItem(
        "isAuthenticated",
        JSON.stringify(state.auth.isAuthenticated)
      );
      router.push("/");
    },
    ADD_NEW_EMP(state, data) {
      console.log(data);
    },
    REGISTER(state, payload) {
      console.log(payload.newUser.userID);
      sessionStorage.setItem(
        "registerSucceed",
        JSON.stringify(payload.newUser.userID)
      );
    },
    REFRESH_REGISTER_TOKEN(state, payload) {
      console.log(payload);
    },
    SET_WARNING_MESSAGE(state, message) {
      state.warningMessage = message;
    },
    VERIFY_REGISTER(state, message) {
      console.log(message);
      state.registerSuccessful = true;
    },
  },
  getters: {
    isAuthenticated: (state) => state.auth.isAuthenticated,
    isManager: (state) => {
      if (state.user.role.toLowerCase() == "admin") {
        return true;
      }
      return false;
    },
    userName: (state) => state.user.firstName + " " + state.user.lastName,
    getListEmp: (state) => state.listEmp,
    getEmp: (state) => state.singleEmp,
    getUser: (state) => state.user,
    registerSuccess: (state) => state.registerSuccessful,
    getWarningMessage: (state) => state.warningMessage,
  },
  actions: {
    async loginRequest({ commit }, { userAccount, userPassword }) {
      try {
        const res = await axios.post(`${BASE}/Auth/login`, {
          userName: userAccount,
          password: userPassword,
        });
        const jwt = res.data;
        localStorage.setItem("jwt", jwt);

        const userRes = await axios.get(
          `${BASE}/api/Employee/current-employee`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const user = userRes.data;
        commit("SET_USER", user);
      } catch (err) {
        console.error(err);
        commit("SET_WARNING_MESSAGE", err.response.data);
      }
    },
    async fetchEmpList({ commit }) {
      try {
        const jwt = localStorage.getItem("jwt");
        const res = await axios.get(`${BASE}/api/Employee/employee`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        commit("SET_EMP_LIST", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateEmp({ commit }, user) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.put(
          `${BASE}/api/Employee/update-employee-admin`,
          user,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("UPDATE_USER", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async updateInfo({ commit }, user) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.put(
          `${BASE}/api/Employee/update-employee`,
          user,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("UPDATE_USER", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async addNewEmp({ commit }, newEmp) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.post(
          `${BASE}/api/Employee/add-employee`,
          newEmp,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("ADD_NEW_EMP", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getCurrentUser({ commit }) {
      const jwt = localStorage.getItem("jwt");
      try {
        const currentUser = await axios.get(
          `${BASE}/api/Employee/current-employee`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        commit("SET_USER", currentUser.data);
      } catch (e) {
        console.log(e);
      }
    },
    async register({ commit }, newUser) {
      const newAccount = new FormData();
      newAccount.append("userID", newUser.userID);
      newAccount.append("userName", newUser.userName);
      newAccount.append("password", newUser.password);
      newAccount.append("confirmPassword", newUser.confirmPassword);
      newAccount.append("imageFile", newUser.imageFile);
      try {
        const res = await axios.post(`${BASE}/Auth/register`, newAccount);
        commit("REGISTER", { res: res, newUser: newUser });
      } catch (e) {
        console.log(e.response.status);
        if (e.response.status == 400) {
          commit("SET_WARNING_MESSAGE", e.response.data);
        }
      }
    },
    async refreshRegisterToken({ commit }, userId) {
      try {
        const res = await axios.post(
          `${BASE}/Auth/refresh-verify-account-token/${userId}`
        );
        commit("REFRESH_REGISTER_TOKEN", res);
      } catch (e) {
        console.log(e.response.status);
      }
    },
    async verifyRegister({ commit }, token) {
      console.log(typeof token);
      try {
        const res = await axios.post(`${BASE}/Auth/verify-account/${token}`);
        commit("VERIFY_REGISTER", res.data);
      } catch (e) {
        console.log(e);
        commit("SET_WARNING_MESSAGE", e.response.status);
      }
    },
  },
};
