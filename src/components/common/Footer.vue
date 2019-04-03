<template>
  <div class="footer">
    <div :class="currentClass">
      <dl>
        <dt class="text-uppercase">Customer Service</dt>
        <dd>FAQ</dd>
        <dd>Contact Us</dd>
        <dd>Our Stores</dd>
      </dl>
      <dl>
        <dt class="text-uppercase">General</dt>
        <dd>Terms of Use</dd>
        <dd>Terms of Sale</dd>
        <dd>Privacy Policy</dd>
      </dl>
      <dl v-if="widthH>1024">
        <dt>Subscribe to News letter</dt>
        <dd>Please enter a valid email address.</dd>
        <dd>
          <input type="text" class="h_footerSearchBox" v-model="input1">
        </dd>
        <dd>
          <input type="button" value="SIGN UP" class="h_footerBtnBox" @click="dingyue()">
        </dd>
      </dl>
      <dl>
        <dt>Follow Us</dt>
        <dd>Please enter a valid email address.</dd>
        <dd>
          <img src="../../assets/prublic/f-hei.png" alt>
          <img src="../../assets/prublic/in-hei.png" alt>
          <img src="../../assets/prublic/niao-hei.png" alt>
          <img src="../../assets/prublic/youtub8-hei.png" alt>
          <img src="../../assets/prublic/ghei.png" alt>
        </dd>
      </dl>
    </div>
    <div class="h_footerTop3" v-if="widthH<1024">
      <dl>
        <dt>Subscribe to News letter</dt>
        <dd>Please enter a valid email address.</dd>
        <dd class="h_footerBox">
          <input type="text" class="h_footerSearchBox" v-model="input1">
          <input type="button" value="SIGN UP" class="h_footerBtnBox" @click="dingyue()">
        </dd>
      </dl>
    </div>
    <div :class="currentClass2">
      <div class="h_footerRightCenter">
        <img src="../../assets/prublic/logo-huangse.png" alt>
        <span>© 2018 JMOPTICAL Eyewear. {{$t('m.music')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AJAX from "../../Ajax";
import { subscribeToNews } from "../../Ajax/modules/login";
export default {
  data() {
    return {
      widthH: "",
      input1: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
  },
  methods: {
    dingyue() {
      let reg = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
      if (reg.test(this.input1) == false) {
        this.$alert("Email is not a valid email address", {
          confirmButtonText: "confirm"
        });
      }
      let params = {
        subEmail: this.input1
      };
      subscribeToNews(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "Subscribe to the success",
            type: "success"
          });
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "h_footerTop1";
      } else {
        return "h_footerTop2";
      }
    },
    currentClass2() {
      if (this.widthH > 1024) {
        return "h_footerBottom1";
      } else {
        return "h_footerBottom2";
      }
    },
    screenWidth() {
      return this.$root.widthH;
    }
  },
  watch: {
    screenWidth(val) {
      console.log(val);
      this.widthH = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #f4f4f4;
  font-family: "Regular";
}
.h_footerTop1 {
  padding-top: 50px;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  dl {
    font-family: "Regular";
    font-size: 14px;
    text-align: left;
    dt {
      color: #231815;
      padding-bottom: 27px;
    }
    dd {
      padding-bottom: 15px;
      color: #666666;
      img {
        width: 26px;
        height: 26px;
      }
    }
    .h_footerSearchBox {
      width: 320px;
      height: 40px;
      border: 1px solid #000;
      margin-top: 17px;
    }
    .h_footerBtnBox {
      width: 140px;
      height: 40px;
      font-size: 14px;
      color: #fff;
      background-color: #231815;
      border: none;
      font-family: "Regular";
    }
  }
}
.h_footerTop2 {
  padding: 0.5rem 0.3rem 0.4rem 0.3rem;
  display: flex;
  justify-content: space-around;
  dl {
    flex: 1;
    font-family: "Regular";
    font-size: 0.14rem;
    text-align: left;
    dt {
      color: #231815;
      padding-bottom: 0.27rem;
    }
    dd {
      padding-bottom: 0.15rem;
      color: #666666;
    }
    .h_footerBox {
      width: 70%;
      height: 0.42rem;
      border: 1px solid #000;
    }
    .h_footerSearchBox {
      width: 70%;
      height: 0.4rem;
      background-color: #fff;
      border-right: 1px solid #000;
    }
    .h_footerBtnBox {
      width: 30%;
      height: 0.4rem;
      background-color: #f4d925;
      font-size: 0.14rem;
    }
  }
}
.h_footerTop3 {
  padding: 0rem 0.3rem;
  dl {
    font-family: "Regular";
    font-size: 0.14rem;
    text-align: left;
    padding-bottom: 0.4rem;
    dt {
      color: #231815;
      padding-bottom: 0.27rem;
    }
    dd {
      margin-bottom: 0.15rem;
      color: #666666;
      img {
        width: 0.26rem;
        height: 0.26rem;
      }
    }
    .h_footerBox {
      height: 0.42rem;
      width: 4.6rem;
      border: 1px solid #000;
      display: flex;
      align-items: center;
    }
    .h_footerSearchBox {
      width: 3.2rem;
      height: 0.42rem;
      background-color: #fff;
      border-right: 1px solid #000;
      padding: 0px;
    }
    .h_footerBtnBox {
      width: 1.4rem;
      height: 0.42rem;
      background-color: #f4d925;
      font-size: 0.14rem;
    }
  }
}

/* 底部 */
.h_footerBottom1 {
  width: 100%;
  height: 180px;
  background-color: #231815;
  display: flex;
  justify-content: center;
  align-items: center;
  .h_footerRightCenter {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 127px;
      height: 45px;
    }
    span {
      margin-top: 34px;
      color: #999999;
      font-size: 12px;
      font-family: "Regular";
    }
  }
}

/* 底部2 */
.h_footerBottom2 {
  width: 100%;
  height: 1.8rem;
  background-color: #231815;
  display: flex;
  justify-content: center;
  align-items: center;
  .h_footerRightCenter {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 1.27rem;
      height: 0.45rem;
    }
    span {
      margin-top: 0.34rem;
      color: #999999;
      font-size: 0.12rem;
      font-family: "Regular";
    }
  }
}
</style>
