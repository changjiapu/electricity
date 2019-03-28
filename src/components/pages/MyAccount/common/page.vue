<template>
    <div :class="currentClass">
        <ul>
            <li>
                <a :class="setButtonClass(0)" v-on:click="prvePage(curIndex)">Previous</a>
            </li>
            <li v-for="index in indexs" v-bind:class="{active: curIndex == index}" :key="index" v-if="widthH >= 768">
                <a v-on:click="btnClick(index)">{{ index < 1 ? "..." : index }}</a>
            </li>
            <li>
                <a :class="setButtonClass(1)" v-on:click="nextPage(curIndex)">Next</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["cur", "all"],
  data() {
    return {
        widthH:'',
      curIndex: 1
    };
  },
  created(){
    this.widthH = this.$root.widthH;
  },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 11) {
        if (this.curIndex > 5 && this.curIndex < this.all - 4) {
          left = this.curIndex - 5;
          right = this.curIndex + 4;
        } else {
          if (this.curIndex <= 5) {
            left = 1;
            right = 10;
          } else {
            right = this.all;
            left = this.all - 9;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      if (ar[0] > 1) {
        ar[0] = 1;
        ar[1] = -1;
      }
      if (ar[ar.length - 1] < this.all) {
        ar[ar.length - 1] = this.all;
        ar[ar.length - 2] = 0;
      }
      return ar;
    },
     currentClass() {
      if (this.widthH >= 768) {
        return "page-bar1";
      } else {
        return "page-bar2";
      }
    }
  },
  methods: {
    // 页码点击事件
    btnClick: function(data) {
      if (data < 1) return;
      if (data != this.curIndex) {
        this.curIndex = data;
        this.$emit("listen", data);
        console.log(data);
      }
    },
    // 下一页
    nextPage: function(data) {
      if (this.curIndex >= this.all) return;
      this.btnClick(this.curIndex + 1);
    },
    // 上一页
    prvePage: function(data) {
      if (this.curIndex <= 1) return;
      this.btnClick(this.curIndex - 1);
    },
    // 设置按钮禁用样式
    setButtonClass: function(isNextButton) {
      if (isNextButton) {
        return this.curIndex >= this.all ? "page-button-disabled" : "";
      } else {
        return this.curIndex <= 1 ? "page-button-disabled" : "";
      }
    }
  }
};
</script>

<style lang="scss">
.page-bar1 {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.page-button-disabled {
    color:#999999 !important;
}
.page-bar1 li {
    list-style: none;
    display: inline-block;
}
.page-bar1 li:first-child > a {
    margin-left: 0px;
}
.page-bar1 a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 8px 16px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #231815;
    cursor: pointer;
}
 
.page-bar1 a:hover {
    background-color: #eee;
}
 
.page-bar1 .active a {
    cursor: default;
    background-color: #f4d925;
    border-color: #cccccc;
}
 
.page-bar1 i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
}
.page-bar2{
    padding: .6rem 0rem .8rem 0rem;
    ul{
        overflow: hidden;
       display: flex;
       justify-content: center;
    }
    li{
        margin-left: .2rem;
        width: 1.8rem;
        height: 0.65rem;
        line-height: .65rem;
        text-align: center;
        border: 1px solid #cccccc;
        border-radius: .02rem;
        font-size: .2rem;
        color: #231815;
    }
}
</style>
