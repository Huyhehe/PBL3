<template>
  <div class="receipt">
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
              <span>Hãng sản xuất</span>
              <input type="text" placeholder="Enter" />
            </div>
            <div class="input-box">
              <span>Từ ngày</span>
              <a-date-picker v-model="fromDate" />
            </div>
            <div class="input-box">
              <span>Đến ngày</span>
              <a-date-picker v-model="toDate" />
            </div>
          </div>
          <div class="display-box">
            <table>
              <thead>
                <tr>
                  <th v-for="title in titles" :key="title">{{ title }}</th>
                </tr>
              </thead>
            </table>
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
        <span class="receipt-info-total">Tổng: VND </span>
        <div class="receipt-info-button">
          <button>Hoàn tất</button>
        </div>
      </div>
      <span class="line-barrier"></span>
      <div class="receipt-cart">
        <div class="receipt-cart-item">
          <div class="receipt-cart-item-image">
            <img
              :src="
                require('@/assets/image/commodity/accessories/elixir-string.jpg')
              "
              alt="elixir-string"
            />
          </div>
          <div class="receipt-cart-item-info">
            <span class="type">Phụ kiện guitar</span>
            <span>Tên mặt hàng: Eko NXT-Series A-100</span>
            <span>Mã mặt hàng: ekonxta100</span>
            <span>Đơn giá (VND): 4.000.000</span>
            <div class="quantity-box">
              <span>Số lượng: 01</span>
              <div class="quantity-box-buttons">
                <button>-</button>
                <button>+</button>
              </div>
            </div>
          </div>
          <div class="receipt-cart-item-button">
            <button>
              <unicon name="trash-alt" width="30px" height="30px" />
            </button>
          </div>
        </div>
        <div class="receipt-cart-item">
          <div class="receipt-cart-item-image">
            <img
              :src="
                require('@/assets/image/commodity/guitar/yamaha-acousticguitar.jpg')
              "
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      titles: ["ID", "Loại", "Tên", "Số lượng", "Tổng tiền"],
      inputs: [
        {
          label: "Tên khách hàng",
          ref: "customerName",
        },
        {
          label: "Số điện thoại",
          ref: "customerPhoneNumber",
        },
        {
          label: "Địa chỉ",
          ref: "customerAddress",
        },
      ],
      customer: {
        customerName: "",
        customerPhoneNumber: "",
        customerAddress: "",
      },
      receipt: {},
      receiptList: [],
      fromDate: null,
      toDate: null,
    };
  },
  created() {
    this.$store.dispatch("getAllReceipt");
    this.receiptList = this.getAllReceipt;
  },
  computed: {
    ...mapGetters(["getAllReceipt"]),
  },
  methods: {
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
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Receipt/receipt.less";
</style>
