<template>
  <div :class="currentClass">
    <div class="div" v-if="widthH>1024">
      <div class="head">
        <span>{{total}} {{$t('m.search.title1')}}</span>
        <el-row>
          <el-select v-model="sorting" :placeholder="$t('m.search.title2')" @change="sortHandle">
            <el-option
              v-for="item in sortList"
              :key="item.title"
              :label="item.title"
              :value="item.sortingId"
            ></el-option>
          </el-select>
          <!-- <img src="../../../assets/search/xuanze-hei.png" alt> -->
          <!-- <img src="../../../assets/search/xuanze-hui.png" alt> -->
        </el-row>
      </div>
      <el-row class="main">
        <div class="left">
          <span class="title">{{$t('m.search.title4')}}</span>
          <span
            class="list"
            v-for="(item,index) in side_list1[tabId].cateGoryList"
            :key="index"
            @click="screening(item)"
          >-{{item.categoryName}}</span>
          <!-- 脸型选择 -->
          <span class="title">{{faceList1.typeName}}</span>
          <el-checkbox-group class="check_list" v-model="checkList2">
            <el-checkbox
              class="check_item"
              :label="item.valueId"
              v-for="(item,index) in faceList1.paramValues"
              :key="index"
              @change="faceChange()"
            >
              <img :src="imgUrl+item.paramImage" alt>
              <span>{{item.paramValue}}</span>
            </el-checkbox>
          </el-checkbox-group>
          <!-- 颜色选择 -->
          <span class="title">{{faceList2.typeName}}</span>
          <div class="color_list">
            <div
              v-for="(item,index) in faceList2.paramValues"
              :key="index"
              :class="{colorActive:currentColor===index}"
            >
              <el-tooltip :content="item.paramValue.split('|')[1]" placement="top">
                <span
                  :style="{backgroundColor:item.paramValue.split('|')[0]}"
                  @click.stop="colorChange(index,item)"
                ></span>
              </el-tooltip>
            </div>
          </div>
          <!-- 眼镜类型选择 -->
          <span class="title">{{faceList3.typeName}}</span>
          <el-checkbox-group class="check_list3" v-model="checkList3">
            <el-checkbox
              class="check_item"
              :label="item.valueId"
              v-for="(item,index) in faceList3.paramValues"
              :key="index"
              @change="faceChange()"
            >
              <img :src="imgUrl+item.paramImage" alt>
              <span>{{item.paramValue}}</span>
            </el-checkbox>
          </el-checkbox-group>
          <span class="title">{{faceList4.typeName}}</span>
          <el-checkbox-group class="check_list4" v-model="checkList4">
            <el-checkbox
              class="check_item"
              :label="item.valueId"
              v-for="(item,index) in faceList4.paramValues"
              :key="index"
              @change="faceChange()"
            >{{item.paramValue}}</el-checkbox>
          </el-checkbox-group>
          <!-- size -->
          <span class="title">{{faceList5.typeName}}</span>
          <el-checkbox-group class="check_list4" v-model="checkList5">
            <el-checkbox
              class="check_item"
              :label="item.valueId"
              v-for="(item,index) in faceList5.paramValues"
              :key="index"
              @change="faceChange()"
            >{{item.paramValue}}</el-checkbox>
          </el-checkbox-group>
          <!-- MARKED FRAMES -->
          <span class="title">{{faceList6.typeName}}</span>
          <el-checkbox-group class="check_list4" v-model="checkList6">
            <el-checkbox
              class="check_item"
              :label="item.valueId"
              v-for="(item,index) in faceList6.paramValues"
              :key="index"
              @change="faceChange()"
            >{{item.paramValue}}</el-checkbox>
          </el-checkbox-group>
          <!-- 价格 -->
          <span class="title">{{$t('m.search.title5')}}</span>
          <div class="slider">
            <span>${{sliderPrice[0]}} - ${{sliderPrice[1]}}</span>
            <el-slider
              range
              :min="value2[0]"
              :max="value2[1]"
              v-model="sliderPrice"
              @change="handlePrice()"
            ></el-slider>
          </div>
        </div>
        <div class="right">
          <div class="right-shop" v-if="isSHowproduct">
            <product-item
              class="product_item"
              v-for="(item,index) in productList"
              :key="index"
              @colorChange="colorChange2"
              :productList="item"
              :discount="discount"
            ></product-item>
          </div>
          <div class="block" v-if="total>0">
            <el-pagination
              @current-change="handleCurrentChange($event)"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-row>
    </div>
    <div :class="['div',{activeDiv:isShowCt}]" v-else>
      <div class="head">
        <span class="fenlei" @click="isShowchouTi">{{$t('m.search.title3')}}</span>
        <el-select
          class="select"
          v-model="sorting"
          :placeholder="$t('m.search.title2')"
          @change="sortHandle"
          size="small"
        >
          <el-option
            v-for="item in sortList"
            :key="item.title"
            :label="item.title"
            :value="item.sortingId"
          ></el-option>
        </el-select>
      </div>
      <div class="total">{{total}} {{$t('m.search.title1')}}</div>
      <div class="main"  v-if="isSHowproduct">
        <product-item
          v-for="(item,index) in productList"
          :key="index"
          @colorChange="colorChange2"
          :productList="item"
          :discount="discount"
        ></product-item>
      </div>
      <div class="block" v-if="total>0">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
      <div class="nodata" v-if="productList.length==0">{{$t('m.search.title6')}}</div>
    </div>
    <div class="chouti" v-if="isShowCt" :style="{height:heightH+'px'}">
      <div class="content">
        <div class="head">
          <span>FILTERS</span>
          <span class="img" @click="isShowchouTi"></span>
        </div>
        <el-collapse class="zhedie" v-model="activeName" accordion>
          <el-collapse-item title="CATEGORIES" name="1">
            <div class="item_1">
              <span
                class="list"
                v-for="(item,index) in side_list1[tabId].cateGoryList"
                :key="index"
                @click="screening(item)"
              >-{{item.categoryName}}</span>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="faceList1.typeName" name="2" v-if="faceList1.typeName">
            <el-checkbox-group class="check_list" v-model="checkList2">
              <el-checkbox
                class="check_item"
                :label="item.valueId"
                v-for="(item,index) in faceList1.paramValues"
                :key="index"
                @change="faceChange()"
              >
                <img :src="imgUrl+item.paramImage" alt>
                <span>{{item.paramValue}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item :title="faceList2.typeName" name="3" v-if="faceList2.typeName">
            <div class="color_list">
              <div
                v-for="(item,index) in faceList2.paramValues"
                :key="index"
                :class="{colorActive:currentColor===index}"
              >
                <span
                  :style="{backgroundColor:item.paramValue.split('|')[0]}"
                  @click.stop="colorChange(index,item)"
                ></span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="faceList3.typeName" name="4" v-if="faceList3.typeName">
            <el-checkbox-group class="check_list3" v-model="checkList3">
              <el-checkbox
                class="check_item"
                :label="item.valueId"
                v-for="(item,index) in faceList3.paramValues"
                :key="index"
                @change="faceChange()"
              >
                <img :src="imgUrl+item.paramImage" alt>
                <span>{{item.paramValue}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item :title="faceList4.typeName" name="5" v-if="faceList4.typeName">
            <el-checkbox-group class="check_list4" v-model="checkList4">
              <el-checkbox
                class="check_item"
                :label="item.valueId"
                v-for="(item,index) in faceList4.paramValues"
                :key="index"
                @change="faceChange()"
              >{{item.paramValue}}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item :title="faceList5.typeName" name="6" v-if="faceList5.typeName">
            <el-checkbox-group class="check_list4" v-model="checkList5">
              <el-checkbox
                class="check_item"
                :label="item.valueId"
                v-for="(item,index) in faceList5.paramValues"
                :key="index"
                @change="faceChange()"
              >{{item.paramValue}}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item :title="faceList6.typeName" name="7" v-if="faceList6.typeName">
            <el-checkbox-group class="check_list4" v-model="checkList6">
              <el-checkbox
                class="check_item"
                :label="item.valueId"
                v-for="(item,index) in faceList6.paramValues"
                :key="index"
                @change="faceChange()"
              >{{item.paramValue}}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
          <el-collapse-item :title="$t('m.search.title5')" name="8">
            <div class="slider">
              <span>${{sliderPrice[0]}} - ${{sliderPrice[1]}}</span>
              <el-slider
                range
                :min="value2[0]"
                :max="value2[1]"
                v-model="sliderPrice"
                @change="handlePrice()"
              ></el-slider>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import { getHomeNav, getProductCategory } from "../../../Ajax/modules/home";
import {
  getListData,
  getFace,
  getPriceX,
  getSortX
} from "../../../Ajax/modules/product";
import productItem from "@/components/common/productItem.vue";
export default {
  name: "search",
  components: {
    productItem
  },
  data() {
    return {
      activeName: "1",
      isShowCt: false,
      total: "",
      pageSize: 9,
      pageNo: 1,
      side_list1: [], //产品类别
      faceList: [], //标签数据
      //   cur: 1,
      checkList2: [], //选中的脸型
      checkList3: [], //选中眼镜类型
      checkList4: [], //选中的框架样式
      checkList5: [], //选中的尺寸大小
      checkList6: [],
      colorList: "", //颜色
      sliderPrice: [], //价格选择
      value2: [], //最小最大价格选择,
      productList: [],
      currentColor: 0, //当前选中颜色
      imgUrl: "",
      widthH: "",
      heightH: "",
      sorting: "", //排序
      sortList: [],
      categoryId: "", //商品分类id
      pages: "",
      discount: "", //折扣商品
      faceList1: [],
      faceList2: [],
      faceList3: [],
      faceList4: [],
      faceList5: [],
      faceList6: [],
      taId: "",
      tabId: 0,
      isSHowproduct: true
      // lidList:[]
    };
  },
  created() {
    console.log(this.$route);
    this.heightH = this.$root.heightH;
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    if (this.$route.params.data) {
      this.categoryId = this.$route.query.data;
    }
    if (this.$route.params.tabId || this.$route.params.tabId == 0) {
      this.tabId = this.$route.params.tabId;
    }
    if (this.$route.params.name) {
      this.discount = 0;
    }
    if (this.$route.params.taId) {
      this.taId = this.$route.params.taId;
    }
    //监听nav中的搜索事件
    this.bus.$on("getInput", data => {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sorting: 0, //排序
        productName: data
      };
      getListData(params).then(response => {
        this.isSHowproduct = false;
        this.$nextTick(() => {
          this.isSHowproduct = true;
        });
        this.productList = [];
        this.total = response.data.data.total;
        this.productList = response.data.data.list;
      });
    });
    //监听nav中tab的切换事件
    this.bus.$on("getTabsid", (data, data2) => {
      console.log(data, data2);
      this.tabId = data;
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sorting: this.sorting, //排序
        endPrice: this.sliderPrice[1] || "",
        startPrice: this.sliderPrice[0] || "",
        lidList: this.lidList, //
        categoryId: data2, //商品分类id
        disType: this.discount,
        taId: this.taId //趋势id
      };
      getListData(params).then(response => {
        this.isSHowproduct = false;
        this.$nextTick(() => {
          this.isSHowproduct = true;
        });
        this.productList = [];
        this.total = response.data.data.total;
        this.productList = response.data.data.list;
      });
    });
    //监听nav中子类的点击事件
    this.bus.$on("jump", (data, data2) => {
      console.log(data, data2);
      this.tabId = data;
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sorting: this.sorting, //排序
        endPrice: this.sliderPrice[1] || "",
        startPrice: this.sliderPrice[0] || "",
        lidList: this.lidList, //
        categoryId: data2, //商品分类id
        disType: this.discount,
        taId: data //趋势id
      };
      getListData(params).then(response => {
        this.isSHowproduct = false;
        this.$nextTick(() => {
          this.isSHowproduct = true;
        });
        this.productList = [];
        this.total = response.data.data.total;
        this.productList = response.data.data.list;
      });
    });
    this.getFaceData(); //标签获取
    this.getSort();
    this.geCategory(); //类别获取
    this.getList();
    this.getPrice();
  },
  watch: {
    screenWidth(val) {
      this.widthH = val;
    },
    $route(to, from) {
      if (this.$route.query.data) {
        this.categoryId = this.$route.query.data;
      } else {
        this.categoryId = "";
      }
      if (this.$route.query.name) {
        this.discount = 0;
      } else {
        this.discount = "";
      }
      if (this.$route.query.taId) {
        this.taId = this.$route.query.taId;
      } else {
        this.taId = "";
      }
      this.getFaceData(); //标签获取
      this.getSort();
      this.geCategory(); //类别获取
      this.getPrice();
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "search";
      } else {
        return "search2";
      }
    },
    lidList() {
      if (this.colorList) {
        return [
          ...this.checkList2,
          ...this.checkList3,
          ...this.checkList4,
          ...this.checkList5,
          ...this.checkList6,
          this.colorList
        ];
      } else {
        return [
          ...this.checkList2,
          ...this.checkList3,
          ...this.checkList4,
          ...this.checkList5,
          ...this.checkList6
        ];
      }
    },
    screenWidth() {
      return this.$root.widthH;
    }
  },
  methods: {
    //   排序
    sortHandle(e) {
      this.sorting = e;
      this.getList();
    },
    //
    isShowchouTi() {
      this.isShowCt = !this.isShowCt;
    },
    //   上下页
    handleCurrentChange(e) {
      this.pageNo = e;
      this.getList();
    },
    //   价格切换
    handlePrice(e) {
      this.getList();
    },
    // 条件
    screening(i) {
      console.log(i);
      this.categoryId = i.categoryId;
      this.getList();
    },
    // 脸型等
    faceChange() {
      this.getList();
    },
    // 获取排序规则
    getSort() {
      getSortX().then(res => {
        this.sortList = res.data.data;
      });
    },
    // 获取价格区间
    getPrice() {
      getPriceX().then(response => {
        this.value2 = [response.data.data.small, response.data.data.big];
        this.sliderPrice = [...this.value2];
      });
    },
    //类别数据获取
    geCategory() {
      getProductCategory().then(res => {
        this.side_list1 = res.data.data.cateGories;
      });
    },
    //获取标签
    getFaceData() {
      getFace().then(response => {
        this.faceList = response.data.data;
        this.faceList1 = this.faceList[0];
        this.faceList2 = this.faceList[1];
        this.faceList3 = this.faceList[2];
        this.faceList4 = this.faceList[3];
        this.faceList5 = this.faceList[4];
        this.faceList5 = this.faceList[5];
        console.log(this.faceList);
      });
    },
    //产品数据获取
    getList() {
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sorting: this.sorting, //排序
        endPrice: this.sliderPrice[1] || "",
        startPrice: this.sliderPrice[0] || "",
        lidList: this.lidList, //
        categoryId: this.categoryId, //商品分类id
        disType: this.discount,
        taId: this.taId //趋势id
      };
      getListData(data).then(response => {
        this.isSHowproduct = false;
        this.$nextTick(() => {
          this.isSHowproduct = true;
        });
        this.productList = [];
        this.total = response.data.data.total;
        console.log(this.total);
        this.productList = response.data.data.list;
      });
    },
    //颜色选择
    colorChange(index, item) {
      if (this.colorList == item.valueId) {
        this.colorList = "";
        this.currentColor = "";
      } else {
        this.currentColor = index;
        this.colorList = item.valueId;
      }
      this.getList();
    },
    //子组件传递过来的事件
    colorChange2() {}
  }
};
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  .div {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .head {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fafafa;
      border: 1px solid #dddddd;
      height: 0.55rem;
      width: 100%;
      font-size: 14px;
      font-family: "Reqular";
      font-weight: bold;
      span {
        margin-right: 9.35rem;
      }
      img {
        &:first-of-type {
          margin-left: 20px;
          height: 20px;
          width: 20px;
        }
        &:last-of-type {
          margin-left: 10px;
          height: 20px;
          width: 25px;
        }
      }
    }
    .main {
      margin-top: 0.29rem;
      width: 13rem;
      display: flex;
      justify-content: center;
      .left {
        width: 2.5rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid #eeeeee;
        padding: 0 20px 35px 20px;
        .title {
          margin-top: 20px;
          margin-bottom: 20px;
          font-family: "Bold";
          font-size: 16px;
          color: #231815;
          padding-bottom: 14px;
          border-bottom: 1px solid #eeeeee;
        }
        .list {
          font-size: 14px;
          font-family: "Regular";
          color: #666666;
          cursor: pointer;
        }
        .list:hover {
          color: #409eff;
        }
        //脸型
        .check_list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .check_item {
            display: flex;
            height: 40px;
            align-items: center;
            position: relative;
            img {
              position: absolute;
              top: 5px;
              width: 25px;
              height: 30px;
            }
            span {
              margin-left: 35px;
              height: 100%;
              line-height: 40px;
              color: #666666;
              font-family: "Regular";
              font-size: 14px;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        //眼镜类型
        .check_list3 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .check_item {
            display: flex;
            height: 40px;
            align-items: center;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              width: 45px;
              height: 20px;
            }
            span {
              margin-left: 55px;
              height: 100%;
              line-height: 40px;
              color: #666666;
              font-family: "Regular";
              font-size: 14px;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        //多选通用
        .check_list4 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .check_item {
            display: flex;
            height: 40px;
            align-items: center;
            line-height: 40px;
            color: #666666;
            font-family: "Regular";
            font-size: 14px;
            &:hover {
              color: #409eff;
            }
          }
        }
        .slider {
          display: flex;
          flex-direction: column;
          span {
            text-align: center;
            font-size: 16px;
            font-family: "Regular";
            font-weight: bold;
            color: #231815;
          }
        }
        .el-checkbox + .el-checkbox {
          margin-left: 0px;
        }
        .color_list {
          display: flex;
          flex-wrap: wrap;
          div {
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            margin-left: 5px;
            cursor: pointer;
            &.colorActive {
              border: 1px solid #231815;
            }
          }
          span {
            height: 18px;
            width: 18px;
            background-color: #231815;
            border-radius: 100%;
            box-sizing: border-box;
          }
        }
      }
      .right {
        margin-left: 24px;
        flex: 1;
        height: 100%;

        .right-shop {
          display: flex;
          justify-content: flex-start;
          flex-flow: wrap;
          .product_item {
            margin-top: 20px;
            width: 33%;
          }
        }
        .block {
          text-align: center;
        }
      }
    }
  }
}
.search2 {
  width: 100%;
  .div {
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
    background-image: url("../../../assets/home/beijing1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &.activeDiv {
      position: absolute;
      top: 1.5rem;
      bottom: 0;
      overflow: hidden;
    }
    .head {
      background-color: #fafafa;
      height: 0.8rem;
      font-size: 0.22rem;
      font-family: "Reqular";
      font-weight: bold;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fenlei {
        height: 100%;
        background-size: 0.45rem 0.45rem;
        background-image: url("../../../assets/search/fenlei.png");
        background-repeat: no-repeat;
        background-position: 0 50%;
        padding-left: 0.65rem;
        line-height: 0.8rem;
      }
      .select {
        width: 2rem;
      }
    }
    .total {
      background-color: #ffffff;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.24rem;
      font-family: "Reqular";
      font-weight: bold;
    }
    .main {
      background-color: rgb(247, 247, 247);
      margin-top: 0.2rem;
      display: flex;
      flex-wrap: wrap;
    }
    .nodata {
      height: 4.5rem;
      font-size: 1rem;
      font-family: "regular";
      text-align: center;
    }
    .block {
      display: flex;
      justify-content: center;
      margin-top: 0.2rem;
    }
  }
  .chouti {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    background-color: rgba(000, 000, 000, 0.5);
    overflow: hidden;
    .content {
      width: 80%;
      height: 100%;
      background-color: #ffffff;
      float: right;
      animation: identifier 0.7s;
      font-size: 0.24rem;
      font-family: "regular";
      padding: 0.2rem;
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        font-size: 0.3rem;
        color: #231815;
        height: 0.7rem;
        .img {
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("../../../assets/search/guanbi.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
      .zhedie {
        .el-checkbox + .el-checkbox {
          margin-left: 0px;
        }
        .item_1 {
          color: #999999;
          display: flex;
          flex-wrap: wrap;
          // flex-direction: column;
          span {
            width: 45%;
            margin-top: 0.1rem;
            &:nth-of-type(even) {
              margin-left: 0.1rem;
            }
          }
        }
        .check_list {
          color: #999999;
          display: flex;
          flex-wrap: wrap;
          .check_item {
            width: 45%;
            margin-top: 0.1rem;
            &:nth-of-type(even) {
              margin-left: 0.1rem;
            }
          }
          img {
            width: 0.5rem;
            height: 0.4rem;
          }
        }
        .color_list {
          display: flex;
          flex-wrap: wrap;
          div {
            margin-top: 0.1rem;
            height: 0.55rem;
            width: 0.55rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            margin-left: 0.2rem;
            cursor: pointer;
            &.colorActive {
              border: 1px solid #231815;
            }
          }
          span {
            height: 0.48rem;
            width: 0.48rem;
            background-color: #231815;
            border-radius: 100%;
            box-sizing: border-box;
          }
        }
        .check_list3 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .check_item {
            display: flex;
            height: 40px;
            align-items: center;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              width: 45px;
              height: 20px;
            }
            span {
              margin-left: 55px;
              height: 100%;
              line-height: 40px;
              color: #666666;
              font-family: "Regular";
              font-size: 14px;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        //多选通用
        .check_list4 {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .check_item {
            display: flex;
            height: 40px;
            align-items: center;
            line-height: 40px;
            color: #666666;
            font-family: "Regular";
            font-size: 14px;
            &:hover {
              color: #409eff;
            }
          }
        }
        .slider {
          margin-left: 0.4rem;
          width: 80%;
          display: flex;
          flex-direction: column;
          span {
            text-align: center;
            font-size: 0.16rem;
            font-family: "Regular";
            font-weight: bold;
            color: #231815;
          }
        }
      }
    }
  }
  @keyframes identifier {
    from {
      width: 0%;
    }
    to {
      width: 80%;
    }
  }
}
</style>