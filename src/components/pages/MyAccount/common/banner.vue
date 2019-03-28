<template>
  <div :class="currentClass">
    <div class="el-banner">
      <div class="el-img">
        <img src="../../../../assets/myAccount/touxiang.png" alt>
      </div>
      <div class="el-tit">
        <b>{{userInfo.nickName}}</b>
        <p>Morning，Welcome to Jimoptical glasses.</p>
      </div>
    </div>
  </div>
</template>
<script>
import AJAX from "../../../../Ajax";
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      widthH:'',
    }
  },
  created(){
    this.widthH=this.$root.widthH;
  },
  computed: {
    currentClass() {
      if (this.widthH >1024) {
        return "el-box";
      } else {
        return "el-box2";
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-box2 {
  background: url("../../../../assets/myAccount/banner.png") no-repeat;
  height: 2.5rem;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.18rem;
  .el-banner {
    display: flex;
    .el-img {
      width: 1rem;
      border-radius: 50%;
    }
    .el-img img {
      width: 100%;
      border-radius: 50%;
    }
    .el-tit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.2rem;
      font-family: Regular;
    }
    .el-tit b {
      color: #ffffff;
      font-size: .24rem;
    }
    .el-tit p {
      color: #cccccc;
    }
  }
}
.el-box {
  background: url("../../../../assets/myAccount/banner.png") no-repeat;
  height: 200px;
  width: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-banner {
    display: flex;
    .el-img {
      width: 80px;
      border-radius: 50%;
    }
    .el-img img {
      width: 100%;
      border-radius: 50%;
    }
    .el-tit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      font-family: Regular;
    }
    .el-tit b {
      color: #ffffff;
      font-size: 18px;
    }
    .el-tit p {
      color: #cccccc;
    }
  }
}
</style>
