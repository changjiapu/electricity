<template>
  <div :class="currentClass">
    <el-carousel class="banner" v-if="widthH >1024" :interval="500000" type="card" height="500px"  arrow="always">
      <el-carousel-item v-for="(item,index) in banner_list" :key="index">
        <img
          style="height:100%;width:100%"
          :src="imgUrl+item.slideImage"
          @click="gotoProductDetail()"
        >
      </el-carousel-item>
    </el-carousel>
    <el-carousel v-if="widthH<=1024" :interval="3000" height="4rem" arrow="always" indicator-position='none'>
      <el-carousel-item v-for="(item,index) in banner_list" :key="index">
        <img
          style="height:100%;width:100%"
          :src="imgUrl+item.slideImage"
          @click="gotoProductDetail()"
        >
      </el-carousel-item>
    </el-carousel>
    <section class="section_2">
      <div class="title">
        <span>
          New
          <strong style="color:#f4d925">FEATURES</strong>
        </span>
        <span>Iconic sunglasses are a declaration of belonging, style and att attitude.but you can call them "no fail gifts" too</span>
      </div>

      <product-list></product-list>
      <div class="more">LEARN MORE</div>
    </section>
    <!-- <video
      width="100%"
      height="500"
      src
      poster="../../../assets/home/banner2.png"
      autoplay="autoplay"
      preload="preload"
    ></video>-->
    <section class="section_3">
      <div class="title">
        <span>
          POP
          <strong style="color:#231815">ULAR</strong>
        </span>
        <span>Professional achievement quality, for you to send reliable glasses</span>
      </div>
      <div class="showcase" v-if="popularList.length != 0">
        <div class="img_left">
          <img
            :src="imgUrl+popularList[0].advertisingImage"
            alt
            @click="goProductListPage(popularList[0].raId)"
          >
        </div>
        <div class="img_right">
          <img
            :src="imgUrl+popularList[1].advertisingImage"
            alt
            @click="goProductListPage(popularList[1].raId)"
          >
        </div>
      </div>
    </section>
    <section class="section_4">
      <div class="showcase" v-if="popularList.length != 0">
        <div class="left">
          <img
            :src="imgUrl+popularList[2].advertisingImage"
            alt
            @click="goProductListPage(popularList[2].raId)"
          >
        </div>
        <div class="right">
          <img
            :src="imgUrl+popularList[3].advertisingImage"
            alt
            @click="goProductListPage(popularList[3].raId)"
          >
        </div>
      </div>
    </section>
    <section class="section_5">
      <div class="title">
        <span>
          SELL LIKE
          <strong style="color:#f4d929">HOT CAKES</strong>
        </span>
      </div>
      <div class="shop">
        <span>FLAGSHIP STORE</span>
        <span @click="gotoShop()">SHOP NOW</span>
      </div>
    </section>
  </div>
