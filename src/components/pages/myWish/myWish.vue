<template>
  <div :class="currentClass">
    <div class="main2">
      <div class="title">MY WISH LIST</div>
      <div class="title2">( {{wishList.length}} item in wish list )</div>
      <div class="main" v-if="wishList.length==0">
        <div class="bg_img"></div>
        <span class="text_1">My wish is Empty</span>
        <span class="text_2">You have no items in your My wish</span>
        <div class="btn">
          <router-link to="/search">TO SHOPING</router-link>
          <router-link to="/index/home">BACK HOME</router-link>
        </div>
      </div>
      <div class="cart_item" v-else v-for="(item,index) in wishList" :key="index">
        <div class="left2">
          <img :src="imgUrl+item.product.productImage" alt>
        </div>
        <div class="right2">
          <div class="top">
            <div class="top_1">
              <span>Frame:</span>
              <span>{{item.product.productName}}</span>
              <span>${{item.product.price}}</span>
            </div>
            <div class="top_2">
              <span>Color:</span>
              <span>{{item.product.baseProp.Color}}</span>
            </div>
            <div class="top_2">
              <span>Size:</span>
              <span>{{item.product.baseProp.Size}}</span>
            </div>
            <div class="tip_3">
              <span>Qty:</span>
              <span>1</span>
            </div>
          </div>
          <div class="bottom">
            <span @click="addCart(item.productId)">ADD TO CART</span>
            <span @click="delCollection(item.collectId)">DELETE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { queryCollectionList, delCollection } from "@/Ajax/modules/myWish";
