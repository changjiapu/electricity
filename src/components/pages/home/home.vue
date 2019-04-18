<template>
  <div :class="currentClass">
    <el-carousel
      class="banner"
      v-if="widthH >1024"
      :interval="500000"
      type="card"
      height="3.5rem"
      arrow="always"
    >
      <el-carousel-item v-for="(item,index) in banner_list" :key="index">
        <img
          style="height:100%;width:100%"
          :src="imgUrl+item.slideImage"
          @click="gotoProductDetail()"
        >
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-if="widthH<=1024"
      :interval="3000"
      height="4rem"
      arrow="always"
      indicator-position="none"
    >
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
         {{$t('m.home.title1_1')}}
          <strong style="color:#f4d925">{{$t('m.home.title1_2')}}</strong>
        </span>
        <span>{{$t('m.home.msg1')}}</span>
      </div>

      <product-list></product-list>
      <div class="more">{{$t('m.home.learn_more')}}</div>
    </section>
    <!-- <video
      width="100%"
      height="500"
      src
      poster="../../../assets/home/banner2.png"
      autoplay="autoplay"
      preload="preload"
    ></video>-->
    <section class="section_3" >
      <div class="title">
        <span>
          {{$t('m.home.title2_1')}}
          <strong style="color:#231815">{{$t('m.home.title2_2')}}</strong>
        </span>
        <span>{{$t('m.home.msg2')}}</span>
      </div>
      <div class="showcase" v-if="popularList.length != 0">
        <div
          class="img_left"
          :style="{backgroundImage:'url('+imgUrl+''+popularList[0].advertisingImage+')'}"
           @click="goProductListPage(popularList[0].raId)"
        >
          <span class="img_left_title">{{popularList[0].title}}</span>
          <span class="img_left_msg">{{popularList[0].descript}}</span>
          <span>{{$t('m.home.learn_more')}}</span>
        </div>
        <div class="img_right">
          <div
            class="img_r_t"
            :style="{backgroundImage:'url('+imgUrl+''+popularList[5].advertisingImage+')'}"
             @click="gotoProductDetail(popularList[5].productId)"
          >
            <div class="product">
              <img :src="imgUrl+popularList[5].product.productImage" alt>
              <span>{{popularList[5].product.productName}}</span>
              <span>${{popularList[5].product.price}}</span>
            </div>
          </div>
          <div class="img_r_b">
            <div :style="{backgroundImage:'url('+imgUrl+''+popularList[4].advertisingImage+')'}"></div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
    <section class="section_4">
      <div class="showcase" v-if="popularList.length != 0">
        <div class="left" @click="goProductListPage(popularList[1].raId)">
          <div
            class="img_l_t"
            :style="{backgroundImage:'url('+imgUrl+''+popularList[1].advertisingImage+')'}"
          >
            <div>
              <span>{{popularList[1].title}}</span>
              <span>{{popularList[1].descript}}</span>
              <span @click="goProductListPage(popularList[1].raId)">{{$t('m.home.learn_more')}}</span>
            </div>
          </div>
          <div
            class="img_l_b"
            :style="{backgroundImage:'url('+imgUrl+''+popularList[2].advertisingImage+')'}"
          >
            <div>
              <span>{{popularList[2].title}}</span>
              <span>{{popularList[2].descript}}</span>
              <span @click="goProductListPage(popularList[2].raId)">{{$t('m.home.learn_more')}}</span>
            </div>
          </div>
        </div>
        <div
          class="right"
          :style="{backgroundImage:'url('+imgUrl+''+popularList[3].advertisingImage+')'}"
        >
          <span>{{popularList[3].title}}</span>
          <span>{{popularList[3].descript}}</span>
          <span @click="goProductListPage(popularList[3].raId)">{{$t('m.home.learn_more')}}</span>
        </div>
      </div>
    </section>
    <section class="section_5">
      <div class="title">
        <span>
          {{$t('m.home.title3_1')}}
          <strong style="color:#f4d929">{{$t('m.home.title3_2')}}</strong>
        </span>
      </div>
      <div class="shop">
        <span>{{$t('m.home.shop_title1')}}</span>
        <span @click="gotoShop()">{{$t('m.home.shop_title2')}}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { baseUrl } from "../../../baseUrl";
