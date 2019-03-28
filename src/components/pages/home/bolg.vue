<template>
  <div class="Home">
    <section class="section_1">
      <!-- 顶部历史导航组件 -->
      <History :history="history"></History>
      <div class="title">industry trends</div>
      <ol class="tabs" v-if="widthH >1024">
        <li
          :class="{active:currentTab==index}"
          v-for="(item,index) in tabs"
          :key="index"
        >{{item.title}}</li>
      </ol>
      <div class="nav" v-else>
        <div><</div>
        <ol class="tabs2">
          <li
            :class="{active:currentTab==index}"
            v-for="(item,index) in tabs"
            :key="index"
          >{{item.title}}</li>
        </ol>
        <div>></div>
      </div>
    </section>
    <!-- one -->
    <section class="section_2" v-if="list1.taId">
      <div class="bg_img">
        <!-- <img src="../../../assets/BLOG/banner.png" alt=""> -->
        <img :src="imgUrl + list1.images[0]" alt>
      </div>
      <div class="bg_box">
        <div class="title">{{list1.title}}</div>
        <div class="content" v-if="widthH >1024">{{list1.descript}}</div>
        <div class="content_2" v-else>{{list1.descript}}</div>
        <div class="btn" @click="goList(list1.taId)">SHOP TRENDS</div>
      </div>
    </section>
    <!-- one shop -->
    <section class="section_3" v-if="list1.taId">
      <figure
        class="img_item"
        v-for="(item,index) in list1.products"
        :key="index"
        @click="gotoDetail(item.productId)"
      >
        <img :src="imgUrl+item.productImage">
        <figcaption>{{item.productName}} ${{item.price}}</figcaption>
      </figure>
    </section>
    <!-- two -->
    <section class="section_4" v-if="list2.taId">
      <div class="top">
        <div class="img_1">
          <!-- <img src="../../../assets/BLOG/tupian1.png" alt=""> -->
          <img :src="imgUrl + list2.images[0]" alt>
        </div>
        <div class="img_2">
          <div class="img_2_1">
            <!-- <img src="../../../assets/BLOG/tupian2.png" alt=""> -->
            <img :src="imgUrl + list2.images[1]" alt>
          </div>
          <div class="img_2_2">
            <!-- <img src="../../../assets/BLOG/tupian3.png" alt=""> -->
            <img :src="imgUrl + list2.images[2]" alt>
          </div>
        </div>
        <div class="content" v-if="widthH >1024">
          <div class="title">{{list2.title}}</div>
          <p>{{list2.descript}}</p>
          <div class="btn" @click="goList(list2.taId)">SHOP TRENDS</div>
        </div>
      </div>
      <div class="content" v-if="widthH<=1024">
        <div class="title">{{list2.title}}</div>
        <p>{{tabs[1].descript}}</p>
        <div class="btn" @click="goList(list2.taId)">SHOP TRENDS</div>
      </div>
      <div class="bottom" v-if="widthH >1024">
        <figure
          class="img_item"
          v-for="(item,index) in list2.products"
          :key="index"
          @click="gotoDetail(item.productId)"
        >
          <img :src="imgUrl+item.productImage">
          <figcaption>{{item.productName}} ${{item.price}}</figcaption>
        </figure>
      </div>
    </section>
    <section class="section_3" v-if="widthH<=1024&&list2.taId">
      <figure
        class="img_item"
        v-for="(item,index) in list2.products"
        :key="index"
        @click="gotoDetail(item.productId)"
      >
        <img :src="imgUrl+item.productImage">
        <figcaption>{{item.productName}} ${{item.price}}</figcaption>
      </figure>
    </section>
    <!-- three -->

    <section :class="currentClass" v-if="list3.taId">
      <div class="top">
        <div class="left">
          <div class="title">{{list3.title}}</div>
          <p>{{list3.descript}}</p>
          <div class="btn" @click="goList(list3.taId)">SHOP TRENDS</div>
        </div>
        <div class="right">
          <!-- <img src="../../../assets/BLOG/tupian4.png" alt=""> -->
          <img :src="imgUrl + list3.images[0]" alt>
        </div>
      </div>
      <div class="bottom">
        <figure
          class="img_item"
          v-for="(item,index) in list3.products"
          :key="index"
          @click="gotoDetail(item.productId)"
        >
          <img :src="imgUrl+item.productImage">
          <figcaption>{{item.productName}} ${{item.price}}</figcaption>
        </figure>
      </div>
    </section>
    <!-- four -->
    <section class="section_6" v-if="list4.taId" :style="list4.taId?'margin-top:150px':''">
      <div class="top" v-if="widthH >1024">
        <div class="img_1">
          <img :src="imgUrl + list4.images[0]" alt>
        </div>
        <div class="img_2">
          <div class="img_2_1">
            <img :src="imgUrl + list4.images[1]" alt>
          </div>
          <div class="img_2_2">
            <img :src="imgUrl + list4.images[2]" alt>
          </div>
        </div>
        <div class="content">
          <div class="title">{{list4.title}}</div>
          <p>{{list4.descript}}</p>
          <div class="btn" @click="goList(list4.taId)">SHOP TRENDS</div>
        </div>
      </div>
      <div class="top" v-else>
        <div class="img_1">
          <img :src="imgUrl + list4.images[0]" alt>
        </div>
        <div class="img_2">
          <img :src="imgUrl + list4.images[0]" alt>
        </div>
      </div>
      <div class="content" v-if="widthH<=1024">
        <div class="title">{{list4.title}}</div>
        <p>{{list4.descript}}</p>
        <div class="btn" @click="goList(list4.taId)">SHOP TRENDS</div>
      </div>
      <div class="bottom" v-if="widthH >1024">
        <figure
          class="img_item"
          v-for="(item,index) in list4.products"
          :key="index"
          @click="gotoDetail(item.productId)"
        >
          <img :src="imgUrl+item.productImage">
          <figcaption>{{item.productName}} ${{item.price}}</figcaption>
        </figure>
      </div>
    </section>
    <section class="section_3" v-if="widthH<=1024 && list4.taId">
      <figure class="img_item" v-for="(item,index) in list4.products" :key="index">
        <img :src="imgUrl+item.productImage">
        <figcaption>{{item.productName}} ${{item.price}}</figcaption>
      </figure>
    </section>

    <!-- five -->
    <section class="section_7" v-if="list5.taId">
      <div class="left" v-if="widthH >1024">
        <div class="title">{{list5.title}}</div>
        <p>{{list5.descript}}</p>
        <div class="btn" @click="goList(list5.taId)">SHOP TRENDS</div>
      </div>
      <div class="right">
        <img :src="imgUrl + list5.images[0]" alt>
        <div class="float_img">
          <img :src="imgUrl + list5.images[1]" alt>
        </div>
      </div>
      <div class="left2" v-if="widthH<=1024">
        <div class="title">{{list5.title}}</div>
        <p>{{list5.descript}}</p>
        <div class="btn" @click="goList(list5.taId)">SHOP TRENDS</div>
      </div>
    </section>
    <section class="section_3" v-if="list5.taId">
      <figure class="img_item" v-for="(item,index) in list5.products" :key="index">
        <img :src="imgUrl+item.productImage">
        <figcaption>{{item.productName}} ${{item.price}}</figcaption>
      </figure>
    </section>

    <section class="section_8">
      <h1>Need More Choices?</h1>
      <div class="btn">
        <div>Shop All Eyeglasses</div>
        <span v-if="widthH<=1024">OR</span>
        <div>Shop All Sunglasses</div>
      </div>
    </section>
  </div>