export default {
  name: "myWish",
  data() {
    return {
      widthH: "",
      page: 1,
      wishList: [],
      imgUrl: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    this.queryCollectionList(this.userId, this.page, 10);
  },
  methods: {
    //用户收藏列表
    queryCollectionList(userId, pageNo, pageSize) {
      queryCollectionList(userId, pageNo, pageSize).then(res => {
        if (res.data.code == 0) {
          res.data.data.list.forEach(item => {
            item.product.baseProp = eval("(" + item.product.baseProp + ")");
          });
          this.wishList = res.data.data.list;
          console.log(res.data.data.list);
        }
      });
    },
    //删除收藏
    delCollection(collectId) {
      delCollection(this.userId, collectId).then(res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "deleted successfully!"
          });
          this.queryCollectionList(this.userId, this.page, 10);
        }
      });
    },
    //页面跳转
    addCart(id) {
      this.$router.push({
        path: "/index/productDetail",
        query: {
          id: id
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "myWish";
      } else {
        return "myWish2";
      }
    },
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
.myWish {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main2 {
    margin-top: 50px;
    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 189px;
      border-top: 1px solid #cccccc;
      .bg_img {
        margin-top: 67px;
        width: 155px;
        height: 120px;
        background-image: url("../../../assets/product-detail/like2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .text_1 {
        margin-top: 22px;
        font-size: 32px;
        font-family: "Regular";
        font-weight: bold;
      }
      .text_2 {
        font-size: 18px;
        font-family: "Regular";
        color: #cccccc;
        font-weight: bold;
      }
      .btn {
        margin-top: 29px;
        display: flex;
        a {
          background-color: #f5f5f5;
          color: #231815;
          height: 45px;
          width: 240px;
          text-align: center;
          line-height: 45px;
          font-size: 14px;
          font-family: "Regular";
          font-weight: bold;
          border: 1px solid #8e8887;
          cursor: pointer;
          &:last-of-type {
            margin-left: 20px;
          }
          &:hover {
            background-color: #231815;
            color: #ffffff;
          }
        }
      }
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      font-family: "regular";
      color: #231815;
    }
    .title2 {
      font-size: 16px;
      font-weight: bold;
      font-family: "regular";
      color: #231815;
      margin-top: 10px;
    }
    margin-bottom: 68px;
    .cart_item {
      width: 869px;
      height: 250px;
      background-color: #ffffff;
      box-shadow: 5px 5px 5px #ccc;
      display: flex;
      &:not(:first-of-type) {
        margin-top: 20px;
      }
      .left2 {
        height: 100%;
        width: 340px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #999999;
        font-family: "Regular";
        font-weight: bold;
        img {
          height: 100px;
          width: 185px;
        }
        span:first-of-type {
          margin-top: 50px;
        }
      }
      .right2 {
        flex: 1;
        font-family: "Regular";
        font-weight: bold;
        color: #231815;
        .top {
          margin-top: 50px;
          font-size: 14px;
          .top_1 {
            position: relative;
            span {
              &:nth-of-type(2) {
                color: #666666;
              }
              &:last-of-type {
                position: absolute;
                right: 50px;
              }
            }
          }
          .top_2 {
            span {
              &:last-of-type {
                color: #666666;
              }
            }
          }
          .top_4 {
            padding-top: 14px;
            margin-top: 10px;
            border-top: 1px solid #dddddd;
            position: relative;
            width: 480px;
            span {
              &:last-of-type {
                position: absolute;
                right: 0;
              }
            }
          }
        }
        .bottom {
          margin-top: 29px;
          display: flex;
          span {
            width: 148px;
            height: 45px;
            border: 1px solid #231815;
            text-align: center;
            line-height: 45px;
            cursor: pointer;
            &:last-of-type {
              background-image: url("../../../assets/cart/Delete.png");
              background-repeat: no-repeat;
              background-position: 20px 11px;
              background-size: 20px 20px;
              margin-left: 15px;
            }
          }
          span:hover {
            background-color: #231815;
            color: #e8e316;
          }
        }
      }
    }
  }
}
.myWish2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .main2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.16rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.68rem;
    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.89rem;
      .bg_img {
        margin-top: 0.67rem;
        width: 1.55rem;
        height: 1.2rem;
        background-image: url("../../../assets/product-detail/like2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .text_1 {
        margin-top: 0.22rem;
        font-size: 0.32rem;
        font-family: "Regular";
        font-weight: bold;
      }
      .text_2 {
        font-size: 0.18rem;
        font-family: "Regular";
        color: #cccccc;
        font-weight: bold;
      }
      .btn {
        margin-top: 0.29rem;
        display: flex;
        a {
          background-color: #f5f5f5;
          color: #231815;
          height: 0.45rem;
          width: 2.4rem;
          text-align: center;
          line-height: 0.45rem;
          font-size: 0.14rem;
          font-family: "Regular";
          font-weight: bold;
          border: 1px solid #8e8887;
          cursor: pointer;
          &:last-of-type {
            margin-left: 0.2rem;
          }
          &:hover {
            background-color: #231815;
            color: #ffffff;
          }
        }
      }
    }
    .title {
      font-size: 0.24rem;
      font-weight: bold;
      font-family: "regular";
      color: #231815;
    }
    .title2 {
      font-size: 0.16rem;
      font-weight: bold;
      font-family: "regular";
      color: #231815;
      margin-top: 0.1rem;
    }
    .cart_item {
      padding: 0.2rem 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 2px 2px 2px #ccc;
      display: flex;
      &:not(:first-of-type) {
        margin-top: 0.2rem;
      }
      .left2 {
        width: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.14rem;
        color: #999999;
        font-family: "Regular";
        font-weight: bold;
        img {
          height: 1rem;
          width: 1.85rem;
        }
        span:first-of-type {
          margin-top: 0.5rem;
        }
      }
      .right2 {
        flex: 1;
        font-family: "Regular";
        font-weight: bold;
        color: #231815;
        .top {
          margin-top: 0.5rem;
          font-size: 0.14rem;
          .top_1 {
            position: relative;
            span {
              &:nth-of-type(2) {
                color: #666666;
              }
              &:last-of-type {
                position: absolute;
                right: 0.5rem;
              }
            }
          }
          .top_2 {
            span {
              &:last-of-type {
                color: #666666;
              }
            }
          }
          .top_4 {
            padding-top: 0.14rem;
            margin-top: 0.1rem;
            border-top: 1px solid #dddddd;
            position: relative;
            width: 4.8rem;
            span {
              &:last-of-type {
                position: absolute;
                right: 0;
              }
            }
          }
        }
        .bottom {
          margin-top: 0.29rem;
          display: flex;
          span {
            width: 1.7rem;
            height: 0.45rem;
            border: 1px solid #231815;
            text-align: center;
            line-height: 0.45rem;
            cursor: pointer;
            &:last-of-type {
              background-image: url("../../../assets/cart/Delete.png");
              background-repeat: no-repeat;
              background-position: 0.2rem 0.11rem;
              background-size: 0.2rem 0.2rem;
              margin-left: 0.15rem;
            }
          }
          span:hover {
            background-color: #231815;
            color: #e8e316;
          }
        }
      }
    }
  }
}
</style>


