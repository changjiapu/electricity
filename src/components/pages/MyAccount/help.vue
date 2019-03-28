<template>
  <div :class="currentClass">
    <div class="h_banner">
      <div class="h_box">How Can We Help?</div>
    </div>
    <div class="w">
      <ol class="h_breadcrumb">
        <li class="breadcrumb-item" v-if="widthH<=1024">
          <a href="#">Home ></a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">My Account</a>
        </li>
        <li>></li>
        <li class="breadcrumb-item active">Help</li>
      </ol>
      <div class="h_center_banner">
        <div v-for="(item,index) in list" @click="jump(item.url)" :key="index">
          <img :src="item.src" alt>
          <span>{{item.text}}</span>
        </div>
      </div>
      <div class="h_center_table">
        <div class="h_table_left">
          <ul>
            <li
              v-for="(item,index) in helpList"
              :key="index"
              @click="currenTabs(index)"
            >{{item.helpTitle}}</li>
            <li class="only">
              For all enquires please
              <a href="#">Contact us.</a>
            </li>
          </ul>
        </div>
        <div class="h_table_right">
          <h1 class="top">{{helpList[currenTab].helpInstructions}}</h1>
          <dl v-for="(item,index) in  helpList[currenTab].helpList" :key="index">
            <dt>{{item.helpTitle}}</dt>
            <dd v-for="(item2,index) in item.helpInstructionsList" :key="index">-{{item2}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHelpList } from "@/Ajax/modules/myAccount";
export default {
  data() {
    return {
      widthH: "",
      currenTab: 0,
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
        },
        {
          src: require("../../../assets/myAccount/help.png"),
          url: "/myAccount/customerSupport",
          text: "Support"
        }
      ],
      userInfo: {},
      helpList: []
    };
  },
  components: {},
  created() {
    this.widthH = this.$root.widthH;
    if (this.$route.query.userInfo) {
      this.userInfo = JSON.parse(this.$route.query.userInfo);
    }
    this.getHelpList();
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
    //获取服务帮助信息
    getHelpList() {
      getHelpList().then(res => {
        if (res.data.code == 0) {
          this.helpList = res.data.data;
        }
      });
    },
    currenTabs(index) {
      this.currenTab = index;
    }
  },
  computed: {
    currentClass() {
      if (this.widthH >1024) {
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
.h_center1 {
  .h_banner {
    width: 100%;
    height: 240px;
    background: url("../../../assets/myAccount/banner1.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .h_box {
      font-size: 32px;
      color: #ffffff;
      font-family: "Regular";
    }
  }
  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    padding: 25px 0px;
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
  .h_center_banner {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 190px;
      height: 80px;
      border: 1px solid #dddddd;
      border-radius: 2px;
      font-family: "Regular";
      font-size: 14px;
      color: #666666;
      margin-top: 19px;
      margin-right: 12px;
      margin-bottom: 20px;
      cursor: pointer;
      span {
        padding-left: 10px;
      }
    }
    div:hover {
      background-color: rgba(000, 000, 000, 0.1);
    }
  }
  .h_center_table {
    padding-bottom: 50px;
    display: flex;
    justify-content: space-between;
    .h_table_left {
      padding-top: 30px;
      width: 260px;
      font-size: 14px;
      border-right: 1px solid #eeeeee;
      li {
        color: #666666;
        padding-bottom: 40px;
        font-weight: 700;
        cursor: pointer;
        &:first-child {
          color: #231815;
        }
      }
      .only {
        color: #999999;
        font-size: 12px;
        padding-top: 30px;
        padding-bottom: 2px;
        font-family: "regular";
        a {
          display: inline-block;
          color: #001c95;
          font-size: 12px;
          font-family: "regular";
          border-bottom: 1px solid #001c95;
        }
      }
    }
    .h_table_right {
      padding-top: 30px;
      width: 1000px;
      padding-left: 80px;
      .top {
        color: #231815;
        font-size: 32px;
        font-family: "Regular";
        padding-bottom: 49px;
      }
      dl {
        margin-bottom: 39px;
        dt {
          color: #231815;
          font-size: 22px;
          font-family: "Regular";
          padding-bottom: 19px;
          font-weight: 700;
        }
        dd {
          margin-bottom: 20px;
          font-size: 14px;
          color: #231815;
          font-family: "regular";
        }
      }
    }
  }
}
.h_center2 {
  .h_banner {
    width: 100%;
    height: 2.4rem;
    background: url("../../../assets/myAccount/banner1.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .h_box {
      font-size: 32px;
      color: #ffffff;
      font-family: "Regular";
    }
  }
  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    padding: 0.25rem 0rem;
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
  .h_center_banner {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border-bottom: 1px solid #ddd;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 28%;
      height: 1.5rem;
      border: 1px solid #dddddd;
      border-radius: 0.02rem;
      font-family: "Regular";
      font-size: 14px;
      color: #666666;
      margin-top: 0.19rem;
      margin-bottom: 0.2rem;
      span {
        padding-top: 0.1rem;
      }
    }
  }
  .h_center_table {
    padding-bottom: 0.5rem;
    padding: 0rem 0.2rem;
    display: flex;
    justify-content: space-between;
    .h_table_left {
      padding-top: 0.3rem;
      //   width: 2.6rem;
      font-size: 0.14rem;
      border-right: 1px solid #eeeeee;
      li {
        color: #666666;
        padding-bottom: 0.4rem;
        font-weight: 700;
        &:first-child {
          color: #231815;
        }
      }
      .only {
        color: #999999;
        font-size: 0.12rem;
        padding-top: 0.3rem;
        padding-bottom: 0.02rem;
        font-family: "regular";
        a {
          display: inline-block;
          color: #001c95;
          font-size: 0.12rem;
          font-family: "regular";
          border-bottom: 1px solid #001c95;
        }
      }
    }
    .h_table_right {
      padding-top: 0.3rem;
      //   width: 10rem;
      padding-left: 0.8rem;
      .top {
        color: #231815;
        font-size: 0.32rem;
        font-family: "Regular";
        padding-bottom: 0.49rem;
      }
      dl {
        margin-bottom: 0.39rem;
        dt {
          color: #231815;
          font-size: 0.22rem;
          font-family: "Regular";
          padding-bottom: 0.19rem;
          font-weight: 700;
        }
        dd {
          margin-bottom: 0.2rem;
          font-size: 0.14rem;
          color: #231815;
          font-family: "regular";
        }
      }
    }
  }
}
</style>
