<template>
  <div class="main">
    <div class="success-alert">Access Successful!</div>
    <Sidebar class="sidebar" />
    <keep-alive>
      <router-view class="display" :emps="emps"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Sidebar from "../components/Common Components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      emps: this.getListEmp,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getListEmp"]),
  },
  methods: {
    ...mapActions(["fetchEmpList"]),
    successAlert() {
      const alertMessage = document.querySelector(".success-alert");
      if (this.isAuthenticated) {
        alertMessage.classList.toggle("show");
        setTimeout(() => {
          alertMessage.classList.remove("show");
        }, 3000);
        alertMessage.remove;
        sessionStorage.setItem("loaded", JSON.stringify("false"));
      }
    },
  },
  created() {
    this.fetchEmpList();
    this.emps = this.getListEmp;
  },
  mounted() {
    if (sessionStorage.getItem("loaded") === null) {
      this.successAlert();
    }
  },
  watch: {
    componentKey() {
      console.log("key changed");
    },
  },
  beforeUpdate() {
    // console.log("updated");
    // this.fetchEmpList();
    this.emps = this.getListEmp;
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/variables.less";
.main {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: white;
  overflow: hidden;
  display: flex;
  position: relative;

  .display {
    transition: all 0.3s ease;
    flex-grow: 1;
  }
  .success-alert {
    position: absolute;
    top: 20px;
    right: 0;
    width: 300px;
    padding: 20px 10px;
    background: @success-color;
    color: white;
    transform: translateX(100%);
    padding: 20px 10px;
    opacity: 0;
    transition: all 0.2s ease-out;
    &.show {
      transform: translateX(-10%);
      opacity: 1;
    }
  }
}
</style>
