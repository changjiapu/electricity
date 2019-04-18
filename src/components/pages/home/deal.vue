<template>
  <div :class="currentClass">
    <section class="section_1">
      <ol class="history">
        <li v-for="(item,index) in history" :key="index">{{item}}</li>
      </ol>
      <!-- <div v-if="widthH >1024">
        <span>HOLIDAY CLEARANCE</span>
        <span>SALES PROMOTION</span>
        <span>UP TO 30%~35%</span>
        <img src="../../../assets/deal/guanbi.png">
      </div>
      <div v-if="widthH<=1024">
        <span class="title">HOLIDAY CLEARANCE</span>
        <div>
          <span>SALES PROMOTION</span>
          <span>UP TO 30%~35%</span>
        </div>
        <img src="../../../assets/deal/guanbi.png" alt>
      </div>-->
    </section>
    <section class="main">
      <div class="left">
        <P class="title">Clearance activities</P>
        <div class="img_1" v-for="(item,index) in list1" :key="index">
          <img :src="imgUrl+item.adImage" alt>
          <!-- <div class="time">
            <div>
              <span>{{item.hh}}</span>
              <span>HOUR</span>
            </div>
            <div>
              <span>{{item.mm}}</span>
              <span>MINS</span>
            </div>
            <div>
              <span>{{item.ss}}</span>
              <span>SECS</span>
            </div>
          </div>-->
          <div class="explain">
            <span>{{item.title}}</span>
            <!-- <span>{{item.djs}}</span> -->
            <span>{{item.description}}</span>
            <span @click="getCode(item.discountId)">GO TO Detail</span>
            <!-- <span>GET GODE</span> -->
          </div>
        </div>
        <!-- <div class="img_2" v-for="(item,index) in 2" :key="index">
        <div class="time">
          <div>
            <span>16</span>
            <span>HOUR</span>
          </div>
          <div>
            <span>26</span>
            <span>MINS</span>
          </div>
          <div>
            <span>05</span>
            <span>SECS</span>
          </div>
        </div>
        <div class="time_t">COUNTDOWN</div>
        <div class="title">Christmas Sale</div>
        <div class="el_1">70% OFF LENSES</div>
        <div class="el_2">+FREE SHIPPING</div>
        <div class="btn">GET CODE</div>
      </div>
      <div class="img_3">
        <span class="title">Christmas Sale</span>
        <span class="el_1">70% OFF LENSES</span>
        <span class="el_2">+FREE SHIPPING</span>
        <span class="btn">GET CODE</span>
      </div>
      <div class="img_4">
        <span class="title">Christmas Sale</span>
        <span class="el_1">20% OFF</span>
        <span class="el_2">ALL CONTACT</span>
        <span class="btn">GET CODE</span>
      </div>
      <div class="img_5" v-for="(item,index) in 2" :key="index">
        <span class="title">Christmas Sale</span>
        <span class="el_1">70% OFF LENSES</span>
        <span class="el_2">+FREE SHIPPING</span>
        <span class="btn">GET CODE</span>
        </div>-->
      </div>
      <div class="right">
        <P class="title">Limit activities</P>
        <div class="img_1" v-for="(item,index) in list2" :key="index">
          <img :src="imgUrl+item.adImage" alt>
          <div class="time">
            <div>
              <span>{{item.hh}}</span>
              <span>HOUR</span>
            </div>
            <div>
              <span>{{item.mm}}</span>
              <span>MINS</span>
            </div>
            <div>
              <span>{{item.ss}}</span>
              <span>SECS</span>
            </div>
          </div>
          <div class="explain">
            <span>{{item.title}}</span>
            <!-- <span>{{item.djs}}</span> -->
            <span>{{item.description}}</span>
            <span @click="getCode(item.discountId)">GO TO Detail</span>
            <!-- <span>GET GODE</span> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getTimeLimitedAdvertisingList,
  getExchangeCode
} from "../../../Ajax/modules/deal";
export default {
  name: "deal",
  data() {
    return {
      widthH: "",
      history: ["Home", "deal"],
      imgUrl: "",
      list1: [], //清仓活动
      list2: [] //限时活动
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    this.getTimeLimitedAdvertisingList();
  },
  methods: {
    //获取活动代码
    getCode(id) {
      this.$router.push({
        name: "/search"
        // params: {
        //   data: 0,
        //   tabId: 0
        // }
      });
      // let params = {
      //   userId: this.userId,
      //   disId: id
      // };
      // getExchangeCode(params).then(res => {
      //   if (res.data.code == 0) {
      //     this.$alert(res.data.data, "Please keep the activity code properly", {
      //       confirmButtonText: "confirm"
      //     });
      //   } else if (res.data.code == -2) {
      //     this.$alert("It's already been collected", "Tips", {
      //       confirmButtonText: "confirm"
      //     });
      //   }
      // });
    },
    //获取限时活动列表
    getTimeLimitedAdvertisingList() {
      var _this = this;
      getTimeLimitedAdvertisingList().then(res => {
        if (res.data.code == 0) {
          res.data.data.TimeLimit.map((obj, index) => {
            this.$set(obj, "djs", _this.InitTime(obj.timeRemaining));
            this.$set(obj, "hh", 0);
            this.$set(obj, "mm", 0);
            this.$set(obj, "ss", 0);
          });
          this.list1 = res.data.data.Clearance;
          this.list2 = res.data.data.TimeLimit;
        }
      });
    },
    InitTime(endtime) {
      var dd,
        hh,
        mm,
        ss = null;
      var time = parseInt(endtime);
      if (time <= 0) {
        return "结束";
      } else {
        dd = Math.floor(time / 60 / 60 / 24);
        hh = Math.floor((time / 60 / 60) % 24);
        mm = Math.floor((time / 60) % 60);
        ss = Math.floor(time % 60);
        var str = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
        return str;
      }
    }
  },
  mounted() {
    setInterval(() => {
      // console.log(3333333);
      for (var key in this.list2) {
        // console.log(2222);
        this.list2[key]["timeRemaining"] = this.list2[key]["timeRemaining"] - 1;
        var rightTime = parseInt(this.list2[key]["timeRemaining"]);
        // var bbb = new Date().getTime();
        if (rightTime > 0) {
          // console.log(1111);
          var dd = Math.floor(rightTime / 60 / 60 / 24);
          var hh = Math.floor((rightTime / 60 / 60) % 24);
          var mm = Math.floor((rightTime / 60) % 60);
          var ss = Math.floor(rightTime % 60);
        }
        this.list2[key]["hh"] = hh;
        this.list2[key]["mm"] = mm;
        this.list2[key]["ss"] = ss;
        console.log(
          (this.list2[key]["djs"] =
            dd + "天" + hh + "小时" + mm + "分" + ss + "秒")
        );
      }
    }, 1000);
  },
  computed: {
    ...mapState(["userId"]),
    screenWidth() {
      return this.$root.widthH;
    },
    currentClass() {
      if (this.widthH > 1024) {
        return "deal";
      } else {
        return "deal2";
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
<style lang="scss" scoped>
.deal {
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  .section_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history {
      display: flex;
      margin-top: 39px;
      font-family: "Regular";
      font-size: 14px;
      width: 1200px;
      padding-bottom: 15px;
      color: #999999;
      font-weight: bold;
      cursor: pointer;
      //   border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 8px;
      }
      li:last-of-type {
        color: #231815;
      }
    }
    & > div {
      width: 1200px;
      height: 100px;
      margin-top: 29px;
      background-image: url("../../../assets/deal/top-hongse.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      span {
        &:first-of-type {
          margin-left: 29px;
          font-size: 22px;
          color: #fff;
          //   font-weight: bold;
          font-family: "Light";
        }
        &:nth-of-type(2) {
          background-color: #231815;
          font-size: 32px;
          color: #f4d925;
          //   font-weight: bold;
          font-family: "Light";
          margin-left: 80px;
        }
        &:last-of-type {
          margin-left: 19px;
          font-size: 32px;
          color: #fff;
          font-weight: bold;
          font-family: "Bold";
        }
      }
      img {
        width: 25px;
        height: 25px;
        margin-left: 200px;
      }
    }
  }
  .main {
    width: 1200px;
    display: flex;
    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      .title {
        font-size: 30px;
      }
      .img_1 {
        width: 570px;
        height: 427px;
        position: relative;
        margin-top: 60px;
        img {
          width: 100%;
          height: 100%;
        }
        .time {
          position: absolute;
          top: 40px;
          right: 30px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          & > div {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              &:first-of-type {
                height: 40px;
                width: 40px;
                text-align: center;
                line-height: 40px;
                color: #231815;
                font-family: "Bold";
                font-size: 24px;
                border-radius: 4px;
                background-color: rgba(208, 208, 7, 1);
              }
              &:last-of-type {
                width: 40px;
                text-align: center;
                margin-top: 5px;
                color: #dddddd;
                font-family: "Regular";
                font-size: 10px;
              }
            }
          }
        }
        .explain {
          z-index: 100;
          position: absolute;
          top: 150px;
          left: 50px;
          display: flex;
          flex-direction: column;
          span {
            color: #fff;
            &:first-of-type {
              width: 166px;
              font-family: "Reqular";
              font-size: 22px;
              // background-color: rgba(208, 208, 7, 0.9);
            }
            &:nth-of-type(2) {
              margin-top: 19px;
              width: 220px;
              // background-color: rgba(208, 208, 7, 0.9);
              font-size: 42px;
              font-family: "Bold";
            }
            &:nth-of-type(3) {
              cursor: pointer;
              margin-top: 3px;
              // background-color: rgba(208, 208, 7, 0.9);
              font-size: 42px;
              font-family: "Bold";
            }
            &:last-of-type {
              width: 160px;
              height: 45px;
              line-height: 45px;
              font-size: 16px;
              border-radius: 2px;
              margin-top: 40px;
              text-align: center;
              font-weight: bold;
              font-family: "Blod";
              background-color: #231815;
              color: rgb(208, 208, 7);
            }
          }
        }
      }
      .img_2 {
        margin-top: 60px;
        box-sizing: border-box;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #231815;
        position: relative;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          position: absolute;
          top: -30px;
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
          background-color: #fff;
        }
        .time {
          position: absolute;
          bottom: 40px;
          right: 30px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          & > div {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              &:first-of-type {
                height: 40px;
                width: 40px;
                text-align: center;
                line-height: 40px;
                color: #231815;
                font-family: "Bold";
                font-size: 24px;
                border-radius: 4px;
                background-color: rgba(208, 208, 7, 1);
              }
              &:last-of-type {
                width: 40px;
                text-align: center;
                margin-top: 5px;
                color: #999999;
                font-family: "Regular";
                font-size: 10px;
              }
            }
          }
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_3 {
        background-image: url("../../../assets/deal/huangse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_4 {
        background-image: url("../../../assets/deal/Middle-hongse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        color: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          text-align: center;
          font-size: 22px;
          font-family: "regular";
          background-color: rgba(208, 208, 7, 0.9);
        }
        .el_1 {
          margin-top: 18px;
          font-size: 42px;
          font-family: "bold";
          background-color: rgba(208, 208, 7, 0.9);
        }
        .el_2 {
          margin-top: 3px;
          font-size: 42px;
          font-family: "bold";
          background-color: rgba(208, 208, 7, 0.9);
        }

        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_5 {
        background-image: url("../../../assets/deal/lanse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
    }
    .right {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      .title {
        font-size: 30px;
      }
      .img_1 {
        width: 570px;
        height: 427px;
        position: relative;
        margin-top: 60px;
        // &:nth-of-type(odd) {
        //   margin-right: 60px;
        // }
        img {
          width: 100%;
          height: 100%;
        }
        .time {
          position: absolute;
          top: 40px;
          right: 30px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          & > div {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              &:first-of-type {
                height: 40px;
                width: 40px;
                text-align: center;
                line-height: 40px;
                color: #231815;
                font-family: "Bold";
                font-size: 24px;
                border-radius: 4px;
                background-color: rgba(208, 208, 7, 1);
              }
              &:last-of-type {
                width: 40px;
                text-align: center;
                margin-top: 5px;
                color: #dddddd;
                font-family: "Regular";
                font-size: 10px;
              }
            }
          }
        }
        .explain {
          z-index: 100;
          position: absolute;
          top: 150px;
          left: 50px;
          display: flex;
          flex-direction: column;
          span {
            color: #fff;
            &:first-of-type {
              width: 166px;
              font-family: "Reqular";
              font-size: 22px;
              // background-color: rgba(208, 208, 7, 0.9);
            }
            &:nth-of-type(2) {
              margin-top: 19px;
              width: 220px;
              // background-color: rgba(208, 208, 7, 0.9);
              font-size: 42px;
              font-family: "Bold";
            }
            &:nth-of-type(3) {
              cursor: pointer;
              margin-top: 3px;
              // background-color: rgba(208, 208, 7, 0.9);
              font-size: 42px;
              font-family: "Bold";
            }
            &:last-of-type {
              width: 160px;
              height: 45px;
              line-height: 45px;
              font-size: 16px;
              border-radius: 2px;
              margin-top: 40px;
              text-align: center;
              font-weight: bold;
              font-family: "Blod";
              background-color: #231815;
              color: rgb(208, 208, 7);
            }
          }
        }
      }
      .img_2 {
        margin-top: 60px;
        box-sizing: border-box;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #231815;
        position: relative;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          position: absolute;
          top: -30px;
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
          background-color: #fff;
        }
        .time {
          position: absolute;
          bottom: 40px;
          right: 30px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          & > div {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              &:first-of-type {
                height: 40px;
                width: 40px;
                text-align: center;
                line-height: 40px;
                color: #231815;
                font-family: "Bold";
                font-size: 24px;
                border-radius: 4px;
                background-color: rgba(208, 208, 7, 1);
              }
              &:last-of-type {
                width: 40px;
                text-align: center;
                margin-top: 5px;
                color: #999999;
                font-family: "Regular";
                font-size: 10px;
              }
            }
          }
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_3 {
        background-image: url("../../../assets/deal/huangse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_4 {
        background-image: url("../../../assets/deal/Middle-hongse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        color: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          text-align: center;
          font-size: 22px;
          font-family: "regular";
          background-color: rgba(208, 208, 7, 0.9);
        }
        .el_1 {
          margin-top: 18px;
          font-size: 42px;
          font-family: "bold";
          background-color: rgba(208, 208, 7, 0.9);
        }
        .el_2 {
          margin-top: 3px;
          font-size: 42px;
          font-family: "bold";
          background-color: rgba(208, 208, 7, 0.9);
        }

        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
      .img_5 {
        background-image: url("../../../assets/deal/lanse.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 60px;
        width: 570px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &:nth-of-type(odd) {
          margin-right: 60px;
        }
        .title {
          width: 181px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-family: "regular";
        }
        .el_1,
        .el_2 {
          font-size: 42px;
          color: #231815;
          font-family: "bold";
        }
        .btn {
          margin-top: 54px;
          width: 160px;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          border-radius: 2px;
          margin-top: 40px;
          text-align: center;
          font-weight: bold;
          font-family: "Blod";
          background-color: #231815;
          color: rgb(208, 208, 7);
        }
        .time_t {
          position: absolute;
          bottom: 105px;
          right: 70px;
          font-family: "regular";
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
}
.deal2 {
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  .section_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history {
      display: flex;
      margin-top: 0.39rem;
      font-family: "Regular";
      font-size: 0.14rem;
      width: 90%;
      padding-bottom: 0.15rem;
      color: #999999;
      font-weight: bold;
      //   border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 0.08rem;
      }
      li:last-of-type {
        color: #231815;
      }
    }
    & > div {
      width: 90%;
      height: 2rem;
      margin-top: 0.29rem;
      background-image: url("../../../assets/deal/top-hongse.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        margin-left: 0.29rem;
        font-size: 0.22rem;
        color: #fff;
        font-family: "Light";
      }
      div {
        margin-top: 0.3rem;
        display: flex;
        span {
          &:first-of-type {
            background-color: #231815;
            font-size: 0.32rem;
            color: #f4d925;
            //   font-weight: bold;
            font-family: "Light";
          }
          &:last-of-type {
            font-size: 0.32rem;
            margin-left: 0.2rem;
            color: #fff;
            font-weight: bold;
            font-family: "Bold";
          }
        }
      }
      img {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 0.25rem;
        height: 0.25rem;
        margin-left: 2rem;
      }
    }
  }
  .main {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title{
        font-size: .3rem;
      text-align: center;
      margin-top: .2rem;
      }
    .img_1 {
      width: 6.9rem;
      height: 4.27rem;
      position: relative;
      margin-top: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
      .time {
        position: absolute;
        top: 0.4rem;
        right: 0.3rem;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        & > div {
          display: flex;
          flex-direction: column;
          margin-left: 0.1rem;
          span {
            &:first-of-type {
              height: 0.4rem;
              width: 0.4rem;
              text-align: center;
              line-height: 0.4rem;
              color: #231815;
              font-family: "Bold";
              font-size: 0.24rem;
              border-radius: 0.04rem;
              background-color: rgba(208, 208, 7, 1);
            }
            &:last-of-type {
              width: 0.4rem;
              text-align: center;
              margin-top: 0.05rem;
              color: #dddddd;
              font-family: "Regular";
              font-size: 0.1rem;
            }
          }
        }
      }
      .explain {
        z-index: 100;
        position: absolute;
        top: 1.5rem;
        left: 0.5rem;
        display: flex;
        flex-direction: column;
        span {
          color: #fff;
          &:first-of-type {
            width: 1.8rem;
            font-family: "Reqular";
            font-size: 0.22rem;
            background-color: rgba(208, 208, 7, 0.9);
          }
          &:nth-of-type(2) {
            margin-top: 0.19rem;
            width: 2.2rem;
            background-color: rgba(208, 208, 7, 0.9);
            font-size: 0.42rem;
            font-family: "Bold";
          }
          &:nth-of-type(3) {
            margin-top: 0.03rem;
            background-color: rgba(208, 208, 7, 0.9);
            font-size: 0.42rem;
            font-family: "Bold";
          }
          &:last-of-type {
            width: 1.6rem;
            height: 0.45rem;
            line-height: 0.45rem;
            font-size: 0.16rem;
            border-radius: 0.02rem;
            margin-top: 0.4rem;
            text-align: center;
            font-weight: bold;
            font-family: "Blod";
            background-color: #231815;
            color: rgb(208, 208, 7);
          }
        }
      }
    }
    .img_2 {
      margin-top: 0.6rem;
      box-sizing: border-box;
      width: 6.9rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 0.02rem solid #231815;
      position: relative;
      .title {
        position: absolute;
        top: -0.3rem;
        width: 1.81rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.22rem;
        font-family: "regular";
        background-color: #fff;
      }
      .time {
        position: absolute;
        bottom: 0.4rem;
        right: 0.3rem;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        & > div {
          display: flex;
          flex-direction: column;
          margin-left: 0.1rem;
          span {
            &:first-of-type {
              height: 0.4rem;
              width: 0.4rem;
              text-align: center;
              line-height: 0.4rem;
              color: #231815;
              font-family: "Bold";
              font-size: 0.24rem;
              border-radius: 0.04rem;
              background-color: rgba(208, 208, 7, 1);
            }
            &:last-of-type {
              width: 0.4rem;
              text-align: center;
              margin-top: 0.05rem;
              color: #999999;
              font-family: "Regular";
              font-size: 0.1rem;
            }
          }
        }
      }
      .el_1,
      .el_2 {
        font-size: 0.42rem;
        color: #231815;
        font-family: "bold";
      }
      .btn {
        margin-top: 0.54rem;
        width: 1.6rem;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        border-radius: 0.02rem;
        margin-top: 0.4rem;
        text-align: center;
        font-weight: bold;
        font-family: "Blod";
        background-color: #231815;
        color: rgb(208, 208, 7);
      }
      .time_t {
        position: absolute;
        bottom: 1.1rem;
        right: 0.7rem;
        font-family: "regular";
        font-size: 0.14rem;
        color: #999999;
      }
    }
    .img_3 {
      background-image: url("../../../assets/deal/huangse.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 60px;
      width: 6.9rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        width: 1.81rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.22rem;
        font-family: "regular";
      }
      .el_1,
      .el_2 {
        font-size: 0.42rem;
        color: #231815;
        font-family: "bold";
      }
      .btn {
        margin-top: 0.54rem;
        width: 1.6rem;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        border-radius: 0.02rem;
        margin-top: 0.4rem;
        text-align: center;
        font-weight: bold;
        font-family: "Blod";
        background-color: #231815;
        color: rgb(208, 208, 7);
      }
      .time_t {
        position: absolute;
        bottom: 1.05rem;
        right: 0.7rem;
        font-family: "regular";
        font-size: 0.14rem;
        color: #999999;
      }
    }
    .img_4 {
      background-image: url("../../../assets/deal/Middle-hongse.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 0.6rem;
      width: 6.9rem;
      height: 3rem;
      display: flex;
      color: #fff;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        text-align: center;
        font-size: 0.22rem;
        font-family: "regular";
        background-color: rgba(208, 208, 7, 0.9);
      }
      .el_1 {
        margin-top: 0.18rem;
        font-size: 0.42rem;
        font-family: "bold";
        background-color: rgba(208, 208, 7, 0.9);
      }
      .el_2 {
        margin-top: 0.03rem;
        font-size: 0.42rem;
        font-family: "bold";
        background-color: rgba(208, 208, 7, 0.9);
      }

      .btn {
        margin-top: 0.54rem;
        width: 1.6rem;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        border-radius: 0.02rem;
        margin-top: 0.4rem;
        text-align: center;
        font-weight: bold;
        font-family: "Blod";
        background-color: #231815;
        color: rgb(208, 208, 7);
      }
      .time_t {
        position: absolute;
        bottom: 1.05rem;
        right: 0.7rem;
        font-family: "regular";
        font-size: 0.14rem;
        color: #999999;
      }
    }
    .img_5 {
      background-image: url("../../../assets/deal/lanse.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 0.6rem;
      width: 6.9rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        width: 1.81rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.22rem;
        font-family: "regular";
      }
      .el_1,
      .el_2 {
        font-size: 0.42rem;
        color: #231815;
        font-family: "bold";
      }
      .btn {
        margin-top: 0.54rem;
        width: 1.6rem;
        height: 0.45rem;
        line-height: 0.45rem;
        font-size: 0.16rem;
        border-radius: 0.02rem;
        margin-top: 0.4rem;
        text-align: center;
        font-weight: bold;
        font-family: "Blod";
        background-color: #231815;
        color: rgb(208, 208, 7);
      }
      .time_t {
        position: absolute;
        bottom: 1.05rem;
        right: 0.7rem;
        font-family: "regular";
        font-size: 0.14rem;
        color: #999999;
      }
    }
  }
}
</style>

