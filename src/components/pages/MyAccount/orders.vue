<template>
  <div>
    <Banner :userInfo="userInfo" v-if="widthH >1024"/>
    <div :class="currentClass">
      <div class="w">
        <ol class="h_breadcrumb">
          <li class="breadcrumb-item" v-if="widthH<=1024">
            <a href="#">{{$t('m.orders.history1')}} ></a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">{{$t('m.orders.history2')}}</a>
          </li>
          <li>></li>
          <li class="breadcrumb-item active">{{$t('m.orders.history3')}}</li>
        </ol>
        <div class="my_Orders">
          <span>{{$t('m.orders.history3')}}</span>
          <div class="my_search">
            <input type="text" name id placeholder="Search all orders">
            <input type="button" value>
          </div>
        </div>
        <div class="my_order_table">
          <ul>
            <li :class="{active:currentTab===0}" @click="Tabs(0)">{{$t('m.orders.tabs1')}}</li>
            <li :class="{active:currentTab===1}" @click="Tabs(1)">{{$t('m.orders.tabs2')}}</li>
            <li :class="{active:currentTab===2}" @click="Tabs(2)">{{$t('m.orders.tabs3')}}</li>
            <li :class="{active:currentTab===3}" @click="Tabs(3)">{{$t('m.orders.tabs4')}}</li>
            <li :class="{active:currentTab===4}" @click="Tabs(4)">{{$t('m.orders.tabs5')}}</li>
            <li :class="{active:currentTab===5}" @click="Tabs(5)">{{$t('m.orders.tabs6')}}</li>
          </ul>
        </div>
        <!-- 订单列表 -->
        <div class="my_order_list">
          <div class="my_order_searchTimes">
            <span>
              <i>{{total}} {{$t('m.orders.list1')}}</i>
            </span>
            <div class="my_order_select">
              <select name="public-choice" v-model="couponSelected" @change="getCouponSelected">
                <option
                  :value="item.value"
                  v-for="(item,index) in couponList"
                  :key="index"
                  :label="item.label"
                ></option>
              </select>
            </div>
          </div>
          <div class="order_items" v-for="(item,index) in orderList2" :key="index">
            <div class="order_time">
              <span>
                {{$t('m.orders.list2')}}:
                <i>{{item.order.orderSn}}</i>
              </span>
              <span>{{item.order.createdTime}}</span>
            </div>
            <div class="order_item">
              <div class="first" @click="gotoDetail(item.detailId)">
                <img :src="imgUrl+item.product.productImage" alt>
                <div class="order_size">
                  <p>
                    {{$t('m.orders.order_size1')}}:
                    <i>{{item.product.productName}}</i>
                  </p>
                  <p>
                    {{$t('m.orders.order_size2')}}:
                    <i>{{item.productSpec.productSpecs.Color.split("|")[1]}}</i>
                  </p>
                  <p>
                    {{$t('m.orders.order_size3')}}:
                    <i>{{item.productSpec.productSpecs.Size}}</i>
                  </p>
                  <p>
                   {{$t('m.orders.order_size4')}}:
                    <i>{{item.productCount}}</i>
                  </p>
                </div>
              </div>
              <div class="secound" v-if="widthH>1024">
                <span>
                  {{$t('m.orders.secound1')}}:
                  <i>{{item.order.consignee}}</i>
                </span>
                <span class="total">
                  {{$t('m.orders.secound2')}}:
                  <b>{{item.order.orderMoney}}</b>
                </span>
                <span>{{$t('m.orders.secound3')}}</span>
              </div>
              <div class="last" v-if="widthH>1024">
                <img
                  v-if="item.order.orderStatus==-4||item.order.orderStatus==-3||item.order.orderStatus==-1"
                  src="@/assets/myAccount/order/shangchu.png"
                  @click="deleteOrder(item.detailId)"
                >
                <p v-if="item.order.orderStatus==3" @click="gotoComment(item)">evaluation</p>
                <p>{{$t('m.orders.right1')}}</p>
                <p
                  class="to_pay"
                  v-if="item.order.orderStatus==0"
                  @click="gotoPay(item.detailId)"
                >{{$t('m.orders.right2')}}</p>
                <p
                  class="cancel_pay"
                  v-if="item.order.orderStatus==0"
                  @click="cancelOrder(item.detailId)"
                >{{$t('m.orders.right3')}}</p>
                <p
                  class="again_pay"
                  v-if="item.order.orderStatus==3||item.order.orderStatus==-3"
                >{{$t('m.orders.right4')}}</p>
              </div>
              <div class="last2" v-if="widthH<=1024">
                <div>
                  <span>${{item.order.orderMoney}}</span>
                  <span
                    class="imgbox"
                    @click="deleteOrder(item.detailId)"
                    v-if="item.order.orderStatus==-4||item.order.orderStatus==-3||item.order.orderStatus==-1"
                  ></span>
                </div>

                <div>
                  <p
                    class="to_pay"
                    v-if="item.order.orderStatus==0"
                    @click="gotoPay(item.detailId)"
                  >{{$t('m.orders.right2')}}</p>
                  <p
                    class="cancel_pay"
                    v-if="item.order.orderStatus==0"
                    @click="cancelOrder(item.detailId)"
                  >{{$t('m.orders.right3')}}</p>
                  <p
                    class="again_pay"
                    v-if="item.order.orderStatus==3||item.order.orderStatus==-3"
                  >{{$t('m.orders.right4')}}</p>
                </div>
              </div>
            </div>
            <div class="order_time2" v-if="widthH<=1024">
              <span>
                 {{$t('m.orders.secound1')}}:
                <i>{{item.order.consignee}}</i>
              </span>
              <span v-if="item.order.orderStatus==3" @click="gotoComment(item)">{{$t('m.orders.right5')}}</span>
              <span>{{$t('m.orders.right1')}}</span>
            </div>
          </div>
          <div class="empty" v-if="orderList2.length==0">{{$t('m.orders.title')}}</div>
          <div class="my_order_searchTimes my_order_searchTimes2">
            <span>
              <i>{{total}} {{$t('m.orders.list1')}}</i>
            </span>
            <div class="my_order_select">
              <select name="public-choice" v-model="couponSelected" @change="getCouponSelected">
                <option
                  :value="item.value"
                  v-for="(item,index) in couponList"
                  :key="index"
                  :label="item.label"
                ></option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange($event)"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { queryOrderList, deleteOrder, cancelOrder } from "@/Ajax/modules/order";
