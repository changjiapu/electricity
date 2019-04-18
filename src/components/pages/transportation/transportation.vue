<template>
  <div :class="currentClass">
    <div class="content">
      <div class="container">
        <p class="title">{{$t('m.transportation.title1')}}</p>
        <p class="title_2">{{$t('m.transportation.title2')}}</p>
        <div class="main" v-if="!isShowA">
          <span class="t_1">{{isShowAddress.userName}}</span>
          <span
            class="t_2"
          >{{isShowAddress.province}},{{isShowAddress.city}},{{isShowAddress.addressLine1}},{{isShowAddress.addressLine2}},{{isShowAddress.zipCode}}</span>
          <span>{{isShowAddress.country}}</span>
          <div class="iphone">
            <span>phone</span>
            <span>{{isShowAddress.userPhone}}</span>
          </div>
          <div class="btn">
            <span @click="edit(isShowAddress)">{{$t('m.transportation.title3')}}</span>
            <span @click="AddressDelete(isShowAddress.addressId)">{{$t('m.transportation.title4')}}</span>
            <span @click="gotoAddressList()">{{$t('m.transportation.title5')}}</span>
          </div>
        </div>
        <div class="add" @click="address()">+ {{$t('m.transportation.title6')}}</div>
      </div>
    </div>
    <div class="content2">
      <p class="title">{{$t('m.transportation.title7')}}</p>
      <!-- <p class="title_2">Is the address you'd like to use displayed below? If so, click</p> -->
      <div class="main">
        <div class="left">
          <div class="item_cart" v-if="!paramsList.length">
            <span class="first">{{$t('m.transportation.title8')}}</span>
            <span>{{$t('m.transportation.title9')}} {{shopAddress.province}}{{shopAddress.city}}{{shopAddress.addressLine1}}{{shopAddress.addressLine2}}</span>
            <span>{{$t('m.transportation.title10')}}{{isShowAddress.province}},{{isShowAddress.city}},{{isShowAddress.addressLine1}},{{isShowAddress.addressLine2}},{{isShowAddress.zipCode}}</span>
            <span>{{params.productName}}</span>
            <div class="number">
              <span>${{params.productPrice}} -- {{$t('m.transportation.title11')}} {{params.quantity}}</span>
              <el-input-number
                class="input"
                v-model="params.quantity"
                @change="handleChange()"
                :min="1"
                :max="10"
                size="small"
              ></el-input-number>
            </div>
            <span>{{$t('m.transportation.title12')}} {{shopAddress.senderName}}</span>
            <span class="last">{{$t('m.transportation.title13')}}</span>
          </div>
          <div class="item_cart" v-else>
            <span class="first">{{$t('m.transportation.title8')}}</span>
            <span>{{$t('m.transportation.title9')}} {{shopAddress.province}}{{shopAddress.city}}{{shopAddress.addressLine1}}{{shopAddress.addressLine2}}</span>
            <span>{{$t('m.transportation.title10')}}{{isShowAddress.province}},{{isShowAddress.city}},{{isShowAddress.addressLine1}},{{isShowAddress.addressLine2}},{{isShowAddress.zipCode}}</span>
            <div v-for="(item,index) in paramsList" :key="index" class="item_cart_i">
              <span>{{item.productName}}</span>
              <div class="number">
                <span>${{item.productPrice}} -- {{$t('m.transportation.title11')}} {{item.quantity}}</span>
                <el-input-number
                  class="input"
                  v-model="item.quantity"
                  @change="handleChange()"
                  :min="1"
                  :max="item.stock"
                  size="small"
                ></el-input-number>
              </div>
            </div>
            <span>{{$t('m.transportation.title12')}} {{shopAddress.senderName}}</span>
            <span class="last">{{$t('m.transportation.title13')}}</span>
          </div>
        </div>
        <div class="right">
          <span>{{$t('m.transportation.title14')}}</span>
          <!-- <span>FREE Two-Day Shipping on this order:</span>
          <span>Get fast, free delivery on this order by selecting "FREE Two - Day Shipping with a free trial of Amazon Prime" below.</span>-->
          <el-radio-group class="radio" v-model="ExpressId">
            <el-radio
              :label="item.shipId"
              v-for="(item,index) in shopDistribution"
              :key="index"
              @change="getShopDistribution(item.shipId)"
            >{{item.price?`$${item.price}`:''}}{{item.descript}}</el-radio>
          </el-radio-group>
          <div class="btn" @click="gotoPay()">{{$t('m.transportation.title15')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAddresslist, AddressDelete } from "@/Ajax/modules/address";
import {
  getDeliveryAddress,
  getStoreDistributions,
  addOrder
} from "@/Ajax/modules/transportation";
import { mapState } from "vuex";
import { setTimeout } from "timers";
import { resolve } from "url";
import { rejects } from "assert";
export default {
  name: "transportation",
  data() {
    return {
      params: {}, //详情页传递进来的参数
      paramsList: [], //购物车传递过来的数据
      isShowAddress: {}, //用户选择的收货地址
      isShowA: false,
      // totalPrice: "", //总价格
      totalNumber: "",
      shopAddress: {}, //店铺发货地址信息
      shopDistribution: [], //店铺配送方式
      ExpressId: "", //用户选择的配送方式id
      widthH: ""
    };
  },
  created() {
    //直接购买过来
    if (this.$route.params.params) {
      this.params = JSON.parse(this.$route.params.params);
    } else if (localStorage.getItem("params")) {
      this.params = JSON.parse(localStorage.getItem("params"));
    }
    //购物车过来
    if (this.$route.params.paramsList) {
      this.paramsList = JSON.parse(this.$route.params.paramsList);
    } else if (localStorage.getItem("paramsList")) {
      this.paramsList = JSON.parse(localStorage.getItem("paramsList"));
    }
    (this.widthH = this.$root.widthH), console.log(this.params);
    this.getAddresslist();
    this.getDeliveryAddress(1);
    this.getStoreDistributions(1);
  },
  methods: {
    getAddresslist() {
      getAddresslist(this.userId).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          // 筛选地址列表有默认选默认，没有选第一个
          for (let item of res.data.data) {
            if (item.isDefault == 1) {
              this.isShowAddress = item;
            } else {
              this.isShowAddress = res.data.data[0];
            }
          }
        } else {
          this.isShowA = true;
        }
      });
    },
    //获取店铺发货地址
    getDeliveryAddress(id) {
      getDeliveryAddress(id).then(res => {
        if (res.data.code == 0) {
          this.shopAddress = res.data.data;
        }
      });
    },
    //获取店铺配送方式
    getStoreDistributions(id) {
      getStoreDistributions(id).then(res => {
        if (res.data.code == 0) {
          this.shopDistribution = res.data.data;
          for (let item of res.data.data) {
            if (item.price == 0) {
              this.ExpressId = item.shipId;
            }
          }
        }
      });
    },
    //用户选择的配送方式
    getShopDistribution(id) {
      // this.ExpressId=id
      console.log(this.ExpressId);
    },
    //删除地址
    AddressDelete(id) {
      let params = {
        addressId: id,
        userId: this.userId
      };
      AddressDelete(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: this.$t('m.transportation.tips1'),
            type: "success"
          });
          setTimeout(() => {
            this.getAddresslist();
          }, 1000);
        }
      });
    },
    //编辑
    edit(item) {
      let params = {
        addressId: item.addressId,
        userName: item.userName,
        addressLine1: item.addressLine1,
        addressLine2: item.addressLine2,
        city: item.city,
        province: item.province,
        zipCode: item.zipCode,
        country: item.country,
        userPhone: item.userPhone,
        instructions: item.instructions,
        security: item.security
      };
      localStorage.setItem("addressItem", JSON.stringify(params));
      this.$router.push({
        name: "/myAccount/address2",
        params: {
          addressItem: JSON.stringify(params)
        }
      });
    },
    //去地址列表
    gotoAddressList() {
      this.$router.push({
        name: "/myAccount/address",
        params: {
          sign: 1
        }
      });
    },
    //数量改变时
    handleChange() {},
    //下单购买
    gotoPay() {
      //没收货地址先去添加地址
      if (!this.ExpressId) {
        this.$alert(this.$t('m.transportation.tips2'), "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      if (!this.isShowAddress.addressId) {
        this.$confirm(this.$t('m.transportation.tips3'), "Tips", {
          confirmButtonText: "confirm",
          cancelButtonText: "cancel",
          type: "warning"
        }).then(() => {
          this.$router.push({
            name: "/myAccount/address2"
          });
        });
      } else {
        // 两种下单方式
        if (!this.paramsList.length) {
          if (this.params.prescriptionId) {
            var params = {
              userId: this.userId,
              productId: this.params.productId,
              prescriptionId: this.params.prescriptionId,
              specId: this.params.specId,
              productCount: this.params.quantity,
              productPrice: this.params.productPrice,
              addressId: this.isShowAddress.addressId,
              // disId:'',
              expressId: this.ExpressId
            };
          } else {
            var params = {
              userId: this.userId,
              productId: this.params.productId,
              specId: this.params.specId,
              productCount: this.params.quantity,
              productPrice: this.params.productPrice,
              addressId: this.isShowAddress.addressId,
              // disId:'',
              expressId: this.ExpressId
            };
          }

          addOrder(params).then(res => {
            if (res.data.code == 0) {
              this.$router.push({
                name: "/myAccount/payment",
                params: {
                  id: res.data.data
                }
              });
            }
          });
        } else {
          let _this = this;
          getDetailIdList().then(value => {
            console.log(value.join());
            this.$router.push({
              name: "/myAccount/payment",
              params: {
                id: value.join()
              }
            });
          });
          //异步操作封装为promise返回订单id列表
          function getDetailIdList() {
            let detailIdList = []; //订单id列表
            return new Promise((resolve, reject) => {
              for (let item of _this.paramsList) {
                if (item.prescriptionId) {
                  var params = {
                    userId: _this.userId,
                    prescriptionId: item.prescriptionId,
                    productId: item.productId,
                    specId: item.specId,
                    productCount: item.quantity,
                    productPrice: item.productPrice,
                    addressId: _this.isShowAddress.addressId,
                    // disId:'',
                    expressId: _this.ExpressId
                  };
                } else {
                  var params = {
                    userId: _this.userId,
                    productId: item.productId,
                    specId: item.specId,
                    productCount: item.quantity,
                    productPrice: item.productPrice,
                    addressId: _this.isShowAddress.addressId,
                    // disId:'',
                    expressId: _this.ExpressId
                  };
                }

                addOrder(params).then(res => {
                  if (res.data.code == 0) {
                    detailIdList.push(res.data.data);
                    //此处判断是否最后一次循环
                    if (detailIdList.length == _this.paramsList.length) {
                      resolve(detailIdList);
                    }
                  }
                });
              }
            });
          }
        }
      }
    },
    address() {
      this.$router.push("/myAccount/address2");
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "transportation";
      } else {
        return "transportation2";
      }
    },
    screenWidth() {
      return this.$root.widthH;
    },
    ...mapState(["userId"])
  },
  watch: {
    screenWidth(val) {
      this.widthH = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.transportation {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../../../assets/payOrder/beijing.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .container {
      margin: 50px 0;
      width: 1294px;
      .title {
        font-size: 32px;
        font-family: "Regular";
        font-weight: bold;
        color: #231815;
      }
      .title_2 {
        font-size: 14px;
        font-family: "Regular";
        font-weight: bold;
        color: #999999;
        padding-bottom: 10px;
        border-bottom: 1px solid #cccccc;
      }
      .main {
        margin-top: 30px;
        height: 280px;
        width: 600px;
        padding: 50px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        font-family: "regular";
        font-weight: bold;
        box-shadow: 3px 3px 3px #cccccc;
        box-sizing: border-box;
        span {
          font-size: 14px;
        }
        .t_1 {
          font-size: 18px;
        }
        .t_2 {
          color: #999999;
          width: 450px;
        }
        .iphone span:first-of-type {
          color: #999999;
        }
        .btn {
          display: flex;
          margin-top: 30px;
          span {
            border: 1px solid #231815;
            height: 35px;
            width: 100px;
            text-align: center;
            line-height: 35px;
            text-transform: Uppercase;
            cursor: pointer;
            &:not(:first-of-type) {
              margin-left: 10px;
            }
            &:last-of-type {
              width: 200px;
              margin-left: 88px;
            }
          }
          span:hover {
            background-color: #f4d925;
          }
        }
      }
      .add {
        font-size: 16px;
        font-family: "Regular";
        font-weight: bold;
        margin: 50px 0 35px 35px;
        cursor: pointer;
      }
    }
  }
  .content2 {
    margin: 50px 0;
    width: 1294px;
    .title {
      font-size: 32px;
      font-family: "Regular";
      font-weight: bold;
      color: #231815;
    }
    .title_2 {
      font-size: 14px;
      font-family: "Regular";
      font-weight: bold;
      color: #999999;
      padding-bottom: 10px;
      border-bottom: 1px solid #cccccc;
    }
    .main {
      margin-top: 30px;
      width: 80%;
      background-color: #ffffff;
      box-shadow: 3px 3px 3px #cccccc;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .left {
        box-sizing: border-box;
        width: 50%;
        padding: 50px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        font-family: "Regular";
        font-weight: bold;
        .item_cart {
          display: flex;
          flex-direction: column;
          .item_cart_i {
            margin-top: 20px;
          }
          span {
            font-size: 14px;
            color: #231815;
            &:nth-of-type(3) {
              margin-top: 30px;
              color: #999999;
            }
          }
          .number {
            display: flex;
            align-items: center;
            .input {
              margin-left: 30px;
            }
          }
          .first {
            font-size: 18px;
          }
          .last {
            margin-top: 17px;
            color: #236fa9;
            font-size: 12px;
          }
        }
      }
      .right {
        box-sizing: border-box;
        padding: 50px 50px 50px 50px;
        display: flex;
        flex-direction: column;
        .radio {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
        }
        .el-radio + .el-radio {
          margin-top: 10px;
          margin-left: 0px;
        }
        span {
          font-weight: bold;
          font-family: "regular";
          color: #999999;
          font-size: 16px;
          &:first-of-type {
            color: #231815;
          }
        }
        .btn {
          font-weight: bold;
          font-family: "regular";
          margin-top: 10px;
          height: 35px;
          width: 200px;
          background-color: #f4d925;
          border-radius: 5px;
          line-height: 35px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
.transportation2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    padding: 0.3rem;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../../../assets/payOrder/beijing.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .container {
      margin: 0.5rem 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 0.32rem;
        font-family: "Regular";
        font-weight: bold;
        color: #231815;
      }
      .title_2 {
        font-size: 0.14rem;
        font-family: "Regular";
        font-weight: bold;
        color: #999999;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #cccccc;
      }
      .main {
        margin-top: 0.3rem;
        width: 7rem;
        padding: 0.5rem 0.2rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        font-family: "regular";
        font-weight: bold;
        box-shadow: 3px 3px 3px #cccccc;
        box-sizing: border-box;
        span {
          font-size: 0.14rem;
        }
        .t_1 {
          font-size: 0.18rem;
        }
        .t_2 {
          color: #999999;
          width: 4.5rem;
        }
        .iphone span:first-of-type {
          color: #999999;
        }
        .btn {
          display: flex;
          justify-content: space-between;
          margin-top: 0.3rem;
          span {
            border: 1px solid #231815;
            height: 0.35rem;
            width: 1rem;
            text-align: center;
            line-height: 0.35rem;
            text-transform: Uppercase;
            cursor: pointer;
            &:not(:first-of-type) {
            }
            &:last-of-type {
              width: 3.8rem;
            }
          }
          span:hover {
            background-color: #f4d925;
          }
        }
      }
      .add {
        font-size: 0.16rem;
        font-family: "Regular";
        font-weight: bold;
        margin: 0.5rem 0 0.35rem 0.35rem;
        cursor: pointer;
      }
    }
  }
  .content2 {
    padding: 0.3rem;
    box-sizing: border-box;
    margin: 0.5rem 0;
    width: 100%;
    .title {
      font-size: 0.32rem;
      font-family: "Regular";
      font-weight: bold;
      color: #231815;
    }
    .title_2 {
      font-size: 0.14rem;
      font-family: "Regular";
      font-weight: bold;
      color: #999999;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #cccccc;
    }
    .main {
      margin-top: 0.3rem;
      width: 98%;
      background-color: #ffffff;
      box-shadow: 3px 3px 3px #cccccc;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .left {
        box-sizing: border-box;
        width: 100%;
        padding: 0.2rem;
        padding-bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        font-family: "Regular";
        font-weight: bold;
        .item_cart {
          display: flex;
          flex-direction: column;
          .item_cart_i {
            margin-top: 0.2rem;
          }
          span {
            font-size: 0.14rem;
            color: #231815;
            &:nth-of-type(3) {
              margin-top: 0.3rem;
              color: #999999;
            }
          }
          .number {
            display: flex;
            align-items: center;
            .input {
              margin-left: 0.3rem;
            }
          }
          .first {
            font-size: 0.18rem;
          }
          .last {
            margin-top: 0.17rem;
            color: #236fa9;
            font-size: 0.12rem;
          }
        }
      }
      .right {
        box-sizing: border-box;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        .radio {
          margin-top: 0.2rem;
          display: flex;
          flex-direction: column;
        }
        .el-radio + .el-radio {
          margin-top: 0.1rem;
          margin-left: 0px;
        }
        span {
          font-weight: bold;
          font-family: "regular";
          color: #999999;
          font-size: 0.16rem;
          &:first-of-type {
            color: #231815;
          }
        }
        .btn {
          font-weight: bold;
          font-family: "regular";
          margin-top: 0.3rem;
          height: 0.6rem;
          width: 100%;
          font-size: 0.26rem;
          background-color: #f4d925;
          border-radius: 0.5rem;
          line-height: 0.6rem;
          text-align: center;
        }
      }
    }
  }
}
</style>


