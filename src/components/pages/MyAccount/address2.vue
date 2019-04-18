<template>
  <div :class="currentClass">
    <div class="container">
      <div class="title_1">{{$t('m.address2.title1')}}</div>
      <div class="title_2">{{$t('m.address2.title2')}}.</div>
      <div class="title_3">{{$t('m.address2.title3')}}.</div>
      <el-form class="from" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName" :placeholder="$t('m.address2.placeholder1')"></el-input>
        </el-form-item>
        <el-form-item prop="addressLine1">
          <el-input
            v-model="ruleForm.addressLine1"
            :placeholder="$t('m.address2.placeholder2')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="addressLine2">
          <el-input
            v-model="ruleForm.addressLine2"
            :placeholder="$t('m.address2.placeholder3')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="city">
          <el-input v-model="ruleForm.city" :placeholder="$t('m.address2.placeholder4')"></el-input>
        </el-form-item>
        <el-form-item prop="province">
          <el-input v-model="ruleForm.province" :placeholder="$t('m.address2.placeholder5')"></el-input>
        </el-form-item>
        <el-form-item prop="zipCode">
          <el-input v-model="ruleForm.zipCode" :placeholder="$t('m.address2.placeholder6')"></el-input>
        </el-form-item>
        <el-form-item prop="country">
          <el-input v-model="ruleForm.country" :placeholder="$t('m.address2.placeholder7')"></el-input>
        </el-form-item>
        <el-form-item prop="userPhone">
          <el-input v-model="ruleForm.userPhone" :placeholder="$t('m.address2.placeholder8')"></el-input>
        </el-form-item>
        <el-form-item prop="instructions">
          <p class="form_active">{{$t('m.address2.title4')}}</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 20}"
            :placeholder="$t('m.address2.placeholder9')"
            v-model="ruleForm.instructions"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            v-model="ruleForm.name"
            placeholder="Do we need a security code or a call box number to access this "
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="ruleForm.name"
            placeholder="Do we need a security code or a call box number to access this "
          ></el-input>
        </el-form-item>-->
        <el-form-item prop="isReceivePackage">
          <p class="form_active">{{$t('m.address2.title5')}}:</p>
          <el-checkbox
            v-model="isReceivePackage"
            :rules="[
      { required: true, message: '是否可以在周末交货不能为空', trigger: 'blur' },
    ]"
          >{{$t('m.address2.title6')}}</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="continue" type="primary" @click="submitForm('ruleForm')">{{$t('m.address2.title7')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Address, updAddById } from "@/Ajax/modules/address";
import { mapState } from "vuex";
export default {
  name: "address2",
  data() {
    return {
      ruleForm: {
        userName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
        userPhone: "",
        instructions: "",
        security: ""
      },
      isReceivePackage: "",
      rules: {
        userName: [{ required: true, message: this.$t('m.address2.tips1')}],
        addressLine1: [
          {
            required: true,
            message: this.$t('m.address2.tips2')
          }
        ],
        addressLine2: [
          { required: true, message: this.$t('m.address2.tips3') }
        ],
        city: [{ required: true, message: this.$t('m.address2.tips4') }],
        province: [
          { required: true, message: this.$t('m.address2.tips5') }
        ],
        zipCode: [{ required: true, message: this.$t('m.address2.tips6') }],
        country: [{ required: true, message: this.$t('m.address2.tips7') }],
        userPhone: [
          {
            required: true,
            message: this.$t('m.address2.tips8')
          }
        ]
      },
      userInfo: {},
      widthH: ""
    };
  },
  created() {
    if (this.$route.params.addressItem) {
      this.ruleForm = JSON.parse(this.$route.params.addressItem);
      console.log(this.ruleForm);
    } else if (localStorage.getItem("addressItem")) {
      this.ruleForm = JSON.parse(localStorage.getItem("addressItem"));
    }
    if (this.$route.params.userInfo) {
      this.userInfo = JSON.parse(this.$route.params.userInfo);
      this.widthH = this.$root.widthH;
    }
  },
  methods: {
    //添加地址
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //this.$route.query.addressItem 为假是直接添加 真是修改
          if (this.$route.query.addressItem) {
            let params = {
              ...this.ruleForm,
              userId: this.userId,
              isReceivePackage: this.isReceivePackage ? 1 : 0
            };
            updAddById(params).then(res => {
              if (res.data.code == 0) {
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1500);
              }
            });
          } else {
            let params = {
              ...this.ruleForm,
              userId: this.userId,
              isReceivePackage: this.isReceivePackage ? 1 : 0
            };
            Address(params).then(res => {
              if (res.data.code == 0) {
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1500);
                this.$refs[formName].resetFields();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "address";
      } else {
        return "address2";
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
.address {
  width: 100%;
  background-image: url("../../../assets/payOrder/beijing.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  .container {
    margin-top: 50px;
    width: 1294px;
    .title_1 {
      font-size: 32px;
      color: #231815;
      font-weight: bold;
    }
    .title_2 {
      margin-top: 6px;
      font-size: 16px;
      color: #231815;
      font-weight: bold;
    }
    .title_3 {
      margin-top: 6px;
      font-size: 14px;
      color: #999999;
      font-weight: bold;
      padding-bottom: 15px;
      border-bottom: 1px solid #e3e3e3;
    }
    .from {
      font-size: "regular";
      font-weight: bold;
      margin-top: 30px;
      width: 500px;
      .continue {
        background-color: #231815;
      }
      .form_active {
        font-size: 14px;
      }
    }
  }
}
.address2 {
  width: 100%;
  background-image: url("../../../assets/payOrder/beijing.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  .container {
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title_1 {
      font-size: 0.32rem;
      color: #231815;
      font-weight: bold;
    }
    .title_2 {
      margin-top: 0.06rem;
      font-size: 0.16rem;
      color: #231815;
      font-weight: bold;
    }
    .title_3 {
      margin-top: 0.06rem;
      font-size: 0.14rem;
      color: #999999;
      font-weight: bold;
      padding-bottom: 0.15rem;
      border-bottom: 1px solid #e3e3e3;
    }
    .from {
      font-size: "regular";
      font-weight: bold;
      margin-top: 0.3rem;
      width: 6rem;
      .el-checkbox {
        display: flex;
        width: 100%;
        white-space: pre-wrap;
      }
      .continue {
        width: 100%;
        background-color: #231815;
      }
      .form_active {
        font-size: 0.14rem;
      }
    }
  }
}
</style>