import {
  getBanner,
  getNewsGoods,
  homePopular,
  getSeoInformation
} from "../../../Ajax/modules/home";
import ProductList from "@/components/common/SwiperProduct";
import WOW from "wowjs";
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
    this.getSeoInformation();
  },
  mounted() {
    new WOW.WOW().init();
  },
  methods: {
    //获取seo优化信息
    getSeoInformation() {
      getSeoInformation().then(res => {
        if (res.data.code == 0) {
          // let meta1 = document.createElement('meta'); // 创建meta标签
          // let meta2 = document.createElement('meta');
          // meta1.name = "keywords"; // 设置name
          // meta2.name = "description";
          // meta1.content = res.data.data[0].keyWords
          // meta2.content = res.data.data[0].descriptions
          // document.getElementsByTagName('head')[0].appendChild(meta1);
          // document.getElementsByTagName('head')[0].appendChild(meta2);
          document.title = res.data.data[0].title;
          let keywords = document.getElementsByTagName("meta")[4];
          let description = document.getElementsByTagName("meta")[5];
          keywords.content = res.data.data[0].keyWords;
          description.content = res.data.data[0].descriptions;
        }
      });
    },
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
        res.data.data.sort((a, b) => {
          if (a.raId > b.raId) {
            return 1;
          } else if (a.raId < b.raId) {
            return -1;
          } else {
            return 0;
          }
        }); //以数组对象里的name值进行排序

        this.popularList = res.data.data;
      });
    },
    // 产品详情
    gotoProductDetail(id) {
      window.open(`${baseUrl}/#/index/productDetail/${id}`);
      // this.$router.push({
      //   name: "/index/productDetail",
      //   params: {
      //     id: id
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
      if (this.widthH > 1024) {
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
      console.log(val);
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
  .banner {
    width: 13rem;
  }
  .section_2 {
    width: 13rem;
    padding-bottom: 20px;
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

        }
        &:last-of-type {
          margin-top: 20px;
          width: 5rem;
          text-align: center;
          font-size: 14px;

        }
      }
    }
    .more {
      cursor: pointer;
      margin-top: 25px;
      font-size: 14px;

      color: #231815;
      border-bottom: 1px solid #7777;
      transition: all 0.6s;
    }
    .more:hover {
      transform: scale(1.4);
    }
  }
  .section_3 {
    width: 13rem;
    margin-top:80px;
    box-sizing: border-box;
    // background-image: url("../../../assets/home/beijing3.png");
    padding: 0 25px;
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:first-of-type {
          font-size: 32px;
 
          color: #f4d929;
        }
        &:last-of-type {
          margin-top: 19px;
          font-size: 14px;
    
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
        height: 5rem;
        padding: 0 0.8rem;
        padding-top: 0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: 100% 70%;
        background-position: bottom;
    
        transition: all 0.3s;

        // border: 8px solid #f4d929;
        .img_left_title {
          font-size: 0.3rem;
          font-weight: bold;
          color: #231815;
        }
        .img_left_msg {
          font-size: 0.14rem;
          color: #555555;
        }
        span:last-of-type {
          text-align: center;
          font-size: 12px;
          margin-top: 26px;

          cursor: pointer;
          transition: all 0.6s;
        }
        span:last-of-type:hover {
          transform: scale(1.4);
        }
        // cursor: pointer;
      }
      .img_left:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
      .img_right {
        width: 48%;
        height: 5rem;
        margin-left: 25px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .img_r_t {
          height: 2.5rem;
          width: 100%;
          // border: 8px solid #f4d929;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian2.png");
          background-repeat: no-repeat;
          background-size: 50% 100%;
          transition: all 0.6s;
          cursor: pointer;
          .product {
            height: 100%;
            width: 1.5rem;
            margin-left: 3.6rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img {
              width: 2rem;
              height: 1rem;
            }
            span {
              &:first-of-type {
                margin-top: 0.4rem;
         
                font-size: 24px;
                color: #231815;
              }
              &:last-of-type {
                padding-left: 2rem;
                margin-top: 11px;
    
                font-weight: bold;
                font-size: 18px;
                color: #231815;
              }
            }
          }
        }
        .img_r_t:hover {
          cursor: pointer;
          transform: scale(1.05);
        }
        .img_r_b {
          flex: 1;
          display: flex;
          margin-top: 25px;
          div {
            height: 100%;
            width: 50%;
            box-sizing: border-box;
            // border: 8px solid #f4d929;
            &:first-of-type {
              background-image: url("../../../assets/home/tupian3.png");
              background-repeat: no-repeat;
              background-position: right;
              background-size: 100% 100%;
              transition: all 0.6s;
              cursor: pointer;
            }
            &:first-of-type:hover {
              transform: scale(1.05);
            }
            &:last-of-type {
              margin-left: 25px;
              background-image: url("../../../assets/home/tupian7.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              transition: all 0.3s;
              cursor: pointer;
            }
            &:last-of-type:hover {
              transform: scale(1.05);
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
          // border: 8px solid #f4d929;
          box-sizing: border-box;
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          background-color: #fff;
          background-image: url("../../../assets/home/tupian5.png");
          transition: all 0.6s;
          cursor: pointer;
        }
        .img_l_t:hover {
          transform: scale(1.05);
        }
        .img_l_b {
          flex: 1;
          margin-top: 25px;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian4.png");
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          // border: 8px solid #f4d929;
          background-color: #fff;
          transition: all 0.6s;
          cursor: pointer;
        }
        .img_l_b:hover {
          transform: scale(1.05);
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
    
              }
              &:nth-of-type(2) {
                word-wrap: break-word;
                width: 370px;
                font-size: 16px;
                color: #999999;

              }
              &:last-of-type {
                font-size: 12px;
                margin-top: 26px;
     
                cursor: pointer;
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
        // border: 8px solid #f4d929;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 75px;
        transition: all 0.6s;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          word-wrap: break-word;
          color: #fff;
          &:first-of-type {
            margin-top: 30px;
            font-size: 28px;

          }
          &:nth-of-type(2) {
            word-wrap: break-word;
            font-size: 18px;
            color: #999999;
  
          }
          &:last-of-type {
            // width: 90px;
            // text-align: center;
            font-size: 12px;
            margin-top: 26px;

            cursor: pointer;
            // border-bottom: 2px solid #999999;
          }
        }
      }
      .right:hover {
        transform: scale(1.05);
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

        color: #231815;
      }
    }
    .shop {
      height: 550px;
      background-image: url("../../../assets/home/banner3.jpg");
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
          // background-color: rgba(220, 195, 45, 0.8);
          font-size: 100px;

        }
        &:last-of-type {
          width: 200px;
          height: 60px;
          line-height: 70px;
          text-align: center;
          // background-color: #f4d925;
          font-size: 18px;
          color: #231815;
          font-weight: bold;

          margin-top: 55px;
          cursor: pointer;
          transition: all 0.4s;
        }
        &:last-of-type:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .el-carousel__container {
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .is-active {
    position: absolute;
    left: -15%;
    width: 80%;
  }
}
.home2 {
  width: 100%;
  box-sizing: border-box;
  .el-carousel {
    margin-top: 0;
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

        }
        &:last-of-type {
          margin-top: 0.2rem;
          width: 5rem;
          text-align: center;
          font-size: 0.14rem;
  
        }
      }
    }
    .more {
      cursor: pointer;
      margin-top: 0.25rem;
      font-size: 0.14rem;

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

          color: #f4d929;
        }
        &:last-of-type {
          margin-top: 0.19rem;
          font-size: 0.14rem;

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
        padding: 0 0.8rem;
        padding-top: 0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: 100% 70%;
        background-position: bottom;

        .img_left_title {
          font-size: 0.3rem;
          font-weight: bold;
          color: #231815;
        }
        .img_left_msg {
          font-size: 0.14rem;
          color: #555555;
        }
        span:last-of-type {
          width: 100px;
          font-size: 12px;
          margin-top: 26px;

          cursor: pointer;
          // border-bottom: 2px solid #999999;
        }
      }
      .img_right {
        margin-top: 0.15rem;
        width: 100%;
        height: 6.6rem;
        margin-left: 25px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .img_r_t {
          height: 3.2rem;
          width: 100%;
          // border: 8px solid #f4d929;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian2.png");
          background-repeat: no-repeat;
          background-size: 50% 100%;
          // cursor: pointer;
          .product {
            height: 100%;
            width: 1.5rem;
            margin-left: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 2rem;
              height: 1rem;
            }
            span {
              &:first-of-type {
                margin-top: 0.4rem;

                font-size: 24px;
                color: #231815;
              }
              &:last-of-type {
                padding-left: 2rem;
                margin-top: 11px;
        
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
            width: 50%;
            box-sizing: border-box;
            // border: 8px solid #f4d929;
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
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .img_l_t {
          height: 3rem;
          width: 100%;
          // border: 8px solid #f4d929;
          box-sizing: border-box;
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          background-color: #fff;
          background-image: url("../../../assets/home/tupian5.png");
          // cursor: pointer;
        }
        .img_l_b {
          flex: 1;
          margin-top: 25px;
          box-sizing: border-box;
          background-image: url("../../../assets/home/tupian4.png");
          background-repeat: no-repeat;
          background-position: right;
          background-size: 40% 100%;
          // border: 8px solid #f4d929;
          background-color: #fff;
        }
        .img_l_t,
        .img_l_b {
          div {
            height: 100%;
            width: 4.5rem;
            display: flex;
            flex-direction: column;
            span {
              margin-left: 0.5rem;
              &:first-of-type {
                word-wrap: break-word;
                width: 3.7rem;
                margin-top: 0.3rem;
                font-size: 24px;
                color: #231815;
     
              }
              &:nth-of-type(2) {
                word-wrap: break-word;
                width: 3.7rem;
                font-size: 16px;
                color: #999999;
   
              }
              &:last-of-type {
                font-size: 12px;
                margin-top: 26px;
      
                cursor: pointer;
              }
            }
          }
        }
      }
      .right {
        margin-top: 0.15rem;
        width: 100%;
        height: 6.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        background-image: url("../../../assets/home/tupian6.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: bottom;
        // border: 8px solid #f4d929;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.75rem;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          word-wrap: break-word;
          color: #fff;
          &:first-of-type {
            margin-top: 30px;
            font-size: 28px;

          }
          &:nth-of-type(2) {
            word-wrap: break-word;
            font-size: 18px;
            color: #999999;

          }
          &:last-of-type {
            font-size: 12px;
            margin-top: 26px;

            cursor: pointer;
          }
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

        color: #231815;
      }
    }
    .shop {
      height: 5.5rem;
      background-image: url("../../../assets/home/banner3.jpg");
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
          // background-color: rgba(220, 195, 45, 0.8);
          font-size: 0.8rem;
 
        }
        &:last-of-type {
          width: 2rem;
          height: 0.6rem;
          line-height: 0.7rem;
          text-align: center;
          // background-color: #f4d925;
          font-size: 0.18rem;
          color: #231815;
          font-weight: bold;
 
          margin-top: 0.55rem;
          cursor: pointer;
        }
        &:last-of-type {
          transform: scale(1.2);
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
