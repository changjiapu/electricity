<template>
  <div class="ell-bac">
    <div class="ell-container">
      <router-link to="/index/home">
        <span class="back">Back home</span>
      </router-link>
      <router-link to="/index/home">
        <img class="ell-logImg" src="../../../assets/login/logo.png" alt>
      </router-link>
      <div class="ell-b">Login</div>
      <div class="ell-we">Welcome to Jmoptical</div>
      <!-- <div id="google-signin-button">goole</div> -->
      <div class="ell-btn">
        <a href="javascript:void(0)" @click="facebook('facebook')">
          SIGN IN WITH FACEBOOK
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-facebook"></use>
          </svg>
        </a>
        <a id="google-signin-button">
          SIGN IN WITH GOOGLE
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-facebook"></use>
          </svg>
        </a>
        <!-- <button @click="facebook">SIGN IN WITH FACEBOOK</button>
        <button @click="google">SIGN IN WITH GOOGLE</button>-->
      </div>
      <div v-if="show" class="ell-prompt" v-html="errTxt"></div>
      <input type="text" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button class="ell-sign" @click="signIn">SIGN IN</button>
      <div class="ell-bottom">
        <p @click="jump">Forgot Password?</p>
        <p @click="jumps">Join Free</p>
      </div>
    </div>
    <div class="ell-bq">©️2018 JMOPTICAL Eyewear</div>
  </div>
