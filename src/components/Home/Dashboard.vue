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
          <router-link
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
          </router-link>
        </tbody>
      </table>
    </div>
    <div v-else class="manager-only"><h1>Manager Only!</h1></div>
    <router-view class="singleUser" @changeDisplay="singleDisplay" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/HomePage/home.less";
@import "~@/assets/link.less";
</style>
