<template>
  <div :class="currentClass">
    <div class="cg" v-if="payId==1">
      <span>√</span>
      <span>payment success</span>
    </div>
    <div class="sb" v-else>
      <span>x</span>
      <span>payment failure</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "tipsPay",
  data() {
    return {
      widthH: "",
      payId: ""
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    if (this.$route.query.payId) {
      this.payId = this.$route.query.payId;
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "tipsPay";
      } else {
        return "tipsPay2";
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
.tipsPay {
  display: flex;
  justify-content: center;
  .cg {
    margin-top: 150px;
    margin-bottom: 150px;
    display: flex;
    align-items: center;
    span {
      color: rgb(30, 177, 14);
      font-size: 40px;
      &:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        width: 70px;
        background-color: rgb(30, 177, 14);
        color: #ffffff;
        border-radius: 100%;
        margin-right: 20px;
      }
    }
  }
  .sb {
    margin-top: 150px;
    margin-bottom: 150px;
    display: flex;
    align-items: center;
    span {
      color: rgb(255, 85, 62);
      font-size: 40px;
      &:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        width: 70px;
        background-color: rgb(255, 85, 62);
        color: #ffffff;
        border-radius: 100%;
        margin-right: 20px;
      }
    }
  }
}
.tipsPay2 {
  display: flex;
  justify-content: center;
  .cg {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    span {
      color: rgb(30, 177, 14);
      font-size: 0.4rem;
      &:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.9rem;
        width: 0.9rem;
        background-color: rgb(30, 177, 14);
        color: #ffffff;
        border-radius: 100%;
        margin-right: 0.3rem;
      }
    }
  }
  .sb {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    span {
      color: rgb(255, 85, 62);
      font-size: 0.4rem;
      &:first-of-type {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.9rem;
        width: 0.9rem;
        background-color: rgb(255, 85, 62);
        color: #ffffff;
        border-radius: 100%;
        margin-right: 0.3rem;
      }
    }
  }
}
</style>



