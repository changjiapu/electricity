<template>
  <div class="ell-bac">
    <div class="ell-container">
       <router-link to="/index/home">
        <span class="back">Back home</span>
      </router-link>
      <router-link to="/index/home">
        <img class="ell-logImg" src="../../../assets/login/logo.png" alt>
      </router-link>
      <div class="ell-b">Sign up</div>
      <div class="ell-we">Welcome to Jmoptical</div>
      <div class="ell-btn">
        <button @click="facebook">SIGN IN WITH FACEBOOK</button>
        <button @click="google">SIGN IN WITH GOOGLE</button>
      </div>
      <div v-if="show" class="ell-prompt" v-html="errTxt"></div>
      <input type="text" placeholder="First Name" v-model="firstName">
      <input type="text" placeholder="Last Name" v-model="lastName">
      <input type="text" placeholder="Email Name" v-model="email">
      <div class="code-box">
        <input type="text" placeholder="Verification Code" v-model="code">
        <span @click="emailClick">{{codeTime}}</span>
      </div>
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Confirm Password" v-model="confirmPas">
      <div class="agreement-box">
        <el-checkbox v-model="checked">sign up for newsletter</el-checkbox>
      </div>

      <button class="ell-sign" @click="signIn">SIGN UP</button>
    </div>
    <div class="ell-bq">©️2018 JMOPTICAL Eyewear</div>
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
          this.errTxt += `Email is not a valid email address.`;
        }
      } else {
        this.show = true;
        this.errTxt += `Do not submit repeatedly.`;
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
          that.codeTime = "Send";
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
        this.errTxt += `"First Name" is a required value.<br>`;
      }
      if (this.firstName.length < 1) {
        this.show = true;
        this.errTxt += `"First Name" length must be equal or greater than 1 characters.<br>`;
      }
      if (!this.lastName.trim()) {
        this.show = true;
        this.errTxt += `"Last Name" is a required value.<br>`;
      }
      if (this.lastName.length < 1) {
        this.show = true;
        this.errTxt += `"Last Name" length must be equal or greater than 1 characters.<br>`;
      }
      if (!this.email.trim()) {
        this.show = true;
        this.errTxt += `"Email" is a required value.<br>`;
      } else if (this.reg.test(this.email) == false) {
        this.show = true;
        this.errTxt += `Email is not a valid email address`;
      }
      if (!this.code.trim()) {
        this.show = true;
        this.errTxt += `Please input the password`;
      } else if (this.codeReg.test(this.code) == false) {
        this.show = true;
        this.errTxt += `Please enter 4-digit verification code`;
      }
      if (!this.checked) {
        this.show = true;
        this.errTxt += `Please read the user agreement first`;
      }
      if (!this.show) {
        if (!this.password.trim()) {
          this.show = true;
          this.errTxt += `The password cannot be empty`;
        }
      }
      if (!this.show) {
        if (!this.confirmPas.trim() || this.confirmPas !== this.password) {
          this.show = true;
          this.errTxt += `Please make sure your passwords match.`;
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
            this.$router.push("./");
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
.back{
  position: absolute;
  right: 0;
  top:130px;
  background-color: #e8e316;
  font-size: 16px;
  font-family: 'regular';
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  width: 100px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  text-transform:uppercase;
}
@media screen and (max-width: 1024px) {
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
</style>