<template>
  <div class="ell-bac">
    <div class="ell-container">
      <div class="ell-img">
        <router-link to="/index/home">
          <img class="ell-logImg" src="../../../assets/login/logo.png" alt>
        </router-link>
      </div>
      <div class="ell-b">Password assistance</div>
      <div
        class="ell-we"
      >Enter the email address or mobile phone number assocated withyour Jmoptical account</div>
      <div class="ell-txt">Email</div>
      <div v-if="show" class="ell-prompt ell-color">{{content}}</div>
      <div v-else class="ell-prompt">{{errTxt}}</div>
      <input type="text" v-model="email">
      <button class="ell-sign" @click="forgot">CONTINUE</button>
    </div>
    <div class="ell-bq">©️2018 JMOPTICAL Eyewear</div>
  </div>
</template>

<script>
import AJAX from "../../../Ajax";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      email: "",
      show: true,
      content: "It’s in your inbox. See you in a bit (:",
      errTxt: "",
      reg: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/
    };
  },
  created() {},
  methods: {
    forgot() {
      if (!this.email.trim()) {
        this.show = false;
        this.errTxt = "Email is a required field";
      } else if (this.reg.test(this.email) == false) {
        this.show = false;
        this.errTxt = "Invalid email";
      } else {
        console.log("发送请求");
        var code = 0;
        if (code == -1) {
          this.errTxt = "We don’t have an account associated with this email";
        } else if (code == 0) {
          this.show = true;
          setTimeout(res => {
            this.$router.back();
          }, 3000);
        }
      }
    }
  }
};
</script>

<style scoped>
::-webkit-input-placeholder {
  color: rgba(35, 24, 21, 0.4);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 16px;
}
.ell-bac {
  width: 100%;
  height: 100vh;
  background: url("../../../assets/login/beijing.png") no-repeat;
  background-size: 100% 100%;
}
.ell-img {
  text-align: center;
  padding-top: 10vh;
  margin-bottom: 3vh;
}
.ell-container {
  width: 30%;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
}
.ell-b {
  font-size: 40px;
  color: #ffffff;
  font-weight: 900;
  font-family: Bold;
  text-align: left;
}
.ell-we,
.ell-txt {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2vh;
  font-family: Regular;
  text-align: left;
}
.ell-txt {
  color: #f4d925;
  font-size: 16px;
}
.ell-container input {
  border: none;
  border-radius: 5px;
  background: #ffffff;
  height: 50px;
  margin-bottom: 1vh;
  width: 100%;
  padding-left: 15px;
  font-family: Regular;
  box-sizing: border-box;
}
.ell-sign {
  margin-top: 1vh;
  background: #e8e316;
  color: #000000;
  height: 50px;
  border-radius: 5px;
  width: 100%;
  border: none;
  font-family: Bold;
  margin-bottom: 1vh;
}
.ell-bq {
  position: fixed;
  bottom: 50px;
  font-size: 14px;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.4);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
.ell-prompt {
  font-family: Bold;
  font-size: 18px;
  border: 1px solid red;
  margin-bottom: 1vh;
  border-radius: 5px;
  padding: 10px 0;
  color: red;
  box-sizing: border-box;
}
.ell-color {
  box-sizing: border-box;
  border: 1px solid #34a123;
  color: #34a123;
}
@media screen and (max-width: 768px) {
  .ell-container {
    width: 90%;
  }
  .ell-b,
  .ell-we {
    text-align: left;
  }
  .ell-img {
  text-align: center;
  padding-top: 5vh;
  margin-bottom: 3vh;
}
.ell-b {
  font-size: .40rem;
  color: #ffffff;
  font-weight: 900;
  font-family: Bold;
  text-align: left;
}
.ell-we,
.ell-txt {
  font-size: .18rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2vh;
  font-family: Regular;
  text-align: left;
}
.ell-txt {
  color: #f4d925;
  font-size: .16rem;
}
.ell-container input {
  border: none;
  border-radius: 5px;
  background: #ffffff;
  height: .7rem;
  margin-bottom: 1vh;
  width: 100%;
  padding-left: 15px;
  font-family: Regular;
  box-sizing: border-box;
}
.ell-sign {
  margin-top: 1vh;
  background: #e8e316;
  color: #000000;
  height: .7rem;
  border-radius: 5px;
  width: 100%;
  border: none;
  font-family: Bold;
  margin-bottom: 1vh;
}
.ell-bq {
  position: fixed;
  bottom: 50px;
  font-size: .14rem;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.4);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
.ell-prompt {
  font-family: Bold;
  font-size: .18rem;
  border: 1px solid red;
  margin-bottom: 1vh;
  border-radius: 5px;
  padding: .10rem 0;
  color: red;
  box-sizing: border-box;
}
.ell-color {
  box-sizing: border-box;
  border: 1px solid #34a123;
  color: #34a123;
}
  .ell-logImg {
    width: 3rem;
    height: 1.2rem;
  }
}
</style>
