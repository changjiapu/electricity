<template>
  <div id="app">
    <Header v-if="isShow"></Header>
    <Nav v-if="isShow"></Nav>
    <router-view/>
    <Footer v-if="isShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import Nav from "@/components/common/Nav.vue";
export default {
  name: "App",
  components: { Header, Footer, Nav },
  data() {
    return {
      route_pash: ""
    };
  },
  created() {

    // let widthH = document.documentElement.clientWidth;
    // let heightH = document.documentElement.clientHeight;
    // this.$root.widthH = widthH;
    // this.$root.heightH = heightH;
    // window.addEventListener("resize", res => {
    //   widthH = document.documentElement.clientWidth;
    //   this.$root.widthH = widthH;
    // });

    if (sessionStorage.getItem("token")) {
      this.$store.commit("SET_TOKEN", sessionStorage.getItem("token"));
    }
    if (sessionStorage.getItem("userId")) {
      this.$store.commit("SET_USERID", sessionStorage.getItem("userId"));
    }
  },
  computed: {
    //通过路由路径控制组件显示隐藏
    isShow() {
      if (
        this.route_pash == "/login" ||
        this.route_pash == "/register" ||
        this.route_pash == "/forgorPas"
      ) {
        return false;
      } else {
        return true;
      }
    },
    screenWidth() {
      return this.$root.widthH;
    }
  },
  mounted() {
        //获取当前设备的屏幕宽度，以及rem响应式适配
    let widthH = document.documentElement.clientWidth;
    let heightH = document.documentElement.clientHeight;
    this.$root.widthH = widthH;
    this.$root.heightH = heightH;
    if (this.$root.widthH < 1024) {
      document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 750) * 100 + "px";
    }else{
            document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 1500) * 100 + "px";
    }
    window.addEventListener("resize", res => {
      this.$root.widthH = document.documentElement.clientWidth;
      console.log(document.documentElement.clientWidth);
      if (this.$root.widthH < 1024) {
        document.documentElement.style.fontSize =
          (document.documentElement.clientWidth / 750) * 100 + "px";
      }else{
              document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 1500) * 100 + "px";
      }
    });
  },
  watch: {
    //动态获取路由路径
    $route(to, from) {
      this.route_pash = this.$route.path;
      console.log(this.$route.path);
    }
  }
};
</script>

<style>
@import "./common/font/font.css";
html,
body,
#app,
ol,
li,
div,
p,
dl,
dt,
dd,
h1,
h2,
h3,
h4,
h5,
ul,
select,
option {
  margin: 0;
  padding: 0;
}
ul,
p {
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Gotham-Light';
}
ol,
li,
ul,
dl,
dt,
dd {
  list-style: none;
}
input,
select,
option {
  outline: none;
  border: 0px;
}
a {
  text-decoration: none;
}
i {
  font-style: normal;
}
.router-link-active {
  text-decoration: none;
}
.el-message-box__wrapper .el-message-box {
  width: 300px;
}
@media screen and (max-width: 768px) {
  .el-input--suffix .el-input__inner {
    padding: 0px;
  }
  .el-select .el-input__inner {
    cursor: pointer;
    padding: 0px 0px 0px 5px;
  }

  .el-message-box__wrapper .el-message-box {
    width: 300px;
  }
}
</style>
