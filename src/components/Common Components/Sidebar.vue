<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-header">
        <div class="user-name-tag sidebar-item-text">{{ userName }}</div>
        <div class="sidebar-item" id="menu-button" @click="toggleSidebar()">
          <unicon name="bars" width="35" height="35"></unicon>
        </div>
      </div>
      <div class="sidebar-body">
        <ul>
          <li>
            <router-link
              :to="{ name: item.name }"
              v-for="item in sidebarItems"
              :key="item.text"
              class="sidebar-item"
            >
              <unicon :name="item.icon" />
              <span class="sidebar-item-text">{{ item.title }}</span>
              <span
                v-if="item.sub"
                class="notification-bubble sidebar-item-text"
                >{{ item.sub }}</span
              >
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sidebar-footer">
        <router-link to="/login" class="router-link">
          <div class="sidebar-item" id="sign-out-button" @click="SIGN_OUT()">
            <unicon name="signout"></unicon>
            <span class="sidebar-item-text">Sign out</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      sidebarItems: [
        {
          title: "Trang chủ",
          icon: "estate",
          name: "Dashboard",
        },
        {
          title: "Thông tin cá nhân",
          icon: "user",
          name: "Info",
        },
        {
          title: "Thông báo",
          icon: "envelope-alt",
          sub: 20,
          name: "Message",
        },
        {
          title: "Xuất hóa đơn",
          icon: "bill",
          name: "Receipt",
        },
        {
          title: "Kho",
          icon: "inbox",
          name: "Storage",
        },
        {
          title: "Cài đặt",
          icon: "setting",
          name: "Setting",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userName", "isManager"]),
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      const ul = sidebar.querySelector("ul");
      const sidebarHeader = sidebar.querySelector(".sidebar-header");
      const sidebarItemText = sidebar.querySelectorAll(".sidebar-item-text");
      sidebar.classList.toggle("close");
      sidebarHeader.classList.toggle("close");

      ul.classList.toggle("close");

      sidebarItemText.forEach((item) => {
        item.classList.toggle("close");
      });
    },
    ...mapMutations(["SIGN_OUT"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Sidebar/sidebar.less";
</style>
