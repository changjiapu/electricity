<template>
  <div :class="currentClass">
    <div class="content">
      <div class="head">
        <img :src="imgUrl+params.imgSrc">
        <span class="title">{{params.productName}}</span>
        <span>${{params.productPrice}}</span>
      </div>
      <div class="pingfen">
        <span class="text">grade</span>
        <el-rate v-model="grade" show-text :texts="texts2"></el-rate>
      </div>
      <el-input
        class="input"
        type="textarea"
        :rows="6"
        placeholder="Please describe your comments"
        v-model="textarea"
      ></el-input>
      <span class="picture">upload pictures</span>
      <el-upload
        class="upload"
        action="http://114.115.211.170:8080/web/file/upload"
        list-type="picture-card"
        :on-success="addSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
      <span class="btn" @click="submit()">submit</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { addComment } from "@/Ajax/modules/addComment";
export default {
  name: "addComment",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      texts2: ["1", "2", "3", "4", "5"],
      imgUrl: "",
      widthH: "",
      params: {}, //上个页面传进来的
      grade: "", //评论几个星
      textarea: "", //评论内容
      imgList: []
    };
  },
  created() {
    this.imgUrl = this.$root.imgUrl;
    this.widthH = this.$root.widthH;
    if (this.$route.query.params) {
      this.params = JSON.parse(this.$route.query.params);
    }
    console.log(JSON.parse(this.$route.query.params));
  },
  methods: {
    submit() {
      if (this.content == "") {
        this.$alert("Comments cannot be left blank", "Tips", {
          confirmButtonText: "confirm"
        });
        return;
      }
      let params = {
        content: this.textarea,
        imgId: this.imgList.join(), //评论图片（多个以逗号隔开）
        productId: this.params.productId,
        orderId: this.params.orderId,
        userId: this.userId,
        commentStar: this.grade
      };
      addComment(params).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "Comment on success",
            type: "success"
          });
        }
      });
    },
    addSuccess(event, file, fileList) {
      this.imgList = [...this.imgList, event.data];
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "addComment";
      } else {
        return "addComment2";
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
.addComment {
  width: 100%;
  display: flex;
  justify-content: center;
  .content {
    margin-bottom: 30px;
    width: 998px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .head {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 200px;
        width: 200px;
      }
      span {
        font-weight: bold;
        font-size: 22px;
        font-family: "regular";
        color: red;
      }
      .title {
        margin-right: 200px;
        font-size: 32px;
        color: #231815;
      }
    }
    .pingfen {
      margin-bottom: 20px;
      display: flex;
      span {
        margin-right: 20px;
        font-weight: bold;
        font-size: 16px;
        font-family: "regular";
      }
    }
    .picture {
      margin: 20px 0;
      font-weight: bold;
      font-size: 16px;
      font-family: "regular";
    }
    .btn {
      font-weight: bold;
      font-size: 16px;
      font-family: "regular";
      height: 50px;
      width: 235px;
      background-color: #ede945;
      color: #231815;
      border-radius: 5px;
      text-align: center;
      line-height: 50px;
      margin: 20px auto;
      cursor: pointer;
    }
  }
}
.addComment2 {
  width: 100%;
  display: flex;
  justify-content: center;
  .content {
    margin-bottom: 0.3rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .head {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 2rem;
        width: 2.5rem;
      }
      span {
        font-weight: bold;
        font-size: 0.24rem;
        font-family: "regular";
        color: red;
      }
      .title {
        margin-right: 0.25rem;
        font-size: 0.34rem;
        color: #231815;
      }
    }
    .pingfen {
      margin-bottom: 0.2rem;
      display: flex;
      align-items: center;
      .text {
        margin-right: 0.2rem;
        font-weight: bold;
        font-size: 0.18rem;
        font-family: "regular";
      }
    }
    .picture {
      margin: 0.2rem 0;
      font-weight: bold;
      font-size: 0.18rem;
      font-family: "regular";
    }
    .btn {
      font-weight: bold;
      font-size: 0.18rem;
      font-family: "regular";
      height: 0.7rem;
      width: 80%;
      background-color: #ede945;
      color: #231815;
      border-radius: 3px;
      text-align: center;
      line-height: 0.7rem;
      margin: 20px auto;
      cursor: pointer;
    }
    .el-rate {
      height: 1rem;
      margin-top: -0.4rem;
    }
  }
}
</style>


