<template>
  <div :class="currentClass">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,Lindex) in color_list" :key="Lindex">
          <div class="list_1">
            <img
              @mouseenter="Mouseenter(Lindex)"
              @mouseleave="Mouseleave(Lindex)"
              :src="imgUrl+item.img"
              @click="push(item.productId)"
            >
          </div>
          <div class="list_2">
            <div
              v-for="(items,index) in item.color"
              :key="index"
              :class="{colorActive : item.currentColor==items}"
            >
              <el-tooltip :content="items.split('|')[1]" placement="top">
                <span
                  :style="{backgroundColor:items.split('|')[1]}"
                  @click="colorChange(items,Lindex)"
                ></span>
              </el-tooltip>
            </div>
          </div>
          <div class="list_3">
            <span>{{item.productName}}</span>
            <span>${{item.price}}</span>
          </div>
          <!-- <div class="cart" @click.stop="addCart()"></div>-->
          <div class="cart" v-if="widthH >= 1024"></div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev btn_1"></div>
      <div class="swiper-button-next btn_2"></div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../baseUrl";
import { getNewsGoods } from "../../Ajax/modules/home";
import Swiper from "swiper";
export default {
  data() {
    return {
      newGoodsList: [], //首页最新商品
      pageNO: 1, //页码
      pageSize: 15, //条数
      sen: true,
      color_list: [{}, {}, {}, {}, {}, {}, {}, {}], //颜色规格
      imgSrc: "",
      imgUrl: "",
      widthH: ""
    };
  },
  created() {
    this.imgUrl = this.$root.imgUrl;
    this.widthH = this.$root.widthH;
    this.getNewsGoods();
  },
  mounted() {
    if (this.$root.widthH > 1024) {
      new Swiper(".swiper-container", {
        slidesPerView: 5,
        spaceBetween: 24,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    } else {
      new Swiper(".swiper-container", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  },
  methods: {
    //首页最新商品
    getNewsGoods() {
      var that = this;
      getNewsGoods(this.pageNO, this.pageSize).then(response => {
        this.newGoodsList = response.data.data.list;
        let getData = response.data.data.list;
        // console.log(getData)
        let ColorList = [];
        getData.forEach((val, index, arr) => {
          //处理获取到的颜色列表，重组数据
          let list = val.map.Color;
          let listIndex = index;
          let disposeList = {};
          disposeList.productName = val.productName;
          disposeList.price = val.price;
          disposeList.color = val.map.Color;
          disposeList.productId = val.productId;
          disposeList.currentColor = val.map.Color[0];
          disposeList.specList = val.specList;
          val.specList.forEach((val, index, arr) => {
            //查询出第一个色值相关的主图
            if (val.productSpecs.indexOf(disposeList.currentColor) != -1) {
              val.productImages.forEach((val, index, arr) => {
                if (val.isMaster == 1) {
                  disposeList.img = val.imageUrl;
                }
              });
            }
          });
          ColorList.push(disposeList);
        });
        that.color_list = ColorList;
        console.log(this.color_list);
      });
    },
    colorChange(color, index) {
      console.log(color);
      var that = this;
      let imgIndex = index;
      let dataList = this.color_list[index].specList;
      this.color_list[index].currentColor = color;
      dataList.forEach((val, index, arr) => {
        val.productSpecs.indexOf(color);
        if (val.productSpecs.indexOf(color) != -1) {
          val.productImages.forEach((val, index, arr) => {
            if (val.isMaster == 1) {
              that.color_list[imgIndex].img = val.imageUrl;
            }
          });
        }
      });
    },
    addCart() {
      this.$message({
        message: "加入购物车成功",
        type: "success"
      });
    },
    //页面跳转
    push(id) {
      window.open(`${baseUrl}/#/index/productDetail/${id}`);
      // this.$router.push({
      //   name: "/index/productDetail",
      //   params: {
      //     id: id,
      //   }
      // });
    },
    //鼠标移入
    Mouseenter(index) {
      var that = this;
      let imgIndex = index;
      this.imgSrc = this.color_list[imgIndex].img;
      let dataList = this.color_list[imgIndex].specList;
      let color = this.color_list[imgIndex].currentColor;
      dataList.forEach((val, index, arr) => {
        val.productSpecs.indexOf(color);
        if (val.productSpecs.indexOf(color) != -1) {
          that.color_list[imgIndex].img = val.productImages[0].imageUrl;
        }
      });
    },
    //鼠标移出
    Mouseleave(index) {
      this.color_list[index].img = this.imgSrc;
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "product_list";
      } else {
        return "product_list2";
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
      if (this.$root.widthH > 1024) {
        new Swiper(".swiper-container", {
          slidesPerView: 5,
          spaceBetween: 24,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      } else {
        new Swiper(".swiper-container", {
          slidesPerView: 2,
          spaceBetween: 10,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../node_modules/swiper/dist/css/swiper.css";
.product_list {
  width: 100%;
  .swiper-container {
    width: 95%;
    height: 2.8rem;
    .swiper-slide {
      // width: 20%;
      height: 100%;
      position: relative;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .list_1 {
        cursor: pointer;
        width: 1.8rem;
        height: 1rem;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.4s;  
        }
        img:hover{
          transform: scale(1.1); 
        }
      }
      .list_2 {
        margin-top: .2rem;
        display: flex;
        div {
          height: .25rem;
          width: .25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          cursor: pointer;
          &.colorActive {
            border: 1px solid #231815;
          }
        }
        span {
          height: .15rem;
          width: .15rem;
          background-color: #231815;
          border-radius: 100%;
          box-sizing: border-box;
        }
      }
      .list_3 {
        margin-top: .30rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-family: "Bold";
        color: #231815;
        span:last-of-type {
          margin-top: 13px;
          font-family: "Regular";
          font-weight: bold;
        }
      }
      .cart {
        cursor: pointer;
        width: .3rem;
        height: .3rem;
        background-color: #f6be00;
        border-radius: 100%;
        position: absolute;
        top: .22rem;
        right: .22rem;
        background-image: url("../../assets/home/gouwuche.png");
        background-repeat: no-repeat;
        background-color: 100% 100%;
        background-position: center;
      }
    }
    .btn_1 {
      width: .4rem;
      height: .4rem;
      background-image: url("../../assets/home/xiaohuadong-left.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
    .btn_2 {
      width: .4rem;
      height: .4rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      background-image: url("../../assets/home/xiaohuadong-right.png");
    }
  }
}
.product_list2 {
  width: 100%;
  .swiper-container {
    width: 90%;
    height: 3.5rem;
    .swiper-slide {
      // margin-left: 5%;
      position: relative;
      box-sizing: border-box;
      // width: 45%;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .list_1 {
        cursor: pointer;
        width: 2rem;
        height: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list_2 {
        margin-top: 0.4rem;
        display: flex;
        div {
          height: 0.25rem;
          width: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          cursor: pointer;
          &.colorActive {
            border: 1px solid #231815;
          }
        }
        span {
          height: 0.15rem;
          width: 0.15rem;
          background-color: #231815;
          border-radius: 100%;
          box-sizing: border-box;
        }
      }
      .list_3 {
        margin-top: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.16rem;
        font-family: "Bold";
        color: #231815;
        span:last-of-type {
          margin-top: 0.13rem;
          font-family: "Regular";
          font-weight: bold;
        }
      }
      .cart {
        cursor: pointer;
        width: 0.36rem;
        height: 0.36rem;
        background-color: #f4d925;
        border-radius: 100%;
        position: absolute;
        top: 0.24rem;
        right: 0.24rem;
        background-image: url("../../assets/home/gouwuche.png");
        background-repeat: no-repeat;
        background-color: 100% 100%;
        background-position: center;
      }
    }
    .btn_1 {
      width: 0.4rem;
      height: 0.4rem;
      background-image: url("../../assets/home/xiaohuadong-left.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
    .btn_2 {
      width: 0.4rem;
      height: 0.4rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      background-image: url("../../assets/home/xiaohuadong-right.png");
    }
  }
}
</style>
