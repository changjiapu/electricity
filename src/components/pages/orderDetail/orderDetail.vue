<template>
  <div :class="currentClass">
    <div class="container">
      <span class="title">Details of your order.</span>
      <div class="main">
        <div class="left">
          <div class="left_1">
            <div class="left_1_img">
              <img :src="imgUrl+orderDetail.product.productImage" alt>
            </div>
            <div class="left_1_content">
              <span class="left_1_content_1">New golden gate bridge sunglasses</span>
              <span class="left_1_content_2">{{orderDetail.product.productName}}</span>
              <span class="left_1_content_3">Track shipment ›</span>
              <div class="left_1_content_4"></div>
              <span
                class="left_1_content_5"
              >The package has been delivered to the address specified in theThe package has been delivered to the address specified in theThe package has been delivered to the address specified in theThe package has been delivered to the address specified in the</span>
            </div>
          </div>
          <div class="left_2">
            <span class="left_2_title">Fapiao</span>
            <div class="left_2_content">
              <div>
                <span>Fapiao type:</span>
                <span>Commerce Fapiao</span>
              </div>
              <div>
                <span>Title</span>
                <span>Personal</span>
              </div>
              <div>
                <span>Receipt:</span>
                <span>450170@qq.com</span>
                <span>Track Fa Piao Status ›</span>
              </div>
            </div>
          </div>
          <div class="left_3">
            Need more help? Chat now for help or call
            <span style="color:#231815">1‑8888</span> ‑MY‑JMOPTICAL.
          </div>
        </div>
        <div class="right">
          <span>Order Number: {{orderDetail.order.orderSn}}</span>
          <span>Order Placed:{{orderDetail.order.payTime}}</span>
          <span>view invoice</span>
          <span>Your Total: ${{orderDetail.order.orderMoney}}</span>
          <span>Return of the goods</span>
          <div class="info">
            <div>Delivery:</div>
            <div>Standard delivery</div>
            <div>{{orderDetail.order.consignee}}</div>
            <div>{{orderDetail.order.province}}{{orderDetail.order.city}},{{orderDetail.order.addressLine1}},{{orderDetail.order.addressLine2}}</div>
          </div>
          <div class="info_2">
            <span>Share shipping updates:</span>
            <span>4•••••••1@qq.com</span>
          </div>
          <div class="help">Need Help? Start a Live Chat!</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderDetailById } from "@/Ajax/modules/order";
