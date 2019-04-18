<template>
  <div class="ell-bac">
    <div class="ell-container">
       <router-link to="./">
        <span class="back">{{$t('m.Register.title1')}}</span>
      </router-link>
      <router-link to="./">
        <img class="ell-logImg" src="../../../assets/login/logo.png" alt>
      </router-link>
      <div class="ell-b">{{$t('m.Register.title2')}}</div>
      <div class="ell-we">{{$t('m.Register.title3')}}</div>
      <div class="ell-btn">
        <!-- <button @click="facebook">SIGN IN WITH FACEBOOK</button>
        <button @click="google">SIGN IN WITH GOOGLE</button> -->
      </div>
      <div v-if="show" class="ell-prompt" v-html="errTxt"></div>
      <input type="text" :placeholder="$t('m.Register.placeholder1')" v-model="firstName">
      <input type="text" :placeholder="$t('m.Register.placeholder2')" v-model="lastName">
      <input type="text" :placeholder="$t('m.Register.placeholder3')" v-model="email">
      <div class="code-box">
        <input type="text" :placeholder="$t('m.Register.placeholder4')" v-model="code">
        <span @click="emailClick">{{codeTime}}</span>
      </div>
      <input type="password" :placeholder="$t('m.Register.placeholder5')" v-model="password">
      <input type="password" :placeholder="$t('m.Register.placeholder6')" v-model="confirmPas">
      <div class="agreement-box">
        <el-checkbox v-model="checked">{{$t('m.Register.title4')}}</el-checkbox>
      </div>

      <button class="ell-sign" @click="signIn">{{$t('m.Register.title5')}}</button>
    </div>
    <div class="ell-bq">{{$t('m.Register.title6')}}</div>
  </div>
</template>

<script>
import { emailFun, addUserBySystem } from "../../../Ajax/modules/login";
import { hex_md5 } from "../../../utils/md5";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      confirmPas: "",
      email: "",
      code: "", //邮箱验证码
      show: false,
      errTxt: "",
      reg: /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/,
      codeReg: /^\d{4}$/, //邮箱验证码验证
      checked: false, //复选默认
      codeTime: "Send", //发送按钮
      codeFlag: true //发送状态
    };
  },
  created() {},
  methods: {
    //发送邮箱验证
    emailClick() {
      var that = this;
      if (this.codeFlag) {
        this.CountdownFun(180);
        if (!this.reg.test(this.email) == false) {
          emailFun(this.email).then(response => {
            that.codeFlag = false;
          });
        } else {
          this.show = true;
          this.errTxt += this.$t('m.Register.tips1');
        }
      } else {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips2');
      }
    },
    //倒计时
    CountdownFun(data) {
      var that = this;
      var time = setInterval(() => {
        data--;
        that.codeTime = data;
        if (data == 0) {
          clearInterval(time);
          that.codeFlag = true;
          that.codeTime = this.$t('m.Register.tips3');
        }
      }, 1000);
    },
    //登录
    signIn() {
      console.log(this.checked);
      this.errTxt = "";
      this.show = false;
      if (!this.firstName.trim()) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips4');
      }
      if (this.firstName.length < 1) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips5');
      }
      if (!this.lastName.trim()) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips6');
      }
      if (this.lastName.length < 1) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips7');
      }
      if (!this.email.trim()) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips8');
      } else if (this.reg.test(this.email) == false) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips9');
      }
      if (!this.code.trim()) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips10');
      } else if (this.codeReg.test(this.code) == false) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips11');
      }
      if (!this.checked) {
        this.show = true;
        this.errTxt += this.$t('m.Register.tips12');
      }
      if (!this.show) {
        if (!this.password.trim()) {
          this.show = true;
          this.errTxt += this.$t('m.Register.tips13');
        }
      }
      if (!this.show) {
        if (!this.confirmPas.trim() || this.confirmPas !== this.password) {
          this.show = true;
          this.errTxt += this.$t('m.Register.tips14');
        }
      }
       if (!this.show) {
          var reg=/^[0-9]*$/ 
          if(reg.test(this.password)){
          this.show = true;
          this.errTxt += this.$t('m.Register.tips15');
          }
      }
          if (!this.show) {
          if(this.password.length<6){
          this.show = true;
          this.errTxt += this.$t('m.Register.tips16');
          }
      }
      if (!this.show) {
        let postData = {
          userEmail: this.email,
          password: hex_md5(this.password),
          firstName: this.firstName,
          lastName: this.lastName,
          code: this.code
        };
        addUserBySystem(postData).then(response => {
          if (response.data.code == 0) {
            this.setToken(response.data.data.token);
            this.setUserId(response.data.data.userId);
            this.$router.push("/");
          }
        });
      }
    },
    facebook() {},
    google() {},
    ...mapMutations({
      setToken: "SET_TOKEN",
      setUserId: "SET_USERID"
    })
  },
  computed: {}
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
  min-height: 100vh;
  background: url("../../../assets/login/beijing.png") no-repeat;
  background-size: 100% 100%;
}