import { mapState } from "vuex";
import Banner from "./common/banner";
export default {
  data() {
    return {
      widthH: "",
      tableList: [
        "SHIPPING & RETURNS",
        "SHOPPING ONLINE",
        "WARRANTY & REPAIRS"
      ],
      currentTab: 0,
      couponList: [
        {
          value: "选项1",
          label: "past 6 month"
        },
        {
          value: "选项2",
          label: "past 5 month"
        },
        {
          value: "选项3",
          label: "past 4 month"
        },
        {
          value: "选项4",
          label: "past 3 month"
        }
      ],
      couponSelected: "",
      orderList2: [],
      imgUrl: "",
      userInfo: "",
      total: 0
    };
  },
  components: {
    Banner
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    if (this.$route.query.userInfo) {
      this.userInfo = JSON.parse(this.$route.query.userInfo);
    }
    this.couponSelected = this.couponList[0].value;
    this.msg = "当前页为：" + this.cur;
    this.queryOrderList(this.userId, this.currentTab, 1, 10);
  },
  methods: {
    //获取订单列表
    queryOrderList(userId, state, pageNo, pageSize) {
      //查询状态 (0=全部,1=代付款,2=代发货,3=派送中,4=已收获,5=退款订单)
      queryOrderList(userId, state, pageNo, pageSize).then(res => {
        if (res.data.code == 0) {
          res.data.data.list.forEach(item => {
            item.productSpec.productSpecs = eval(
              "(" + item.productSpec.productSpecs + ")"
            );
          });
          this.orderList2 = res.data.data.list;
          this.total = res.data.data.total;
          console.log(res.data.data.list);
        }
      });
    },
    //删除订单
    deleteOrder(detailId, state) {
      deleteOrder(detailId).then(res => {
        if (res.data.code == 0) {
          //查询状态 (0=全部,1=代付款,2=代发货,3=派送中,4=已收获,5=退款订单)
          this.queryOrderList(this.userId, this.currentTab, 1, 10);
        }
      });
    },
    //取消订单
    cancelOrder(detailId) {
      cancelOrder(detailId).then(res => {
        if (res.data.code == 0) {
          this.queryOrderList(this.userId, this.currentTab, 1, 10);
        }
      });
    },
    getCouponSelected() {
      //获取选中的优惠券
      console.log(this.couponSelected);
    },
    //换页
    handleCurrentChange(e) {
      console.log(e);
      this.queryOrderList(this.userId, this.currentTab, e, 10);
    },
    Tabs(index) {
      this.orderList2 = [];
      // console.log( this.orderList2)
      this.currentTab = index;
      //查询状态 (0=全部,1=代付款,2=代发货,3=派送中,4=已收获,5=退款订单)
      this.queryOrderList(this.userId, this.currentTab, 1, 10);
    },
    gotoDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/myAccount/orderDetail",
        query: {
          detailId: id
        }
      });
    },
    gotoPay(id) {
      this.$router.push({
        path: "/myAccount/payment",
        query: {
          id: id
        }
      });
    },
    gotoComment(item) {
      let parmas = {
        imgSrc: item.product.productImage,
        productName: item.productName,
        productId: item.productId,
        productPrice: item.product.price,
        orderId: item.order.orderSn
      };
      this.$router.push({
        path: "/addComment",
        query: {
          params: JSON.stringify(parmas)
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "h_center1";
      } else {
        return "h_center2";
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
<style lang='scss' scoped>
/* 中间部分 */
@media (min-width: 960px) {
  .w {
    max-width: 1200px;
    min-width: 980px;
    margin: 0 auto;
  }
}
@media (max-width: 1200px) {
  .w {
    padding: 0px 0.1rem;
  }
}
.h_center1 {
  font-family: Regular;
  padding-bottom: 59px;
  ol {
    background-color: #fff;
    font-size: 14px;
    color: #999999;
    overflow: hidden;
    padding: 26px 0px 28px 0px;
    li {
      float: left;
      padding-right: 10px;
      a {
        color: #999999;
      }
    }
    .active {
      color: #231815;
    }
  }
  .my_Orders {
    padding-bottom: 35px;
    span {
      font-size: 28px;
      color: #231815;
    }
    .my_search {
      float: right;
      font-size: 14px;
      color: #999999;
      display: flex;
      input[type="text"] {
        width: 400px;
        height: 35px;
        background-color: #f0f0f0;
        border-radius: 2px;
        font-size: 12px;
        color: #999999;
        padding-left: 10px;
      }
      input[type="button"] {
        width: 35px;
        height: 35px;
        border-radius: 2px;
        font-size: 12px;
        color: #999999;
        margin-left: 2px;
        background: url("../../../assets/myAccount/order/sousuo.png") no-repeat;
        background-color: #f4d925;
        background-position: center;
      }
    }
  }
  .my_order_table {
    ul {
      border-bottom: 1px solid #dddddd;
      overflow: hidden;
      li {
        float: left;
        margin-left: 40px;
        font-size: 14px;
        color: #999999;
        padding-bottom: 20px;
        &:first-child {
          margin-left: 0px;
        }
        cursor: pointer;
      }
      .active {
        color: #231815;
        border-bottom: 2px solid #231815;
      }
    }
  }
  .my_order_list {
    margin-top: 41px;
    .my_order_searchTimes {
      font-size: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #cccccc;
      padding-bottom: 25px;
      span {
        color: #999999;
        i {
          color: #231815;
        }
      }
      .my_order_select {
        width: 140px;
        height: 35px;
        display: flex;
        align-items: center;
        border: 1px solid #231815;
        margin-left: 10px;
        select {
          margin: 0 auto;
        }
      }
    }
    .order_items {
      width: 100%;
      padding-top: 31px;
      padding-bottom: 30px;
      border-bottom: 1px dashed #eeeeee;
      font-size: 14px;
      .order_time {
        font-weight: 700;
        color: #cccccc;
        padding-bottom: 20px;
        span {
          padding-right: 15px;
          i {
            color: #231815;
            font-style: normal;
          }
        }
      }
      .order_item {
        width: 100%;
        display: flex;
        flex-direction: row;
        > div {
          font-weight: 700;
          border-right: 1px solid #eeeeee;
          &:last-child {
            border-right: 0px;
          }
        }
        .first {
          width: 40%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          img {
            width: 120px;
            height: 89px;
            display: inline-block;
          }
          .order_size {
            p {
              display: block;
              color: #231815;
              i {
                color: #cccccc;
                font-style: normal;
              }
            }
          }
        }
        .secound {
          width: 40%;
          display: flex;
          justify-content: space-around;
          span {
            color: #999999;
            i {
              display: block;
              font-style: normal;
              color: #231815;
            }
          }
          .total {
            color: #231815;
          }
        }
        .last {
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          img {
            padding-bottom: 9px;
          }
        }
      }
      //其他
      .to_pay {
        width: 128px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: #f4d925;
      }
      .again_pay {
        width: 128px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #231815;
      }
      .cancel_pay {
        cursor: pointer;
        color: #15379b;
      }
    }
    .my_order_searchTimes2 {
      margin: 30px 0px;
    }
    .empty {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-family: "Regular";
      font-weight: bold;
    }
  }
  .page {
    text-align: center;
    .el-pager li {
      min-width: 45px;
      height: 45px;
    }
  }
}
.h_center2 {
  font-family: Regular;
  padding-bottom: 0.59rem;
  padding: 0rem 0.2rem;
  box-sizing: border-box;
  ol {
    background-color: #fff;
    font-size: 0.14rem;
    color: #999999;
    overflow: hidden;
    padding: 0.26rem 0rem 0.28rem 0rem;
    li {
      float: left;
      padding-right: 0.1rem;
      a {
        color: #999999;
      }
    }
    .active {
      color: #231815;
    }
  }
  .my_Orders {
    padding-bottom: 0.35rem;
    span {
      width: 100%;
      display: inline-block;
      font-size: 0.28rem;
      color: #231815;
      text-align: center;
      font-weight: 700;
    }
    .my_search {
      font-size: 0.14rem;
      color: #999999;
      display: flex;
      justify-content: center;
      input[type="text"] {
        width: 4rem;
        height: 0.6rem;
        background-color: #f0f0f0;
        border-radius: 0.02rem;
        font-size: 0.12rem;
        color: #999999;
        padding-left: 0.1rem;
      }
      input[type="button"] {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.02rem;
        font-size: 0.12rem;
        color: #999999;
        margin-left: 0.02rem;
        background: url("../../../assets/myAccount/order/sousuo.png") no-repeat;
        background-color: #f4d925;
        background-position: center;
      }
    }
  }
  .my_order_table {
    width: 100%;
    overflow-x: scroll;
    ul {
      border-bottom: 0.01rem solid #dddddd;
      overflow-x: scroll;
      display: flex;
      li {
        white-space: nowrap;
        margin-left: 0.4rem;
        font-size: 0.14rem;
        color: #999999;
        // padding-bottom: 0.2rem;
        &:first-child {
          margin-left: 0rem;
        }
      }
      .active {
        color: #231815;
        border-bottom: 0.02rem solid #231815;
      }
    }
  }
  .my_order_list {
    margin-top: 0.41rem;
    .my_order_searchTimes {
      font-size: 0.12rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
      border-bottom: 0.01rem solid #cccccc;
      padding-bottom: 0.25rem;
      padding-right: 0.1rem;
      box-sizing: border-box;
      span {
        color: #999999;
        i {
          color: #231815;
        }
      }
      .my_order_select {
        margin-left: 0.1rem;
        height: 0.35rem;
        display: flex;
        align-items: center;
        border: 1px solid #231815;
        select {
          margin: 0 auto;
        }
      }
    }
    .order_items {
      width: 100%;
      padding-top: 0.31rem;
      padding-bottom: 0.3rem;
      border-bottom: 0.01rem dashed #eeeeee;
      font-size: 0.14rem;
      .order_time {
        white-space: nowrap;
        font-weight: 700;
        color: #cccccc;
        padding-bottom: 0.2rem;
        span {
          // padding-right: 0.15rem;
          i {
            color: #231815;
            font-style: normal;
          }
        }
      }
      .order_item {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div {
          font-weight: 700;
          border-right: 0.01rem solid #eeeeee;
          // flex: 1;
          &:last-child {
            border-right: 0px;
          }
        }
        .first {
          overflow: hidden;
          img {
            width: 1.2rem;
            height: 0.89rem;
            float: left;
          }
          .order_size {
            float: right;
            p {
              display: block;
              color: #231815;
              i {
                color: #cccccc;
                font-style: normal;
              }
            }
          }
        }
        .last2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          justify-content: space-around;
          div:first-of-type {
            display: flex;
            span {
              margin-left: 0.5rem;
            }
          }
          span {
            display: block;
          }
          .imgbox {
            width: 0.5rem;
            height: 0.8rem;
            background: url("../../../assets/myAccount/order/shangchu.png")
              no-repeat;
          }
          p {
            text-align: center;
          }
        }
      }
      .order_time2 {
        padding: 0.6rem 0rem;
        font-weight: 700;
        color: #cccccc;
        padding-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        span {
          color: #231815;
          padding-right: 0.15rem;
          i {
            color: #231815;
            font-style: normal;
          }
        }
      }
      //其他状态
      .to_pay {
        width: 2.1rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        background-color: #f4d925;
      }
      .again_pay {
        width: 2.1rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border: 0.01rem solid #231815;
      }
      .cancel_pay {
        cursor: pointer;
        color: #15379b;
      }
    }
    .my_order_searchTimes2 {
      margin: 0.3rem 0rem;
    }
  }
  .page {
    text-align: center;
    .el-pager li {
      min-width: 45px;
      height: 45px;
    }
  }
  .empty {
    font-size: 0.4rem;
    text-align: center;
    margin: 1rem 0;
  }
}
</style>
