<template>
  <div>
    <div :class="currentClass">
      <div class="w">
        <div class="my_pay">
          <h1>Select your payment method</h1>
          <p>We recommend you pay by international credit card or PayPal</p>
          <!-- 我们建议您使用国际信用卡或贝宝支付 -->
        </div>
        <div class="my_order">
          <p>Order submitted successfully, please pay as soon as possible!</p>
          <!-- 订单提交成功，请尽快付款!  -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AJAX from "../../../Ajax";
import Banner from "./common/banner";
export default {
  data() {
    return {
      widthH: "",
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
  components: {
    Banner
  },
  created() {
    this.widthH = this.$root.widthH;
  },
  methods: {},
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
    }
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
@media (max-width: 1200px) {
  .w {
    padding: 0px 0.1rem;
  }
}
.h_center1 {
  font-family: Regular;
  padding-bottom: 59px;
  .my_pay {
    padding-bottom: 0.19rem;
    border-bottom: 1px solid #dddddd;
    h1 {
      font-size: 28px;
      color: #000000;
    }
    p {
      font-size: 14px;
      color: #999999;
    }
  }
}
</style>
