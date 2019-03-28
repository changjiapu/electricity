<template>
  <div :class="currentClass">
    <History :history="history"></History>
    <p class="title">are you interested?</p>
    <p class="title2">We'll choose it carefully for you</p>
    <div class="main">
      <div class="item" v-for="(item,index) in 6" :key="index" @click="gotoDetail()">
        <img src="../../../assets/blog-list/tupian1.png" alt>
        <div class="item_msg">
          <span>Men's New Year Victoria sunglasses</span>
          <span>30% off for New Year</span>
        </div>
        <div class="btn">shop now</div>
      </div>
    </div>
    <section class="section_8">
      <h1>Need More Choices?</h1>
      <div class="btn">
        <div>Shop All Eyeglasses</div>
        <span>OR</span>
        <div>Shop All Sunglasses</div>
      </div>
    </section>
  </div>
</template>
<script>
import History from "@/components/common/History2.vue";
export default {
  name: "bolgList",
  components: {
    History
  },
  data() {
    return {
      history: [
        { name: "Home", url: "/index/home" },
        { name: "DEAL", url: "/index/DEAL" }
      ], //传递给历史导航组件的参数
      widthH: "",
      imgUrl: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
  },
  methods: {
    gotoDetail() {
      this.$router.push({
        path: "/index/bolgDetail"
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH >1024) {
        return "bolgList";
      } else {
        return "bolgList2";
      }
    },
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
<style lang="scss" scoped>
.bolgList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .title {
    font-size: 42px;
    font-family: "regular";
    font-weight: bold;
    color: #231815;
    text-transform: uppercase;
  }
  .title2 {
    font-size: 16px;
    font-family: "regular";
    color: #231815;
    text-transform: uppercase;
  }
  .main {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    background-image: url("../../../assets/blog-list/beijing.png");
    background-repeat: repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    padding-bottom: 40px;
    .item {
      position: relative;
      box-sizing: border-box;
      height: 450px;
      width: 300px;
      box-shadow: 2px 2px 2px 2px #eeeeee;
      margin-top: 30px;
      margin-left: 50px;
      cursor: pointer;
      img {
        width: 100%;
        height: 225px;
      }
      .item_msg {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        span {
          color: #231815;
          font-family: "regular";
          font-weight: bold;
          &:first-child {
            font-size: 20px;
          }
          &:last-of-type {
            font-size: 14px;
          }
        }
      }
      .btn {
        position: absolute;
        right: 0;
        height: 40px;
        line-height: 40px;
        width: 160px;
        background-color: #eae62d;
        text-align: center;
        color: #231815;
        font-size: 15px;
        font-family: "regular";
        font-weight: bold;
      }
    }
  }
  .section_8 {
    margin-top: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 32px;
      color: #231815;
      font-family: "Reqular";
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        height: 55px;
        width: 300px;
        cursor: pointer;
        line-height: 55px;
        text-align: center;
        background-color: #231815;
        color: #e8e316;
        margin: 59px 38px 80px 38px;
        font-size: 16px;
        border-radius: 5px;
      }
      span {
        font-size: 32px;
        font-weight: bold;
        color: #b0b0b0;
      }
    }
  }
}
.bolgList2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .title {
    font-size: 0.42rem;
    font-family: "regular";
    font-weight: bold;
    color: #231815;
    text-transform: uppercase;
  }
  .title2 {
    font-size: 0.16rem;
    font-family: "regular";
    color: #231815;
    text-transform: uppercase;
  }
  .main {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-image: url("../../../assets/blog-list/beijing.png");
    background-repeat: repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0.2rem 0.2rem 0.4rem 0.2rem;
    .item {
      position: relative;
      box-sizing: border-box;
      height: 5rem;
      width: 48%;
      box-shadow: 2px 2px 2px 2px #eeeeee;
      margin-top: 0.3rem;
      margin-left: 2%;
      cursor: pointer;
      img {
        width: 100%;
        height: 2.25rem;
      }
      .item_msg {
        width: 100%;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;
        span {
          color: #231815;
          font-family: "regular";
          font-weight: bold;
          &:first-child {
            font-size: 0.2rem;
          }
          &:last-of-type {
            font-size: 0.14rem;
          }
        }
      }
      .btn {
        position: absolute;
        right: 0;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 2rem;
        background-color: #eae62d;
        text-align: center;
        color: #231815;
        font-size: 0.16rem;
        font-family: "regular";
        font-weight: bold;
      }
    }
  }
  .section_8 {
    margin-top: 0.48rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 0.32rem;
      color: #231815;
      font-family: "Reqular";
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        height: 0.55rem;
        width: 3rem;
        line-height: 0.55rem;
        text-align: center;
        background-color: #231815;
        color: #e8e316;
        margin: 0.59rem 0.38rem 0.8rem 0.38rem;
        font-size: 0.16rem;
        border-radius: 0.02rem;
      }
      span {
        font-size: 0.32rem;
        font-weight: bold;
        color: #b0b0b0;
      }
    }
  }
}
</style>