.ell-btn {
  margin-bottom: 4vh;
  display: flex;
  justify-content: space-between;
}

.ell-btn button {
  width: 48%;
  border: none;
  outline: none;
  background: transparent;
  border: 1px solid #e8e316;
  height: 0.45px;
  line-height: 45px;
  color: #ffffff;
  border-radius: 5px;
  font-family: Bold;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

.ell-img {
  text-align: center;
  padding-top: 10vh;
  margin-bottom: 3vh;
}

.ell-container {
  position: relative;
  padding-top: 100px;
  width: 30%;
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  box-sizing: border-box;
}

.ell-b {
  font-size: 40px;
  color: #ffffff;
  font-weight: 900;
  font-family: Bold;
}

.ell-we {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2vh;
  font-family: Regular;
}

.ell-container input {
  text-indent: 15px;
}

.ell-container input,
.code-box {
  border: none;
  border-radius: 5px;
  background: #ffffff;
  height: 40px;
  margin-bottom: 1vh;
  width: 100%;
  font-family: Regular;
}

.code-box {
  background: transparent;
}

.code-box input {
  float: left;
  width: 50%;
}

.code-box span {
  padding: 0;
  float: right;
  display: block;
  width: 40%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  font-size: 12px;
  font-family: Regular;
  background: #ffffff;
}

.agreement-box {
  text-align: left;
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

.ell-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.ell-bq {
  /* position: fixed;
  bottom: 50px; */
  font-size: 14px;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.4);
  width: 100%;
  text-align: center;
}

.ell-prompt {
  font-family: Regular;
  font-size: 18px;
  border: 1px solid red;
  margin-bottom: 1vh;
  border-radius: 5px;
  padding: 10px 0;
  color: red;
}
.back {
  position: absolute;
  right: 0;
  top: 130px;
  color: #e8e316;
  font-size: .16rem;
  font-family: "regular";
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}
@media screen and (max-width: 1024px) {
    .back {
  position: absolute;
  right: 0;
  top: 2rem;
  color: #e8e316;
  font-size: .16rem;
  font-family: "regular";
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}
  .ell-container {
    padding-top: 1rem;
    width: 90%;
  }
  .ell-b,
  .ell-we {
    text-align: left;
  }
  .ell-btn {
    /* margin-bottom: 1vh; */
    display: flex;
    justify-content: space-between;
  }

  .ell-btn button {
    width: 49%;
    border: none;
    outline: none;
    background: transparent;
    border: 1px solid #e8e316;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #ffffff;
    border-radius: 5px;
    font-family: Bold;
    padding: 0;
    margin: 0;
    font-size: 0.12rem;
  }

  .ell-img {
    text-align: center;
    padding-top: 5vh;
    margin-bottom: 1vh;
  }

  .ell-b {
    font-size: 0.4rem;
    color: #ffffff;
    font-weight: 900;
    font-family: Bold;
  }

  .ell-we {
    font-size: 0.18rem;
    color: rgba(255, 255, 255, 0.6);
    /* margin-bottom: 1vh; */
    font-family: Regular;
  }

  .ell-container input {
    text-indent: 15px;
  }

  .ell-container input,
  .code-box {
    border: none;
    border-radius: 5px;
    background: #ffffff;
    height: 0.7rem;
    /* margin-bottom: 1vh; */
    width: 100%;
    font-family: Regular;
  }

  .code-box {
    background: transparent;
  }

  .code-box input {
    float: left;
    width: 50%;
  }

  .code-box span {
    padding: 0;
    float: right;
    display: block;
    width: 40%;
    height: 0.7rem;
    line-height: 0.7rem;
    border-radius: 5px;
    font-size: 0.12rem;
    font-family: Regular;
    background: #ffffff;
  }

  .agreement-box {
    text-align: left;
  }

  .ell-sign {
    /* margin-top: 1vh; */
    background: #e8e316;
    color: #000000;
    height: 0.7rem;
    border-radius: 5px;
    width: 100%;
    border: none;
    font-family: Bold;
    /* margin-bottom: 1vh; */
  }

  .ell-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: Regular;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.14rem;
  }

  .ell-bq {
    /* position: fixed;
  bottom: 50px; */
    font-size: 0.14rem;
    font-family: Regular;
    color: rgba(255, 255, 255, 0.4);
    width: 100%;
    text-align: center;
  }

  .ell-prompt {
    font-family: Regular;
    font-size: 0.18rem;
    border: 1px solid red;
    /* margin-bottom: 1vh; */
    border-radius: 5px;
    padding: 10px 0;
    color: red;
  }
  .ell-logImg {
    width: 3rem;
    height: 1.2rem;
  }
}
@media screen and (max-width: 768px) {
  .back {
  position: absolute;
  right: 0;
  top: 2.6rem;
}
}
</style>