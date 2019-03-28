<template>
  <div :class="currentClass">
    <section class="section_1">
      <ol class="history">
        <li v-for="(item,index) in history" :key="index">{{item}}</li>
      </ol>
      <div class="title">Why Every Company Needs Media Monitoring</div>
      <div class="title_2">
        <span>APR 05, 2018</span>Viewed 434
        <span></span>
      </div>
      <div class="img_list">
        <img v-for="(item,index) in img_list" :key="index" :src="item">
      </div>
    </section>
    <section class="main">
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <div class="img"></div>
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <p>In the war over proper grammar, one of the biggest minefields writers must navigate a preson's title.</p>
      <p>~The END~</p>
      <div class="like">
        <img src="@/assets/BLOG-DETAIL/dianzan.png" alt>
        <span>LIKE</span>
      </div>
      <div class="title_3">SHARE THIS POST</div>
      <div class="img_list2">
        <img v-for="(item,index) in img_list2" :key="index" :src="item">
      </div>
    </section>
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
export default {
  data() {
    return {
      history: ["Home", "Trends", "Details"],
      widthH: "",
      img_list: [
        require("@/assets/BLOG-DETAIL/f.png"),
        require("@/assets/BLOG-DETAIL/in.png"),
        require("@/assets/BLOG-DETAIL/wb.png"),
        require("@/assets/BLOG-DETAIL/youtub8.png"),
        require("@/assets/BLOG-DETAIL/g+.png")
      ],
      img_list2: [
        require("@/assets/BLOG-DETAIL/f2.png"),
        require("@/assets/BLOG-DETAIL/weibo.png"),
        require("@/assets/BLOG-DETAIL/g+2.png"),
        require("@/assets/BLOG-DETAIL/daying.png"),
        require("@/assets/BLOG-DETAIL/fenxiang.png")
      ],
      widthH: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
  },
  methods: {},
  computed: {
    screenWidth() {
      return this.$root.widthH;
    },
    currentClass() {
      if (this.widthH > 1024) {
        return "productDetail";
      } else {
        return "productDetail2";
      }
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
.productDetail {
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .section_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history {
      display: flex;
      margin-top: 39px;
      font-family: "Regular";
      font-size: 14px;
      width: 1200px;
      padding-bottom: 15px;
      color: #999999;
      font-weight: bold;
      border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 8px;
      }
      li:last-of-type {
        color: #231815;
      }
    }
    .title {
      text-align: center;
      font-size: 38px;
      color: #231815;
      margin-top: 39px;
      font-family: "Bold";
      font-weight: bold;
    }
    .title_2 {
      margin-top: 39px;
      font-size: 12px;
      color: #231815;
      font-family: "Regular";
      font-weight: bold;
      span:first-of-type {
        color: #999999;
        margin-right: 20px;
      }
    }
    .img_list {
      width: 100%;
      display: flex;
      margin-top: 30px;
      justify-content: center;
      img {
        width: 60px;
        height: 30px;
        margin-left: 8px;
        &:first-of-type {
          width: 50px;
        }
      }
    }
  }
  .main {
    margin-top: 59px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Light";
    color: #424242;
    padding-bottom: 103px;
    border-bottom: 1px solid #dddddd;
    p {
      width: 88vh;
      margin-top: 34px;
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        text-align: center;
        margin: 59px 0 79px 0;
        font-size: 16px;
        font-family: "Light";
        color: #999999;
      }
    }
    .img {
      margin: 39px 0;
      width: 800px;
      height: 400px;
      background-image: url("../../../assets/BLOG-DETAIL/tupian.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .like {
      width: 180px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #231815;
      color: #fff;
      border-radius: 2px;
      .img {
        height: 40px;
        width: 40px;
      }
      span {
        margin-left: 10px;
      }
    }
    .img_list2 {
      width: 100%;
      display: flex;
      margin-top: 30px;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
        margin-left: 8px;
      }
    }
    .title_3 {
      color: #999999;
      margin-top: 52px;
      font-weight: bold;
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
.productDetail2 {
  max-width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .section_1 {
    width: 90%;
    display: flex;
    flex-direction: column;
    .history {
      display: flex;
      margin-top: 0.39rem;
      font-family: "Regular";
      font-size: 0.14rem;
      width: 100vh;
      padding-bottom: 0.15rem;
      color: #999999;
      font-weight: bold;
      border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 8px;
      }
      li:last-of-type {
        color: #231815;
      }
    }
    .title {
      font-size: 0.38rem;
      color: #231815;
      margin-top: 0.39rem;
      font-family: "Bold";
      font-weight: bold;
    }
    .title_2 {
      margin-top: 0.39rem;
      font-size: 0.12rem;
      color: #231815;
      font-family: "Regular";
      font-weight: bold;
      span:first-of-type {
        color: #999999;
        margin-right: 0.2rem;
      }
    }
    .img_list {
      width: 90vh;
      display: flex;
      margin-top: 0.3rem;
      img {
        width: 0.6rem;
        height: 0.3rem;
        margin-left: 0.08rem;
        &:first-of-type {
          width: 0.5rem;
        }
      }
    }
  }
  .main {
    margin-top: 0.59rem;
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.16rem;
    font-family: "Light";
    color: #424242;
    padding-bottom: 1.03rem;
    border-bottom: 1px solid #dddddd;
    p {
      margin-top: 0.34rem;
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        text-align: center;
        margin: 0.59rem 0 0.79rem 0;
        font-size: 0.16rem;
        font-family: "Light";
        color: #999999;
      }
    }
    .img {
      margin: 0.39rem 0;
      width: 8rem;
      height: 4rem;
      background-image: url("../../../assets/BLOG-DETAIL/tupian.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .like {
      width: 1.8rem;
      height: 0.55rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #231815;
      color: #fff;
      border-radius: 0.02rem;
      img {
        height: 0.25rem;
        width: 0.251rem;
      }
      span {
        margin-left: 0.1rem;
      }
    }
    .img_list2 {
      width: 100%;
      display: flex;
      margin-top: 0.3rem;
      justify-content: center;
      img {
        width: 0.3rem;
        height: 0.3rem;
        margin-left: 0.08rem;
      }
    }
    .title_3 {
      color: #999999;
      margin-top: 0.52rem;
      font-weight: bold;
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


