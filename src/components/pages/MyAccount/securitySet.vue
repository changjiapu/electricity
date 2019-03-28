<template>
  <div>
    <Banner :userInfo="userInfo"/>
    <div :class="currentClass">
      <div class="w">
        <ol class="h_breadcrumb">
          <li class="breadcrumb-item" v-if="widthH<=1024">
            <a href="#">Home ></a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">My Account</a>
          </li>
          <li>></li>
          <li class="breadcrumb-item active">Security</li>
        </ol>
        <div class="my_Security">
          <h1>My Security</h1>
          <p>We will fully protect your account security.</p>
          <!-- 我们将全力保障您的账户安全。。 -->
        </div>
        <div class="my_info">
          <div class="tishi" v-if="isShow">
            <img src="../../../assets/myAccount/xuanzhong.png" alt>
            <span>Your name has been changed successfully.</span>
          </div>
          <ul class="my_infoBox">
            <li class="my_infoList" v-for="(item,index) in infoList" :key="index">
              <div class="my_Info">
                <div class="my_InfoLeft">
                  <p>{{item.name}}</p>
                  <span>{{item.text}}</span>
                </div>
                <div class="my_InfoRight" @click="changeContent(index)">EDIT</div>
              </div>
              <div class="my_editName" v-if="item.showContent1">
                <span class="editName1">Change your name</span>
                <span class="editName2">New name:</span>
                <input class="editName3" type="text" v-model="setuserInfo.nickName">
                <div class="editName4">
                  <input class="editName5" type="button" value="SAVE" @click="updUserNikeName">
                  <input class="editName6" type="button" value="CANCEL">
                </div>
              </div>
              <div class="my_editEmail" v-if="item.showContent2">
                <span class="editEmail1">Change Email</span>
                <span class="edit_title">Old email address:</span>
                <span class="old_email">{{userInfo.userEmail}}</span>
                <span class="edit_title">New email address:</span>
                <input class="edit_text" type="text" v-model="setuserInfo.newEmail">
                <span class="edit_title">Re-enter new email:</span>
                <input class="edit_text" type="text">
                <span class="edit_title">Password:</span>
                <input class="edit_text" type="Password" v-model="setuserInfo.password">
                <span class="edit_title">Type characters:</span>
                <div class="TypeEditEmal">
                  <input class="TypeEditEmail" type="text" v-model="setuserInfo.code">
                  <img :src="imgURL">
                  <span @click="newChallenge()">See a new challenge</span>
                </div>
                <div class="editEmail4">
                  <input class="editEmail5" type="button" value="SAVE" @click="updUserEmail()">
                  <input class="editEmail6" type="button" value="CANCEL">
                </div>
              </div>
              <div class="my_editPhone" v-if="item.showContent3&&userInfo.userPhone">
                <span class="editPhone1">Change Mobile Phone Number</span>
                <div class="del_oldnumber">
                  <p class="edit_title">
                    Old mobile phone number:
                    <span class="edit_oldPhone">CN +86 {{item.text}}</span>
                  </p>
                  <a href="#">
                    <img src="../../../assets/myAccount/order/shangchu.png" alt>
                  </a>
                </div>
                <span class="edit_title">Mobile number:</span>
                <input class="editPhone2" type="text" value="US + 1">
                <input class="editPhone3" type="text" v-model="setuserInfo.phone">
                <div class="editPhone4">
                  <input class="editPhone5" type="button" value="CONTINUE" @click="updUserPhone()">
                  <input class="editPhone6" type="button" value="CANCEL">
                </div>
              </div>
              <div class="my_editPhone_null" v-if="item.showContent3&&!userInfo.userPhone">
                <span class="editPhone1">Add Mobile Phone Number</span>
                <span class="edit_title">Mobile number:</span>
                <input class="editPhone2" type="text" value="US + 1">
                <input class="editPhone3" type="text" v-model="setuserInfo.phone">
                <div class="editPhone4">
                  <input class="editPhone5" type="button" value="CONTINUE" @click="updUserPhone()">
                  <input class="editPhone6" type="button" value="CANCEL">
                </div>
              </div>
              <div class="my_editPassword" v-if="item.showContent4">
                <span class="editPassword1">Change Password</span>
                <span class="edit_title">Current password:</span>
                <input class="edit_text" type="password" v-model="setuserInfo.password2">
                <span class="edit_title">New password:</span>
                <input class="edit_text" type="password" v-model="setuserInfo.password3">
                <span class="edit_title">Reenter new password:</span>
                <input class="edit_text" type="password" v-model="setuserInfo.password4">
                <div class="editPassword4">
                  <input
                    class="editPassword5"
                    type="button"
                    value="SAVE"
                    @click="updUserPassword()"
                  >
                  <input class="editPassword6" type="button" value="CANCEL">
                </div>
              </div>
            </li>
          </ul>
          <input class="save" type="button" value="SAVE">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from "./common/banner";