</template>

<script>
import History from "@/components/common/History.vue";
import { getTrendsX } from "../../../Ajax/modules/bolg";

export default {
  name: "Home",
  components: { History },
  data() {
    return {
      widthH: "",
      tabs: [],
      history: [
        { name: "Home", url: "/index/home" },
        { name: "Trends", url: "/index/home" }
      ],
      currentTab: 0,
      list1: {},
      list2: {},
      list3: {},
      list4: {},
      list5: {},
      imgUrl: ""
    };
  },
  created() {
    this.imgUrl = this.$root.imgUrl;

    this.getTrends();
    this.widthH = this.$root.widthH;
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "section_5";
      } else {
        return "section_5_1";
      }
    },
    screenWidth() {
      return this.$root.widthH;
    }
  },
  methods: {
    getTrends() {
      getTrendsX().then(res => {
        console.log(res);
        this.tabs = res.data.data;
        this.tabs.map(res => {
          if (res.location == 1) {
            this.list1 = res;
          }
          if (res.location == 2) {
            this.list2 = res;
          }
          if (res.location == 3) {
            this.list3 = res;
          }
          if (res.location == 4) {
            this.list4 = res;
          }
          if (res.location == 5) {
            this.list5 = res;
          }
        });
      });
    },
    gotoDetail(item) {
      this.$router.push({
        name: "/index/productDetail",
        params: {
          id: item
        }
      });
    },
    goList(item) {
      this.$router.push({
        name: "/search",
        params: {
          taId: item
        }
      });
    }
  },
  watch: {
    screenWidth(val) {
      this.widthH = val;
    }
  }
};
</script>

