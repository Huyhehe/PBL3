<template>
  <div class="home">
    <div
      v-if="isManager"
      class="home-container"
      :class="isSingleDisplay ? 'disable' : ''"
    >
      <h1>Trang chủ</h1>
      <div class="search-form">
        <button @click="bindingData">Show All</button>
        <form @submit.prevent="filter()">
          <input v-model="empName" type="text" placeholder="Search by name" />
        </form>
      </div>
      <table>
        <tr>
          <th v-for="title in titles" :key="title">{{ title }}</th>
        </tr>
        <router-link
          tag="tr"
          v-for="emp in empList"
          :key="emp.id"
          :to="{ name: 'User', params: { id: emp.id } }"
          class="employee-row"
        >
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.age }}</td>
          <td>{{ emp.gender }}</td>
          <td>{{ emp.contact }}</td>
          <td :class="emp.status == 'Online' ? 'is-online' : 'is-offline'">
            {{ emp.status }}
          </td>
        </router-link>
      </table>
    </div>
    <div v-else class="manager-only"><h1>Manager Only!</h1></div>
    <router-view class="singleUser" @changeDisplay="singleDisplay" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      empName: "",
      titles: ["ID", "Name", "Age", "Gender", "Contact", "Status"],
      isSingleDisplay: false,
      empList: [],
    };
  },
  computed: {
    ...mapGetters(["isManager", "getListEmp"]),
  },
  created() {
    this.fetchEmpList();
    this.empList = this.getListEmp;
  },
  methods: {
    ...mapActions(["fetchEmpList"]),
    filter() {
      this.bindingData();
      this.empList = this.empList.filter((emp) =>
        this.removeAccents(emp.name)
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
    bindingData() {
      this.empList = this.getListEmp;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/HomePage/home.less";
@import "~@/assets/link.less";
</style>
