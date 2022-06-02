import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import {
  uniBars,
  uniEstate,
  uniInbox,
  uniUser,
  uniSetting,
  uniEnvelopeAlt,
  uniBill,
  uniSignout,
  uniDesktop,
  uniEye,
  uniEyeSlash,
  uniPen,
  uniSave,
  uniTrashAlt,
  uniPlus,
} from "vue-unicons/dist/icons";

Unicon.add([
  uniBars,
  uniEstate,
  uniInbox,
  uniUser,
  uniSetting,
  uniEnvelopeAlt,
  uniBill,
  uniSignout,
  uniDesktop,
  uniEye,
  uniEyeSlash,
  uniPen,
  uniSave,
  uniTrashAlt,
  uniPlus,
]);
Vue.use(Unicon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
