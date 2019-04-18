<template>
  <div :class="currentClass">
    <div class="banner">{{$t('m.customerSupport.title1')}}</div>
    <History :history="history"></History>
    <div class="main">
      <div class="left">
        <p class="title">{{$t('m.customerSupport.title2')}}</p>
        <span class="title_1">- {{$t('m.customerSupport.title3')}}</span>
        <el-input v-model="params.mTopic"></el-input>
        <span class="title_1">- {{$t('m.customerSupport.title4')}}</span>
        <el-input v-model="params.mEmail"></el-input>
        <span class="title_1">- {{$t('m.customerSupport.title5')}}</span>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="params.mContent"></el-input>
        <span class="title_right">{{$t('m.customerSupport.title6')}}</span>
        <div class="name">
          <div>
            <span>- {{$t('m.customerSupport.title7')}}</span>
            <el-input v-model="params.firstName"></el-input>
          </div>
          <div>
            <span>- {{$t('m.customerSupport.title8')}}</span>
            <el-input v-model="params.lastName"></el-input>
          </div>
        </div>
        <span class="title_1">- {{$t('m.customerSupport.title9')}}</span>
        <el-input v-model="params.orderNumber"></el-input>
        <p
          class="title_2"
        >{{$t('m.customerSupport.title10')}}</p>
        <span class="btn" @click="Submit()">{{$t('m.customerSupport.title11')}}</span>
      </div>
      <div class="right">
        <span class="title">{{$t('m.customerSupport.title12')}}</span>
        <span v-for='(item,index) in message2' :key='index'>{{item}}</span>
        <span class="title">{{$t('m.customerSupport.title13')}}</span>
        <span>{{message[0].serviceText}}</span>
        <span class="title">{{$t('m.customerSupport.title14')}}</span>
        <span>{{message[2].serviceText}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import History from "@/components/common/History2.vue";
import { mapState } from "vuex";
import {
  getCustomerService,
  customerFeedback
} from "@/Ajax/modules/customerSupport";
export default {
  name: "customerSupport",
  components: { History },
  data() {
    return {
      history: [
        { name: this.$t('m.customerSupport.history1'), url: "/myAccount" },
        { name: this.$t('m.customerSupport.history2'), url: "" }
      ], //传递给历史导航组件的参数
      widthH: "",
      message: [],
      message2:[],
      params: {
        mTopic: "",
        mEmail: "",
        mContent: "",
        firstName: "",
        lastName: "",
        orderNumber: ""
      }
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.getCustomerService();
  },
  methods: {
    getCustomerService() {
      getCustomerService().then(res => {
        if (res.data.code == 0) {
          this.message = res.data.data;
          this.message2=res.data.data[1].serviceText.split(',')
        }
      });
    },
    Submit() {
      if (this.params.mTopic == "") {
        this.$alert(this.$t('m.customerSupport.tips1'), "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      if (this.params.mEmail == "") {
        this.$alert(this.$t('m.customerSupport.tips2'), "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      if (this.params.mContent == "") {
        this.$alert(this.$t('m.customerSupport.tips3'), "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      if (this.params.firstName == "" || this.params.firstName == "") {
        this.$alert(this.$t('m.customerSupport.tips4'), "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      let params = {
        userId: this.userId,
        mtopic: this.params.mTopic,
        memail: this.params.mEmail,
        mcontent: this.params.mContent,
        firstName: this.params.firstName,
        lastName: this.params.lastName,
        orderNumber: this.params.orderNumber
      };
      customerFeedback(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: this.$t('m.customerSupport.tips5'),
            type: "success"
          });
        } else {
          this.$message.error("Feedback failure");
        }
      });
    }
  },
  computed: {
        screenWidth() {
      return this.$root.widthH;
    },
    currentClass() {
      if (this.widthH >1024) {
        return "customerSupport";
      } else {
        return "customerSupport2";
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
<style lang="scss" scoped>
.customerSupport {
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner {
    width: 100%;
    height: 200px;
    background-image: url("../../../assets/myAccount/banner3.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 200px;
    color: #231815;
    font-size: 32px;
    font-family: "regular";
    font-weight: bold;
  }
  .main {
    width: 1200px;
    display: flex;
    font-family: "regular";
    font-weight: bold;
    .left {
      width: 45%;
      margin-right: 15%;
      display: flex;
      flex-direction: column;
      .name {
        display: flex;
        div {
          width: 80%;
        }
      }
      .title {
        font-size: 22px;
      }
      .title_1 {
        margin-top: 10px;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .title_right {
        margin-top: 10px;
        color: #999999;
        text-align: right;
        font-size: 14px;
      }
      .title_2 {
        font-size: 14px;
        margin-top: 10px;
        color: #999999;
      }
      .btn {
        margin: 20px auto;
        height: 40px;
        width: 235px;
        background-color: #ede945;
        text-align: center;
        line-height: 40px;
        border-radius: 10px;
        cursor:pointer;
      }
    }
    .right {
      width: 40%;
      display: flex;
      flex-direction: column;
      .title {
        color: #231815;
        font-family: "regular";
        font-weight: bold;
        font-size: 19px;
        margin-top: 20px;
      }
      span {
        font-size: 14px;
        color: #999999;
        font-family: "regular";
        font-weight: bold;
      }
    }
  }
}
.customerSupport2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner {
    width: 100%;
    height: 3rem;
    background-image: url("../../../assets/myAccount/banner3.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 3rem;
    color: #231815;
    font-size: 0.38rem;
    font-family: "regular";
    font-weight: bold;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "regular";
    font-weight: bold;
    .left {
      width: 90%;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 0.22rem;
        display: flex;
        div {
          width: 80%;
        }
      }
      .title {
        font-size: 0.28rem;
      }
      .title_1 {
        margin-top: 0.12rem;
        font-size: 0.18rem;
        margin-bottom: 0.12rem;
      }
      .title_right {
        margin-top: 0.1rem;
        color: #999999;
        text-align: right;
        font-size: 0.18rem;
      }
      .title_2 {
        font-size: 0.18rem;
        margin-top: 0.1rem;
        color: #999999;
      }
      .btn {
        font-size: 0.22rem;
        margin: 0.25rem auto;
        height: 0.7rem;
        width: 80%;
        color: #ffffff;
        background-color: #231815;
        text-align: center;
        line-height: 0.7rem;
        border-radius: 2px;
      }
    }
    .right {
      width: 90%;
      display: flex;
      flex-direction: column;
      .title {
        color: #231815;
        font-family: "regular";
        font-weight: bold;
        font-size: 0.22rem;
        margin-top: 0.22rem;
      }
      span {
        font-size: 0.18rem;
        color: #999999;
        font-family: "regular";
        font-weight: bold;
      }
    }
  }
}
</style>


