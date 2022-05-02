<template>
  <div class="user">
    <div class="header">
      <div class="header-img-box">
        <img :src="emp.avatar" alt="" />
      </div>
      <div class="header-name-box">
        <p class="header-name">{{ emp.name }}</p>
        <p class="header-role">{{ role }}</p>
      </div>
    </div>
    <div class="body">
      <div class="body-info-box">
        <form>
          <div class="input-box">
            <label for="input">Name: </label>
            <input
              type="text"
              :value="emp.name"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
          <div class="input-box">
            <label for="input">Age: </label>
            <input
              type="text"
              :value="emp.age"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
          <div class="input-box">
            <label for="input">Gender: </label>
            <input
              type="text"
              :value="emp.name ? 'Male' : 'Female'"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
          <div class="input-box">
            <label for="input">Contact: </label>
            <input
              type="text"
              :value="emp.contact"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
          <div class="input-box">
            <label for="input">Account: </label>
            <input
              type="text"
              :value="emp.account"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
          <div class="input-box">
            <label for="input">Password: </label>
            <input
              type="text"
              :value="emp.password"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      emp: {},
      role: "",
      isInputting: true,
    };
  },
  created() {
    this.setEmp(this.id);
  },
  mounted() {
    this.$emit("changeDisplay", true);
    this.emp = this.getEmp;
    if (this.emp.level.isManager) {
      this.role = "Manager";
    } else {
      this.role = "Employee";
    }
  },
  destroyed() {
    this.$emit("changeDisplay", false);
  },
  computed: {
    ...mapGetters(["getEmp"]),
  },
  methods: {
    ...mapActions(["fetchEmpList"]),
    setEmp(id) {
      this.$store.commit("SET_SINGLE_EMP", id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Reusable/user.less";
</style>
