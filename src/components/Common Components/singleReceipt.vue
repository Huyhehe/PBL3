<template>
  <div class="single-receipt">
    <div class="container">
      <div class="container-item title">
        <div class="left">
          <h1>HÓA ĐƠN</h1>
          <span>#{{ receipt.receiptId }}</span>
        </div>
        <div class="right">
          <span>Ngày xuất hóa đơn {{ receipt.date }}</span>
        </div>
      </div>
      <div class="container-item info">
        <div class="info-item employee">
          <span>NGƯỜI XUẤT:</span>
          <h2>{{ receipt.empName }}</h2>
          <span>Mã nhân viên: #{{ receipt.employeeId }}</span>
          <span>{{ shopAddress }}</span>
        </div>
        <div class="info-item customer">
          <span>KHÁCH HÀNG:</span>
          <h2>{{ receipt.customer.name }}</h2>
          <span>{{ receipt.customer.phoneNumber }}</span>
          <span>{{ receipt.customer.address }}</span>
        </div>
      </div>
      <div class="container-item total">
        <div class="total-item label">
          <span class="quantity">SỐ LƯỢNG</span>
          <span class="name">LOẠI HÀNG</span>
          <span class="price">ĐƠN GIÁ</span>
        </div>
        <div class="pay-list">
          <div
            class="pay-list-item"
            v-for="commodity in receipt.commodity"
            :key="commodity.commodityId"
          >
            <span class="quantity">{{ commodity.quantity }}</span>
            <span class="name">{{ commodity.brand }} {{ commodity.name }}</span>
            <span class="price">VND {{ formatMoney(commodity.price) }}</span>
          </div>
        </div>
        <span class="barrier"></span>
        <div class="cost">
          <span>TỔNG CỘNG</span>
          <span>VND {{ formatMoney(totalPrice) }}</span>
        </div>
      </div>
      <div class="container-item exit">
        <button @click="popUpDown">Thoát</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["receipt"],
  data() {
    return {
      shopAddress: "52 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng",
      totalPrice: this.receipt.totalPrice,
    };
  },
  created() {},
  methods: {
    popUpDown() {
      this.$emit("popUpStatus", false);
    },
    formatMoney(num) {
      num = +num;
      var p = num.toFixed(2).split(".");
      return p[0]
        .split("")
        .reverse()
        .reduce(function (acc, num, i) {
          return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
        }, "");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Receipt/singleReceipt.less";
</style>
