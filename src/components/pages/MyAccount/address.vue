<template>
  <div :class="currentClass">
    <div class="w">
      <History :history="history"></History>
      <div class="my_address">
        <h1>Your Addresses</h1>
        <ul>
          <li @click="jump">
            <span>+</span>
            <p>Add addressrs</p>
          </li>
          <li v-for="(item,index) in addressList" :key="index">
            <div class="my_addressTop">
              Default:
              <span>{{item.isDefault?'true':'false'}}</span>
            </div>
            <div class="my_addressCenter">
              <div class="name">{{item.userName}}</div>
              <div
                class="address"
              >{{item.province}}{{item.city}}{{item.addressLine1}}{{item.addressLine2}}{{item.zipCode}}</div>
              <div class="city">{{item.country}}</div>
              <div class="phone">
                phone:
                <span>{{item.userPhone}}</span>
              </div>
              <div class="add">Add delivery instructions</div>
              <div class="btn">
                <span @click="edit(item)">edit</span>
                <span @click="AddressDelete(item.addressId)">delete</span>
                <span
                  v-if="!item.isDefault"
                  @click="Default(item.addressId,item.isDefault)"
                >Set to default</span>
                <span v-else @click="Default(item.addressId,item.isDefault)">Cancel the default</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getAddresslist, AddressDelete, Default } from "@/Ajax/modules/address";