</template>
<script>
import{baseUrl} from'../../../baseUrl' 
import {
  getBanner,
  getNewsGoods,
  homePopular
} from "../../../Ajax/modules/home";
import ProductList from "@/components/common/SwiperProduct";
export default {
  name: "home",
  components: { ProductList },
  data() {
    return {
      widthH: "",
      banner_list: [], //轮播数据
      popularList: [], //热门广告
      imgUrl: ""
    };
  },
  created() {
    this.imgUrl = this.$root.imgUrl;
    this.widthH = this.$root.widthH;
    this.getBanner(); //轮播数据
    this.getHomePopular(); //热门广告
  },

  methods: {
    //轮播详情
    getBanner() {
      getBanner().then(response => {
        this.banner_list = response.data.data;
      });
    },
    //热门广告
    getHomePopular() {
      homePopular().then(res => {
        console.log(res.data.data);
        this.popularList = res.data.data;
      });
    },
    // 产品详情
    gotoProductDetail() {
      // this.$router.push({
      //   path: "/index/productDetail",
      //   query: {
      //     id: "路由传参"
      //   }
      // });
    },
    //产品列表
    goProductListPage(id) {
      window.open(`${baseUrl}/#/search/${id}`);   
      // this.$router.push({
      //   path: "/search",
      //   query: {
      //     id: id
      //   }
      // });
    },
    //去店铺主页
    gotoShop() {}
  },
  computed: {
    currentClass() {
      if (this.widthH >1024) {
        return "home";
      } else {
        return "home2";
      }
    },
    screenWidth() {
      return this.$root.widthH;
    }
  },
    watch: {
    screenWidth(val) {
      console.log(val)
      this.widthH = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .banner{
    width: 13rem;
  }
  .section_2 {
    width: 13rem;
    padding-bottom:20px;
    height: 5rem;
    background-image: url("../../../assets/home/beijing1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 50px;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        &:first-of-type {
          font-size: 32px;
          font-family: "Bold";
        }
        &:last-of-type {
          margin-top: 20px;
          width: 5rem;
          text-align: center;
          font-size: 14px;
          font-family: "regular";
        }
      }
    }
    .more {
      cursor: pointer;
      margin-top: 25px;
      font-size: 14px;
      font-family: "reg";
      color: #231815;
      border-bottom: 1px solid #7777;
    }
  }
  .section_3 {
    width: 13rem;
    margin-top: 50px;
    box-sizing: border-box;
    padding: 0 25px;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:first-of-type {
          font-size: 32px;
          font-family: "Bold";
          color: #f4d929;
        }
        &:last-of-type {
          margin-top: 19px;
          font-size: 14px;
          font-family: "regular";
          color: #777777;
        }
      }
    }
    .showcase {
      margin-top: 60px;
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .img_left {
        width: 48%;
        height: 712px;
        padding: 0 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: 100% 70%;
        background-position: bottom;
        // cursor: pointer;
      }
      .img_right {
        width: 48%;
        height: 712px;
        margin-left: 25px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .img_r_t {
          height: 343px;
          width: 100%;
          border: 8px solid #f4d929;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian2.png");
          background-repeat: no-repeat;
          background-size: 50% 100%;
          // cursor: pointer;
          .product {
            height: 100%;
            width: 290px;
            margin-left: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 200px;
              height: 100px;
            }
            span {
              &:first-of-type {
                margin-top: 58px;
                font-family: "Bold";
                font-size: 24px;
                color: #231815;
              }
              &:last-of-type {
                padding-left: 200px;
                margin-top: 11px;
                font-family: "reg";
                font-weight: bold;
                font-size: 18px;
                color: #231815;
              }
            }
          }
        }
        .img_r_b {
          flex: 1;
          display: flex;
          margin-top: 25px;
          div {
            height: 100%;
            width: 345px;
            box-sizing: border-box;
            border: 8px solid #f4d929;
            &:first-of-type {
              background-image: url("../../../assets/home/tupian3.png");
              background-repeat: no-repeat;
              background-position: right;
              background-size: 80% 100%;
              // cursor: pointer;
            }
            &:last-of-type {
              margin-left: 25px;
              background-image: url("../../../assets/home/tupian7.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              // cursor: pointer;
            }
          }
        }
      }
    }
  }
  .section_4 {
    width: 13rem;
    height: 574px;
    margin-top: 50px;
    background-image: url("../../../assets/home/beijing3.png");
    box-sizing: border-box;
    padding-top: 25px;
    .showcase {
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .left {
        width: 48%;
        height: 524px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .img_l_t {
          height: 250px;
          width: 100%;
          border: 8px solid #f4d929;
          box-sizing: border-box;
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          background-color: #fff;
          // cursor: pointer;
        }
        .img_l_b {
          flex: 1;
          margin-top: 25px;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian5.png");
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          border: 8px solid #f4d929;
          background-color: #fff;
        }
        .img_l_t,
        .img_l_b {
          div {
            height: 100%;
            width: 450px;
            display: flex;
            flex-direction: column;
            span {
              margin-left: 50px;
              &:first-of-type {
                word-wrap: break-word;
                width: 370px;
                margin-top: 30px;
                font-size: 24px;
                color: #231815;
                font-family: "reg";
              }
              &:nth-of-type(2) {
                word-wrap: break-word;
                width: 370px;
                font-size: 16px;
                color: #999999;
                font-family: "reg";
              }
              &:last-of-type {
                width: 78px;
                font-size: 12px;
                margin-top: 26px;
                font-family: "Bold";
                cursor: pointer;
                border-bottom: 2px solid #999999;
              }
            }
          }
        }
      }
      .right {
        margin-left: 24px;
        width: 48%;
        height: 524px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-image: url("../../../assets/home/tupian6.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: bottom;
        border: 8px solid #f4d929;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 75px;
        img{
          width: 100%;
          height: 100%
        }
        span {
          word-wrap: break-word;
          color: #fff;
          &:first-of-type {
            margin-top: 30px;
            font-size: 28px;
            font-family: "reg";
          }
          &:nth-of-type(2) {
            word-wrap: break-word;
            font-size: 18px;
            color: #999999;
            font-family: "reg";
          }
          &:last-of-type {
            width: 78px;
            font-size: 12px;
            margin-top: 26px;
            font-family: "Bold";
            cursor: pointer;
            border-bottom: 2px solid #999999;
          }
        }
      }
    }
  }
  .section_5 {
      width: 13rem;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      margin-bottom: 59px;
      span {
        font-size: 32px;
        font-family: "Bold";
        color: #231815;
      }
    }
    .shop {
      height: 550px;
      background-image: url("../../../assets/home/banner3.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        &:first-of-type {
          // width: 595px;
          height: 118px;
          color: #231815;
          background-color: rgba(220, 195, 45, 0.8);
          font-size: 100px;
          font-family: "reg";
        }
        &:last-of-type {
          width: 200px;
          height: 60px;
          line-height: 70px;
          text-align: center;
          background-color: #f4d925;
          font-size: 18px;
          color: #231815;
          font-weight: bold;
          font-family: "reg";
          margin-top: 55px;
          cursor: pointer;
        }
      }
    }
  }
  .el-carousel__container{
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .is-active{
    position: absolute;
    left: -15%;
    width: 80%;
  }
}
.home2 {
  width: 100%;
  box-sizing: border-box;
  .el-carousel {
    margin-top: 0
  }
  .section_2 {
    height: 6rem;
    width: 100%;
    background-image: url("../../../assets/home/beijing1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-top: 0.5rem;
      margin-bottom: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        &:first-of-type {
          font-size: 0.32rem;
          font-family: "Bold";
        }
        &:last-of-type {
          margin-top: 0.2rem;
          width: 5rem;
          text-align: center;
          font-size: 0.14rem;
          font-family: "regular";
        }
      }
    }
    .more {
      cursor: pointer;
      margin-top: 0.25rem;
      font-size: 0.14rem;
      font-family: "reg";
      color: #231815;
      border-bottom: 1px solid #7777;
    }
  }
  .section_3 {
    width: 100%;
    margin-top: 1rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:first-of-type {
          font-size: 0.32rem;
          font-family: "Bold";
          color: #f4d929;
        }
        &:last-of-type {
          margin-top: 0.19rem;
          font-size: 0.14rem;
          font-family: "regular";
          color: #777777;
        }
      }
    }
    .showcase {
      margin-top: 0.6rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img_left {
        width: 100%;
        height: 6.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .img_right {
        margin-top: 0.15rem;
        width: 100%;
        height: 6.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .section_4 {
    width: 100%;
    margin-top: 0.5rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
    .showcase {
      margin-top: 0.6rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .left {
        width: 100%;
        height: 6.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-top: 0.15rem;
        width: 100%;
        height: 6.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .section_5 {
    width: 100%;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.5rem;
      margin-bottom: 0.59rem;
      span {
        font-size: 0.32rem;
        font-family: "Bold";
        color: #231815;
      }
    }
    .shop {
      height: 5.5rem;
      background-image: url("../../../assets/home/banner3.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        &:first-of-type {
          // width: 595px;
          height: 1.18rem;
          color: #231815;
          background-color: rgba(220, 195, 45, 0.8);
          font-size: 0.8rem;
          font-family: "reg";
        }
        &:last-of-type {
          width: 2rem;
          height: 0.6rem;
          line-height: 0.7rem;
          text-align: center;
          background-color: #f4d925;
          font-size: 0.18rem;
          color: #231815;
          font-weight: bold;
          font-family: "reg";
          margin-top: 0.55rem;
          cursor: pointer;
        }
      }
    }
  }
}
.el-carousel {
  margin-top: 30px;
}
.el-carousel__item {
  border-radius: 10px;
}
</style>
