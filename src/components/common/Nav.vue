<template>
  <div class="nav">
    <!-- /*//导航部分开始*/-->
    <div :class="['h_nav1',{isFixed:sideFixed}]" v-if="widthH>1024">
      <div class="nav_pc">
        <img class="logo" src="@/assets/prublic/logo.png" @click="tabsChange('/index/home')">
        <img class="gengduo" src="@/assets/prublic/gengduo.png" @mouseenter="menuShow">
        <div class="h_navCenter">
          <div class="search" v-if="showSearch&&route_pash.includes('/search')">
            <el-input class="input" placeholder="SUNGLASSES" v-model="searchInput"></el-input>
            <span class="btn" @click="getInput()">SEARCH</span>
          </div>
          <span
            v-else
            :class="{active:currrntTab===index}"
            v-for="(item,index) in menuList"
            :key="index"
            @click="tabsChange(item.url,index,item.categoryId)"
            @mouseenter="menuShow(index)"
          >{{item.categoryName}}</span>
        </div>
        <div class="h_navRight">
          <img src="@/assets/prublic/sousuo.png" @click="getInput()">

          <img src="@/assets/prublic/gouwu.png" @click="IsshowSearch2()">

          <img src="@/assets/prublic/shoucan.png" @click="IsshowSearch3()">
        </div>
      </div>
      <!-- 下拉菜单 开始-->
      <div v-if="dropdown" :class="currentClass2" @mouseleave="menuHidde">
        <div class="menu">
          <div class="menuBigLeft">
            <span
              v-for="(item,index) in menuList[currrntTab].cateGoryList"
              :key="index"
              @click="jump(item.categoryId,currrntTab)"
              @mouseover="hoverIndex = index"
              @mouseout="hoverIndex = -1"
              :class="{'clickBg':index==clickIndex,'hoverBg':index==hoverIndex}"
            >{{item.categoryName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h_nav2" v-if="widthH<=1024">
      <div class="nav_iphone">
        <img class="gengduo" src="@/assets/prublic/gengduo.png" @click="showIndex()">
        <img class="logo" src="@/assets/prublic/logo.png" @click="tabsChange('/index/home')">
        <div class="input">
          <img src="@/assets/prublic/sousuo.png">
          <input type="text" @focus="animateWidth()" @input="getInput()" v-model="searchInput">
        </div>
        <div class="h_navRight">
          <img src="@/assets/prublic/gouwu.png" @click="IsshowSearch2()">
          <img src="@/assets/prublic/shoucan.png" @click="IsshowSearch3()">
        </div>
      </div>
    </div>
    <!-- 手机抽屉 -->
    <div class="index_10" v-if="index_10">
      <span
        v-for="(item,index) in menuList[0].cateGoryList"
        :key="index"
        @click="jump(item.categoryId)"
      >{{item.categoryName}}</span>
    </div>
    <!-- 手机白色分类导航 -->
    <div
      class="h_nav22"
      v-if="widthH<1024&&!route_pash.includes('/index/productDetail')&&!route_pash.includes('/')"
    >
      <div class="h_nav2Content">
        <span
          :class="{active:currrntTab===index}"
          v-for="(item,index) in bannerList"
          :key="index"
          @click="tabsChange(item.url,index,item.data)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getHomeNav,
  activityX,
  getProductCategory
} from "../../Ajax/modules/home";
import { isNumber } from "util";
export default {
  name: "nav",
  data() {
    return {
      showSearch: false,
      searchInput: "",
      widthH: "",
      dropdown: false,
      login: "Sign In",
      registered: "registered",
      //导航2
      //下拉菜单分类
      menuList: [
        { categoryName: "DEAL", url: "/index/deal" },
        { categoryName: "TRENDS", url: "/index/bolg" }
      ],
      route_pash: "",
      //店铺名称
      shopNameList: [
        "Logo custom",
        "Barcode printing",
        "Packaging",
        "Customs clearance service",
        "Glasses accessories"
      ],
      //店铺分类
      shopList: ["BRAND EYE STORE", "OPTICAL SHOP"],
      currrntTab: "", //当前tab
      sideFixed: false, //顶部是否固定
      hoverIndex: -1, //表示当前hover的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
      clickIndex: -1, //表示当前点击的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
      clickShop: 0, //表示当前点击的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
      clickBorder: 0, //表示当前点击的是第几个li 初始为 -1 或 null 不能为0 0表示第一个li
      index_10: false,
      isShowZd: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.getProductCategory();
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
    //下拉菜单
    getProductCategory() {
      getProductCategory().then(res => {
        if (res.data.code == 0) {
          res.data.data.forEach(item => {
            Object.assign(item, { url: "/search" });
          });
          console.log(res.data.data);
          this.menuList = [...res.data.data, ...this.menuList];
        }
      });
    },
    IsshowSearch2() {
      this.isShowSearch = false;
      this.$router.push("/cart");
    },
    IsshowSearch3() {
      this.isShowSearch = false;
      this.$router.push("/myWish");
    },
    //导航路由切换
    tabsChange(url, index, data) {
      this.showSearch = false;
      if (isNumber(index)) {
        this.currrntTab = index;
        this.bus.$emit("getTabsid", index, data);
      }
      if (url == "/index/deal") {
        activityX().then(res => {
          console.log(res);
          if (res.data.code == 0) {
            if (!res.data.data) {
              this.$router.push({
                name: "/search",
                params: {
                  name: "discount"
                }
              });
            } else {
              this.$router.push(url);
            }
          }
        });
      } else {
        if (data || data == 0) {
          this.$router.push({
            name: url,
            params: {
              data,
              tabId: index
            }
          });
        } else {
          this.$router.push(url);
        }
      }
    },
    //顶部滚动监听
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 30) {
        this.sideFixed = true;
      } else {
        this.sideFixed = false;
      }
    },
    //菜单显示隐藏
    menuShow(index) {
      this.currrntTab = index;
      if (index == 0 || index == 1 || index == 2) {
        this.dropdown = true;
        if (isNumber(index)) {
          this.currrntTab = index;
          this.isShowZd = index;
        } else {
          this.isShowZd = "";
        }
      } else {
        this.dropdown = false;
      }
    },
    menuHidde() {
      this.dropdown = false;
    },
    //手机页面抽屉显示隐藏
    showIndex() {
      this.index_10 = !this.index_10;
    },
    //菜单左侧导航跳转
    jump(id, tabId) {
      this.index_10 = false;
      this.$router.push({
        name: "/search",
        params: {
          data: id,
          tabId: tabId
        }
      });
    },
    animateWidth() {
      this.$router.push({
        name: "/search"
      });
    },
    getInput() {
      (this.showSearch = true), this.bus.$emit("getInput", this.searchInput);
      this.$router.push({
        name: "/search",
        params: {
          data: 0,
          tabId: 0
        }
      });
    },
    //点击改变店铺分类
    changeShopNameList() {
      // this.shopNameList = ""; //传入新数据
    },
    isShowSearch() {
      this.showSearch = !this.showSearch;
    }
  },
  computed: {
    currentClass2() {
      if (this.isShowZd == "") {
        return "dropdown1";
      } else if (this.isShowZd == 1) {
        return "dropdown2";
      } else if (this.isShowZd == 2) {
        return "dropdown3";
      } else if (this.isShowZd == 3) {
        return "dropdown4";
      } else if (this.isShowZd == 4) {
        return "dropdown5";
      }
    },
        screenWidth() {
      return this.$root.widthH;
    }
  },
  watch: {
    //动态获取路由路径
    $route(to, from) {
      this.route_pash = this.$route.path;
      console.log(this.$route.path);
    },
    screenWidth(val) {
      this.widthH = val;
    }
  }
};
</script>
<style  lang="scss" scoped>
/*//导航部分开始*/
@keyframes slowDown1 {
  from {
    height: 0px;
  }
  to {
    height: 400px;
  }
}
@keyframes slowDown2 {
  from {
    height: 0px;
  }
  to {
    height: 400px;
  }
}
@keyframes slowDown3 {
  from {
    height: 0px;
  }
  to {
    height: 400px;
  }
}
@keyframes slowDown4 {
  from {
    height: 0px;
  }
  to {
    height: 400px;
  }
}
@keyframes slowDown5 {
  from {
    height: 0px;
  }
  to {
    height: 400px;
  }
}
.nav {
  width: 100%;
  .dropdown1 {
    width: 700px;
    height: 400px;
    box-shadow: 2px 2px 2px #999999;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    left: 15%;
    top: .8rem;
    z-index: 99999;
    overflow: hidden;
    animation: slowDown1 0.7s;
    .menu {
      height: 400px;
      width: 100%;
      .menuBigLeft {
        width: 200px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        overflow-y: scroll;
        // justify-content: center;
        padding-right: 30px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        font-family: "regular";
        span {
          text-align: center;
          height: 60px;
          line-height: 60px;
          padding: 10px 20px;
          cursor: pointer;
        }
        &.menuBigLeft::-webkit-scrollbar {
          display: none;
        }
        span:hover {
          background-color: #999999;
        }
      }
      .menuBigCenter {
        .shopList {
          line-height: 40px;
          span {
            margin-right: 20px;
            color: #666666;
            cursor: pointer;
            &.activeColor {
              color: #231815;
            }
          }
        }
        .shopNameList {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border: 1px solid #666666;
            color: #666666;
            padding: 0px 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &.activeBorder {
              border: 1px solid #231815;
              color: #231815;
            }
          }
        }
        .yanjingList {
          display: flex;
          justify-content: flex-start;
          .yanjing {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
            p {
              height: 20px;
            }
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .menuBigRight {
        ul {
          li {
            display: block;
            width: 80%;
            padding-bottom: 14px;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              text-align: center;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding-bottom: 14px;
              color: #fff;
            }
            img {
              display: block;
              width: 300px;
              height: 150px;
            }
          }
        }
      }
    }
  }
  .dropdown2 {
    width: 700px;
    height: 400px;
    box-shadow: 2px 2px 2px #999999;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: .8rem;
    left: 30%;
    z-index: 99999;
    overflow: hidden;
    animation: slowDown1 0.7s;
    .menu {
      height: 400px;
      width: 100%;
      .menuBigLeft {
        width: 200px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        overflow-y: scroll;
        // justify-content: center;
        padding-right: 30px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        font-family: "regular";
        span {
          text-align: center;
          height: 60px;
          line-height: 60px;
          padding: 10px 20px;
          cursor: pointer;
        }
        &.menuBigLeft::-webkit-scrollbar {
          display: none;
        }
        span:hover {
          background-color: #999999;
        }
      }
      .menuBigCenter {
        .shopList {
          line-height: 40px;
          span {
            margin-right: 20px;
            color: #666666;
            cursor: pointer;
            &.activeColor {
              color: #231815;
            }
          }
        }
        .shopNameList {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border: 1px solid #666666;
            color: #666666;
            padding: 0px 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &.activeBorder {
              border: 1px solid #231815;
              color: #231815;
            }
          }
        }
        .yanjingList {
          display: flex;
          justify-content: flex-start;
          .yanjing {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
            p {
              height: 20px;
            }
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .menuBigRight {
        ul {
          li {
            display: block;
            width: 80%;
            padding-bottom: 14px;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              text-align: center;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding-bottom: 14px;
              color: #fff;
            }
            img {
              display: block;
              width: 300px;
              height: 150px;
            }
          }
        }
      }
    }
  }
  .dropdown3 {
    width: 700px;
    height: 400px;
    box-shadow: 2px 2px 2px #999999;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: .8rem;
    left: 40%;
    z-index: 99999;
    overflow: hidden;
    animation: slowDown1 0.7s;
    .menu {
      height: 400px;
      width: 100%;
      .menuBigLeft {
        width: 200px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        overflow-y: scroll;
        // justify-content: center;
        padding-right: 30px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        font-family: "regular";
        span {
          text-align: center;
          height: 60px;
          line-height: 60px;
          padding: 10px 20px;
          cursor: pointer;
        }
        &.menuBigLeft::-webkit-scrollbar {
          display: none;
        }
        span:hover {
          background-color: #999999;
        }
      }
      .menuBigCenter {
        .shopList {
          line-height: 40px;
          span {
            margin-right: 20px;
            color: #666666;
            cursor: pointer;
            &.activeColor {
              color: #231815;
            }
          }
        }
        .shopNameList {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border: 1px solid #666666;
            color: #666666;
            padding: 0px 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &.activeBorder {
              border: 1px solid #231815;
              color: #231815;
            }
          }
        }
        .yanjingList {
          display: flex;
          justify-content: flex-start;
          .yanjing {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
            p {
              height: 20px;
            }
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .menuBigRight {
        ul {
          li {
            display: block;
            width: 80%;
            padding-bottom: 14px;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              text-align: center;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding-bottom: 14px;
              color: #fff;
            }
            img {
              display: block;
              width: 300px;
              height: 150px;
            }
          }
        }
      }
    }
  }
  .dropdown4 {
    width: 700px;
    height: 400px;
    box-shadow: 2px 2px 2px #999999;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: .8rem;
    left: 50%;
    z-index: 99999;
    overflow: hidden;
    animation: slowDown1 0.7s;
    .menu {
      height: 400px;
      width: 100%;
      .menuBigLeft {
        width: 200px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        overflow-y: scroll;
        // justify-content: center;
        padding-right: 30px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        font-family: "regular";
        span {
          text-align: center;
          height: 60px;
          line-height: 60px;
          padding: 10px 20px;
          cursor: pointer;
        }
        &.menuBigLeft::-webkit-scrollbar {
          display: none;
        }
        span:hover {
          background-color: #999999;
        }
      }
      .menuBigCenter {
        .shopList {
          line-height: 40px;
          span {
            margin-right: 20px;
            color: #666666;
            cursor: pointer;
            &.activeColor {
              color: #231815;
            }
          }
        }
        .shopNameList {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border: 1px solid #666666;
            color: #666666;
            padding: 0px 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &.activeBorder {
              border: 1px solid #231815;
              color: #231815;
            }
          }
        }
        .yanjingList {
          display: flex;
          justify-content: flex-start;
          .yanjing {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
            p {
              height: 20px;
            }
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .menuBigRight {
        ul {
          li {
            display: block;
            width: 80%;
            padding-bottom: 14px;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              text-align: center;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding-bottom: 14px;
              color: #fff;
            }
            img {
              display: block;
              width: 300px;
              height: 150px;
            }
          }
        }
      }
    }
  }
  .dropdown5 {
    width: 700px;
    height: 400px;
    box-shadow: 2px 2px 2px #999999;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    padding: 0 10px;
    box-sizing: border-box;
    position: absolute;
    top: .8rem;
    left: 60%;
    z-index: 99999;
    overflow: hidden;
    animation: slowDown1 0.7s;
    .menu {
      height: 400px;
      width: 100%;
      .menuBigLeft {
        width: 200px;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        overflow-y: scroll;
        // justify-content: center;
        padding-right: 30px;
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        font-family: "regular";
        span {
          text-align: center;
          height: 60px;
          line-height: 60px;
          padding: 10px 20px;
          cursor: pointer;
        }
        &.menuBigLeft::-webkit-scrollbar {
          display: none;
        }
        span:hover {
          background-color: #999999;
        }
      }
      .menuBigCenter {
        .shopList {
          line-height: 40px;
          span {
            margin-right: 20px;
            color: #666666;
            cursor: pointer;
            &.activeColor {
              color: #231815;
            }
          }
        }
        .shopNameList {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border: 1px solid #666666;
            color: #666666;
            padding: 0px 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &.activeBorder {
              border: 1px solid #231815;
              color: #231815;
            }
          }
        }
        .yanjingList {
          display: flex;
          justify-content: flex-start;
          .yanjing {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
            p {
              height: 20px;
            }
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .menuBigRight {
        ul {
          li {
            display: block;
            width: 80%;
            padding-bottom: 14px;
            position: relative;
            span {
              position: absolute;
              width: 100%;
              text-align: center;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding-bottom: 14px;
              color: #fff;
            }
            img {
              display: block;
              width: 300px;
              height: 150px;
            }
          }
        }
      }
    }
  }
  .h_nav1 {
    width: 100%;
    position: relative;
    background-color: #eae62d;
    color: #231815;
    font-size: 16px;
    // box-sizing: border-box;
    height: .8rem;
    display: flex;
    justify-content: center;
    &.isFixed {
      position: fixed;
      top: 0;
      z-index: 9999;
    }
    .nav_pc {
      height: .8rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .logo {
        height: .70rem;
        width: 1.5rem;
        cursor: pointer;
      }
      .h_navCenter {
        height: .80rem;
        line-height: .80rem;
        box-sizing: border-box;
        display: flex;
        font-family: "Regular";
        font-weight: 500;
        font-size: 16px;
        color: #231815;
        .search {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .img {
            width: .4rem;
            height: .4rem;
            background-image: url("../../assets/search/search.png");
            background-repeat: no-repeat;
            background-position: center;
          }
          .btn {
            height: .4rem;
            line-height: .4rem;
            width: 1rem;
            color: #eae62d;
            text-align: center;
            border-radius: 2px;
            background-color: #231815;
          }
          .input {
            margin-left: 1rem;
            width: 5.5rem;
          }
        }
        span {
          margin-left: 1.2rem;
          color: #231815;
          cursor: pointer;
          position: relative;
          &::after {
            content: "";
            height: 4px;
            width: 100%;
            background-color: #231815;
            position: absolute;
            bottom: 0;
            left: 0;
            transition: all 0.2s linear;
            transform: scaleX(0);
          }
          &.active {
            color: #231815;
            font-weight: bold;
            &::after {
              transform: scaleX(1);
            }
          }
        }
      }
      .h_navRight {
        display: flex;
        margin-left: 100px;
        img {
          cursor: pointer;
          margin-left: 20px;
          height: 20px;
          width: 20px;
        }
      }
    }
    .nav_iphone {
      width: 100%;
    }
  }
  .h_nav2 {
    width: 100%;
    background-color: #eae62d;
    color: #231815;
    font-size: 16px;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    .nav_iphone {
      width: 100%;
      height: 0.8rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .logo {
        margin-left: 0.2rem;
        height: 0.6rem;
        width: 1.5rem;
        cursor: pointer;
      }
      .gengduo {
        margin-left: 0.2rem;
        height: 0.3rem;
        width: 0.4rem;
      }
      .input {
        margin-left: 0.2rem;
        width: 2.6rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        background-color: #ffffff;
        input {
          width: 2rem;
        }
        img {
          height: 0.3rem;
          width: 0.3rem;
        }
      }
      .h_navRight {
        display: flex;
        margin-left: 0.2rem;
        img {
          cursor: pointer;
          margin-left: 0.2rem;
          height: 0.3rem;
          width: 0.3rem;
        }
      }
    }
    .nav_iphone {
      width: 100%;
    }
  }
  .h_nav22 {
    width: 100%;
    height: 0.58rem;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }
  .h_nav22 .h_nav2Content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    font-size: 0.16rem;
    font-family: "regular";
    font-weight: bold;
  }
  .h_nav22 .h_nav2Content span {
    height: 100%;
    box-sizing: border-box;
    line-height: 0.58rem;
  }
  .h_nav22 .h_nav2Content .active {
    border-bottom: 2px solid #eae62d;
  }
  .index_10 {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100%;
    z-index: 9999999;
    background-color: rgba(255, 255, 255, 0.94);
    display: flex;
    flex-direction: column;
    padding: 1rem 0.45rem;
    font-size: 0.22rem;
    animation: index_10 0.7s;
    overflow-y: scroll;
    span {
      margin-top: 0.6rem;
    }
  }
}
@keyframes index_10 {
  from {
    width: 0%;
  }
  to {
    width: 70%;
  }
}
/*导航部分结束*/
</style>

