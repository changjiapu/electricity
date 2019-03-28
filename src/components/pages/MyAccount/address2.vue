<template>
  <div :class="currentClass">
    <div class="container">
      <div class="title_1">Select a shipping address</div>
      <div class="title_2">Enter a new shipping address.</div>
      <div class="title_3">When finished, click the "Continue" button.</div>
      <el-form class="from" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="Full name"></el-input>
        </el-form-item>
        <el-form-item prop="addressLine1">
          <el-input
            v-model="ruleForm.addressLine1"
            placeholder="Address line 1 (Street address, P.O. box, company name, c/o)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="addressLine2">
          <el-input
            v-model="ruleForm.addressLine2"
            placeholder="Address line 2 (Apartment, suite, unit, building, floor, etc. )"
          ></el-input>
        </el-form-item>
        <el-form-item prop="city">
          <el-input v-model="ruleForm.city" placeholder="City"></el-input>
        </el-form-item>
        <el-form-item prop="province">
          <el-input v-model="ruleForm.province" placeholder="State/Province/Region"></el-input>
        </el-form-item>
        <el-form-item prop="zipCode">
          <el-input v-model="ruleForm.zipCode" placeholder="ZIP"></el-input>
        </el-form-item>
        <el-form-item prop="country">
          <el-input v-model="ruleForm.country" placeholder="Country/Region: "></el-input>
        </el-form-item>
        <el-form-item prop="userPhone">
          <el-input v-model="ruleForm.userPhone" placeholder="Phone number"></el-input>
        </el-form-item>
        <el-form-item prop="instructions">
          <p class="form_active">Add delivery instructions (optional)</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 20}"
            placeholder="Provide details such as building description, a nearby landmark,or other navigation instructions"
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
          <p class="form_active">Weekend delivery:</p>
          <el-checkbox
            v-model="isReceivePackage"
            :rules="[
      { required: true, message: '是否可以在周末交货不能为空', trigger: 'blur' },
    ]"
          >I can receive the package on Saturday and Sunday</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="continue" type="primary" @click="submitForm('ruleForm')">CONTINUE</el-button>
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
        userName: [{ required: true, message: "Age cannot be empty" }],
        addressLine1: [
          {
            required: true,
            message: "Street address/p.o. box cannot be empty"
          }
        ],
        addressLine2: [
          { required: true, message: "Apartment suite cannot be empty" }
        ],
        city: [{ required: true, message: "Cities cannot be empty" }],
        province: [
          { required: true, message: "State/province cannot be empty" }
        ],
        zipCode: [{ required: true, message: "The zip code cannot be empty" }],
        country: [{ required: true, message: "The country cannot be empty" }],
        userPhone: [
          {
            required: true,
            message: "Consignee's telephone number cannot be empty"
          }
        ]
      },
      userInfo: {},
      widthH:''
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


