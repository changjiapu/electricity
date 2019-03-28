<template>
  <div :class="currentClass">
    <section class="section_1">
      <ol class="history">
        <li v-for="(item,index) in history" :key="index" @click="push(item.url)">{{item.name}}</li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
  name: "history",
  //父组件传入历史导航内容
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      widthH:'',
    };
  },
  created() {
    this.widthH = this.$root.widthH;
  },
  methods: {
    push(url){
      this.$router.push(url)
    }
  },
  computed: {
    currentClass() {
      if (this.widthH >= 1024) {
        return "history";
      } else {
        return "history2";
      }
    },
        screenWidth() {
      return this.$root.widthH;
    },
  },
    watch: {
    screenWidth(val) {
      this.widthH = val;
    }
  }
};
</script>

<style lang='scss' scoped>
.history {
  width: 100%;
  .section_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history {
      display: flex;
      margin-top: 39px;
      font-family: "Regular";
      font-size: 14px;
      width: 13rem;
      padding-bottom: 15px;
      color: #999999;
      font-weight: bold;
      cursor: pointer;
      //   border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 8px;
      }
      li:last-of-type {
        color: #231815;
      }
    }
  }
}
.history2 {
  width: 100%;
  .section_1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .history {
      display: flex;
      margin-top: 0.39rem;
      font-family: "Regular";
      font-size: 0.14rem;
      width: 90%;
      padding-bottom: 0.15rem;
      color: #999999;
      font-weight: bold;
      //   border-bottom: 1px solid #dddddd;
      & > li:not(:last-of-type)::after {
        content: ">";
        margin: 0 0.08rem;
      }
      li:last-of-type {
        color: #231815;
      }
    }
  }
}
</style>