import { mapState } from "vuex";
import History from "@/components/common/History.vue";
export default {
  name: "aaa",
  components: { History },
  data() {
    return {
      widthH: "",
      userInfo: {},
      addressList: [], //地址列表
      history: [
        { name: "My Account", url: "/myAccount" },
        { name: "Addresses", url: "" }
      ], //传递给历史导航组件的参数
      tableList: [
        "SHIPPING & RETURNS",
        "SHOPPING ONLINE",
        "WARRANTY & REPAIRS"
      ],
      list: [
        {
          src: require("../../../assets/myAccount/Orders.png"),
          url: "/myAccount/orders",
          text: "ORDERS"
        },
        {
          src: require("../../../assets/myAccount/Payment.png"),
          url: "/myAccount/payment",
          text: "PAYMENT"
        },
        {
          src: require("../../../assets/myAccount/Addresses.png"),
          url: "/myAccount/address",
          text: "ADDRESSES"
        },
        {
          src: require("../../../assets/myAccount/securityset.png"),
          url: "/myAccount/securityset",
          text: "SECURITY SET"
        },
        {
          src: require("../../../assets/myAccount/Giftcards.png"),
          url: "/myAccount/giftcards",
          text: "GIFT CARDS"
        },
        {
          src: require("../../../assets/myAccount/help.png"),
          url: "/myAccount/help",
          text: "HELP"
        }
      ]
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    if (this.$route.query.userInfo) {
      this.userInfo = JSON.parse(this.$route.query.userInfo);
    }
    console.log(this.userInfo);
    this.getAddresslist();
  },
  methods: {
    jump() {
      localStorage.removeItem("addressItem");
      this.$router.push({
        name: "/myAccount/address2"
        // query: {
        //   userInfo: JSON.stringify(this.userInfo)
        // }
      });
    },
    //获取用户地址集合
    getAddresslist() {
      getAddresslist(this.userId).then(res => {
        if (res.data.code == 0) {
          this.addressList = res.data.data;
        } else {
          this.addressList = [];
        }
        console.log(res);
      });
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
            message: "Delete the success",
            type: "success"
          });
          this.getAddresslist();
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
    //设置取消默认
    Default(id, isDefault) {
      let params = {
        addressId: id,
        userId: this.userId,
        isDefault: isDefault ? 0 : 1
      };
      Default(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "Set up the success",
            type: "success"
          });
          this.getAddresslist();
        }
      });
      //判断是不是从下单页面过来设置默认地址的。设置完成后返回
      if (params.isDefault == 1 && this.$route.query.sign) {
        this.$router.go(-1);
      }
    }
  },
  computed: {
    screenWidth() {
      return this.$root.widthH;
    },
    currentClass() {
      if (this.widthH > 1024) {
        return "h_center1";
      } else {
        return "h_center2";
      }
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
<style lang='scss' scoped>
/* 中间部分 */
@media (min-width: 1200px) {
  .w {
    max-width: 1200px;
    min-width: 980px;
    margin: 0 auto;
  }
}
.h_center1 {
  font-family: Regular;

  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    padding: 29px 0px 0px 0px;
    li {
      float: left;
      padding-right: 10px;
      a {
        color: #999999;
      }
    }
    .active {
      color: #231815;
    }
  }
  .my_address {
    padding-top: 46px;
    padding-bottom: 100px;
    h1 {
      font-size: 32px;
      color: #231815;
      padding-bottom: 30px;
    }
    ul {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    li:first-of-type {
      cursor: pointer;
    }
    li {
      width: 380px;
      height: 280px;
      border: 1px solid #ccc;
      padding: 20px 20px 26px 30px;
      box-sizing: border-box;
      .my_addressTop {
        border-bottom: 1px solid #e5f8ed;
        color: #231815;
        font-size: 14px;
        padding-bottom: 10px;
        span {
          color: #999999;
        }
      }
      .my_addressCenter {
        font-size: 14px;
        font-weight: 700;
        padding-top: 10px;
        .name,
        .city {
          color: #231815;
        }
        .address {
          color: #999999;
        }
        .phone {
          color: #231815;
          span {
            color: #999999;
          }
        }
        .add {
          display: inline-block;
          color: #0151ac;
          border-bottom: 1px solid #0151ac;
          margin-bottom: 30px;
        }
        .btn {
          span {
            display: inline-block;
            height: 35px;
            line-height: 35px;
            border: 1px solid #231815;
            padding: 0px 20px;
            color: #231815;
            font-size: 12px;
            text-transform: uppercase;
            cursor: pointer;
            &:last-child {
              float: right;
              padding: 0px 10px;
            }
          }
          span:hover {
            background-color: rgb(234, 230, 45);
          }
        }
      }
      &:first-child {
        border: 1px dashed #ccc;
        margin-left: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 30px;
          color: #ccc;
        }
        p {
          color: #666666;
          font-size: 24px;
        }
      }
    }
  }
}
.h_center2 {
  font-family: Regular;
  ol {
    background-color: #fff;
    font-size: 0.14rem;
    color: #999999;
    overflow: hidden;
    padding: 0.29rem 0rem 0rem 0rem;
    li {
      float: left;
      padding-right: 0.1rem;
      a {
        color: #999999;
      }
    }
    .active {
      color: #231815;
    }
  }
  .my_address {
    padding-top: 0.46rem;
    padding-bottom: 1rem;
    h1 {
      font-size: 0.32rem;
      color: #231815;
      padding-bottom: 0.3rem;
      width: 100%;
      text-align: center;
    }
    ul {
      overflow: hidden;
    }
    li {
      width: 90%;
      margin: 0 auto;
      border: 1px solid #ccc;
      padding: 0.2rem 0.2rem 0.26rem 0.3rem;
      box-sizing: border-box;
      margin-bottom: 0.3rem;
      .my_addressTop {
        border-bottom: 1px solid #e5f8ed;
        color: #231815;
        font-size: 0.14rem;
        padding-bottom: 0.1rem;
        span {
          color: #999999;
        }
      }
      .my_addressCenter {
        font-size: 0.14rem;
        font-weight: 700;
        padding-top: 0.1rem;
        .name,
        .city {
          color: #231815;
        }
        .address {
          color: #999999;
        }
        .phone {
          color: #231815;
          span {
            color: #999999;
          }
        }
        .add {
          display: inline-block;
          color: #0151ac;
          border-bottom: 0.01rem solid #0151ac;
          margin-bottom: 0.3rem;
        }
        .btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            display: inline-block;
            height: 0.35rem;
            line-height: 0.35rem;
            border: 0.01rem solid #231815;
            padding: 0rem 0.1rem;
            color: #231815;
            font-size: 0.12rem;
            text-transform: uppercase;
            &:last-child {
              float: right;
              padding: 0rem 0.1rem;
            }
          }
        }
      }
      &:first-child {
        height: 2rem;
        border: 0.01rem dashed #ccc;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        span {
          font-size: 0.3rem;
          color: #ccc;
        }
        p {
          color: #666666;
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
