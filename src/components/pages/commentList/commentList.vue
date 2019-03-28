<template>
  <div :class="currentClass">
    <div class="content5">
      <div class="head">
        <div class="left">
          <span>{{params.productName}}</span>
          <span>Matte Black Eyeglasses</span>
          <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
          <el-select v-model="sType" placeholder="SORT BY" @change="sortHandle">
            <el-option
              v-for="item in sTypeList"
              :key="item.title"
              :label="item.title"
              :value="item.sortingId"
            ></el-option>
          </el-select>
        </div>

        <div class="right" @click="addComment()">write a review</div>
      </div>
      <div class="comment_list" v-for="(item,index) in commentList.list" :key="index">
        <div class="list_1">
          <!-- <span>Awesome & Inexpensive!</span> -->
          <el-rate v-model="item.commentStar" disabled text-color="#ff9900"></el-rate>
        </div>
        <div class="list_2">
          <span>{{item.firstName}}{{item.lastName}} In {{item.payTime}}</span>
          <span>Color: {{item.productSpecs.Color.split("|")[1]}}; Size: L</span>
        </div>
        <div class="list_3">{{item.content}}</div>
        <div class="list_4">
          <img v-for="(item2,index) in item.imgList" :key="index" :src="imgUrl+item2" alt>
        </div>
        <div class="list_5">
          <span>Was this review helpful?</span>
          <span v-if="!item.thumbUp" class="zan" @click="zanChange(item.commentId,item.productId)"></span>
          <span v-else class="zan_n" @click="zanChange(item.commentId,item.productId)"></span>
          <span>({{item.upvoteNum}})</span>
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
import { mapState } from "vuex";
import {
  getCommentList,
  giveALike,
  getCommentSortingWay,
  canYouComment
} from "@/Ajax/modules/addComment";
export default {
  name: "commentList",
  data() {
    return {
      widthH: "",
      value5: 5,
      total: 10,
      params: {},
      orderId: "",
      page: 1,
      imgUrl: "",
      sType: 5,
      sTypeList: [],
      commentList: {},
      isComment: false
    };
  },
  created() {
    if (this.$route.query.params) {
      this.params = JSON.parse(this.$route.query.params);
    }
    console.log(this.params);
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    this.getCommentList(
      this.sType,
      this.params.productId,
      this.page,
      10,
      this.userId
    );
    this.getCommentSortingWay();
    this.canYouComment(this.userId, this.params.productId);
  },
  methods: {
    //去评论页面
    addComment() {
      if (this.isComment) {
        let params = {
          ...this.params,
          orderId: this.orderId
        };
        this.$router.push({
          path: "/addComment",
          query: {
            params: JSON.stringify(params)
          }
        });
      } else {
        this.$alert("Don't comment until the purchase is completed", "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
    },
    //获取评论列表
    getCommentList(sType, productId, pageNo, pageSize, userId) {
      let _this = this;
      getCommentList(sType, productId, pageNo, pageSize, userId).then(res => {
        if (res.data.code == 0) {
          res.data.data.list.forEach(item => {
            item.productSpecs = eval("(" + item.productSpecs + ")");
          });
          this.commentList = res.data.data;
        }
        console.log(this.commentList);
      });
    },
    //评论点赞
    zanChange(id, productId) {
      if (!this.$store.state.userId) {
        this.judgeIslogn();
        return;
      }
      giveALike(this.userId, id).then(res => {
        let _this = this;
        if (res.data.code == 0) {
          _this.getCommentList(
            this.sType,
            productId,
            this.page,
            10,
            _this.userId
          );
        }
      });
    },
    // 判断是否登陆然后跳转登陆页的弹框
    judgeIslogn() {
      this.$confirm("Please log in first. Do you want to continue?", "Tips", {
        confirmButtonText: "confirm ",
        cancelButtonText: "cancel",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
      });
    },
    //获取评论排序方式
    getCommentSortingWay() {
      getCommentSortingWay().then(res => {
        if (res.data.code == 0) {
          this.sTypeList = res.data.data;
        }
      });
    },
    sortHandle(e) {
      this.sType = e;
      this.getCommentList(
        this.sType,
        this.params.productId,
        this.page,
        10,
        this.userId
      );
    },
    canYouComment(userId, productId) {
      canYouComment(userId, productId).then(res => {
        if (res.data.code == 0) {
          this.isComment = res.data.data;
        }
      });
    }
  },
  computed: {
    ...mapState(["userId"]),
    currentClass() {
      if (this.widthH > 1024) {
        return "commentList";
      } else {
        return "commentList2";
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
.commentList {
  width: 100%;
  display: flex;
  justify-content: center;
  .content5 {
    width: 70%;
    font-family: "regular";
    font-weight: bold;
    .head {
      width: 100%;
      border-bottom: 1px solid #dddddd;
      padding-bottom: 20px;
      margin-top: 65px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: column;
        span {
          &:first-of-type {
            font-size: 32px;
            color: #231815;
          }
          &:last-of-type {
            font-size: 14px;
            color: #666666;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 50px;
        background-color: #231815;
        text-transform: uppercase;
        color: #e8e316;
      }
    }
    .comment_list {
      margin-bottom: 20px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px dashed #dddddd;
      .list_1 {
        margin-top: 29px;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
          font-family: "bold";
          margin-right: 165px;
          color: #424242;
        }
      }
      .list_2 {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: #cccccc;
      }
      .list_3 {
        font-family: "Regular";
        margin-top: 18px;
        font-size: 14px;
        color: #666666;
      }
      .list_4 {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        img {
          margin-left: 15px;
          width: 80px;
          height: 80px;
        }
      }
      .list_5 {
        margin-top: 10px;
        font-family: "Regular";
        font-size: 13px;
        color: #427cb7;
        display: flex;
        align-items: center;
        span {
          height: 20px;
          line-height: 30px;
        }
        .zan {
          height: 18px;
          width: 18px;
          margin: 0 5px;
          background-image: url("../../../assets/product-detail/dianzan.png");
          background-size: 18px 18px;
          cursor: pointer;
        }
        .zan_n {
          height: 18px;
          width: 18px;
          margin: 0 5px;
          background-image: url("../../../assets/product-detail/dianzan-shixin.png");
          background-size: 18px 18px;
          cursor: pointer;
        }
      }
    }
    .page {
      margin: 30px 0;
      text-align: center;
    }
  }
}
.commentList2 {
  width: 100%;
  display: flex;
  justify-content: center;
  .content5 {
    width: 80%;
    font-family: "regular";
    font-weight: bold;
    .head {
      width: 100%;
      border-bottom: 1px solid #dddddd;
      padding-bottom: 0.2rem;
      margin-top: 0.65rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: column;
        span {
          &:first-of-type {
            font-size: 0.32rem;
            color: #231815;
          }
          &:last-of-type {
            font-size: 0.22rem;
            color: #666666;
          }
        }
      }
      .right {
        font-size: 0.22rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 0.7rem;
        background-color: #231815;
        color: #e8e316;
        text-transform: uppercase;
      }
    }
    .comment_list {
      margin-bottom: 0.3rem;
      padding-bottom: 0.3rem;
      display: flex;
      flex-direction: column;
      border-bottom: 1px dashed #dddddd;
      .list_1 {
        margin-top: 0.29rem;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 0.22rem;
          font-family: "bold";
          //   margin-right: 1.65rem;
          color: #424242;
        }
      }
      .list_2 {
        margin-top: 0.15rem;
        display: flex;
        flex-direction: column;
        font-size: 0.14rem;
        color: #cccccc;
      }
      .list_3 {
        font-family: "Regular";
        margin-top: 0.22rem;
        font-size: 0.22rem;
        color: #666666;
      }
      .list_4 {
        margin-top: 0.1rem;
        display: flex;
        flex-wrap: wrap;
        img {
          margin-left: 0.15rem;
          width: 1rem;
          height: 1rem;
        }
      }
      .list_5 {
        margin-top: 0.1rem;
        font-family: "Regular";
        font-size: 0.22rem;
        color: #427cb7;
        display: flex;
        align-items: center;
        span {
          height: 0.2rem;
          line-height: 0.3rem;
        }
        .zan {
          height: 0.22rem;
          width: 0.22rem;
          margin: 0 5px;
          background-image: url("../../../assets/product-detail/dianzan.png");
          background-size: 0.22rem 0.22rem;
          cursor: pointer;
        }
        .zan_n {
          height: 0.22rem;
          width: 0.22rem;
          margin: 0 5px;
          background-image: url("../../../assets/product-detail/dianzan-shixin.png");
          background-size: 0.22rem 0.22rem;
          cursor: pointer;
        }
      }
    }
    .page {
      margin: 0.3rem 0;
      text-align: center;
    }
    .el-rate {
      height: 1rem;
      margin-top: -0.4rem;
    }
  }
}
</style>


