<template>
  <div class="footer">
    <div class="head">
      <div class="content">
        <div class="left">
          <span>{{$t('m.footer.input_1')}}</span>
          <div class="input">
            <input type="text" v-model="input1" :placeholder="$t('m.footer.input_2')">
            <span @click="dingyue()">{{$t('m.footer.input_3')}}</span>
          </div>
        </div>
        <div class="right">
          <span>Let's be friends</span>
          <div class="img_list">
            <img src="../../assets/prublic/f-hei.png" alt>
            <img src="../../assets/prublic/in-hei.png" alt>
            <img src="../../assets/prublic/niao-hei.png" alt>
            <img src="../../assets/prublic/youtub8-hei.png" alt>
            <img src="../../assets/prublic/ghei.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="logo1" v-if="widthH>1024">
      <img class="logo_img" src="../../assets/prublic/logo-huangse.png" alt>
    </div>
        <div class="logo2" v-else>
      <img class="logo_img" src="../../assets/prublic/logo-huangse.png" alt>
    </div>
    <div class="main">
      <div class="content">
        <div class="head_1">
          <div>
            <span class="title">{{menuList[0].categoryName}}</span>
            <span
              v-for="(item,index) in menuList[0].cateGoryList"
              :key="index"
              @click="jump(item.categoryId,0)"
            >{{item.categoryName}}</span>
          </div>
          <div>
            <span class="title">{{menuList[1].categoryName}}</span>
            <span
              v-for="(item,index) in menuList[1].cateGoryList"
              :key="index"
              @click="jump(item.categoryId,1)"
            >{{item.categoryName}}</span>
          </div>
          <div>
            <span class="title">{{menuList[2].categoryName}}</span>
            <span
              v-for="(item,index) in menuList[2].cateGoryList"
              :key="index"
              @click="jump(item.categoryId,2)"
            >{{item.categoryName}}</span>
          </div>
          <!-- help -->
          <div>
            <span class="title">Help</span>
            <span
              v-for="(item,index) in helpList"
              :key="index"
              @click="gotoHelp()"
            >{{item.helpTitle}}</span>
          </div>
          <div v-if="list1[0]">
            <span class="title">{{list1[0].linkTitle}}</span>
            <span
              v-for="(item,index) in list1[0].linkLabelList"
              :key="index"
              @click="gotoHelp2(0)"
            >{{item.linkTitle}}</span>
          </div>
          <div v-if="list1[1]">
            <span class="title">{{list1[1].linkTitle}}</span>
            <span
              v-for="(item,index) in list1[1].linkLabelList"
              :key="index"
              @click="gotoHelp2(0)"
            >{{item.linkTitle}}</span>
          </div>
          <!-- <div>
            <span class="title"></span>
            <span>Men Eyeglasses</span>
            <span>Women Eyeglasses</span>
            <span>Multifocal</span>
            <span>Rx Sunglasses</span>
            <span>Aviator Glasses</span>
            <span>Classic Wayframe</span>
            <span>Round Glasses</span>
            <span>Oval Glasses</span>
          </div>-->
        </div>
        <div class="main_1" v-for="(item,index) in list2" :key="index">
          <span class="title">{{item.linkTitle}}</span>
          <span
            v-for="(item2,index2) in list.linkLabelList"
            :key="index2"
            @click="gotoHelp3(index)"
          >{{item2.linkTitle}}</span>
        </div>
        <div class="img_footer">
          <img src="../../assets/prublic/b977bd779e37f5643bd168c50c089e6.png" alt>
        </div>
      </div>
    </div>
    <div class="footer_1">
      <div class="content">
        <div class="msg_1">
          <div class="item">
            <img src="../../assets/prublic/footer1.jpg" alt>
            <div class="item_msg">
              <span>{{$t('m.footer.msg_1')}}</span>
              <span>{{$t('m.footer.msg_2')}}</span>
            </div>
          </div>
          <div class="item">
            <img src="../../assets/prublic/footer2.jpg" alt>
            <div class="item_msg">
              <span>{{$t('m.footer.msg_3')}}</span>
              <span>{{$t('m.footer.msg_4')}}</span>
            </div>
          </div>
          <div class="item">
            <img src="../../assets/prublic/footer3.jpg" alt>
            <div class="item_msg">
              <span>{{$t('m.footer.msg_5')}}</span>
              <span>{{$t('m.footer.msg_6')}}</span>
            </div>
          </div>
        </div>
        <div class="msg_2">{{$t('m.footer.msg_7')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../baseUrl";
import AJAX from "../../Ajax";
import { getHelpList } from "@/Ajax/modules/myAccount";
import { getProductCategory, getLinkLabelList } from "../../Ajax/modules/home";
import { subscribeToNews } from "../../Ajax/modules/login";
export default {
  data() {
    return {
      widthH: "",
      input1: "",
      menuList: [],
      helpList: [],
      list1: [], //5 6条
      list2: [] //56条之后
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.getProductCategory();
    this.getHelpList();
    this.getLinkLabelList();
  },
  methods: {
    //底部信息前三排
    getProductCategory() {
      getProductCategory().then(res => {
        if (res.data.code == 0) {
          this.menuList = res.data.data.cateGories;
        }
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
    getLinkLabelList() {
      getLinkLabelList().then(res => {
        if (res.data.code == 0) {
          localStorage.setItem("helpList", JSON.stringify(res.data.data));
          this.list1 = res.data.data.slice(0, 2);
          this.list2 = res.data.data.slice(2);
          console.log(this.list1);
          console.log(this.list2);
        }
      });
    },
    gotoHelp2(index) {
      localStorage.setItem("helpId", index);
      window.open(`${baseUrl}/#/myAccount/help2`);
    },
    gotoHelp3(index) {
      localStorage.setItem("helpId", index+2);
      window.open(`${baseUrl}/#/myAccount/help2`);
    },
    jump(id, tabId) {
      this.index_10 = false;
      this.bus.$emit("jump", id, tabId);
      window.open(`${baseUrl}/#/search/${id}/${tabId}`);
      // this.$router.push({
      //   name: "/search",
      //   params: {
      //     data: id,
      //     tabId: tabId
      //   }
      // });
    },
    gotoHelp() {
      window.open(`${baseUrl}/#/myAccount/help`);
    },
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
  font-family: "regular";
  width: 100%;
  .head {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 150px;
    background-color: #f4f4f4;
    .content {
      width: 11rem;
      font-size: 0.14rem;
      font-weight: bold;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left {
        .input {
          margin-top: 0.2rem;
          input {
            border: 2px solid #000000;
            height: 0.3rem;
            width: 2rem;
            border-radius: .10rem;
            padding-left: 0.2rem;
          }
          span {
            background-color: #4d4d4d;
            border-radius: .10rem;
            color: #ffffff;
            padding: 0.05rem 0.1rem;
            cursor: pointer;
          }
          span:hover {
            background-color: #000000;
          }
        }
      }
      .right {
        .img_list {
          margin-top: 0.2rem;
        }
        img {
          height: 0.2rem;
          width: 0.2rem;
          cursor: pointer;
        }
      }
    }
  }
  .logo1 {
    width: 100%;
    background-color: #2d2d2d;
    display: flex;
    justify-content: center;
    img {
      height: 0.4rem;
      width: 1rem;
      margin: 0.2rem 0;
      transition: all 0.3s;
    }
    img:hover {
      transform: scale(1.2);
    }
  }
    .logo2 {
    width: 100%;
    background-color: #2d2d2d;
    display: flex;
    justify-content: center;
    img {
      height: 0.4rem;
      width: 1.2rem;
      margin: 0.2rem 0;
      transition: all 0.3s;
    }
    img:hover {
      transform: scale(1.2);
    }
  }
  .main {
    padding: 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #2d2d2d;
    .content {
      width: 11rem;
      color: #eeeeee;
      .head_1 {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          margin-top: 0.2rem;
          display: flex;
          flex-direction: column;
          font-size: .12rem;

          .title {
            font-size: .18rem;
          }
          span {
            padding-top: 5px;
            padding-bottom: 5px;
            transition: all 0.3s;
          }
          span:not(.title):hover {
            color: #ffffff;

            cursor: pointer;
            transform: scale(1.1);
          }
        }
      }
      .main_1 {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0;
        margin-top: 0.2rem;
        border-top: 2px solid #dddddd;
        border-bottom: 2px solid #dddddd;
        flex-wrap: wrap;
        .title {
          position: absolute;
          top: -0.1rem;
          left: 47%;
          width: 110px;
          background-color: #2d2d2d;
          height: 0.3rem;
          text-align: center;
        }
      }
      .img_footer {
        margin: 0.2rem 0;
        width: 100%;
        display: flex;
        justify-content: center;
        img {
          width: 6rem;
          height: 0.3rem;
        }
      }
    }
  }
  .footer_1 {
    font-size: .16rem;
    font-weight: bold;
    width: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    .content {
      width: 11rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .msg_1 {
        // font-size: 20px;
        margin: 0.2rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          display: flex;
          align-items: center;
          img {
            height: .60rem;
            width: .7rem;
          }
          .item_msg {
            display: flex;
            flex-direction: column;
            span:last-of-type {
              color: #4db4e5;
            }
          }
        }
        .item:first-of-type {
          cursor: pointer;
        }
      }
      .msg_2 {
        font-size: 0.14rem;
      }
    }
  }
}
</style>
