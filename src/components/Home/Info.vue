<template>
  <div class="info user">
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
        <img :src="newImage ? newImage : user.imageUri" :alt="user.name" />
      </div>
      <div class="header-name-box">
        <p class="header-name">{{ user.firstName }} {{ user.lastName }}</p>
        <p class="header-role">{{ role }}</p>
        <unicon :name="isInputting ? 'pen' : 'save'" @click="editProfile" />
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
                  <label for="firstName">Họ</label>
                  <input
                    type="text"
                    v-model="user.firstName"
                    :disabled="isInputting"
                  />
                </div>
                <div class="input-box-name-item">
                  <label for="firstName">Tên</label>
                  <input
                    type="text"
                    v-model="user.lastName"
                    :disabled="isInputting"
                  />
                </div>
              </div>
              <div class="input-box-gender">
                <span class="input-box-gender-header">Giới tính</span>
                <div class="radio-box">
                  <div class="radio-box-item">
                    <input
                      type="radio"
                      name="gender"
                      :checked="user.gender"
                      :disabled="isInputting"
                      ref="gender"
                    />
                    <label for="male">Nam</label>
                  </div>
                  <div class="radio-box-item">
                    <input
                      type="radio"
                      name="gender"
                      :checked="!user.gender"
                      :disabled="isInputting"
                    />
                    <label for="female">Nữ</label>
                  </div>
                </div>
              </div>
              <div class="input-box-date">
                <span>Ngày sinh</span>
                <a-date-picker :disabled="isInputting" v-model="dateOfBirth" />
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
                  :value="user.email"
                  :disabled="isInputting"
                />
              </div>
              <div class="contact-box-name-item">
                <label for="firstName">Số điện thoại</label>
                <input
                  type="text"
                  :value="user.phoneNumber"
                  :disabled="isInputting"
                />
              </div>
              <div class="contact-box-name-item">
                <label for="firstName">Địa chỉ</label>
                <input
                  type="text"
                  :value="user.address"
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
export default {
  data() {
    return {
      user: {},
      role: "",
      isInputting: true,
      newImage: "",
      selectedFile: null,
      salary: null,
      title: "",
      dateOfBirth: null,
    };
  },
  created() {
    // this.$store.dispatch("getCurrentUser");
    this.user = this.getUser;
    this.salary = this.user.salary[0];
    this.title = this.user.title[0];
    this.dateOfBirth = this.user.dateOfBirth;
  },
  watch: {
    dateOfBirth() {
      this.dateOfBirth = new Date(new Date(this.dateOfBirth).setHours(7))
        .toISOString()
        .slice(0, 10);
    },
  },
  mounted() {
    if (this.user.role == "admin") {
      this.role = "Quản lý";
    } else {
      this.role = "Nhân viên";
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    reformatPassword() {
      this.hiddenPassword = !this.hiddenPassword;
    },
    async editProfile() {
      this.isInputting = !this.isInputting;
      if (this.isInputting) {
        const newEmp = {
          employeeId: this.user.id,
          managerId: this.user.managerId,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          gender: this.$refs.gender.checked,
          dateOfBirth: this.dateOfBirth,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email,
          address: this.user.address,
          role: this.user.role,
          imageFile: this.user.avatar,
          titleName: this.title.name,
          dateIn: this.title.dateIn,
          dateOut: this.title.dateOut,
          salary: this.salary.salary,
        };

        const newIncomming = new FormData();
        newIncomming.append("employeeId", newEmp.employeeId);
        newIncomming.append("managerId", newEmp.managerId);
        newIncomming.append("firstName", newEmp.firstName);
        newIncomming.append("lastName", newEmp.lastName);
        newIncomming.append("gender", newEmp.gender);
        newIncomming.append("dateOfBirth", newEmp.dateOfBirth);
        newIncomming.append("phoneNumber", newEmp.phoneNumber);
        newIncomming.append("email", newEmp.email);
        newIncomming.append("address", newEmp.address);
        newIncomming.append("role", newEmp.role);
        newIncomming.append("imageFile", this.selectedFile);
        newIncomming.append("titleName", newEmp.titleName);
        newIncomming.append("dateIn", newEmp.dateIn);
        newIncomming.append("dateOut", newEmp.dateOut);
        newIncomming.append("salary", newEmp.salary);

        console.log(newIncomming);
        await this.$store.dispatch("updateEmp", newIncomming);
        this.$store.dispatch("fetchEmpList");
      }
    },
    previewFile(e) {
      const file = e.target.files[0];
      this.selectedFile = file;

      const theReader = new FileReader();
      // Nhớ sử dụng async/await để chờ khi đã convert thành công image sang base64 thì mới bắt đầu gán cho biến newImage
      // đây là 1 kinh nghiệm của mình khi upload multiple ảnh
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    },
    chooseFile() {
      this.$refs.inputFile.click();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Reusable/user.less";
</style>
