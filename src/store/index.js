import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import message from "./message";
import commodity from "./commodity";
import receipt from "./receipt";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    message,
    commodity,
    receipt,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
