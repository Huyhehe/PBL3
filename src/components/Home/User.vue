<template>
  <div class="user">
    <Alert :mess="alertMsg" />
    <div class="title">
      <span>Thông tin nhân viên</span>
    </div>
    <div class="header">
      <div class="header-img-box">
        <div v-if="!isInputting" class="change-icon" @click="chooseFile">
          <unicon name="camera-plus" width="30" height="30" />
        </div>
        <input
          type="file"
          style="display: none"
          ref="inputFile"
          @change="previewFile"
        />
        <img :src="newImage ? newImage : emp.imageUri" :alt="emp.name" />
      </div>
      <div class="header-name-box">
        <p class="header-name">{{ emp.firstName }} {{ emp.lastName }}</p>
        <p class="header-role">
          {{ emp.role == "admin" ? "Quản lý" : "Nhân viên" }}
        </p>
        <div class="header-tool-box">
          <unicon
            class="purple"
            :name="isInputting ? 'pen' : 'save'"
            @click="editProfile"
          />
          <unicon class="red" name="trash-alt" @click="deleteEmp" />
        </div>
      </div>
    </div>
    <div class="body">
      <div class="body-info-box">
        <div class="profile-box reuse">
          <span class="profile-box-header">Thông tin cá nhân</span>
          <div class="profile-box-form">
            <form>
              <div class="input-box-name">
                <div class="input-box-name-item">
                  <label>Tên</label>
                  <input
                    type="text"
                    v-model="emp.firstName"
                    :disabled="isInputting"
                  />
                </div>
                <div class="input-box-name-item">
                  <label>Họ</label>
                  <input
                    type="text"
                    v-model="emp.lastName"
                    :disabled="isInputting"
                  />
                </div>
              </div>
              <div class="input-box-salary">
                <div class="input-box-salary-item">
                  <span class="input-box-salary-header">Lương</span>
                  <div class="input-box">
                    <input
                      type="number"
                      :disabled="isInputting"
                      v-model="emp.salary"
                    />
                  </div>
                </div>
                <div class="input-box-salary-item">
                  <span class="input-box-salary-header">Dạng</span>
                  <div class="input-box">
                    <select :disabled="isInputting" v-model="emp.titleName">
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="input-box-gender">
                <span class="input-box-gender-header">Giới tính</span>
                <div class="radio-box">
                  <div class="radio-box-item">
                    <input
                      type="radio"
                      name="gender"
                      :checked="emp.gender"
                      :disabled="isInputting"
                      ref="gender"
                    />
                    <label for="male">Nam</label>
                  </div>
                  <div class="radio-box-item">
                    <input
                      type="radio"
                      name="gender"
                      :checked="!emp.gender"
                      :disabled="isInputting"
                    />
                    <label for="female">Nữ</label>
                  </div>
                </div>
              </div>
              <div class="input-box-date">
                <span>Ngày sinh</span>
                <a-date-picker v-model="dateOfBirth" :disabled="isInputting" />
              </div>
            </form>
          </div>
        </div>
        <div class="contact-box reuse">
          <span class="contact-box-header">Liên lạc</span>
          <div class="contact-box-form">
            <form>
              <div class="contact-box-name-item">
                <label for="firstName">Email</label>
                <input
                  type="text"
                  v-model="emp.email"
                  :disabled="isInputting"
                />
              </div>
              <div class="contact-box-name-item">
                <label for="firstName">Số điện thoại</label>
                <input
                  type="text"
                  v-model="emp.phoneNumber"
                  :disabled="isInputting"
                />
              </div>
              <div class="contact-box-name-item">
                <label for="firstName">Địa chỉ</label>
                <input
                  type="text"
                  v-model="emp.address"
                  :disabled="isInputting"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="body-info-receiptBoard"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "../Common Components/Alert.vue";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      id: this.$route.params.id,
      emp: {},
      isInputting: true,
      dateOfBirth: null,
      newImage: "",
      selectedFile: null,
      alertMsg: "",
    };
  },
  created() {
    this.setEmp(this.id);
    this.emp = this.getEmp;
    this.dateOfBirth = this.emp.dateOfBirth;
  },
  mounted() {
    this.$emit("changeDisplay", true);
  },
  watch: {
    dateOfBirth() {
      this.dateOfBirth = new Date(new Date(this.dateOfBirth).setHours(7))
        .toISOString()
        .slice(0, 10);
    },
  },
  destroyed() {
    this.$emit("changeDisplay", false);
  },
  computed: {
    ...mapGetters(["getEmp", "getUser"]),
  },
  methods: {
    alertMessage() {
      this.alertMsg = this.$store.getters.getWarningMessage;
      const alertMessage = document.querySelector(".error-alert");
      setTimeout(() => {
        alertMessage.classList.remove("show");
      }, 3000);
    },
    setEmp(id) {
      this.$store.commit("SET_SINGLE_EMP", id);
    },
    reformatPassword() {
      this.hiddenPassword = !this.hiddenPassword;
    },
    async editProfile() {
      this.isInputting = !this.isInputting;
      if (this.isInputting) {
        const newEmp = {
          employeeId: this.id,
          managerId: this.emp.managerId,
          firstName: this.emp.firstName,
          lastName: this.emp.lastName,
          gender: this.$refs.gender.checked,
          dateOfBirth: this.dateOfBirth,
          phoneNumber: this.emp.phoneNumber,
          email: this.emp.email,
          address: this.emp.address,
          role: this.emp.role,
          imageFile: this.emp.avatar,
          titleName: this.emp.titleName,
          dateIn: this.emp.dateIn,
          dateOut: this.emp.dateOut,
          salary: this.emp.salary,
        };

        const newIncoming = new FormData();
        newIncoming.append("employeeId", newEmp.employeeId);
        newIncoming.append("managerId", newEmp.managerId);
        newIncoming.append("firstName", newEmp.firstName);
        newIncoming.append("lastName", newEmp.lastName);
        newIncoming.append("gender", newEmp.gender);
        newIncoming.append("dateOfBirth", newEmp.dateOfBirth);
        newIncoming.append("phoneNumber", newEmp.phoneNumber);
        newIncoming.append("email", newEmp.email);
        newIncoming.append("address", newEmp.address);
        newIncoming.append("role", newEmp.role);
        newIncoming.append("imageFile", this.selectedFile);
        newIncoming.append("titleName", newEmp.titleName);
        newIncoming.append("dateIn", newEmp.dateIn);
        newIncoming.append("dateOut", newEmp.dateOut);
        newIncoming.append("salary", newEmp.salary);

        await this.$store.dispatch("updateEmp", newIncoming);
        if (!this.$store.getters.getUpdateEmpSuccessful) {
          const alert = document.querySelector(".error-alert");
          alert.classList.add("show");
          this.alertMessage();
        }
        await this.$store.dispatch("fetchEmpList");
        this.$store.commit("UPDATE_USER", null);
        if (newEmp.employeeId == this.getUser.id) {
          sessionStorage.setItem("userChanged", true);
          await this.$store.dispatch("getCurrentUser");
          this.$router.push({ name: "Dashboard" });
          location.reload();
        } else {
          sessionStorage.setItem("userChanged", false);
        }
      }
    },
    previewFile(e) {
      const file = e.target.files[0];
      this.selectedFile = file;
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
    chooseFile() {
      this.$refs.inputFile.click();
    },
    async deleteEmp() {
      const id = this.id;
      await this.$store.dispatch("deleteEmp", id);
      if (!this.$store.getters.getDeleteEmpSuccessful) {
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      await this.$store.dispatch("fetchEmpList");
      this.$store.commit("DELETE_EMP", false);
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Reusable/user.less";
</style>
