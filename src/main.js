import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { DatePicker } from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

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
  uniAngleLeftB,
  uniCameraPlus,
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
  uniAngleLeftB,
  uniCameraPlus,
]);
Vue.use(Unicon);
Vue.use(DatePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
