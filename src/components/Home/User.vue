<template>
  <div class="user">
    <div class="header">
      <div class="header-img-box">
        <img :src="require('@/assets/image/' + emp.avatar + '.jpg')" alt="" />
      </div>
      <div class="header-name-box">
        <p class="header-name">{{ emp.name }}</p>
        <p class="header-role">{{ role }}</p>
        <unicon :name="isInputting ? 'pen' : 'save'" @click="editProfile" />
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
              ref="empName"
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
              ref="empAge"
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
              ref="empGender"
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
              ref="empContact"
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
              ref="empAccount"
            />
          </div>
          <div class="input-box">
            <label for="input">Password: </label>
            <input
              :type="hiddenPassword ? 'password' : 'text'"
              :value="
                hiddenPassword && isInputting
                  ? '************************'
                  : emp.password
              "
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="empPassword"
            />
            <unicon
              id="password-icon"
              :name="hiddenPassword ? 'eye' : 'eye-slash'"
              @click="reformatPassword"
            />
          </div>
        </form>
      </div>
      <div class="body-info-receiptBoard"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      emp: {},
      role: "",
      isInputting: true,
      hiddenPassword: true,
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
    setEmp(id) {
      this.$store.commit("SET_SINGLE_EMP", id);
    },
    reformatPassword() {
      this.hiddenPassword = !this.hiddenPassword;
    },
    editProfile() {
      this.isInputting = !this.isInputting;
      if (this.isInputting) {
        this.emp = {
          id: this.emp.id,
          name: this.$refs.empName.value,
          age: this.$refs.empAge.value,
          gender: this.$refs.empGender.value,
          contact: this.$refs.empContact.value,
          account: this.$refs.empAccount.value,
          password: this.$refs.empPassword.value,
          avatar: this.emp.avatar,
          level: this.emp.level,
          status: this.emp.status,
        };
        this.$store.dispatch("updateEmp", {
          id: this.emp.id,
          user: this.emp,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Reusable/user.less";
</style>