import { mapState } from "vuex";
import {
  updUserNikeName,
  updUserPhone,
  updUserEmail,
  updUserPassword,
  verification
} from "@/Ajax/modules/security";
import { setTimeout } from "timers";
import { hex_md5 } from "../../../utils/md5.js";
export default {
  data() {
    return {
      widthH: "",
      tableList: [
        "SHIPPING & RETURNS",
        "SHOPPING ONLINE",
        "WARRANTY & REPAIRS"
      ],
      infoList: [
        {
          name: "Name:",
          showContent1: false,
          showContent2: false,
          showContent3: false,
          showContent4: false,
          text: "zoujie0506"
        },
        {
          name: "Email:",
          showContent1: false,
          showContent2: false,
          showContent3: false,
          showContent4: false,
          text: "zoujie0506@126.com"
        },
        {
          name: "Mobile Phone Number:",
          showContent1: false,
          showContent2: false,
          showContent3: false,
          showContent4: false,
          text: "133*****8973"
        },
        {
          name: "Password:",
          showContent1: false,
          showContent2: false,
          showContent3: false,
          showContent4: false,
          text: "**********"
        }
      ],
      userInfo: {},
      setuserInfo: {
        nickName: "",
        newEmail: "",
        password: "",
        password2: "", //原始密码
        password3: "", //第一次
        password4: "", //第二次输入
        code: ""
      },
      isShow: false,
      isShowCode: true,
      imgURL: ""
    };
  },
  components: {
    Banner
  },
  created() {
    this.widthH = this.$root.widthH;
    let userInfo = JSON.parse(this.$route.query.userInfo);
    this.userInfo = userInfo;
    console.log(this.userInfo);
    this.infoList[0].text = userInfo.nickName;
    this.infoList[1].text = userInfo.userEmail;
    this.infoList[2].text = userInfo.userPhone;
    this.getverification();
  },
  methods: {
    changeContent(index) {
      //通过index拿到当前值

      if (index == 0) {
        this.infoList[index].showContent1 = !this.infoList[index].showContent1;
      }
      if (index == 1) {
        this.infoList[index].showContent2 = !this.infoList[index].showContent2;
      }
      if (index == 2) {
        this.infoList[index].showContent3 = !this.infoList[index].showContent3;
      }
      if (index == 3) {
        this.infoList[index].showContent4 = !this.infoList[index].showContent4;
      }
    },
    //修改用户昵称
    updUserNikeName() {
      let params = {
        userId: this.userId,
        nickName: this.setuserInfo.nickName
      };
      updUserNikeName(params).then(res => {
        if (res.data.code == 0) {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        }
      });
    },
    //修改用户邮箱
    updUserEmail() {
      let params = {
        userId: this.userId,
        userEmail: this.userInfo.userEmail,
        newEmail: this.setuserInfo.newEmail,
        password: hex_md5(this.setuserInfo.password),
        code: this.setuserInfo.code
      };
      updUserEmail(params).then(res => {
        if (res.data.code == 0) {
          this.imgURL = res.data.data;
          console.log(this.imgURL);
        }
      });
    },
    //切换验证码
    newChallenge() {
      this.getverification();
    },
    //生成图文验证码
    getverification() {
      verification(this.userId).then(res => {
        if (res.data.code == 0) {
          this.imgURL = res.data.data;
        }
      });
    },
    //修改手机号码
    updUserPhone() {
      let params = {
        userId: this.userId,
        phone: this.setuserInfo.phone
      };
      updUserPhone(params).then(res => {
        if (res.data.code == 0) {
          this.isShow = true;
          setTimeout(() => {
            this.isShow = false;
          }, 2000);
        }
      });
    },
    //修改用户密码
    updUserPassword() {
      if (this.setuserInfo.password3 !== this.setuserInfo.password4) {
        this.$alert("The two passwords do not match", "prompt", {
          confirmButtonText: "confirm",
          callback: action => {}
        });
      } else {
        let parmas = {
          userId: this.userId,
          password: hex_md5(this.setuserInfo.password2),
          newPassword: hex_md5(this.setuserInfo.password3)
        };
        updUserPassword(parmas).then(res => {
          if (res.data.code == 0) {
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
            }, 2000);
          }
        });
      }
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "h_center1";
      } else {
        return "h_center2";
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
<style lang='scss' scoped>
/* 中间部分 */
@media (min-width: 1200px) {
  .w {
    max-width: 1200px;
    min-width: 980px;
    margin: 0 auto;
  }
}
@media (max-width: 1200px) {
  .w {
    padding: 0px 0.3rem;
  }
}
.h_center1 {
  font-family: "Regular";
  padding-bottom: 59px;
  font-weight: 700;
  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    padding: 26px 0px 28px 0px;
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
  .my_Security {
    padding-bottom: 19px;
    border-bottom: 1px solid #dddddd;
    h1 {
      font-size: 28px;
      color: #000000;
    }
    p {
      font-size: 14px;
      color: #999999;
    }
  }
  .my_info {
    margin: 40px 0px 121px 0px;
    //修改成功提示信息
    .tishi {
      width: 490px;
      height: 80px;
      line-height: 80px;
      border: 1px solid #231815;
      background-color: #f3f18a;
      border-radius: 2px;
      padding-left: 40px;
      color: #231815;
      box-sizing: border-box;
      img {
        padding-right: 15px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .my_infoBox {
      .my_infoList {
        padding-bottom: 28px;
        width: 490px;
        .my_Info {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: center;
          .my_InfoLeft {
            p {
              font-size: 18px;
              color: #231815;
              font-weight: 700;
            }
            span {
              color: #4a8ab0;
              font-size: 16px;
              font-weight: 700;
            }
          }
          .my_InfoRight {
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 700;
            border: 1px solid #231815;
            font-size: 14px;
            color: #231815;
            border-radius: 2px;
            cursor: pointer;
          }
          .my_InfoRight:hover {
            background-color: #f4d925;
          }
        }
        .my_editName {
          width: 490px;
          min-height: 175px;
          border: 1px solid #dddddd;
          border-radius: 2px;
          padding: 20px 0px 24px 30px;
          box-sizing: border-box;
          margin-top: 15px;
          span {
            display: block;
            width: 100%;
          }
          .editName1 {
            font-size: 16px;
            color: #231815;
            padding-bottom: 19px;
          }
          .editName2 {
            font-size: 14px;
            color: #4a8ab0;
            padding-bottom: 9px;
          }
          .editName3 {
            width: 190px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 15px;
          }
          .editName4 {
            input {
              width: 120px;
              height: 30px;
              border: 1px solid #eeeeee;
              border-radius: 2px;
              cursor: pointer;
            }
            .editName5 {
              background-color: #f4d925;
            }
            .editName6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editEmail {
          width: 490px;
          min-height: 480px;
          border: 1px solid #dddddd;
          border-radius: 2px;
          padding: 20px 0px 24px 30px;
          box-sizing: border-box;
          margin-top: 15px;
          span {
            display: block;
            width: 100%;
          }
          .editEmail1 {
            font-size: 16px;
            color: #231815;
            padding-bottom: 19px;
          }
          .old_email {
            color: #231815;
            padding-bottom: 28px;
          }
          .edit_title {
            font-size: 14px;
            color: #4a8ab0;
          }
          .edit_text {
            width: 190px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 20px;
            margin-top: 9px;
          }
          .TypeEditEmal {
            display: flex;
            align-items: center;
            .TypeEditEmail {
              width: 180px;
              height: 30px;
              margin-right: 4px;
              border: 1px solid #eeeeee;
              box-sizing: border-box;
            }
            img {
              width: 100px;
              height: 30px;
            }
            span {
              color: #231815;
              cursor: pointer;
            }
          }

          .editEmail4 {
            margin-top: 30px;
            input {
              width: 120px;
              height: 30px;
              border: 1px solid #eeeeee;
              border-radius: 2px;
              cursor: pointer;
            }
            .editEmail5 {
              background-color: #f4d925;
            }
            .editEmail6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPhone {
          width: 490px;
          min-height: 175px;
          border: 1px solid #dddddd;
          border-radius: 2px;
          padding: 20px 0px 24px 30px;
          box-sizing: border-box;
          margin-top: 15px;
          span {
            display: block;
            width: 100%;
          }
          .editPhone1 {
            font-size: 16px;
            color: #231815;
            padding-bottom: 19px;
          }
          .del_oldnumber {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            .edit_oldPhone {
              color: #231815;
            }
            a {
              display: flex;
              border: 1px solid #dddddd;
              border-radius: 2px;
              width: 30px;
              height: 30px;
              justify-content: center;
              align-items: center;
              img {
                display: inline-block;
              }
            }
          }
          .edit_title {
            font-size: 14px;
            color: #4a8ab0;
            padding-right: 30px;
          }
          .editPhone2 {
            width: 100px;
            height: 30px;
            border: 1px solid #eeeeee;
            text-align: center;
            font-size: 14px;
            color: #231815;
          }
          .editPhone3 {
            width: 190px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 15px;
          }
          .editPhone4 {
            input {
              width: 120px;
              height: 30px;
              border: 1px solid #eeeeee;
              border-radius: 2px;
            }
            .editPhone5 {
              background-color: #f4d925;
              cursor: pointer;
            }
            .editPhone6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPhone_null {
          width: 490px;
          min-height: 175px;
          border: 1px solid #dddddd;
          border-radius: 2px;
          padding: 20px 0px 24px 30px;
          box-sizing: border-box;
          margin-top: 15px;
          span {
            display: block;
            width: 100%;
          }
          .editPhone1 {
            font-size: 16px;
            color: #231815;
            padding-bottom: 19px;
          }
          .edit_title {
            font-size: 14px;
            color: #4a8ab0;
            padding-right: 30px;
          }
          .editPhone2 {
            width: 100px;
            height: 30px;
            border: 1px solid #eeeeee;
            text-align: center;
            font-size: 14px;
            color: #231815;
          }
          .editPhone3 {
            width: 190px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 15px;
          }
          .editPhone4 {
            input {
              width: 120px;
              height: 30px;
              border: 1px solid #eeeeee;
              border-radius: 2px;
            }
            .editPhone5 {
              background-color: #f4d925;
              cursor: pointer;
            }
            .editPhone6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPassword {
          width: 490px;
          min-height: 340px;
          border: 1px solid #dddddd;
          border-radius: 2px;
          padding: 20px 0px 24px 30px;
          box-sizing: border-box;
          margin-top: 15px;
          span {
            display: block;
            width: 100%;
          }
          .editPassword1 {
            font-size: 16px;
            color: #231815;
            padding-bottom: 19px;
          }
          .edit_title {
            font-size: 14px;
            color: #4a8ab0;
          }
          .edit_text {
            width: 190px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 20px;
            margin-top: 9px;
          }
          .editPassword4 {
            input {
              width: 120px;
              height: 30px;
              border: 1px solid #eeeeee;
              border-radius: 2px;
            }
            .editPassword5 {
              background-color: #f4d925;
            }
            .editPassword6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
      }
    }
    .save {
      width: 240px;
      height: 45px;
      background-color: #f4d925;
      border-radius: 2px;
      font-size: 14px;
      color: #231815;
      margin-top: 50px;
      font-weight: 700;
      cursor: pointer;
    }
  }
}
.h_center2 {
  font-family: "Regular";
  padding-bottom: 0.59rem;
  ol {
    background-color: #fff;
    font-size: 0.14rem;
    color: #999999;
    overflow: hidden;
    padding: 0.26rem 0rem 0.28rem 0rem;
    li {
      float: left;
      padding-right: 0.1rem;
      a {
        color: #999999;
      }
    }
    .active {
      color: #231815;
    }
  }
  .my_Security {
    padding: 0.2rem 0.4rem;
    border-bottom: 1px solid #dddddd;
    h1 {
      font-size: 0.28rem;
      color: #000000;
    }
    p {
      font-size: 0.14rem;
      color: #999999;
    }
  }
  .my_info {
    margin: 0.4rem 0rem 1.21rem 0rem;
    //修改成功提示信息
    .tishi {
      // width: 4.90rem;
      height: 0.8rem;
      line-height: 0.8rem;
      border: 0.01rem solid #231815;
      background-color: #f3f18a;
      border-radius: 0.02rem;
      padding-left: 0.4rem;
      color: #231815;
      box-sizing: border-box;
      font-size: 0.14rem;
      transform: translate3d(0, 0, 0);
      img {
        padding-right: 0.15rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .my_infoBox {
      width: 100%;
      margin: 0 auto;
      padding: 0 0.3rem;
      box-sizing: border-box;
      .my_infoList {
        padding-bottom: 0.28rem;
        width: 100%;
        .my_Info {
          margin-top: 0.2rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          // flex-direction: row;
          // align-items: center;
          .my_InfoLeft {
            display: flex;
            flex-direction: column;
            p {
              font-size: 0.18rem;
              color: #231815;
              font-weight: 700;
            }
            span {
              margin-top: 0.2rem;
              color: #4a8ab0;
              font-size: 0.16rem;
              font-weight: 700;
            }
          }
          .my_InfoRight {
            width: 0.8rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
            font-weight: 700;
            border: 0.01rem solid #231815;
            font-size: 0.14rem;
            color: #231815;
            border-radius: 0.02rem;
          }
        }
        .my_editName {
          width: 4.9rem;
          min-height: 1.75rem;
          border: 0.01rem solid #dddddd;
          border-radius: 0.02rem;
          padding: 0.2rem 0rem 0.24rem 0.3rem;
          box-sizing: border-box;
          margin-top: 0.15rem;
          span {
            display: block;
            width: 100%;
          }
          .editName1 {
            font-size: 0.16rem;
            color: #231815;
            padding-bottom: 0.19rem;
          }
          .editName2 {
            font-size: 0.14rem;
            color: #4a8ab0;
            padding-bottom: 0.09rem;
          }
          .editName3 {
            width: 1.9rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            margin-bottom: 0.15rem;
          }
          .editName4 {
            input {
              width: 1.2rem;
              height: 0.3rem;
              border: 0.01rem solid #eeeeee;
              border-radius: 0.02rem;
            }
            .editName5 {
              background-color: #f4d925;
            }
            .editName6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editEmail {
          width: 100%;
          min-height: 4.8rem;
          border: 0.01rem solid #dddddd;
          border-radius: 0.02rem;
          padding: 0.2rem 0rem 0.24rem 0.3rem;
          box-sizing: border-box;
          margin-top: 0.15rem;
          span {
            font-size: 0.16rem;
            display: block;
            width: 100%;
          }
          .editEmail1 {
            font-size: 0.16rem;
            color: #231815;
            padding-bottom: 0.19rem;
          }
          .old_email {
            color: #231815;
            padding-bottom: 0.28rem;
          }
          .edit_title {
            font-size: 0.14rem;
            color: #4a8ab0;
          }
          .edit_text {
            width: 1.9rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            margin-bottom: 0.2rem;
            margin-top: 0.09rem;
          }
          .TypeEditEmal {
            display: flex;
            align-items: center;
            .TypeEditEmail {
              width: 1.8rem;
              height: 0.3rem;
              margin-right: 0.04rem;
              border: 0.01rem solid #eeeeee;
              box-sizing: border-box;
            }
            img {
              width: 1rem;
              height: 0.3rem;
            }
            span {
              color: #231815;
              display: inline-block;
              text-decoration: underline;
            }
          }

          .editEmail4 {
            margin-top: 0.3rem;
            input {
              width: 1.2rem;
              height: 0.3rem;
              border: 0.01rem solid #eeeeee;
              border-radius: 0.02rem;
            }
            .editEmail5 {
              background-color: #f4d925;
            }
            .editEmail6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPhone {
          width: 4.9rem;
          min-height: 1.75rem;
          border: 0.01rem solid #dddddd;
          border-radius: 0.02rem;
          padding: 0.2rem 0rem 0.24rem 0.3rem;
          box-sizing: border-box;
          margin-top: 0.15rem;
          span {
            display: block;
            width: 100%;
          }
          .editPhone1 {
            font-size: 0.16rem;
            color: #231815;
            padding-bottom: 0.19rem;
          }
          .del_oldnumber {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 0.2rem;
            .edit_oldPhone {
              color: #231815;
            }
            a {
              display: flex;
              border: 0.01rem solid #dddddd;
              border-radius: 0.02rem;
              width: 0.3rem;
              height: 0.3rem;
              justify-content: center;
              align-items: center;
              img {
                display: inline-block;
              }
            }
          }
          .edit_title {
            font-size: 0.14rem;
            color: #4a8ab0;
            padding-right: 0.3rem;
          }
          .editPhone2 {
            width: 1rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            text-align: center;
            font-size: 0.14rem;
            color: #231815;
          }
          .editPhone3 {
            width: 1.9rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            margin-bottom: 0.15rem;
          }
          .editPhone4 {
            input {
              width: 1.2rem;
              height: 0.3rem;
              border: 0.01rem solid #eeeeee;
              border-radius: 0.02rem;
            }
            .editPhone5 {
              background-color: #f4d925;
              cursor: pointer;
            }
            .editPhone6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPhone_null {
          width: 4.9rem;
          min-height: 1.75rem;
          border: 0.01rem solid #dddddd;
          border-radius: 0.02rem;
          padding: 0.2rem 0rem 0.24rem 0.3rem;
          box-sizing: border-box;
          margin-top: 0.15rem;
          span {
            display: block;
            width: 100%;
          }
          .editPhone1 {
            font-size: 0.16rem;
            color: #231815;
            padding-bottom: 0.19rem;
          }
          .edit_title {
            font-size: 0.14rem;
            color: #4a8ab0;
            padding-right: 0.3rem;
          }
          .editPhone2 {
            width: 1rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            text-align: center;
            font-size: 0.14rem;
            color: #231815;
          }
          .editPhone3 {
            width: 1.9rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            margin-bottom: 0.15rem;
          }
          .editPhone4 {
            input {
              width: 1.2rem;
              height: 0.3rem;
              border: 0.01rem solid #eeeeee;
              border-radius: 0.02rem;
            }
            .editPhone5 {
              background-color: #f4d925;
              cursor: pointer;
            }
            .editPhone6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
        .my_editPassword {
          width: 4.9rem;
          min-height: 3.4rem;
          border: 0.01rem solid #dddddd;
          border-radius: 0.02rem;
          padding: 0.2rem 0rem 0.24rem 0.3rem;
          box-sizing: border-box;
          margin-top: 0.15rem;
          span {
            display: block;
            width: 100%;
          }
          .editPassword1 {
            font-size: 0.16rem;
            color: #231815;
            padding-bottom: 0.19rem;
          }
          .edit_title {
            font-size: 0.14rem;
            color: #4a8ab0;
          }
          .edit_text {
            width: 1.9rem;
            height: 0.3rem;
            border: 0.01rem solid #eeeeee;
            margin-bottom: 0.2rem;
            margin-top: 0.09rem;
          }
          .editPassword4 {
            input {
              width: 1.2rem;
              height: 0.3rem;
              border: 0.01rem solid #eeeeee;
              border-radius: 0.02rem;
            }
            .editPassword5 {
              background-color: #f4d925;
            }
            .editPassword6 {
              background-color: #dddddd;
              color: #fff;
            }
          }
        }
      }
    }
    .save {
      width: 100%;
      height: 0.7rem;
      background-color: #f4d925;
      border-radius: 0.02rem;
      font-size: 0.18rem;
      color: #231815;
      margin-top: 0.5rem;
      font-weight: 700;
    }
  }
}
</style>

