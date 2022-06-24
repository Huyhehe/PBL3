<template>
  <div class="home">
    <div
      v-if="isManager"
      class="home-container"
      :class="isSingleDisplay ? 'disable' : ''"
    >
      <div class="home-container-title">Danh sách nhân viên</div>
      <div class="search-form">
        <button @click="showAll">Show All</button>
        <button @click="addView(true)">Thêm nhân viên mới</button>
        <form @submit.prevent="filter()">
          <input v-model="empName" type="text" placeholder="Search by name" />
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="emp in empList"
            :key="emp.id"
            class="employee-row"
            @dblclick="changeRoute(emp)"
          >
            <td id="td-id">{{ emp.id }}</td>
            <td>{{ emp.firstName }} {{ emp.lastName }}</td>
            <td>{{ emp.dateOfBirth }}</td>
            <td>{{ emp.gender ? "Male" : "Female" }}</td>
            <td>{{ emp.phoneNumber }}</td>
            <td :class="emp.role == 'admin' ? 'is-manager' : 'is-employee'">
              {{ roleText(emp.role) }}
            </td>
          </tr>
          <!-- <router-link
            tag="tr"
            v-for="emp in empList"
            :key="emp.id"
            :to="{ name: 'User', params: { id: emp.id } }"
            class="employee-row"
          >
            <td id="td-id">{{ emp.id }}</td>
            <td>{{ emp.firstName }} {{ emp.lastName }}</td>
            <td>{{ emp.dateOfBirth }}</td>
            <td>{{ emp.gender ? "Male" : "Female" }}</td>
            <td>{{ emp.phoneNumber }}</td>
            <td :class="emp.role == 'admin' ? 'is-manager' : 'is-employee'">
              {{ emp.role == "admin" ? "Quản lý" : "Nhân viên" }}
            </td>
          </router-link> -->
        </tbody>
      </table>
    </div>
    <div v-else class="manager-only"><h1>Manager Only!</h1></div>
    <router-view class="singleUser" @changeDisplay="singleDisplay" />
    <AddEmp class="add-view" @back="back" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddEmp from "../Common Components/AddEmp.vue";
import router from "@/router";

export default {
  components: {
    AddEmp,
  },
  props: ["emps"],
  data() {
    return {
      empName: "",
      titles: ["id", "tên", "ngày sinh", "giới tính", "liên lạc", "chức vụ"],
      isSingleDisplay: false,
      empList: this.emps,
    };
  },
  computed: {
    ...mapGetters(["isManager"]),
    dateOfBirth(data) {
      return new Date(data)
        .toLocaleDateString()
        .replace("/", "-")
        .replace("/", "-");
    },
  },
  created() {},
  watch: {
    emps() {
      this.empList = this.emps;
    },
  },
  methods: {
    changeRoute(emp) {
      router.push({ name: "User", params: { id: emp.id } });
    },
    filter() {
      this.empList = this.emps;
      this.empList = this.empList.filter((emp) =>
        this.removeAccents(emp.firstName + emp.lastName)
          .toLowerCase()
          .includes(this.removeAccents(this.empName).toLowerCase())
      );
    },
    removeAccents(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    },
    singleDisplay(status) {
      this.isSingleDisplay = status;
    },
    showAll() {
      this.empList = this.emps;
      this.empName = "";
    },
    addView(flag) {
      const addView = document.querySelector(".add-view");
      if (flag) {
        addView.style.transform = "translateX(0)";
      } else {
        addView.style.transform = "";
      }
    },
    back(flag) {
      this.addView(flag.backFlag);
      // if (flag.addedFlag) {
      //   this.empList = this.getAl
      // }
    },
    roleText(role) {
      if (role.toLowerCase() == "admin") {
        return "Quản lý";
      }
      return "Nhân viên";
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/HomePage/home.less";
@import "~@/assets/link.less";
</style>
