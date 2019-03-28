<template>
  <!-- 商品组件 -->
  <div>
    <div
      class="product_item"
      @mouseenter="Mouseenter()"
      @mouseleave="Mouseleave()"
      v-if="widthH>1024"
    >
      <img :src="imgUrl+shopData.img" alt @click="gotoDetail()">
      <div class="color_list">
        <div
          v-for="(item,index) in shopData.color"
          :key="index"
          :class="{colorActive:shopData.currentColor==item}"
        >
          <el-tooltip :content="item.split('|')[1]" placement="top">
            <span
              :style="{backgroundColor:item.split('|')[1]}"
              @click.stop="colorChange(item,index)"
            ></span>
          </el-tooltip>
        </div>
      </div>
      <div class="price">
        <span>{{shopData.productName}}</span>
        <span>${{shopData.preferentialPrice?shopData.preferentialPrice:shopData.price}}</span>
        <span
          style=" text-decoration:line-through;color:#ccc;"
          v-if="discount===0||discount>0"
        >${{shopData.price }}</span>
      </div>
      <div class="btn" v-if="isShowBtn">
        <span @click.stop="AddCollection(shopData)">ADD TO WISHLIST</span>
        <span @click.stop="gotoDetail()">SHOP NOW</span>
      </div>
    </div>
    <div
      class="product_item2"
      v-else
      @click="gotoDetail()"
      @mouseenter="Mouseenter()"
      @mouseleave="Mouseleave()"
    >
      <div class="img">
        <img :src="imgUrl+shopData.img" alt>
      </div>
      <div class="price">
        <span>{{shopData.productName}}</span>
        <div class="priceA">
          <span>${{shopData.preferentialPrice?shopData.preferentialPrice:shopData.price}}</span>
          <span
            style=" text-decoration:line-through;color:#ccc;"
            v-if="discount===0||discount>0"
          >${{shopData.price }}</span>
        </div>
      </div>
      <div class="color_list">
        <div>
          <div
            class="color"
            v-for="(item,index) in shopData.color"
            :key="index"
            :class="{colorActive:shopData.currentColor==item}"
            @click.stop="colorChange(item,index)"
          >
            <span :style="{backgroundColor:item.split('|')[1]}"></span>
          </div>
        </div>

        <div class="cart">
          <img src="../../assets/search/cart.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { AddCollection } from "@/Ajax/modules/myWish";
