<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  created() {
    this.SET_AUTHENTICATED();
    if (JSON.parse(sessionStorage.getItem("registerSucceed"))) {
      this.$router.push({ name: "ConfirmToken" });
      return;
    }
    if (this.isAuthenticated == false) {
      this.$router.replace("/login");
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapMutations(["SET_AUTHENTICATED"]),
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: black;
  padding: 0;
  margin: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}

* {
  font-family: "Montserrat", sans-serif;
}
</style>