</template>
<script>
// import hello from 'hellojs/dist/hello.all'
import { login, facebookLogin } from "../../../Ajax/modules/login";
import { hex_md5 } from "../../../utils/md5";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      widthH:'',
      password: "",
      email: "",
      show: false,
      errTxt: "Login and password are required."
    };
  },
  created() {
      this.widthH=this.$root.widthH
  },
  mounted() {
    if(this.widthH>1024){
    gapi.load("auth2", function() {}); // 加载auth2凭据
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn,
      scope: "profile email",
      width: 400,
      height: 50,
      longtitle: true,
      theme: "dark"
      // onfailure: onFailure
    });
    }else{
          gapi.load("auth2", function() {}); // 加载auth2凭据
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn,
      scope: "profile email",
      width: 200,
      height: 50,
      longtitle: true,
      theme: "dark"
      // onfailure: onFailure
    });
    }

  },
  methods: {
    signIn() {
      var that = this;
      if (!this.email.trim() || !this.password.trim()) {
        this.show = true;
      } else {
        console.log("发送请求");
        let postData = {
          userEmail: this.email,
          password: hex_md5(this.password)
        };
        login(postData).then(response => {
          if (response.data.code == 0) {
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("userId", response.data.data.userId);
            this.setToken(response.data.data.token);
            this.setUserId(response.data.data.userId);
            this.$router.push("./");
          } else {
            this.show = true;
            this.errTxt =
              "Invalid username or password <br> (check your CAPS LOCK key)";
          }
        });
      }
    },
    jump() {
      this.$router.push("/forgorPas");
    },
    jumps() {
      this.$router.push("/register");
    },
    facebook(e) {
      let _this = this;
      FB.getLoginStatus(function(res) {
        console.log(res);
        // 这里判断facebook是否登陆 如果登陆直接拿数据
        if (res.status == "connected") {
          FB.api("/me", { fields: "last_name,first_name" }, response => {
            console.log(response);
            let params = {
              accessToken: res.authResponse.accessToken,
              facebookUserId: res.authResponse.userID,
              firstName: response.first_name,
              lastName: response.last_name
            };
            facebookLogin(params).then(data => {
              if (data.data.code == 0) {
                sessionStorage.setItem("token", data.data.data.token);
                sessionStorage.setItem("userId", data.data.data.userId);
                _this.setToken(data.data.data.token);
                _this.setUserId(data.data.data.userId);
                _this.$router.push("./");
              } else {
                _this.show = true;
                _this.errTxt =
                  "Invalid username or password <br> (check your CAPS LOCK key)";
              }
            });
          });
        } else {
          //用户facebook没有登陆  调用登陆
          FB.login(res => {
            console.log(res);
            FB.api("/me", { fields: "last_name,first_name" }, response => {
              console.log(response);
              let params = {
                accessToken: res.authResponse.accessToken,
                facebookUserId: res.authResponse.userID,
                firstName: response.first_name,
                lastName: response.last_name
              };
              facebookLogin(params).then(data => {
                if (data.data.code == 0) {
                  sessionStorage.setItem("token", data.data.data.token);
                  sessionStorage.setItem("userId", data.data.data.userId);
                  _this.setToken(data.data.data.token);
                  _this.setUserId(data.data.data.userId);
                  _this.$router.push("./");
                } else {
                  _this.show = true;
                  _this.errTxt =
                    "Invalid username or password <br> (check your CAPS LOCK key)";
                }
              });
            });
          });
        }
      });
    },
    onSignIn(user) {
      const profile = user.getBasicProfile(); // 用户登录信息
      console.log("ID: " + profile.getId());
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      var id_token = user.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
    google() {},
    ...mapMutations({
      setToken: "SET_TOKEN",
      setUserId: "SET_USERID"
    })
  },
  computed: {
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

<style scoped>
::-webkit-input-placeholder {
  color: rgba(35, 24, 21, 0.4);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 16px;
}

.ell-bac {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: url("../../../assets/login/beijing.png") no-repeat;
  background-size: 100% 100%;
}

.ell-btn {
  margin-bottom: 2vh;
  display: flex;
  justify-content: space-between;
}

.ell-btn a:first-of-type {
  width: 48%;
  border: none;
  outline: none;
  background: transparent;
  border: 1px solid #e8e316;
  height: 45px;
  line-height: 45px;
  color: #ffffff;
  border-radius: 5px;
  font-family: Bold;
  padding: 0;
  margin: 0;
  font-size: 12px;
  overflow: hidden;
}
.ell-btn a:last-of-type {
  width: 48%;
  border: none;
  outline: none;
  background: transparent;
  /* border: 1px solid #e8e316; */
  height: 45px;
  line-height: 45px;
  color: #ffffff;
  border-radius: 5px;
  font-family: Bold;
  padding: 0;
  margin: 0;
  font-size: 12px;
  overflow: hidden;
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
  height: 100vh;
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

.ell-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.ell-bq {
  position: fixed;
  bottom: 50px;
  font-size: 14px;
  font-family: Regular;
  color: rgba(255, 255, 255, 0.4);
  width: 100%;
  text-align: center;
}

.ell-prompt {
  font-family: Bold;
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
  font-size: 0.16rem;
  font-family: "regular";
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}
@media screen and (max-width: 1024px) {
  .ell-container {
    width: 90%;
  }
  .ell-b,
  .ell-we {
    text-align: left;
    font-size: 0.18rem;
  }
  .back {
    position: absolute;
    right: 0;
    top: 2rem;
    color: #e8e316;
    font-size: 0.16rem;
    font-family: "regular";
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
  }
}
@media screen and (max-width: 768px) {
  .back {
    position: absolute;
    right: 0;
    top: 2.6rem;
  }
  .ell-btn {
    margin-bottom: 1vh;
    display: flex;
    justify-content: space-between;
  }

  .ell-btn a {
    width: 50%;
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
    margin-bottom: 1vh;
    font-family: Regular;
  }

  .ell-container input {
    border: none;
    border-radius: 5px;
    background: #ffffff;
    height: 0.8rem;
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
    height: 0.8rem;
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
    font-size: 0.14prem;
  }

  .ell-bq {
    position: fixed;
    bottom: 50px;
    font-size: 0.14rem;
    font-family: Regular;
    color: rgba(255, 255, 255, 0.4);
    width: 100%;
    text-align: center;
  }

  .ell-prompt {
    font-family: Bold;
    font-size: 0.18rem;
    border: 1px solid red;
    margin-bottom: 1vh;
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