export default {
  name: "productItem",
  props: ["productList", "discount"],
  data() {
    return {
      pic: "",
      color_list: [],
      imgSrc: "",
      currentColor: 0,
      isShowBtn: false,
      shopData: {},
      proList: [],
      colorShow: "",
      maskImg: "",
      widthH: ""
    };
  },
  watch: {
    productList(val) {
      this.proList = val;
      this.getData();
      console.log(val);
    }
  },
  created() {
    this.widthH = this.$root.widthH;
    this.proList = this.productList;
    console.log(this.proList);
    this.imgUrl = this.$root.imgUrl;
    this.getData();
  },
  methods: {
    getData() {
      this.$set(this.shopData, "productName", this.proList.productName);
      this.$set(this.shopData, "color", this.proList.map.Color);
      this.$set(this.shopData, "productId", this.proList.productId);
      this.$set(this.shopData, "currentColor", this.proList.map.Color[0]);
      this.$set(this.shopData, "specList", this.proList.specList);
      this.$set(this.shopData, "price", this.shopData.specList[0].price);
      this.$set(
        this.shopData,
        "preferentialPrice",
        this.shopData.specList[0].preferentialPrice
      );
      // this.$set(this.shopData, "preferentialPrice", this.proList.preferentialPrice)
      this.shopData.specList.forEach((val, index, arr) => {
        if (val.productSpecs.indexOf(this.shopData.currentColor) != -1) {
          // this.$set(this.shopData, "preferentialPrice", val.preferentialPrice)
          val.productImages.forEach((val, index, arr) => {
            if (val.isMaster == 1) {
              this.$set(this.shopData, "img", val.imageUrl);
            }
          });
        }
      });
    },
    colorChange(color) {
      if (this.shopData.currentColor == color) {
        return;
      }
      var that = this;
      let dataList = this.shopData.specList;
      let i = this.proList.map.Color.indexOf(color);
      this.$set(this.shopData, "currentColor", color);
      dataList.forEach((val, index, arr) => {
        if (val.productSpecs.indexOf(color) != -1) {
          if (this.isShowBtn) {
            this.$set(this.shopData, "price", this.shopData.specList[i].price);
            this.$set(
              this.shopData,
              "preferentialPrice",
              this.shopData.specList[i].preferentialPrice
            );
            this.$set(this.shopData, "img", val.productImages[0].imageUrl);
            val.productImages.forEach((val, index, arr) => {
              if (val.isMaster == 1) {
                this.maskImg = val.imageUrl;
              }
            });
          } else {
          }
        }
      });
    },
    Mouseenter() {
      var that = this;
      this.isShowBtn = true;
      this.imgSrc = this.shopData.img;
      let dataList = this.shopData.specList;
      this.colorShow = this.shopData.currentColor;
      console.log(this.colorShow);
      dataList.forEach((val, index, arr) => {
        val.productSpecs.indexOf(this.colorShow);
        if (val.productSpecs.indexOf(this.colorShow) != -1) {
          console.log(val);
          if (that.shopData.img != val.productImages[0].imageUrl) {
            that.shopData.img = val.productImages[0].imageUrl;
          } else if(that.shopData.img != val.productImages[1].imageUrl){
            that.shopData.img = val.productImages[1].imageUrl;
          }else if(that.shopData.img != val.productImages[2].imageUrl){
            that.shopData.img = val.productImages[2].imageUrl;
          }
        }
      });
    },
    Mouseleave() {
      if (this.shopData.currentColor != this.colorShow) {
        this.shopData.img = this.maskImg;
      } else this.shopData.img = this.imgSrc;
      this.isShowBtn = false;
    },
    //试穿
    AddCollection(data) {
      let params = {
        userId: this.userId,
        productId: data.productId,
        dataFailure: 1 //0取消收藏 1收藏
      };
      AddCollection(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "Collection of success",
            type: "success"
          });
        } else if (res.data.code == -20) {
          this.$message({
            message: "Collection of success",
            type: "success"
          });
        }
      });
    },
    //购买
    shopNow(item) {},
    gotoDetail() {
      this.$router.push({
        name: "/index/productDetail",
        params: {
          id: this.shopData.productId
        }
      });
    }
  },
  computed: { 
        screenWidth() {
      return this.$root.widthH;
    },
    ...mapState(["userId"])
  },
    watch: {
    screenWidth(val) {
      this.widthH = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.product_item {
  width: 3.6rem;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  // background-color: #231815;
  img {
    margin-top: .40rem;
    width: 2rem;
    height: 1rem;
  }
  .price {
    font-size: 18px;
    font-family: "Blod";
    color: #231815;
    margin-top: 14px;
  }
  .color_list {
    margin-top: 26px;
    display: flex;
    div {
      height: 25px;
      width: 25px;
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
      height: 18px;
      width: 18px;
      background-color: #231815;
      border-radius: 100%;
      box-sizing: border-box;
    }
  }
  .btn {
    margin-top: 23px;
    display: flex;
    span {
      width: 140px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      font-family: "bold";
      cursor: pointer;
      &:first-of-type {
        background-color: #231815;
        color: #fff;
      }
      &:last-of-type {
        margin-left: 10px;
        background-color: #f4d925;
        color: #231815;
      }
    }
  }
}
.product_item2 {
  width: 3.2rem;
  background-color: #ffffff;
  height: 4rem;
  margin-left: 0.15rem;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    img {
      width: 1.8rem;
      height: 1.3rem;
    }
  }
  .price {
    margin-top: 0.2rem;
    font-size: 0.26rem;
    font-weight: bold;
    font-family: "regular";
    .priceA {
      font-size: 0.24rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .color_list {
    width: 100%;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      display: flex;
      align-items: center;
      .color {
        height: 0.25rem;
        width: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        margin-left: 0.05rem;
        cursor: pointer;
        &.colorActive {
          border: 1px solid #231815;
        }
        span {
          height: 0.18rem;
          width: 0.18rem;
          background-color: #231815;
          border-radius: 100%;
          box-sizing: border-box;
        }
      }
    }
    .cart {
      img {
        height: 0.3rem;
        width: 0.3rem;
      }
    }
  }
}
</style>