export default {
  name: "orderDetail",
  data() {
    return {
      orderDetail: {},
      imgUrl: "",
      widthH: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    let detailId = this.$route.query.detailId;
    this.getOrderDetailById(detailId);
  },
  methods: {
    //获取订单详情
    getOrderDetailById(detailId) {
      getOrderDetailById(detailId).then(res => {
        if (res.data.code == 0) {
          this.orderDetail = res.data.data;
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "orderDetail";
      } else {
        return "orderDetail2";
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
<style lang="scss" scoped>
.orderDetail {
  font-family: "regular";
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  .container {
    margin-top: 50px;
    margin-bottom: 70px;
    width: 1280px;
    .title {
      font-size: 32px;
      font-family: "regular";
      font-weight: bold;
      color: #231815;
    }
    .main {
      margin-top: 30px;
      width: 100%;
      display: flex;
      .left {
        width: 860px;
        background-color: #ffffff;
        box-shadow: 3px 3px 3px #cccccc;
        padding: 50px 40px;
        box-sizing: border-box;
        .left_1 {
          width: 100%;
          padding-bottom: 80px;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          .left_1_img {
            width: 220px;
            display: flex;
            align-items: center;
            img {
              width: 200px;
              height: 130px;
            }
          }
          .left_1_content {
            margin-left: 45px;
            display: flex;
            flex-direction: column;
            .left_1_content_1 {
              font-size: 14px;
              color: #231815;
            }
            .left_1_content_2 {
              font-size: 28px;
            }
            .left_1_content_3 {
              font-size: 14px;
              color: #4474af;
            }
            .left_1_content_5 {
              margin-top: 25px;
              font-size: 16px;
              color: #666666;
              font-weight: normal;
            }
          }
        }
        .left_2 {
          margin-top: 30px;
          width: 100%;
          padding-bottom: 60px;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          flex-direction: column;
          .left_2_content {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            div {
              display: flex;
              flex-direction: column;
              span {
                &:nth-of-type(2) {
                  font-weight: normal;
                }
                &:nth-of-type(3) {
                  color: #4474af;
                }
              }
            }
          }
        }
        .left_3 {
          margin-top: 40px;
          color: #999999;
        }
      }
      .right {
        margin-left: 40px;
        padding: 50px 45px 30px 45px;
        width: 380px;
        background-color: #ffffff;
        border: 1px solid #eeeeee;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-family: "regular";
        color: #231815;
        box-sizing: border-box;
        span {
          &:nth-of-type(3) {
            padding-bottom: 18px;
            border-bottom: 1px solid #eeeeee;
            color: #4474af;
          }
          &:nth-of-type(4) {
            margin-top: 30px;
          }
          &:nth-of-type(5) {
            margin-top: 20px;
            height: 45px;
            width: 280px;
            text-align: center;
            line-height: 45px;
            border: 1px solid #eeeeee;
            border-radius: 5px;
            text-transform: uppercase;
            cursor: pointer;
            &:hover {
              background-color: #231815;
              color: #ffffff;
            }
          }
        }
        .info {
          margin-top: 35px;
          display: flex;
          flex-direction: column;
          background-image: url("../../../assets/cart/dizhi.png");
          background-repeat: no-repeat;
          background-position: left 10%;
          padding-left: 25px;
          color: #999999;
        }
        .info_2 {
          margin-top: 35px;
          display: flex;
          flex-direction: column;
          background-image: url("../../../assets/cart/youxiang.png");
          background-repeat: no-repeat;
          background-position: left 20%;
          padding-left: 25px;
          color: #999999;
        }
        .help {
          margin-top: 35px;
          background-image: url("../../../assets/cart/help.png");
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 25px;
          background-size: 20px 20px;
          color: #4474af;
          cursor: pointer;
        }
      }
    }
  }
}
.orderDetail2 {
  font-family: "regular";
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  .container {
    margin-bottom: 0.7rem;
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    .title {
      width: 100%;
      font-size: 0.42rem;
      font-family: "regular";
      font-weight: bold;
      color: #231815;
    }
    .main {
      margin-top: 0.3rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      .left {
        width: 100%;
        background-color: #ffffff;
        box-shadow: 3px 3px 3px #cccccc;
        padding: 0.2rem;
        box-sizing: border-box;
        .left_1 {
          width: 100%;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          .left_1_img {
            width: 2.2rem;
            display: flex;
            align-items: center;
            img {
              width: 2rem;
              height: 1.3rem;
            }
          }
          .left_1_content {
            margin-left: 0.45rem;
            display: flex;
            flex-direction: column;
            .left_1_content_1 {
              font-size: 0.14rem;
              color: #231815;
            }
            .left_1_content_2 {
              font-size: 0.28rem;
            }
            .left_1_content_3 {
              font-size: 0.14rem;
              color: #4474af;
            }
            .left_1_content_5 {
              margin-top: 25px;
              font-size: 0.26rem;
              color: #666666;
              font-weight: normal;
            }
          }
        }
        .left_2 {
          font-size: 0.22rem;
          margin-top: 0.3rem;
          width: 100%;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          flex-direction: column;
          .left_2_content {
            margin-top: 0.4rem;
            display: flex;
            justify-content: space-between;
            div {
              display: flex;
              flex-direction: column;
              span {
                &:nth-of-type(2) {
                  font-weight: normal;
                }
                &:nth-of-type(3) {
                  color: #4474af;
                }
              }
            }
          }
        }
        .left_3 {
          font-size: 0.22rem;
          margin-top: 0.4rem;
          color: #999999;
        }
      }
      .right {
        margin-top: 0.3rem;
        width: 100%;
        padding: 0.2rem;
        background-color: #ffffff;
        border: 1px solid #eeeeee;
        display: flex;
        flex-direction: column;
        font-size: 0.14rem;
        font-family: "regular";
        color: #231815;
        box-sizing: border-box;
        span {
          &:nth-of-type(3) {
            padding-bottom: 0.18rem;
            border-bottom: 1px solid #eeeeee;
            color: #4474af;
          }
          &:nth-of-type(4) {
            margin-top: 0.3rem;
          }
          &:nth-of-type(5) {
            margin-top: 20px;
            height: 45px;
            width: 280px;
            text-align: center;
            line-height: 45px;
            border: 1px solid #eeeeee;
            border-radius: 5px;
            text-transform: uppercase;
            cursor: pointer;
            &:hover {
              background-color: #231815;
              color: #ffffff;
            }
          }
        }
        .info {
          margin-top: 0.35px;
          display: flex;
          flex-direction: column;
          background-image: url("../../../assets/cart/dizhi.png");
          background-repeat: no-repeat;
          background-position: left 10%;
          padding-left: 25px;
          color: #999999;
        }
        .info_2 {
          margin-top: 35px;
          display: flex;
          flex-direction: column;
          background-image: url("../../../assets/cart/youxiang.png");
          background-repeat: no-repeat;
          background-position: left 20%;
          padding-left: 25px;
          color: #999999;
        }
        .help {
          margin-top: 35px;
          background-image: url("../../../assets/cart/help.png");
          background-repeat: no-repeat;
          background-position: left;
          padding-left: 25px;
          background-size: 20px 20px;
          color: #4474af;
          cursor: pointer;
        }
      }
    }
  }
}
</style>


