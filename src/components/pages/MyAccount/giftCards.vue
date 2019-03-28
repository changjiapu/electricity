<template>
  <div>
    <Banner/>
    <div :class="currentClass">
      <div class="w">
        <ol class="h_breadcrumb">
          <li class="breadcrumb-item" v-if="widthH<=1024">
            <a href="#">Home ></a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">My Account</a>
          </li>
          <li>></li>
          <li class="breadcrumb-item active">Gift cards</li>
        </ol>
        <div class="my_Card">
          <h1>My Gift cards</h1>
          <p>Gift CARDS can be used for direct consumption.</p>
          <!-- 礼品卡可以直接消费。 -->
        </div>
        <div class="my_Balance">
          <h3>Your Gift Card Balance:</h3>
          <h1>$0.00</h1>
          <a href="#">Reload Your Balance</a>
          <a href="#">Redeem a Gift Card</a>
          <!-- 礼品卡余额/刷新余额/兑换礼品卡 -->
        </div>
        <div class="my_Redeem">
          <h3>Redeem a gift card</h3>
          <p>Enter a gift card or promotional code</p>
          <a href="#">Enter Code</a>
          <div class="my_Redeem_apply">
            <input type="text">
            <input type="button" value="apply">
          </div>
          <!-- 兑换礼品卡/输入礼品卡或促销码/申请 -->
        </div>
        <div class="my_Activity">
          <h3>Gift Card Activity</h3>
          <table>
            <thead>
              <tr>
                <th>date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr>
                            <td>You have no gift card activity.</td>
                            <td>You have no gift card activity.</td>
                            <td>You have no gift card activity.</td>
              </tr>-->
              <tr>
                <td>You have no gift card activity.</td>
              </tr>
            </tbody>
          </table>
          <p>Once applied to your account, the full amount will be added to</p>
        </div>
        <!-- 礼品卡活动/日期/描述/数量/您没有礼品卡活动。/一旦申请到您的帐户，全额将被添加到 -->
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
    currentClass() {
      if (this.widthH > 1024) {
        return "h_center1";
      } else {
        return "h_center2";
      }
    },
    screenWidth() {
      return this.$root.widthH;
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
  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    padding: 26px 0px 28px 0px;
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
  .my_Card {
    padding-bottom: 19px;
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
  .my_Balance {
    padding-top: 39px;
    h3 {
      font-size: 18px;
      color: #999999;
    }
    h1 {
      font-size: 32px;
      color: #231815;
      margin-bottom: 30px;
    }
    a {
      width: 220px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      color: #231815;
      border: 1px solid #231815;
      border-radius: 2px;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      text-transform: uppercase;
      &:last-child {
        background-color: #f4d925;
        color: #fff;
      }
    }
  }
  .my_Redeem {
    padding-top: 40px;
    h3 {
      font-size: 20px;
      color: #231815;
    }
    p {
      font-size: 14px;
      color: #999999;
    }
    a {
      font-size: 14px;
      color: #1571a1;
      font-weight: 700;
      display: inline-block;
      margin: 19px 0px 10px 0px;
    }
    .my_Redeem_apply {
      input[type="text"] {
        width: 360px;
        height: 50px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        border-radius: 2px;
      }
      input[type="button"] {
        width: 120px;
        height: 50px;
        margin-left: 10px;
        background-color: #f4d925;
        color: #231815;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 2px;
      }
    }
  }
  .my_Activity {
    margin-top: 40px;
    h3 {
      font-size: 20px;
      color: #231815;
    }
    table {
      width: 100%;
      margin: 15px 0px 19px 0px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      thead {
        background-color: #f4f4f4;
        border: 1px solid #dddddd;
        width: 100%;
        height: 30px;
        tr {
          display: flex;
          width: 100%;
          justify-content: space-between;
          border-bottom: 1px solid #dddddd;
          th {
            width: 33%;
            text-align: left;
            padding-left: 20px;
            color: #666666;
            font-size: 14px;
          }
        }
      }
      tbody {
        width: 100%;
        height: 40px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        tr > td {
          padding-left: 20px;
          font-size: 12px;
          color: #333333;
          font-weight: 700;
        }
      }
    }
    p {
      font-size: 12px;
      color: #999999;
    }
  }
}
.h_center2 {
  font-family: Regular;
  padding-bottom: 0.59rem;
  ol {
    background-color: #fff;
    font-size: 0.14rem;
    color: #999999;
    overflow: hidden;
    padding: 0.26rem 0rem 0.28rem 0rem;
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
  .my_Card {
    padding-bottom: 0.19rem;
    border-bottom: 1px solid #dddddd;
    h1 {
      font-size: 0.28rem;
      color: #000000;
    }
    p {
      font-size: 0.14rem;
      color: #999999;
    }
  }
  .my_Balance {
    padding-top: 0.39rem;
    h3 {
      font-size: 0.18rem;
      color: #999999;
    }
    h1 {
      font-size: 0.32rem;
      color: #231815;
      margin-bottom: 0.3rem;
    }
    a {
      padding: 0.1rem;
      display: inline-block;
      color: #231815;
      border: 1px solid #231815;
      border-radius: 0.02rem;
      font-size: 0.14rem;
      text-align: center;
      font-weight: 700;
      text-transform: uppercase;
      &:last-child {
        background-color: #f4d925;
        color: #fff;
      }
    }
  }
  .my_Redeem {
    padding-top: 0.4rem;
    h3 {
      font-size: 0.2rem;
      color: #231815;
    }
    p {
      font-size: 0.14rem;
      color: #999999;
    }
    a {
      font-size: 0.14rem;
      color: #1571a1;
      font-weight: 700;
      display: inline-block;
      margin: 0.19rem 0rem 0.1rem 0rem;
    }
    .my_Redeem_apply {
      input[type="text"] {
        width: 3.6rem;
        height: 0.5rem;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        border-radius: 0.02rem;
      }
      input[type="button"] {
        width: 1.2rem;
        height: 0.5rem;
        margin-left: 0.1rem;
        background-color: #f4d925;
        color: #231815;
        font-size: 0.16rem;
        text-transform: uppercase;
        font-weight: 700;
        border-radius: 0.02rem;
      }
    }
  }
  .my_Activity {
    margin-top: 0.4rem;
    h3 {
      font-size: 0.02rem;
      color: #231815;
    }
    table {
      width: 100%;
      margin: 0.15rem 0rem 0.19rem 0rem;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      thead {
        background-color: #f4f4f4;
        border: 1px solid #dddddd;
        width: 100%;
        height: 0.3rem;
        tr {
          display: flex;
          width: 100%;
          justify-content: space-between;
          border-bottom: 1px solid #dddddd;
          th {
            width: 33%;
            text-align: left;
            padding-left: 0.2rem;
            color: #666666;
            font-size: 0.14rem;
          }
        }
      }
      tbody {
        width: 100%;
        height: 0.4rem;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        tr > td {
          padding-left: 0.2rem;
          font-size: 0.12rem;
          color: #333333;
          font-weight: 700;
        }
      }
    }
    p {
      font-size: 0.12rem;
      color: #999999;
    }
  }
}
</style>
