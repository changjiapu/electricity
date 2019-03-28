<template>
  <div :class="currentClass">
    <Banner :userInfo="userInfo"/>
    <nav class="el-nav">
      <div v-for="(item,index) in list" @click="jump(item.url)" :key="index">
        <img :src="item.src" alt>
        <span>{{item.text}}</span>
      </div>
    </nav>
    <div class="el-introduce">
      <div class="el-introduce-left">
        <div>BEST AVIATOR SUNGLASSES IN 2018</div>
        <p>Sunglasses are essential fashion accessories for sunny days...</p>
        <div>VIEW MORE</div>
      </div>
      <div class="el-introduce-right">
        <div>TOP 5 SUNGLASSES BRANDS</div>
        <p>Sunglasses become the most important accessory , Not only because they shield our eyes from harsh UV rays,but also because they complete every outfit</p>
        <div>VIEW MORE</div>
      </div>
    </div>
    <div class="list_title">
      <p>Your recently viewed items and featured recommendations</p>
      <p>Inspired by your browsing history</p>
    </div>
    <product-list class="product-list"></product-list>
  </div>
</template>
<script>
import Banner from "./common/banner";
import ProductList from "@/components/common/SwiperProduct";
import { getuserInfo } from "@/Ajax/modules/myAccount";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
      widthH:'',
      list: [
        {
          src: require("../../../assets/myAccount/Orders.png"),
          url: "/myAccount/orders",
          text: "ORDERS"
        },
        {
          src: require("../../../assets/myAccount/Payment.png"),
          url: "/myAccount/payment",
          text: "PAYMENT OPTIONS"
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
        },
        {
          src: require("../../../assets/myAccount/help.png"),
          url: "/myAccount/customerSupport",
          text: "CustomerSupport"
        }
      ]
    };
  },
  components: {
    Banner,
    ProductList
  },
  created() {
    this.widthH = this.$root.widthH;
    this.getuserInfo();
  },
  methods: {
    jump(i) {
      this.$router.push({
        name: i
        // query: {
        //   userInfo: JSON.stringify(this.userInfo)
        // }
      });
    },
    //获取用户信息
    getuserInfo() {
      getuserInfo(this.userId).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.userInfo = res.data.data;
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "myAccount";
      } else {
        return "myAccount2";
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
<style lang='scss' scoped>
.myAccount2 {
  width: 100%;
  .el-nav {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 0.2rem;
  }
  .el-nav > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 2.2rem;
    height: 1.4rem;
    border: 1px solid #dddddd;
    border-radius: 2px;
    font-family: Regular;
    font-size: 0.14rem;
    color: #666666;
    margin-top: 47px;
    padding: 0.1rem 0;
    cursor: pointer;
  }
  .el-nav > div:hover {
    background-color: rgba(250, 250, 250, 0.9);
  }
  .el-nav span {
    margin-top: 24px;
  }
  .el-introduce {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .el-introduce-left,
  .el-introduce-right {
    margin-top: 0.2rem;
    box-sizing: border-box;
    width: 100%;
    height: 2.5rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 0;
  }
  .el-introduce-left {
    background-image: url("../../../assets/myAccount/nan.png");
    padding: 0.2rem;
    div:first-of-type {
      width: 3.15rem;
      font-size: 0.24rem;
      color: #231815;
      font-family: "reg";
      background-color: #f3dd4d;
      padding: 0 0.1rem;
    }
    p {
      width: 3.15rem;
      font-size: 0.16rem;
      color: #231815;
      font-family: "reg";
      background-color: #f3dd4d;
      padding: 0 0.1rem;
      margin-top: 5px;
    }
    div:last-of-type {
      width: 1.5rem;
      font-size: 0.1rem;
      height: 0.25rem;
      line-height: 0.25rem;
      text-align: center;
      background-color: #f3dd4d;
      padding: 0 0.1rem;
      margin-top: 5px;
      cursor: pointer;
    }
  }
  .el-introduce-right {
    padding: 0.2rem;
    height: 2.7rem;
    color: #f3dd4d;
    background-image: url("../../../assets/myAccount/nv.png");
    div:first-of-type {
      width: 4.2rem;
      font-size: 0.24rem;
      font-family: "reg";
      background-color: #231815;
      padding: 0 0.1rem;
    }
    p {
      width: 4.2rem;
      font-size: 0.16rem;
      font-family: "reg";
      background-color: #231815;
      padding: 0 0.1rem;
      margin-top: 5px;
    }
    div:last-of-type {
      width: 1.7rem;
      font-size: 0.1rem;
      height: 0.25rem;
      line-height: 0.25rem;
      text-align: center;
      background-color: #231815;
      padding: 0 0.1rem;
      margin-top: 5px;
      cursor: pointer;
    }
  }
  .list_title {
    margin-top: 0.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p:first-of-type {
      font-size: 0.32rem;
      text-align: center;
      font-weight: bold;
      font-family: "Regular";
    }
    p:last-of-type {
      font-size: 0.14rem;
      text-align: center;
      font-weight: bold;
      font-family: "Regular";
      color: #999999;
    }
  }
}
.myAccount {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .product-list {
    width: 12rem;
  }
  .el-nav {
    max-width: 1200px;
    min-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .el-nav > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 190px;
    height: 140px;
    border: 1px solid #dddddd;
    border-radius: 2px;
    font-family: Regular;
    font-size: 14px;
    color: #666666;
    margin-top: 47px;
    margin-bottom: 80px;
    cursor: pointer;
  }
  .el-nav > div:hover {
    background-color: rgba(250, 250, 250, 0.9);
  }
  .el-nav span {
    margin-top: 24px;
  }
  .el-introduce {
    max-width: 1200px;
    min-width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .el-introduce-left,
  .el-introduce-right {
    width: 594px;
    height: 250px;
    background-size: 100% 100%;
  }
  .el-introduce-left {
    padding: 30px 0px 0px 30px;
    background: url("../../../assets/myAccount/nan.png") no-repeat;
    div:first-of-type {
      width: 315px;
      font-size: 24px;
      color: #231815;
      font-family: "reg";
      background-color: #f3dd4d;
      padding: 0 10px;
    }
    p {
      width: 315px;
      font-size: 16px;
      color: #231815;
      font-family: "reg";
      background-color: #f3dd4d;
      padding: 0 10px;
      margin-top: 5px;
    }
    div:last-of-type {
      width: 115px;
      font-size: 10px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #f3dd4d;
      padding: 0 10px;
      margin-top: 5px;
      cursor: pointer;
    }
  }
  .el-introduce-right {
    padding: 30px 0px 0px 30px;
    color: #f3dd4d;
    background: url("../../../assets/myAccount/nv.png") no-repeat;
    div:first-of-type {
      width: 360px;
      font-size: 24px;
      font-family: "reg";
      background-color: #231815;
      padding: 0 10px;
    }
    p {
      width: 360px;
      font-size: 16px;
      font-family: "reg";
      background-color: #231815;
      padding: 0 10px;
      margin-top: 5px;
    }
    div:last-of-type {
      width: 115px;
      font-size: 10px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: #231815;
      padding: 0 10px;
      margin-top: 5px;
      cursor: pointer;
    }
  }
  .list_title {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p:first-of-type {
      font-size: 32px;
      text-align: center;
      font-weight: bold;
      font-family: "Regular";
    }
    p:last-of-type {
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      font-family: "Regular";
      color: #999999;
    }
  }
}
</style>
