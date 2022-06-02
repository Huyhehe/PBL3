<template>
  <div class="info user">
    <div class="header">
      <div class="header-img-box">
        <img :src="require('@/assets/image/' + user.avatar + '.jpg')" alt="" />
      </div>
      <div class="header-name-box">
        <p class="header-name">{{ user.name }}</p>
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
              :value="user.name"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userName"
            />
          </div>
          <div class="input-box">
            <label for="input">Age: </label>
            <input
              type="text"
              :value="user.age"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userAge"
            />
          </div>
          <div class="input-box">
            <label for="input">Gender: </label>
            <input
              type="text"
              :value="user.gender ? 'Male' : 'Female'"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userGender"
            />
          </div>
          <div class="input-box">
            <label for="input">Contact: </label>
            <input
              type="text"
              :value="user.contact"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userContact"
            />
          </div>
          <div class="input-box">
            <label for="input">Account: </label>
            <input
              type="text"
              :value="user.account"
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userAccount"
            />
          </div>
          <div class="input-box">
            <label for="input">Password: </label>
            <input
              :type="hiddenPassword ? 'password' : 'text'"
              :value="
                hiddenPassword && isInputting
                  ? '************************'
                  : user.password
              "
              name="input"
              :disabled="isInputting"
              :class="!isInputting ? 'input-toggle' : ''"
              ref="userPassword"
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
      user: {},
      role: "",
      isInputting: true,
      hiddenPassword: true,
    };
  },
  created() {
    this.user = this.getUser;
  },
  mounted() {
    if (this.user.level.isManager) {
      this.role = "Manager";
    } else {
      this.role = "Employee";
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    reformatPassword() {
      this.hiddenPassword = !this.hiddenPassword;
    },
    editProfile() {
      this.isInputting = !this.isInputting;
      if (this.isInputting) {
        this.user = {
          id: this.user.id,
          name: this.$refs.userName.value,
          age: this.$refs.userAge.value,
          gender: this.$refs.userGender.value,
          contact: this.$refs.userContact.value,
          account: this.$refs.userAccount.value,
          password: this.$refs.userPassword.value,
          level: this.user.level,
          status: this.user.status,
          avatar: this.user.avatar,
        };
        this.$store.dispatch("updateEmp", {
          id: this.user.id,
          user: this.user,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Reusable/user.less";
</style>
