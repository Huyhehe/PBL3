import Vue from "vue";
import VueRouter from "vue-router";
import Display from "../views/Display.vue";
import Dashboard from "../components/Home/Dashboard.vue";
import Info from "../components/Home/Info.vue";
import User from "../components/Home/User.vue";
import Message from "../components/Home/Message.vue";
import Receipt from "../components/Home/Receipt.vue";
import Storage from "../components/Home/Storage.vue";
import Setting from "../components/Home/PageSetting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Display",
    component: Display,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        children: [
          {
            path: "user/:id",
            name: "User",
            component: User,
          },
        ],
      },
      {
        path: "info",
        name: "Info",
        component: Info,
      },
      {
        path: "message",
        name: "Message",
        component: Message,
      },
      {
        path: "receipt",
        name: "Receipt",
        component: Receipt,
      },
      {
        path: "storage",
        name: "Storage",
        component: Storage,
      },
      {
        path: "setting",
        name: "Setting",
        component: Setting,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),

    children: [],
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: () => import("../components/login/ForgotPassword.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/login/SignUp.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