<style lang='scss' scoped>
.Home {
  max-width: 100%;
  overflow-x: hidden;
  .section_1 {
    width: 100%;
    .title {
      text-align: center;
      font-size: 38px;
      color: #231815;
      margin-top: 39px;
      font-family: "Bold";
      font-weight: bold;
    }
    .tabs {
      margin-top: 39px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666666;
      font-size: 22px;
      cursor: pointer;
      & > li:not(:last-of-type)::after {
        content: "|";
        font-size: 16px;
        margin: 0 40px;
      }
      .active {
        color: black;
      }
    }
  }
  .section_2 {
    width: 100%;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .bg_img {
      width: 1200px;
      height: 600px;
      img {
        width: 100%;
      }
    }
    .bg_box {
      background-color: #fff;
      width: 1000px;
      height: 350px;
      position: absolute;
      top: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        margin-top: 59px;
        font-size: 42px;
        color: #231815;
        font-family: "Poppins-Bold";
        font-weight: bold;
      }
      .content {
        width: 600px;
        text-align: center;
        margin-top: 39px;
        font-family: "poppins-Reqular";
        font-size: 16px;
        color: #231815;
      }
      .btn {
        width: 185px;
        height: 45px;
        margin-top: 50px;
        text-align: center;
        line-height: 45px;
        background-color: #231815;
        color: #e8e316;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .section_3 {
    width: 100%;
    margin-top: 150px;
    display: flex;
    justify-content: center;
    .img_item {
      height: 100%;
      width: 285px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        height: 80px;
        width: 160px;
      }
      figcaption {
        margin-top: 24px;
        font-size: 18px;
        color: #231815;
        font-family: "Bold";
        font-weight: bold;
      }
    }
  }
  .section_4 {
    width: 100%;
    height: 700px;
    background-image: url("../../../assets/BLOG/beijing.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .top {
      display: flex;
      justify-content: center;
      .img_1 {
        height: 460px;
        width: 300px;
        // background-image: url("../../../assets/BLOG/tupian1.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        img {
          width: 100%;
        }
        margin-top: 50px;
      }
      .img_2 {
        height: 460px;
        width: 347px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        margin-left: 6px;
        .img_2_1 {
          height: 227px;
          width: 100%;
          // background-image: url("../../../assets/BLOG/tupian2.png");
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
          img {
            width: 100%;
          }
        }
        .img_2_2 {
          flex: 1;
          width: 100%;
          // background-image: url("../../../assets/BLOG/tupian3.png");
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
          img {
            width: 100%;
          }
          margin-top: 5px;
        }
      }
      .content {
        margin-top: 50px;
        margin-left: 90px;
        width: 300px;
        height: 460px;
        display: flex;
        flex-direction: column;
        .title {
          margin-top: 59px;
          font-size: 42px;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 16px;
          color: #231815;
          font-family: "Reqular";
          text-align: justify;
          text-justify: inter-ideograph;
        }
        .btn {
          width: 185px;
          height: 45px;
          margin-top: 59px;
          text-align: center;
          line-height: 45px;
          background-color: #231815;
          color: #e8e316;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    .bottom {
      margin-top: 50px;
      display: flex;
      flex-flow: nowrap;
      justify-content: center;
      .img_item {
        height: 237px;
        width: 285px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        justify-content: center;
        cursor: pointer;
        // &:first-of-type {
        //   margin-left: 150px;
        // }
        img {
          height: 80px;
          width: 160px;
        }
        figcaption {
          margin-top: 24px;
          font-size: 18px;
          color: #231815;
          font-family: "Bold";
          font-weight: bold;
        }
      }
    }
  }
  .section_5 {
    width: 100%;
    margin-top: 150px;
    position: relative;
    .top {
      display: flex;
      align-items: center;
      .left {
        position: absolute;
        left: 180px;
        margin-top: 50px;
        margin-left: 90px;
        width: 600px;
        height: 400px;
        box-sizing: border-box;
        padding: 49px 101px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .title {
          margin-top: 59px;
          font-size: 42px;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 16px;
          color: #231815;
          font-family: "Reqular";
          text-align: justify;
          text-justify: inter-ideograph;
        }
        .btn {
          width: 185px;
          height: 45px;
          margin-top: 59px;
          text-align: center;
          line-height: 45px;
          background-color: #231815;
          color: #e8e316;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }
      }
      .right {
        width: 800px;
        height: 550px;
        // background-image: url("../../../assets/BLOG/tupian4.png");
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        img {
          width: 100%;
        }
        margin-left: 700px;
      }
    }
    .bottom {
      margin-top: 47px;
      display: flex;
      flex-flow: nowrap;
      justify-content: center;
      .img_item {
        height: 237px;
        width: 285px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        justify-content: center;
        cursor: pointer;
        // &:first-of-type {
        //   margin-left: 150px;
        // }
        img {
          height: 80px;
          width: 160px;
        }
        figcaption {
          margin-top: 24px;
          font-size: 18px;
          color: #231815;
          font-family: "Bold";
          font-weight: bold;
        }
      }
    }
  }
  .section_6 {
    width: 100%;
    height: 700px;
    background-image: url("../../../assets/BLOG/beijing2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .top {
      display: flex;
      justify-content: center;
      .img_1 {
        height: 460px;
        width: 300px;
        // background-image: url("../../../assets/BLOG/tupian5.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        img {
          width: 100%;
        }
        margin-top: 50px;
      }
      .img_2 {
        height: 460px;
        width: 347px;
        margin-top: 50px;
        margin-left: 6px;
        // background-image: url("../../../assets/BLOG/tupian6.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        img {
          width: 100%;
        }
      }
      .content {
        margin-top: 50px;
        margin-left: 90px;
        width: 300px;
        height: 460px;
        display: flex;
        flex-direction: column;
        .title {
          margin-top: 59px;
          font-size: 42px;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 16px;
          color: #231815;
          font-family: "Reqular";
          text-align: justify;
          text-justify: inter-ideograph;
        }
        .btn {
          width: 185px;
          height: 45px;
          margin-top: 59px;
          text-align: center;
          line-height: 45px;
          background-color: #231815;
          color: #e8e316;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    .bottom {
      margin-top: 50px;
      display: flex;
      flex-flow: nowrap;
      justify-content: center;
      .img_item {
        height: 237px;
        width: 285px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        justify-content: center;
        cursor: pointer;
        img {
          height: 80px;
          width: 160px;
        }
        figcaption {
          margin-top: 24px;
          font-size: 18px;
          color: #231815;
          font-family: "Bold";
          font-weight: bold;
        }
      }
    }
  }
  .section_7 {
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    .left {
      margin-left: 90px;
      width: 600px;
      height: 400px;
      box-sizing: border-box;
      padding: 49px 140px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .title {
        margin-top: 59px;
        font-size: 42px;
        color: #231815;
        font-family: "Reqular";
        font-weight: bold;
      }
      p {
        font-size: 16px;
        color: #231815;
        font-family: "Reqular";
        // text-align: justify;
        // text-justify: inter-ideograph;
      }
      .btn {
        width: 185px;
        height: 45px;
        margin-top: 59px;
        text-align: center;
        line-height: 45px;
        background-color: #231815;
        color: #e8e316;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .right {
      width: 600px;
      height: 412px;
      // background-image: url("../../../assets/BLOG/tupian7.png");
      // background-repeat: no-repeat;
      // background-size: 100% 100%;
      img {
        width: 100%;
      }
      position: relative;
      .float_img {
        width: 200px;
        height: 200px;
        // background-image: url("../../../assets/BLOG/tupian8.png");
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        img {
          width: 100%;
        }
        position: absolute;
        left: 100px;
        bottom: -100px;
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
    }
  }
}

@media screen and (max-width: 1024px) {
  .Home {
    max-width: 100%;
    overflow-x: hidden;
    .section_1 {
      // .history {
      //   margin-left: 0.3rem;
      //   font-size: 0.14rem;
      // }
      .title {
        text-align: center;
        font-size: 0.38rem;
      }
      .nav {
        margin-top: 0.39rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .tabs2 {
          width: 70%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666666;
          font-size: 0.22rem;
          white-space: nowrap;
          overflow-x: scroll;

          /*解决ios上滑动不流畅*/
          -webkit-overflow-scrolling: touch;

          & > li:not(:first-of-type)::before {
            content: "|";
            font-size: 0.16rem;
            margin: 0 0.4rem;
          }
          & > li:first-of-type {
            margin-left: 3.2rem;
          }
          .active {
            color: black;
          }
        }
        .tabs2::-webkit-scrollbar {
          display: none;
        }
        div {
          color: #aaa;
          font-size: 0.5rem;
        }
      }
    }

    .section_2 {
      width: 100%;
      margin-top: 0rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 1.5rem;
      .bg_img {
        width: 100%;
        height: 6rem;
        background-image: url("../../../assets/BLOG/banner.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .bg_box {
        background-color: #fff;
        width: 90%;
        height: 3.5rem;
        position: absolute;
        top: 3.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          margin-top: 0.59rem;
          font-size: 0.42rem;
          color: #231815;
          font-family: "Bold";
          font-weight: bold;
        }
        .content_2 {
          text-align: center;
          margin-top: 0.39rem;
          font-family: "Reqular";
          font-size: 0.16rem;
          color: #231815;
        }
        .btn {
          width: 1.85rem;
          height: 0.45rem;
          margin-top: 0.5rem;
          text-align: center;
          line-height: 0.45rem;
          background-color: #231815;
          color: #e8e316;
          font-size: 0.16rem;
          font-weight: bold;
          border-radius: 0.02rem;
        }
      }
    }
    .section_3 {
      width: 100%;
      margin-top: 0.1rem;
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      .img_item {
        height: 0.37rem;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          height: 0.8rem;
          width: 1.6rem;
        }
        figcaption {
          text-align: center;
          margin-top: 0.24rem;
          font-size: 0.18rem;
          color: #231815;
          font-family: "Bold";
          font-weight: bold;
        }
      }
    }
    .section_4 {
      width: 100%;
      height: 9rem;
      background-image: url("../../../assets/BLOG/beijing.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        .img_1 {
          height: 4.6rem;
          width: 3rem;
          // background-image: url("../../../assets/BLOG/tupian1.png");
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
          img {
            width: 100%;
          }
          margin-top: 0.5rem;
        }
        .img_2 {
          height: 4.6rem;
          width: 3.47rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
          margin-left: 0.06rem;
          .img_2_1 {
            height: 2.27rem;
            width: 100%;
            // background-image: url("../../../assets/BLOG/tupian2.png");
            // background-size: 100% 100%;
            // background-repeat: no-repeat;
            img {
              width: 100%;
            }
          }
          .img_2_2 {
            flex: 1;
            width: 100%;
            // background-image: url("../../../assets/BLOG/tupian3.png");
            // background-size: 100% 100%;
            // background-repeat: no-repeat;
            img {
              width: 100%;
            }
            margin-top: 5px;
          }
        }
      }
      .content {
        width: 90%;
        height: 3.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .title {
          margin-top: 0.59rem;
          font-size: 0.42rem;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 0.16rem;
          color: #231815;
          font-family: "Reqular";
          text-align: justify;
          text-justify: inter-ideograph;
        }
        .btn {
          width: 1.85rem;
          height: 0.45rem;
          margin-top: 0.29rem;
          text-align: center;
          line-height: 0.45rem;
          background-color: #231815;
          color: #e8e316;
          font-size: 0.16rem;
          font-weight: bold;
          border-radius: 0.02rem;
        }
      }
    }
    .section_5_1 {
      width: 100%;
      margin-top: 1.5rem;
      .top {
        width: 100%;
        height: 5.5rem;
        // background-image: url("../../../assets/BLOG/tupian4.png");
        background-position: right;
        // background-repeat: no-repeat;
        // background-size: 60% 100%;
        img {
          width: 100%;
        }
        display: flex;
        align-items: center;
        .left {
          width: 70%;
          padding-left: 10%;
          box-sizing: border-box;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          .title {
            width: 80%;
            margin-top: 0.59rem;
            font-size: 0.42rem;
            color: #231815;
            font-family: "Reqular";
            font-weight: bold;
          }
          p {
            width: 80%;
            font-size: 0.16rem;
            color: #231815;
            font-family: "Reqular";
          }
          .btn {
            width: 1.85rem;
            height: 0.45rem;
            margin-top: 0.59rem;
            text-align: center;
            line-height: 0.45rem;
            background-color: #231815;
            color: #e8e316;
            font-size: 0.16rem;
            font-weight: bold;
            border-radius: 0.02rem;
          }
        }
      }
      .bottom {
        margin-top: 0.47rem;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        .img_item {
          height: 0.37rem;
          margin-left: 0.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #fff;
          justify-content: center;
          img {
            height: 0.8rem;
            width: 1.6rem;
          }
          figcaption {
            text-align: center;
            margin-top: 0.24rem;
            font-size: 0.18rem;
            color: #231815;
            font-family: "Bold";
            font-weight: bold;
          }
        }
      }
    }
    .section_6 {
      width: 100%;
      height: 8.8rem;
      background-image: url("../../../assets/BLOG/beijing2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .top {
        display: flex;
        align-items: center;
        justify-content: center;
        .img_1 {
          height: 4.6rem;
          width: 3rem;
          // background-image: url("../../../assets/BLOG/tupian5.png");
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
          img {
            width: 100%;
          }
          margin-top: 0.5rem;
        }
        .img_2 {
          height: 4.6rem;
          width: 3.47rem;
          margin-top: 0.5rem;
          margin-left: 0.06rem;
          // background-image: url("../../../assets/BLOG/tupian6.png");
          // background-size: 100% 100%;
          // background-repeat: no-repeat;
          img {
            width: 100%;
          }
        }
      }
      .content {
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0.1rem;
        .title {
          margin-top: 0.59rem;
          font-size: 0.42rem;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 0.16rem;
          color: #231815;
          font-family: "Reqular";
          // text-align: justify;
          // text-justify: inter-ideograph;
        }
        .btn {
          width: 1.85rem;
          height: 0.45rem;
          margin-top: 0.59rem;
          text-align: center;
          line-height: 0.45rem;
          background-color: #231815;
          color: #e8e316;
          font-size: 0.16rem;
          font-weight: bold;
          border-radius: 0.05rem;
          cursor: pointer;
        }
      }
    }
    .section_7 {
      width: 100%;
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      // align-items: center;
      // justify-content: center;
      .right {
        width: 6rem;
        height: 4.12rem;
        // background-image: url("../../../assets/BLOG/tupian7.png");
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        img {
          width: 100%;
        }
        position: relative;
        .float_img {
          width: 2rem;
          height: 2rem;
          // background-image: url("../../../assets/BLOG/tupian8.png");
          // background-repeat: no-repeat;
          // background-size: 100% 100%;
          img {
            width: 100%;
          }
          position: absolute;
          left: 1rem;
          bottom: -1rem;
        }
      }
      .left2 {
        background-color: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        .title {
          margin-top: 0.59rem;
          font-size: 0.42rem;
          color: #231815;
          font-family: "Reqular";
          font-weight: bold;
        }
        p {
          font-size: 0.16rem;
          color: #231815;
          font-family: "Reqular";
          // text-align: justify;
          // text-justify: inter-ideograph;
        }
        .btn {
          width: 2rem;
          height: 0.45rem;
          margin-top: 0.59rem;
          text-align: center;
          line-height: 0.45rem;
          background-color: #231815;
          color: #e8e316;
          font-size: 0.16rem;
          font-weight: bold;
          border-radius: 0.02rem;
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
}
</style>
