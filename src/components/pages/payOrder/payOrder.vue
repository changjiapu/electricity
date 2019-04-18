<template>
  <div :class="currentClass">
    <div class="content">
      <div class="title">
        <span>{{$t('m.payOrder.title1')}}</span>
        <span>{{$t('m.payOrder.title2')}}</span>
      </div>
      <div class="main">
        <p>{{$t('m.payOrder.title3')}}</p>
        <div class="main_1">
          <span>{{$t('m.payOrder.title4')}}</span>
          <span>{{paycontent.orderNo}}</span>
        </div>
        <div class="main_2">
          <span>{{$t('m.payOrder.title5')}}</span>
          <span>${{paycontent.money}}</span>
        </div>
        <div class="main_3">{{$t('m.payOrder.title6')}}</div>
        <div class="main_4">
          <span
            :class="{active:item.id===currentId}"
            v-for="(item,index) in pay_list"
            :key="index"
            :style="{backgroundImage:'url('+item.src+')'}"
            @click="pay(item.id)"
          ></span>
        </div>
        <!-- <div class="main_5">
          <span>Add a Card</span>
          <el-input class="input" placeholder="Enter your card information"></el-input>
        </div>
        <div class="main_6">
          <div class="left">
            <div class="left_1">
              <span>Name on card</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="left_2">
              <span>Card number</span>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="right">
            <div class="right_1">
              <span>Expiration date</span>
              <div>
                <el-select class="select" v-model="value" placeholder="请选择">
                  <el-option></el-option>
                </el-select>
                <el-select class="select" v-model="value" placeholder="请选择">
                  <el-option></el-option>
                </el-select>
              </div>
            </div>
            <div class="right_2">ADD YOUR CARD</div>
          </div>
        </div>
        <div class="main_7">
          <p>Gift Cards & Promotional Codes</p>
          <p>Enter a gift card or promotional code</p>
        </div>
        <div class="main_8">
          <span>Enter Code</span>
          <div>
             <el-input class="input" v-model="input3" placeholder="请输入内容"></el-input>
             <div class="apply">APPLY</div>
          </div>
        </div>-->
        <div class="main_9" @click="CreatePay()">{{$t('m.payOrder.title7')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { createPay, getPayInformation } from "@/Ajax/modules/payment";
import { mapState } from "vuex";
export default {
  name: "payOrder",
  data() {
    return {
      pay_list: [
        { src: require("../../../assets/payOrder/pay_1.png"), id: 0 },
        { src: require("../../../assets/payOrder/pay_2.png"), id: 1 },
        { src: require("../../../assets/payOrder/pay_3.png"), id: 2 }
      ],
      currentId: 0,
      widthH: "",
      input: "",
      input2: "",
      detailId: "", //订单id
      paycontent: {} //支付页面信息
    };
  },
  created() {
    if (this.$route.params.id) {
      this.detailId = this.$route.params.id;
    }
    // if (this.$route.query.detailIdList) {
    //   this.detailId = this.$route.query.detailIdList;
    //   console.log(this.detailId);
    // }
    this.widthH = this.$root.widthH;
    this.getPayInformation(this.detailId); //获取支付页面信息
  },
  methods: {
    // 选择支付方式
    pay(id) {
      this.currentId = id;
    },
    //拉起支付，立即支付
    CreatePay() {
      createPay(this.userId, this.detailId).then(res => {
        if (res.data.code == 0) {
          window.location.href = res.data.data;
        }
      });
    },
    //获取支付页面信息
    getPayInformation(detailId) {
      getPayInformation(detailId).then(res => {
        if (res.data.code == 0) {
          this.paycontent = res.data.data;
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "payOrder";
      } else {
        return "payOrder2";
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
.payOrder {
  width: 100%;
  background-image: url("../../../assets/payOrder/beijing.png");
  display: flex;
  justify-content: center;
  .content {
    margin-top: 50px;
    width: 1500px;
    .title {
      font-family: "Regualr";
      font-weight: bold;
      display: flex;
      flex-direction: column;
      padding-bottom: 15px;
      border-bottom: 1px solid #dddddd;
      span {
        &:first-of-type {
          font-size: 32px;
          color: #231815;
        }
        &:last-of-type {
          margin-top: 5px;
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .main {
      margin-bottom: 40px;
      box-shadow: 5px 5px 5px #ccc;
      width: 820px;
      box-sizing: border-box;
      padding: 40px 10px 40px 40px;
      margin-top: 30px;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      font-family: "regular";
      color: #231815;
      font-weight: bold;
      p {
        color: #999999;
      }
      .main_1 {
        color: #999999;
        span:last-of-type {
          color: #231815;
        }
      }
      .main_2 {
        margin-top: 30px;
        color: #999999;
        span:last-of-type {
          color: #231815;
          font-size: 18px;
        }
      }
      .main_4 {
        display: flex;
        flex-direction: column;
        span {
          width: 300px;
          height: 60px;
          background-repeat: no-repeat;
          background-position: center;
          border: 1px solid #cccccc;
          border-radius: 10px;
          margin-top: 20px;
          cursor: pointer;
          &.active {
            border: 1px solid #231815;
          }
        }
      }
      .main_5 {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        .input {
          width: 300px;
        }
      }
      .main_6 {
        margin-top: 20px;
        display: flex;
        .left {
          color: #2e78a4;
          display: flex;
          .left_1 {
            width: 130px;
          }
          .left_2 {
            margin-left: 20px;
            width: 170px;
          }
        }
        .right {
          margin-left: 20px;
          display: flex;
          .right_1 {
            div {
              display: flex;
              .select {
                width: 100px;
                margin-right: 15px;
              }
            }
          }
          .right_2 {
            width: 160px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background-color: #f4d925;
            margin-top: 20px;
            cursor: pointer;
          }
        }
      }
      .main_7 {
        margin-top: 20px;
        p {
          &:first-of-type {
            color: #231815;
          }
        }
      }
      .main_8 {
        margin-top: 20px;
        div {
          display: flex;
          .input {
            width: 250px;
          }
          .apply {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            margin-left: 10px;
            border: 1px solid #231815;
            cursor: pointer;
          }
          .apply:hover {
            background-color: #f4d925;
          }
        }
      }
      .main_9 {
        width: 250px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        margin-top: 30px;
        background-color: #f4d925;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
}
.payOrder2 {
  width: 100%;
  background-image: url("../../../assets/payOrder/beijing.png");
  display: flex;
  justify-content: center;
  .content {
    margin-top: 0.5rem;
    padding: 0.4rem;
    width: 100%;
    box-sizing: border-box;
    .title {
      font-family: "Regualr";
      font-weight: bold;
      display: flex;
      flex-direction: column;
      padding-bottom: 0.15rem;
      border-bottom: 1px solid #dddddd;
      span {
        &:first-of-type {
          font-size: 0.32rem;
          color: #231815;
        }
        &:last-of-type {
          margin-top: 0.05rem;
          font-size: 0.14rem;
          color: #999999;
        }
      }
    }
    .main {
      margin-bottom: 0.4rem;
      width: 100%;
      box-sizing: border-box;
      margin-top: 0.3rem;
      font-size: 0.14rem;
      font-family: "regular";
      color: #231815;
      font-weight: bold;
      p {
        color: #999999;
      }
      .main_1 {
        color: #999999;
        span {
          word-wrap: break-word;
          word-break: normal;
        }
        span:last-of-type {
          color: #231815;
        }
      }
      .main_2 {
        margin-top: 0.3rem;
        color: #999999;
        span:last-of-type {
          color: #231815;
          font-size: 0.18rem;
        }
      }
      .main_4 {
        display: flex;
        flex-direction: column;
        span {
          width: 100%;
          height: 0.7rem;
          background-repeat: no-repeat;
          background-position: center;
          border: 1px solid #cccccc;
          border-radius: 0.1rem;
          margin-top: 0.2rem;
          cursor: pointer;
          &.active {
            border: 1px solid #231815;
          }
        }
      }
      .main_5 {
        margin-top: 0.3rem;
        display: flex;
        flex-direction: column;
        .input {
          width: 3rem;
        }
      }
      .main_6 {
        margin-top: 0.2rem;
        display: flex;
        .left {
          color: #2e78a4;
          display: flex;
          .left_1 {
            width: 1.3rem;
          }
          .left_2 {
            margin-left: 0.2rem;
            width: 1.7rem;
          }
        }
        .right {
          margin-left: 0.2rem;
          display: flex;
          .right_1 {
            div {
              display: flex;
              .select {
                width: 1rem;
                margin-right: 0.15rem;
              }
            }
          }
          .right_2 {
            width: 1.6rem;
            height: 0.45rem;
            line-height: 0.45rem;
            text-align: center;
            background-color: #f4d925;
            margin-top: 0.2rem;
            cursor: pointer;
          }
        }
      }
      .main_7 {
        margin-top: 0.2rem;
        p {
          &:first-of-type {
            color: #231815;
          }
        }
      }
      .main_8 {
        margin-top: 0.2rem;
        div {
          display: flex;
          .input {
            width: 2.5rem;
          }
          .apply {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1rem;
            margin-left: 0.1rem;
            border: 1px solid #231815;
            cursor: pointer;
          }
          .apply:hover {
            background-color: #f4d925;
          }
        }
      }
      .main_9 {
        width: 100%;
        height: 0.7rem;
        text-align: center;
        line-height: 0.7rem;
        margin-top: 0.3rem;
        border-radius: 2px;
        background-color: #231815;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>


