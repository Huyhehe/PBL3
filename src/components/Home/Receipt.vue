<template>
  <div class="receipt">
    <Alert :mess="alertMsg" />
    <div class="receipt-header">
      <span>Hóa đơn</span>
    </div>
    <div class="receipt-display">
      <div class="receipt-add-button" @click="changeDisplay(true)">
        <span>Thêm hóa đơn mới</span>
        <unicon name="plus" />
      </div>
      <div class="receipt-content">
        <div class="receipt-box-view">
          <div
            class="receipt-box"
            v-for="receipt in receiptList"
            :key="receipt.receiptId"
            @click="popUp(receipt)"
          >
            <div class="receipt-title">
              <span>{{ receipt.receiptId }}</span>
            </div>
            <div class="receipt-main">
              <span>{{ receipt.customer.name }}</span>
              <span>{{ receipt.customer.phoneNumber }}</span>
              <span>{{ formatMoney(receipt.totalPrice) }} VND</span>
            </div>
            <div class="receipt-time">
              <span>{{ receipt.date }}</span>
            </div>
          </div>
        </div>
        <span class="receipt-box-barrier"></span>
        <div class="receipt-box-board">
          <div class="search-box">
            <div class="input-box">
              <span>Từ ngày</span>
              <a-date-picker v-model="fromDate" />
            </div>
            <div class="input-box">
              <span>Đến ngày</span>
              <a-date-picker v-model="toDate" />
            </div>
            <div class="button-box">
              <button @click="getButtonClick">Xem</button>
              <button @click="changeBoardView">
                {{ isRevenue ? "Lịch sử" : "Thống kê" }}
              </button>
            </div>
          </div>
          <div class="display-box">
            <div class="display-box-item" v-if="!isRevenue">
              <table>
                <thead>
                  <tr>
                    <th v-for="title in titles" :key="title">{{ title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cmd in commoditySoldList" :key="cmd.commodityId">
                    <td>{{ cmd.commodityId }}</td>
                    <td>{{ cmd.type }}</td>
                    <td>{{ cmd.name }}</td>
                    <td>{{ cmd.quantity }}</td>
                    <td>{{ formatMoney(cmd.price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="display-box-item" v-if="isRevenue">
              <LineChart :revenue="revenue" />
            </div>
            <div class="final-info">
              <div class="final-info-button">
                <button @click="download">Tải xuống</button>
              </div>
              <div class="final-info-money">
                <span id="red" v-if="isRevenue">-{{ getMoneyOut }}</span>
                <span id="green">+{{ getMoneyIn }}</span>
                <span v-if="isRevenue">Tổng cộng: {{ getFinalTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="receipt-add">
      <div class="adding-header">
        <button @click="changeDisplay(false)">
          <unicon name="angle-left-b" />
          <span>Trở lại</span>
        </button>
      </div>
      <div class="receipt-info">
        <div class="receipt-info-form">
          <form>
            <div class="receipt-info-form-item">
              <label>Tên khách hàng</label>
              <input
                type="text"
                placeholder="Enter"
                v-model="customer.customerName"
              />
            </div>
            <div class="receipt-info-form-item">
              <label>Số điện thoại</label>
              <input
                type="text"
                placeholder="Enter"
                v-model="customer.customerPhoneNumber"
              />
            </div>
            <div class="receipt-info-form-item">
              <label>Địa chỉ</label>
              <input
                type="text"
                placeholder="Enter"
                v-model="customer.customerAddress"
              />
            </div>
          </form>
        </div>
        <span class="receipt-info-total"
          >Tổng: VND {{ formatMoney(totalPrice) }}
        </span>
        <div class="receipt-info-button">
          <button @click="addReceipt">Hoàn tất</button>
        </div>
      </div>
      <span class="line-barrier"></span>
      <div class="receipt-cart">
        <div
          class="receipt-cart-item"
          v-for="item in selectedList"
          :key="item.commodityId"
        >
          <div class="receipt-cart-item-image">
            <img :src="item.imageUri" :alt="item.name" />
          </div>
          <div class="receipt-cart-item-info">
            <span class="type">{{ item.type }}</span>
            <span>Tên mặt hàng: {{ item.brand }} {{ item.name }}</span>
            <span>Mã mặt hàng: #{{ item.commodityId }}</span>
            <span>Đơn giá (VND): {{ formatMoney(item.price) }}</span>
            <div class="quantity-box">
              <span>Số lượng: {{ item.quantity }}</span>
              <div class="quantity-box-buttons">
                <button @click="changeQuantity(item, false)">-</button>
                <button @click="changeQuantity(item, true)">+</button>
              </div>
            </div>
          </div>
          <div class="receipt-cart-item-button">
            <button @click="removeCartItem(item.commodityId)">
              <unicon name="trash-alt" width="30px" height="30px" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isPopUp" class="single-receipt-display">
      <singleReceipt :receipt="receipt" @popUpStatus="popUpDown" />
    </div>
  </div>
</template>

<script>
import LineChart from "../Common Components/LineChart.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import singleReceipt from "../Common Components/singleReceipt.vue";
import Alert from "../Common Components/Alert.vue";

export default {
  components: {
    singleReceipt,
    LineChart,
    Alert,
  },
  data() {
    return {
      titles: ["ID", "Loại", "Tên", "Số lượng", "Đơn giá"],
      customer: {
        customerName: "",
        customerPhoneNumber: "",
        customerAddress: "",
      },
      receipt: {},
      receiptList: [],
      fromDate: null,
      toDate: null,
      isPopUp: false,
      empName: "",
      selectedList: [],
      totalPrice: 0,
      revenue: [],
      commoditySoldList: [],
      alertMsg: "",
      isRevenue: true,
    };
  },
  async created() {
    await this.$store.dispatch("getAllReceipt");
    this.receiptList = this.getAllReceipt;
    this.selectedList = this.getSelectedList;
  },
  watch: {
    selectedList() {
      this.updateTotalPrice();
    },
    fromDate() {
      this.fromDate = new Date(new Date(this.fromDate).setHours(7))
        .toISOString()
        .slice(0, 10);
    },
    toDate() {
      this.toDate = new Date(new Date(this.toDate).setHours(7))
        .toISOString()
        .slice(0, 10);
    },
  },
  computed: {
    ...mapGetters(["getAllReceipt", "getSelectedList"]),
    getFinalTotal() {
      let final = 0;
      this.revenue.map((r) => {
        final += r.moneyIn - r.moneyOut;
      });
      return this.formatMoney(final);
    },
    getMoneyIn() {
      let moneyIn = 0;
      this.revenue.map((r) => {
        moneyIn += r.moneyIn;
      });
      return this.formatMoney(moneyIn);
    },
    getMoneyOut() {
      let moneyOut = 0;
      this.revenue.map((r) => {
        moneyOut += r.moneyOut;
      });
      return this.formatMoney(moneyOut);
    },
  },
  methods: {
    alertMessage() {
      this.alertMsg = this.$store.getters.getWarningMessage;
      const alertMessage = document.querySelector(".error-alert");
      setTimeout(() => {
        alertMessage.classList.remove("show");
      }, 3000);
    },
    changeDisplay(flag) {
      const addingPage = document.querySelector(".receipt-add");
      if (flag) {
        addingPage.style.transform = "translateX(0)";
      } else {
        addingPage.style.transform = "";
      }
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
    async popUp(receipt) {
      this.receipt = receipt;
      await this.getEmpName();
      this.receipt.empName = this.empName;
      this.isPopUp = true;
    },
    popUpDown(status) {
      this.isPopUp = status;
    },
    async getEmpName() {
      const id = this.receipt.employeeId;
      const jwt = localStorage.getItem("jwt");
      const res = await axios.get(
        `https://shopguitar.azurewebsites.net/api/Employee/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      this.empName = res.data.firstName + " " + res.data.lastName;
    },
    removeCartItem(id) {
      this.$store.commit("REMOVE_SELECTED_ITEM", id);
      this.selectedList = this.getSelectedList;
      this.updateTotalPrice();
    },
    updateTotalPrice() {
      this.totalPrice = 0;
      this.selectedList.map((item) => {
        this.totalPrice += item.quantity * item.price;
      });
    },
    changeQuantity(item, flag) {
      const id = item.commodityId;
      this.$store.commit("CHANGE_SELECTED_QUANTITY", { id, flag });
      this.selectedList = this.getSelectedList;
      this.updateTotalPrice();
    },
    async addReceipt() {
      const shortenList = [];
      for (const index in this.selectedList) {
        shortenList[index] = {
          item1: this.selectedList[index].commodityId,
          item2: this.selectedList[index].quantity,
        };
      }
      const newReceipt = {
        commodity: shortenList,
        customerName: this.customer.customerName,
        customerPhoneNumber: this.customer.customerPhoneNumber,
        customerAddress: this.customer.customerAddress,
      };
      await this.$store.dispatch("addReceipt", newReceipt);
      if (!this.$store.getters.getAddReceiptSuccessful) {
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      await this.$store.dispatch("getAllReceipt");
      this.receiptList = this.getAllReceipt;
      this.changeDisplay(false);
      this.resetInput();
    },
    resetInput() {
      this.$store.commit("RESET_SELECTED_LIST");
      this.selectedList = this.getSelectedList;
      this.customer = {
        customerName: "",
        customerPhoneNumber: "",
        customerAddress: "",
      };
    },
    async updateData() {
      this.$store.commit("SET_LINECHART_LIST", []);
      const fromDate = this.fromDate;
      const toDate = this.toDate;
      if (fromDate == null || toDate == null) {
        this.$store.commit("SET_WARNING_MESSAGE", "Thông tin không được trống");
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      await this.$store.dispatch("getLineChartData", { fromDate, toDate });
      this.revenue = await this.$store.getters.getLineChartList;
    },
    changeBoardView() {
      this.isRevenue = !this.isRevenue;
    },
    async getHistory() {
      this.$store.commit("SET_COMMODITY_SOLD_LIST", []);
      const fromDate = this.fromDate;
      const toDate = this.toDate;
      if (fromDate == null || toDate == null) {
        this.$store.commit("SET_WARNING_MESSAGE", "Thông tin không được trống");
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      await this.$store.dispatch("getCommoditySold", { fromDate, toDate });
      this.commoditySoldList = await this.$store.getters.getCommoditySoldList;
    },
    getButtonClick() {
      if (this.isRevenue) {
        this.updateData();
      } else {
        this.getHistory();
      }
    },
    downloadCommoditySold() {
      const fromDate = this.fromDate;
      const toDate = this.toDate;
      if (fromDate == null || toDate == null) {
        this.$store.commit("SET_WARNING_MESSAGE", "Thông tin không được trống");
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      this.$store.dispatch("downloadStorageFileByDate", { fromDate, toDate });
    },
    downloadRevenue() {
      const fromDate = this.fromDate;
      const toDate = this.toDate;
      if (fromDate == null || toDate == null) {
        this.$store.commit("SET_WARNING_MESSAGE", "Thông tin không được trống");
        const alert = document.querySelector(".error-alert");
        alert.classList.add("show");
        this.alertMessage();
        return;
      }
      this.$store.dispatch("downloadRevenue", { fromDate, toDate });
    },
    download() {
      if (this.isRevenue) {
        this.downloadRevenue();
      } else {
        this.downloadCommoditySold();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Receipt/receipt.less";
</style>
