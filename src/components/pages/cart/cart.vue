<template>
  <div :class="currentClass">
    <div class="content" v-if="widthH>=768">
      <div class="left">
        <div class="title">
          <span>MY CART</span>
          <span>{{cartList.length}} item in cart</span>
          <span class="clear" @click="clearCart">Empty cart</span>
        </div>
        <div class="main" v-if="cartList.length==0">
          <div class="bg_img"></div>
          <span class="text_1">Shopping Cart is Empty</span>
          <span class="text_2">You have no items in your shopping cart</span>
          <div class="btn">
            <router-link to="/search">TO SHOPING</router-link>
            <router-link to="/index/home">BACK HOME</router-link>
          </div>
        </div>
        <div class="main2" v-else>
          <div class="cart_item" v-for="(item,index) in cartList" :key="index">
            <div class="left2">
              <img :src="imgUrl+item.product.productImage" alt>
              <span>{{item.productSpec.stock?'In stock':'Out of stock'}}</span>
              <!-- <span>12-Month Product Guarantee</span>
              <span>14-Day Risk Free Returns</span>-->
            </div>
            <div class="right2">
              <div class="top">
                <div class="top_1">
                  <span>Frame:</span>
                  <span>{{item.product.productName}}</span>
                  <span>${{item.productSpec.preferentialPrice?item.productSpec.preferentialPrice:item.productSpec.price}}</span>
                </div>
                <div class="top_2">
                  <span>Color:</span>
                  <span>{{item.productSpec.productSpecs.Color.split("|")[1]}}</span>
                </div>
                <div class="top_2">
                  <span>Size:</span>
                  <span>{{item.productSpec.productSpecs.Size}}</span>
                </div>
                <div class="top_3">
                  <span>Qty:</span>
                  <span>{{item.productNum}}</span>
                  <el-input-number
                    class="input"
                    v-model="item.productNum"
                    @change="handleChange(item.cartId,item.productNum)"
                    :min="1"
                    :max="item.productSpec.stock"
                    size="small"
                  ></el-input-number>
                </div>
                <div class="top_2">
                  <span>Accessories:</span>
                  <span>1/1</span>
                </div>
                <div class="top_4">
                  <span>Subtotal</span>
                  <span>${{item.productSpec.preferentialPrice?item.productSpec.preferentialPrice*item.productNum:item.productSpec.price*item.productNum}}</span>
                </div>
              </div>
              <div class="bottom">
                <!-- <span>EDIT LENSES</span> -->
                <span @click="Detail(item.cartId)">DELETE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <span>Items:{{cartList.length}}</span>
          <span>Subtotal: ${{totalPrice}}</span>
        </div>
        <span class="totalPrices">Order Total: ${{totalPrice}}</span>
        <span class="suoming">Shipping and Tax not included</span>
        <span class="btn" v-if="cartList.length==0">PROCEED TO CHECKOUT</span>
        <span class="btn2" v-else @click="gotoBuy()">PROCEED TO CHECKOUT</span>
        <span class="shuoming3">
          <router-link to="/search">CONTINUE SHOPPING</router-link>
        </span>
        <span class="shuoming2">You can choose the following payment methods:</span>
        <div class="xuanze"></div>
        <div class="help">Need Help? Start a Live Chat!</div>
      </div>
    </div>
    <div class="content2" v-else>
      <div class="router">
        <span class="one"><router-link to="/index/home">HOME</router-link></span>
        <img src="../../../assets/cart/SHOPCAR_030.png" alt>
        <span>My cart</span>
      </div>
      <div class="main"  v-if="cartList.length==0">
        <div class="bg_img"></div>
        <span class="text_1">Shopping Cart is Empty</span>
        <span class="text_2">You have no items in your shopping cart</span>
        <div class="btn">
          <router-link to="/search">TO SHOPING</router-link>
          <router-link to="/index/home">BACK HOME</router-link>
        </div>
      </div>
      <div class="middleContent" v-else>
        <div class="content_top_name">
          <div class="title">MY CART</div>
          <div class="second_title">({{cartList.length}} item in cart)</div>
        </div>
        <!-- 中间商品内容部分 -->
        <div class="contentInfoBox" v-for="(item,index) in cartList" :key="index">
          <div class="topContent">
            <img :src="imgUrl+item.product.productImage" alt>
            <div class="imgRight">
              <div class="item">
                <div class="left">
                  <span class="title">frame:</span>
                  <span class="trueTitle">{{item.product.productName}}</span>
                </div>
                <div
                  class="frameNum"
                >${{item.productSpec.preferentialPrice?item.productSpec.preferentialPrice:item.productSpec.price}}</div>
              </div>
              <div class="item">
                <div class="left">
                  <span class="title">color:</span>
                  <span class="trueTitle">{{item.productSpec.productSpecs.Color.split("|")[1]}}</span>
                </div>
              </div>
              <div class="item">
                <div class="left">
                  <span class="title">size:</span>
                  <span class="trueTitle">{{item.productSpec.productSpecs.Size}}</span>
                </div>
                <div class="frameNum">Qdy:{{item.productNum}}</div>
              </div>
              <el-input-number
                class="input"
                v-model="item.productNum"
                @change="handleChange(item.cartId,item.productNum)"
                :min="1"
                :max="item.productSpec.stock"
                size="mini"
              ></el-input-number>
              <div class="item">
                <div class="left">
                  <span class="title">Subtotal:</span>
                </div>
                <div
                  class="frameNum"
                >${{item.productSpec.preferentialPrice?item.productSpec.preferentialPrice*item.productNum:item.productSpec.price*item.productNum}}</div>
              </div>
            </div>
          </div>
          <div class="btn">
            <span class="Editlenses" @click="clearCart">Empty cart</span>
            <span class="Delete" @click="Detail(item.cartId)">
              <img src="../../../assets/cart//SHOPCAR_11.png" alt>
              Delete
            </span>
          </div>
        </div>
        <!-- 底部 -->
        <div class="bottomBox">
          <div class="content">
            <div class="word">
              <div class="title">Items:{{cartList.length}}</div>
              <div>Subtotal: ${{totalPrice}}</div>
            </div>
            <div class="word">
              <div class="title">Order Total: ${{totalPrice}}</div>
              <div class style="color:#a0a0a0;">Shipping and Tax not included</div>
              <div class="bottom_btn">
                <div class="btn deep" @click="gotoBuy()">Proceed to checkout</div>
                <div class="btn">
                  <router-link to="/search">CONTINUE SHOPPING</router-link>
                </div>
              </div>
              <div class="line_word">You can choose the following payment methods:</div>
              <div class="iconBox">
                <img src="../../../assets/cart//SHOPCAR_14.png" alt>
                <img src="../../../assets/cart//SHOPCAR_16.png" alt>
                <img src="../../../assets/cart//SHOPCAR_18.png" alt>
                <img src="../../../assets/cart//SHOPCAR_20.png" alt>
                <img src="../../../assets/cart//SHOPCAR_22.png" alt>
                <img src="../../../assets/cart//SHOPCAR_24.png" alt>
              </div>
              <div class="bottom_line_word">
                <img src="../../../assets/cart//SHOPCAR_32.png" alt>
                Need Help? Start a Live Chat!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getShopCartList,
  delShopCart,
  updateTheNumber,
  emptyShopCart
} from "@/Ajax/modules/cart";
import { mapState } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      widthH: "",
      imgUrl: "",
      cartList: [], //购物车列表
      totalPrice: "" //购物车所有产品总价
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    this.getShopCartList(this.userId, 1, 10);
  },
  methods: {
    //删除购物车内容
    Detail(cartId) {
      delShopCart(this.userId, cartId).then(res => {
        if (res.data.code == 0) {
          this.getShopCartList(this.userId, 1, 10);
          this.$notify({
            message: "Delete the success!",
            type: "success",
            offset: 100
          });
        }
      });
    },
    // 去结算
    gotoBuy() {
      let paramsList = [];
      for (let item of this.cartList) {
        let params = {
          productId: item.productId,
          specId: item.specId,
          productName: item.product.productName,
          quantity: item.productNum,
          prescriptionId:item.prescriptionId,
          stock: item.productSpec.stock,
          productPrice: item.productSpec.preferentialPrice
            ? item.productSpec.preferentialPrice
            : item.productSpec.price
        }; // 筛选出传送到下单页面的数据
        paramsList.push(params);
      }
      console.log(paramsList);
      localStorage.removeItem('params'),
      localStorage.setItem("paramsList",JSON.stringify(paramsList))
      this.$router.push({
        name: "/transportation",
        params: {
          paramsList:JSON.stringify(paramsList)
        }
      });
    },
    //获取用户购物车信息
    getShopCartList(userId, pageNo, pageSize) {
      getShopCartList(userId, pageNo, pageSize).then(res => {
        if (res.data.code == 0) {
          let totalPrice = 0; //商品总价
          res.data.data.list.forEach(item => {
            if (item.productSpec.preferentialPrice) {
              totalPrice =
                totalPrice +
                item.productNum * item.productSpec.prpreferentialPriceice;
            } else {
              totalPrice =
                totalPrice + item.productNum * item.productSpec.price;
            }
            item.productSpec.productSpecs = eval(
              "(" + item.productSpec.productSpecs + ")"
            );
          });
          this.cartList = res.data.data.list;
          // for( let item of cartList){
          //   item.productSpec.productSpecs
          // }
          this.totalPrice = totalPrice;
          console.log(res.data.data.list);
          // for( let item of res.data.data.list){
          //     if(item.productNum)
          // }
        }
      });
    },
    //修改购物车产品的数量
    handleChange(cartId, number) {
      let params = {
        cartId: cartId,
        userId: this.userId,
        productNum: number
      };
      updateTheNumber(params).then(res => {
        if (res.data.code == 0) {
          this.getShopCartList(this.userId, 1, 10);
        }
      });
    },
    //清空购物车
    clearCart() {
      this.$confirm("Are you sure it's empty??", "Tips", {
        confirmButtonText: "Determine",
        cancelButtonText: "cancel",
        type: "warning"
      })
        .then(() => {
          emptyShopCart(this.userId).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "Clear success!"
              });
              this.getShopCartList(this.userId, 1, 10);
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {
    currentClass() {
      if (this.widthH >= 768) {
        return "cart";
      } else {
        return "cart2";
      }
    },
    ...mapState(["userId"])
  }
};
</script>
<style lang="scss" scoped>
.cart {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f9f9f9;
  // margin-bottom: 190px;
  .content {
    margin-top: 50px;
    width: 1500px;
    display: flex;
    .left {
      width: 875px;
      margin-left: 103px;
      .title {
        padding-bottom: 14px;
        position: relative;
        span {
          font-family: "Regular";
          font-weight: bold;
          color: #231815;
          display: flex;
          flex-direction: column;
          &:first-of-type {
            font-size: 32px;
          }
          &:last-of-type {
            font-size: 16px;
          }
        }
        .clear {
          position: absolute;
          right: 20px;
          top: 30px;
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
        }
        .clear:hover {
          background-color: #231815;
          color: #ffffff;
        }
      }
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
          background-image: url("../../../assets/cart/ShoppingCartisEmpty.png");
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
      .main2 {
        margin-bottom: 68px;
        .cart_item {
          width: 869px;
          height: 350px;
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
              .top_3 {
                .input {
                  margin-left: 20px;
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
    .right {
      font-family: "Reagular";
      font-weight: bold;
      height: 660px;
      margin-left: 45px;
      margin-top: 90px;
      margin-bottom: 60px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 0 45px;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 14px;
        color: #231815;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        padding-bottom: 14px;
        border-bottom: 1px solid #dddddd;
      }
      .totalPrices {
        margin-top: 25px;
      }
      .suoming {
        color: #999999;
      }
      .btn {
        width: 288px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        margin-top: 20px;
        background-color: #e9e7e7;
        border-radius: 2px;
        color: #999999;
        cursor: pointer;
      }
      .btn2 {
        width: 288px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        margin-top: 20px;
        background-color: #231815;
        border-radius: 2px;
        color: #e8e316;
        cursor: pointer;
      }
      .shuoming2 {
        margin-top: 49px;
        color: #999999;
      }
      .shuoming3 {
        margin-top: 20px;
        width: 300px;
        text-align: center;
        color: #666666;
        cursor: pointer;
      }
      .xuanze {
        margin-top: 10px;
        height: 30px;
        width: 300px;
        background-image: url("../../../assets/cart/fukuan.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .help {
        margin-top: 35px;
        background-image: url("../../../assets/cart/help.png");
        background-repeat: no-repeat;
        background-position: left;
        padding-left: 25px;
        background-size: 20px 20px;
        color: #4474af;
        cursor: pointer;
      }
    }
  }
}
.cart2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #f9f9f9;
  font-weight: bold;
  font-family: "regular";
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.89rem;
    .bg_img {
      margin-top: 0.67rem;
      width: 1.55rem;
      height: 1.2rem;
      background-image: url("../../../assets/cart/ShoppingCartisEmpty.png");
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
  .title_list {
    background-color: #fafafa;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 0.05rem;
    border-bottom: 1px solid #dddddd;
  }

  .middleContent {
    background-color: #f9f9f9;
    padding-bottom: 0.1rem;
  }

  .title_list .item {
    margin: 10px;
    font-size: 0.16rem;
    color: #221815;
  }

  .router {
    padding: 0.43rem 0.3rem;
    font-size: 0.18rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .router span.one {
    padding-right: 0.15rem;
    color: #999;
  }

  .router img {
    display: inline-block;
    padding-right: 0.15rem;
    width: 0.1rem;
    height: 0.1rem;
  }

  .content_top_name {
    text-align: center;
    margin: 0 auto;
  }

  .content_top_name .title {
    font-size: 0.32rem;
    color: #231815;
  }

  .content_top_name .second_title {
    font-size: 0.18rem;
    color: #333;
  }

  .contentInfoBox {
    margin: 0.3rem;
    background: #fff;
    font-size: 0.24rem;
    color: #000;
    padding: 0.2rem;
  }

  .topContent {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .topContent img {
    width: 2.15rem;
    height: 1.5rem;
    margin-right: 0.4rem;
  }

  .topContent .imgRight {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .topContent .imgRight div.item {
    display: flex;
    padding: 0.1rem 0;
    flex-direction: row;
    justify-content: space-between;
  }
  .topContent .imgRight div.left .title {
    margin-right: 0.06rem;
  }

  .topContent .imgRight div.left .trueTitle {
    color: #999;
  }

  .contentInfoBox .btn {
    margin-top: 0.2rem;
    text-align: center;
  }

  .contentInfoBox .btn span {
    /* width: 30%; */
    height: 60px;
    border: 1px solid #333;
    text-align: center;
    line-height: 60px;
    margin: 0.1rem;
    padding: 0.15rem 1rem;
  }

  .contentInfoBox .btn .Delete img {
    display: inline-block;
    width: 0.17rm;
    height: 0.17rem;
    padding-left: 0.02rem;
  }

  .bottomBox {
    margin: 0.3rem;
    background-color: #fff;
    font-size: 0.24rem;
  }

  .bottomBox .word {
    padding: 0.2rem;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.2rem;
  }

  .bottomBox .word .title {
    padding-bottom: 0.2rem;
  }

  .bottom_btn {
    margin-top: 0.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .bottom_btn .btn {
    /* margin: 0.2rem; */
    text-align: center;
    height: 0.59rem;
    line-height: 0.59rem;
    width: 3.1rem;
    border: 1px solid #828282;
  }

  .bottom_btn .btn.deep {
    background-color: #231815;
    color: #e8e316;
  }

  .line_word {
    color: #a0a0a0;
    margin-top: 0.3rem;
  }

  .iconBox {
    display: flex;
    flex-direction: row;
    margin-top: 0.1rem;
  }

  .iconBox img {
    display: inline-block;
    width: 0.6rem;
    height: 0.4rem;
    margin: 0.1rem;
    box-shadow: 0 0 5px #999;
  }

  .bottom_line_word {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #4474af;
    font-size: 0.24rem;
    margin-top: 0.3rem;
  }

  .bottom_line_word img {
    display: inline-block;
    width: 0.26rem;
    height: 0.31rem;
    margin-right: 0.3rem;
  }
}
</style>
