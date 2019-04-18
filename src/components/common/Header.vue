<template>
  <!--/*//头顶部分开始*/-->
  <div :class="[currentClass,{isFixed:sideFixed}]">
    <div class="h_hLeft" v-if="widthH > 1024">
      <span>{{$t('m.Header.title')}}</span>
    </div>
    <div class="h_hRight" v-if="statusFlag == false">
      <span>
        <router-link to="/login">{{$t('m.Header.sign_in')}}</router-link>
      </span>
      <span class="border">|</span>
      <span>
        <router-link to="/register">{{$t('m.Header.registered')}}</router-link>
      </span>
    </div>
    <div class="h_hRight" v-else>
      <span>
        <router-link to="/myAccount/help">{{$t('m.Header.help')}}</router-link>
      </span>
      <span class="border">|</span>
      <span>
      <router-link to="/myAccount">{{$t('m.Header.my_account')}}</router-link>
      </span>
      <span class="border">|</span>
      <span class="locout"  @click="locoutBtn">{{$t('m.Header.locout')}}</span>
    </div>
  </div>
  <!-- 头顶部分结束*/ -->
</template>

<script>
import { mapMutations } from "vuex";
import { watch } from "fs";
export default {
  data() {
    return {
      widthH: "",
      login: "Sign In",
      registered: "registered",
      bannerList: [
        "SUNGLASSES",
        "EYEGLASSES",
        "PRESCRIPTION",
        "DEAL",
        "TRENDS"
      ],
      bannerList2: ["SUNGLASSES", "EYEGLASSES", "PRESCRIPTION", "DEAL"],
      sideFixed: false, //侧栏是否固定
      help: "HELP", //帮助
      myPage: "MY ACCOUNT", //我的
      locout: "LOCOUT", //退出
      statusFlag: false //登录状态
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.statusFlag = this.$store.state.token ? true : false;
  },
  mounted() {
    //添加滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    //离开页面销毁
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    //滚动监听
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // var offsetTop = document.querySelector("#side_img").offsetTop;
      if (scrollTop > 0) {
        this.sideFixed = true;
      } else {
        this.sideFixed = false;
      }
      // if (scrollTop > this.h) {
      //   this.h += 400;
      //   this.currentActive += 1;
      // }
    },
    //退出
    locoutBtn() {
      this.$confirm(this.$t('m.Header.tip_title1'), "Tips", {
        confirmButtonText: this.$t('m.Header.tip_title1_2'),
        cancelButtonText: this.$t('m.Header.tip_title1_3'),
        type: "warning"
      })
        .then(() => {
          this.removeToken();
          this.removeUserId();
          sessionStorage.setItem("userId", "");
          sessionStorage.setItem("token", "");
          this.statusFlag = false;
          this.$message({
            type: "success",
            message: "You have withdrawn!"
          });
        })
        .catch(() => {});
    },
    ...mapMutations({
      removeToken: "REMOVE_TOKEN",
      removeUserId: "REMOVE_USERID"
    })
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "h_header1";
      } else {
        return "h_header2";
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
/*//头顶部分开始*/
.h_header1 {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #231816;
  font-size: 12px;
  color: #cccccc;

  &.isFixed {
    position: fixed;
    top: 0;
    z-index: 999999;
  }
  .h_hLeft {
    float: left;
    width: 100%;
    height: 30px;
    text-align: center;
  }
  .h_hRight {
    position: absolute;
    right: 20px;
    text-transform: uppercase;
    a {
      color: #ffffff;
    }
    .border {
      color: #ffffff;
      padding: 0px 10px;
    }
    .locout{
      cursor: pointer;
      color: blue
    }
  }
}
.h_header2 {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  background-color: #231816;
  font-size: 0.12rem;
  color: #cccccc;

  padding: 0rem 0.1rem;
  box-sizing: border-box;
    &.isFixed {
    position: fixed;
    top: 0;
    z-index: 999999;
  }
  .h_hLeft {
    float: left;
  }
  .h_hRight {
    float: right;
    text-transform: uppercase;
    a {
      color: #ffffff;
    }
    .border {
      color: #ffffff;
      padding: 0px 0.1rem;
    }
  }
}

/*头顶部分结束*/
</style>
