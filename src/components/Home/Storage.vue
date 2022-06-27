<template>
  <div class="storage">
    <div class="storage-header">
      <h1>Kho hàng</h1>
    </div>
    <div class="storage-display">
      <div class="toolbox">
        <div class="toolbox-type">
          <select v-model="type" @change="selectFilter">
            <option value="All">Tất cả</option>
            <option value="Guitar">Guitar</option>
            <option value="Phụ kiện">Phụ kiện</option>
          </select>
        </div>
        <div class="toolbox-brand">
          <input
            type="text"
            placeholder="Hãng sản xuất"
            v-model="brand"
            @change="searchFilter"
          />
        </div>
        <div class="toolbox-add">
          <button @click="changeDisplay(true)">
            <span>Thêm vào kho hàng</span>
            <unicon name="plus" />
          </button>
        </div>
      </div>
      <div class="main">
        <div class="commodity-container">
          <div
            class="wrapper"
            v-for="commodity in commodityList"
            :key="commodity.commodityId"
          >
            <div class="commodity-card">
              <div class="card-image">
                <img :src="commodity.imageUri" :alt="commodity.name" />
              </div>
              <div class="card-content">
                <span class="card-content-brand">{{ commodity.brand }}</span>
                <span class="card-content-name">{{
                  truncate(commodity.name, 30)
                }}</span>
                <span class="card-content-price"
                  >{{ formatMoney(commodity.price) }} VND</span
                >
              </div>
              <div class="card-button">
                <button @click="addToCart(commodity)">Thêm vào giỏ hàng</button>
              </div>
              <button
                class="del-button"
                @click="deleteCommodity(commodity.commodityId)"
              >
                <unicon name="trash-alt" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="storage-adding">
      <div class="adding-header">
        <button @click="changeDisplay(false)">
          <unicon name="angle-left-b" />
          <span>Trở lại</span>
        </button>
      </div>
      <div class="adding-body">
        <div class="image-add">
          <div class="image-container">
            <unicon name="camera-plus" width="40" height="40" />
            <img alt="" :src="newImage || emptyImage" />
          </div>
          <input type="file" accept="image/*" @change="previewFile" />
        </div>
        <div class="info-add">
          <div class="left">
            <div class="input-box">
              <span>Loại mặt hàng</span>
              <select v-model="newCommodity.type">
                <option value="Guitar">Guitar</option>
                <option value="Capo">Capo</option>
                <option value="String">String</option>
              </select>
            </div>
            <div class="input-box">
              <span>Hãng sản xuất</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.brand"
              />
            </div>
            <div class="input-box">
              <span>Tên mặt hàng</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.name"
              />
            </div>
            <div class="input-box">
              <span>ID</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.commodityId"
              />
            </div>
          </div>
          <div class="right">
            <div class="input-box">
              <span>Đơn giá</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.price"
              />
            </div>
            <div class="input-box">
              <span>Số lượng</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.quantity"
              />
            </div>
            <div class="input-box">
              <span>Thời hạn bảo hành</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.warrantyTime"
              />
            </div>
          </div>
          <div class="right">
            <div class="input-box">
              <span>Tên nhà cung cấp</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.enterpriseName"
              />
            </div>
            <div class="input-box">
              <span>Số điện thoại nhà cung cấp</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.enterprisePhoneNumber"
              />
            </div>
            <div class="input-box">
              <span>Địa chỉ nhà cung cấp</span>
              <input
                type="text"
                placeholder="Enter"
                v-model="newCommodity.enterpriseAddress"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="adding-button">
        <button @click="submit">Thêm vào kho</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      commodityList: [],
      newImage: "",
      emptyImage: null,
      newCommodity: {
        type: "Guitar",
      },
      selectedFile: null,
      type: "All",
      brand: "",
    };
  },
  async created() {
    await this.$store.dispatch("fetchCommodityList");
    this.commodityList = this.getAllCommodity;
  },
  computed: {
    ...mapGetters(["getAllCommodity"]),
  },
  methods: {
    changeDisplay(flag) {
      const addingPage = document.querySelector(".storage-adding");
      if (flag) {
        addingPage.style.transform = "translateX(0)";
      } else {
        addingPage.style.transform = "";
      }
    },
    previewFile(event) {
      const file = event.target.files[0];
      const theReader = new FileReader();
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);

      this.selectedFile = file;
    },
    async submit() {
      this.newCommodity.price = +this.newCommodity.price;
      this.newCommodity.quantity = +this.newCommodity.quantity;
      const newIncomming = new FormData();
      newIncomming.append("commodityId", this.newCommodity.commodityId);
      newIncomming.append("type", this.newCommodity.type);
      newIncomming.append("quantity", this.newCommodity.quantity);
      newIncomming.append("brand", this.newCommodity.brand);
      newIncomming.append("name", this.newCommodity.name);
      newIncomming.append("price", this.newCommodity.price);
      newIncomming.append("warrantyTime", this.newCommodity.warrantyTime);
      newIncomming.append("imageFile", this.selectedFile);
      newIncomming.append("enterpriseName", this.newCommodity.enterpriseName);
      newIncomming.append(
        "enterprisePhoneNumber",
        this.newCommodity.enterprisePhoneNumber
      );
      newIncomming.append(
        "enterpriseAddress",
        this.newCommodity.enterpriseAddress
      );
      await this.$store.dispatch("addCommodity", newIncomming);
      await this.$store.dispatch("fetchCommodityList");
      this.commodityList = this.getAllCommodity;
      this.changeDisplay(false);
    },
    async deleteCommodity(id) {
      console.log(id);
      await this.$store.dispatch("deleteCommodity", id);
      await this.$store.dispatch("fetchCommodityList");
      this.commodityList = this.getAllCommodity;
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
    selectFilter() {
      this.commodityList = this.getAllCommodity;
      if (this.type == "Guitar") {
        this.commodityList = this.commodityList.filter(
          (commodity) => commodity.type == "Guitar"
        );
      } else if (this.type == "All") {
        this.commodityList = this.getAllCommodity;
      } else {
        this.commodityList = this.commodityList.filter(
          (commodity) => commodity.type != "Guitar"
        );
      }
    },
    searchFilter() {
      this.commodityList = this.getAllCommodity;
      if (this.brand != "") {
        this.commodityList = this.commodityList.filter(
          (commodity) =>
            commodity.brand.toLowerCase() == this.brand.toLowerCase()
        );
      }
    },
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "\u2026" : str;
    },
    addToCart(commodity) {
      this.$store.commit("SET_SELECTED_LIST", commodity);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/Display/Storage/storage.less";
</style>
