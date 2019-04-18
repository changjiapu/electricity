<template>
  <div :class="currentClass">
    <!-- 顶部历史导航组件 -->
    <History :history="history"></History>
    <!-- pc端页面 -->
    <div class="content" v-if="widthH >1024">
      <section class="main">
        <!-- isFixed 动态绑定上定位样式 -->
        <div :class="['left',{isFixed:sideFixed}]" id="side_img">
          <div
            v-for="(item,index) in productDetail.productImages"
            :key="index"
            @click="jump(index)"
            :class="['img_list',{active:currentActive==index}]"
          >
            <img :src="imgUrl+item.imageUrl">
          </div>
          <!-- <div class="try">TRY ON</div> -->
        </div>
        <div :class="['middle',{isFixed:sideFixed}]">
          <div
            class="img_list1 d_jump"
            :id="'middle-'+index"
            v-for="(item,index) in productDetail.productImages"
            :key="index"
          >
            <img :src="imgUrl+item.imageUrl">
          </div>
          <!-- <div class="img_list2">
          <img v-for="(item,index) in side_img2" :key="index" :src="item" alt>
          </div>-->
          <div class="params" v-if="isPrescript">
            <p>{{$t('m.productDetail.params1')}}</p>
            <div class="content_1">
              <div
                :class="{active:prescription1Tab==index}"
                v-for="(item,index) in prescription1.valueList"
                :key="index"
                @click="prescription1Change(index)"
              >
                <span>{{item.pvDetailed}}</span>
                <span>{{item.pvIntroduce}}</span>
                <span>{{item.pvPrice?`+$${item.pvPrice}`:'Included'}}</span>
              </div>
            </div>
            <p>{{$t('m.productDetail.params2')}}</p>
            <div class="content_2">
              <div class="tabs">
                <span :class="{tabsActive:currentTab==1}" @click="tabChange(1)">{{$t('m.productDetail.params3')}}</span>
                <span :class="{tabsActive:currentTab==2}" @click="tabChange(2)">{{$t('m.productDetail.params4')}}</span>
                <span
                  :class="{tabsActive:currentTab==3}"
                  @click="tabChange(3)"
                >{{$t('m.productDetail.params5')}}</span>
              </div>
              <div v-if="currentTab==1||currentTab==3" class="tabs_1">
                <p>{{$t('m.productDetail.params6')}}</p>
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="prescriptionName" :placeholder="$t('m.productDetail.placeholder2')"></el-input>
                  </el-col>
                </el-row>
                <el-row class="tab_1_main" v-if="prescription1Tab!=3">
                  <el-col class="item1">
                    <span>
                      Right
                      <span style="color:#999999">(OD)</span>
                    </span>
                    <span>
                      Left
                      <span style="color:#999999">(OS)</span>
                    </span>
                    <span>PD</span>
                    <span v-if="prescription1Tab!=4">Near PD</span>
                  </el-col>
                  <el-col class="item2">
                    <span>
                      Sphere
                      <span style="color:#999999">(SPH)</span>
                    </span>
                    <el-select size="small" v-model="prescription[0].Sphere" placeholder="None">
                      <el-option
                        v-for="item in prescription2.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-select size="small" v-model="prescription[1].Sphere" placeholder="None">
                      <el-option
                        v-for="item in prescription2.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-select size="small" v-model="prescription[2].Sphere" placeholder="None">
                      <el-option
                        v-for="item in prescription6.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>

                    <el-select
                      size="small"
                      v-model="prescription[3].Sphere"
                      placeholder="None"
                      v-if="prescription1Tab!=4"
                    >
                      <el-option
                        v-for="item in prescription7.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="item2">
                    <span>
                      Cylinder
                      <span style="color:#999999">(CYL)</span>
                    </span>
                    <el-select size="small" v-model="prescription[0].Cylinder" placeholder="None">
                      <el-option
                        v-for="item in prescription3.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-select size="small" v-model="prescription[1].Cylinder" placeholder="None">
                      <el-option
                        v-for="item in prescription3.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-select size="small" v-model="prescription[2].Cylinder" placeholder="None">
                      <el-option
                        v-for="item in prescription6.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="item2">
                    <span>
                      Axis
                      <span style="color:#999999">(AXI)</span>
                    </span>

                    <el-select disabled size="small" v-model="disabled1" placeholder="None">
                      <el-option></el-option>
                    </el-select>
                    <el-select disabled size="small" v-model="disabled2" placeholder="None">
                      <el-option></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="item2" v-if="prescription1Tab!=4">
                    <span>
                      Add
                      <span style="color:#999999">(Near addition)</span>
                    </span>
                    <el-select size="small" v-model="prescription[0].Add" placeholder="None">
                      <el-option
                        v-for="item in prescription5.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-select size="small" v-model="prescription[1].Add" placeholder="None">
                      <el-option
                        v-for="item in prescription5.valueList[0].stringList"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row class="input_c">
                  <el-col :span="19">
                    <el-input
                      type="textarea"
                      :rows="8"
                      :placeholder="$t('m.productDetail.placeholder1')"
                      v-model="comment"
                    ></el-input>
                  </el-col>
                </el-row>
              </div>
              <div v-if="currentTab==2" class="tabs_2">222</div>
            </div>
          </div>
        </div>
        <div class="right">
          <el-row class="name">
            <span>{{product.productName}}</span>
            <span>{{product.descript}}</span>
          </el-row>
          <el-row class="color">
            <span>{{$t('m.productDetail.right2')}}</span>
            <el-row class="color_item">
              <el-tooltip
                v-for="(item,index) in color_list"
                :key="index"
                :content="item[1]"
                placement="top"
              >
                <span
                  :class="{colorActive:currentColor==index}"
                  :style="{backgroundColor:item[0]}"
                  @click="colorChange(index)"
                ></span>
              </el-tooltip>
            </el-row>
          </el-row>
          <el-row class="size">
            <span>{{$t('m.productDetail.right3')}}</span>
            <el-row class="size_item">
              <span
                :class="{sizeActive:currentSize==index}"
                v-for="(item,index) in size_list"
                :key="index"
                @click="sizeChange(index)"
              >{{item}}</span>
              <el-tooltip placement="right">
                <div slot="content">
                  <!-- 多行信息
                  <br>第二行信息
                  <br>第二行信息
                  <br>第二行信息
                  <br>第二行信息 -->
                </div>
                <p>{{$t('m.productDetail.right4')}}</p>
              </el-tooltip>
            </el-row>
          </el-row>
          <el-row class="price">
            <span>{{$t('m.productDetail.right5')}}</span>
            <el-row class="price_item" v-if="productDetail.preferentialPrice">
              <span>${{productDetail.preferentialPrice}}</span>
              <span>${{productDetail.price}}</span>
            </el-row>
            <el-row class="price_item" v-else>
              <span>${{productDetail.price}}</span>
            </el-row>

            <div class="like" v-if="!isLike" @click="AddCollection(productDetail.productId)">
              <img src="../../../assets/product-detail/like1.png" alt>
              <span>{{$t('m.productDetail.right6')}}</span>
            </div>
            <div class="like" v-else @click="AddCollection(productDetail.productId)">
              <img src="../../../assets/product-detail/like2.png" alt>
              <span>{{$t('m.productDetail.right6')}}</span>
            </div>
          </el-row>
          <el-row class="btn">
            <span @click="gotoPay()">{{$t('m.productDetail.right7')}}</span>
            <span @click="addCart(productDetail)">{{$t('m.productDetail.right8')}}</span>
          </el-row>
          <el-row class="Rate">
            <span>{{$t('m.productDetail.right9')}}</span>
            <el-row class="Rate_item">
              <span>10</span>
              <span>{{$t('m.productDetail.right10')}}</span>
              <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
            </el-row>
          </el-row>
          <el-row class="detail">
            <el-row class="tabs">
              <span :class="{active:currentTabs2==1}" @click="detailTabs(1)">{{$t('m.productDetail.right11')}}</span>
              <span
                :class="{active:currentTabs2==2}"
                @click="detailTabs(2)"
              >{{$t('m.productDetail.right12')}} ({{commentList.total}})</span>
            </el-row>
            <el-row v-if="currentTabs2==1" class="content_2">
              <p>{{product.descript}}</p>
              <el-row class="params">
                <span v-for="(item,index) in baseProp" :key="index">{{item}}</span>
              </el-row>
            </el-row>
            <el-row v-if="currentTabs2==2" class="comment">
              <span class="title">
                {{$t('m.productDetail.right13')}}
                <span>></span>
              </span>
              <div class="comment_list" v-for="(item,index) in commentList.list" :key="index">
                <div class="list_1">
                  <!-- <span>Awesome & Inexpensive!</span> -->
                  <el-rate v-model="item.commentStar" disabled text-color="#ff9900"></el-rate>
                </div>
                <div class="list_2">
                  <span>{{item.firstName}}{{item.lastName}} In {{item.payTime}}</span>
                  <span>{{$t('m.productDetail.right14')}}: {{item.productSpecs.Color.split("|")[1]}}; {{$t('m.productDetail.right15')}}: L</span>
                </div>
                <div class="list_3">{{item.content}}</div>
                <div class="list_4">
                  <img v-for="(item2,index) in item.imgList" :key="index" :src="imgUrl+item2" alt>
                </div>
                <div class="list_5">
                  <span>{{$t('m.productDetail.right16')}}</span>
                  <span
                    v-if="!item.thumbUp"
                    class="zan"
                    @click="zanChange(item.commentId,item.productId)"
                  ></span>
                  <span v-else class="zan_n" @click="zanChange(item.commentId,item.productId)"></span>
                  <span>({{item.upvoteNum}})</span>
                </div>
              </div>
              <div class="list6">
                <span @click="allReviews">{{$t('m.productDetail.right17')}}</span>
                <span>{{$t('m.productDetail.right18')}}</span>
              </div>
            </el-row>
          </el-row>
          <!-- <el-row class="detail2">
          <p>Production requires additional time for: Single vision - 3 busiProduction requires additional time for: Single vision - 3 busi</p>
          <span>Please Note!</span>
        </el-row>
        <el-row class="detail3">
          <div>14 DAY FIT & STYLE GUARANTE</div>
          <div>
            <span>Enjoy two weeks to try out our frames. Send back for a free exc</span>
            <span>Learn More ></span>
          </div>
        </el-row>
        <el-row class="detail_img" :style="{backgroundImage:'url('+imgSrc+')'}">
          <el-row class="bg"></el-row>
          <el-row class="content">
            <span>TOP 5 SUNGLASSES BRANDS</span>
            <span>Sunglasses become the most important accessory Not only because they shield our eyes from harsh UV rays,but also because they complete every outfit.</span>
            <span>VIEW MORE</span>
          </el-row>
          </el-row>-->
          <P class="hot_title" v-if="HotProduct.length>0">{{$t('m.productDetail.HotProduct1')}}</P>
          <div
            class="img_item"
            v-for="(item,index) in HotProduct"
            :key="index"
            @click="gotoDetail(item.productId)"
          >
            <el-row class="bg_img" :style="{backgroundImage:'url('+imgUrl+item.productImage+')'}"></el-row>
            <el-row class="params">
              <span>{{item.productName}}</span>
              <span>${{item.price}}</span>
            </el-row>
          </div>
        </div>
      </section>
      <section class="product_list" v-if="StyleProduct.length>0">
        <p>{{$t('m.productDetail.HotProduct2')}}</p>
        <div class="content_2">
          <div class="img_list" v-for="(item,index) in StyleProduct" :key="index"   @click="gotoDetail(item.productId)">
            <div class="list_item" :style="{backgroundImage:'url('+imgUrl+item.productImage+')'}"></div>
            <span>{{item.productName}}</span>
            <span>${{item.price}}</span>
            <span>{{$t('m.productDetail.HotProduct3')}}</span>
          </div>
        </div>
      </section>
      <section class="section_2" id="side_img2">
        <div v-for="(item,index) in 3" :key="index">
          <span>WOMEN'SUNGLASSES</span>
          <span>OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimOPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minim</span>
        </div>
      </section>
    </div>
    <!-- 移动端页面 -->
    <div class="content" v-else>
      <div class="name">
        <span>{{product.productName}}</span>
        <span>{{product.descript}}</span>
      </div>
      <div class="color">
        <span class="title">{{$t('m.productDetail.iphone1')}}</span>
        <span
          :class="{colorActive:currentColor==index}"
          :style="{backgroundColor:item[0]}"
          @click="colorChange(index)"
          v-for="(item,index) in color_list"
          :key="index"
        ></span>
      </div>
      <div class="img_list">
        <div
          v-for="(item,index) in productDetail.productImages"
          :key="index"
          @click="getImgUrl(index)"
          :class="['img_item',{active:currentActive==index}]"
        >
          <img :src="imgUrl+item.imageUrl">
        </div>
        <!-- <div class="try">TRY ON</div> -->
      </div>
      <div class="banner">
        <img :src="imgUrl+currentImage">
      </div>
      <div class="size">
        <p>{{$t('m.productDetail.iphone2')}}</p>
        <span
          :class="{sizeActive:currentSize==index}"
          v-for="(item,index) in size_list"
          :key="index"
          @click="sizeChange(index)"
        >{{item}}</span>
        <div class="like" v-if="!isLike" @click="AddCollection(productDetail.productId)">
          <img src="../../../assets/product-detail/like1.png" alt>
        </div>
        <div class="like" v-else @click="AddCollection(productDetail.productId)">
          <img src="../../../assets/product-detail/like2.png" alt>
        </div>
      </div>
      <div class="price">
        <span>{{$t('m.productDetail.iphone3')}}</span>
        <div class="price_item" v-if="productDetail.preferentialPrice">
          <span>${{productDetail.preferentialPrice}}</span>
          <span>${{productDetail.price}}</span>
        </div>
        <div class="price_item" v-else>
          <span>${{productDetail.price}}</span>
        </div>
      </div>
      <div class="btn">
        <span @click="gotoPay()">{{$t('m.productDetail.iphone4')}}</span>
        <span @click="addCart(productDetail)">{{$t('m.productDetail.iphone5')}}</span>
      </div>
      <div class="zhedie">
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item v-if="isPrescript" class="item_1" title="PRESCRIPTION" name="1">
            <div class="params">
              <p>{{$t('m.productDetail.iphone6')}}</p>
              <div class="content_1">
                <div
                  :class="{active:prescription1Tab==index}"
                  v-for="(item,index) in prescription1.valueList"
                  :key="index"
                  @click="prescription1Change(index)"
                >
                  <span>{{item.pvDetailed}}</span>
                  <span>{{item.pvIntroduce}}</span>
                  <span>{{item.pvPrice?`+$${item.pvPrice}`:'Included'}}</span>
                </div>
              </div>
              <p>{{$t('m.productDetail.iphone7')}}</p>
              <div class="content_2">
                <div class="tabs">
                  <span :class="{tabsActive:currentTab==1}" @click="tabChange(1)">{{$t('m.productDetail.iphone8')}}</span>
                  <span
                    :class="{tabsActive:currentTab==2}"
                    @click="tabChange(2)"
                  >{{$t('m.productDetail.iphone8')}}</span>
                  <span
                    :class="{tabsActive:currentTab==3}"
                    @click="tabChange(3)"
                  >{{$t('m.productDetail.iphone9')}}</span>
                </div>
                <div v-if="currentTab==1||currentTab==3" class="tabs_1">
                  <p>{{$t('m.productDetail.iphone10')}}</p>
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="prescriptionName" :placeholder="$t('m.productDetail.placeholder2')"></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="tab_1_main" v-if="prescription1Tab!=3">
                    <el-col class="item1">
                      <span>
                        Right
                        <span style="color:#999999">(OD)</span>
                      </span>
                      <span>
                        Left
                        <span style="color:#999999">(OS)</span>
                      </span>
                      <span>PD</span>
                      <span v-if="prescription1Tab!=4">Near PD</span>
                    </el-col>
                    <el-col class="item2">
                      <span>
                        Sphere
                        <span style="color:#999999">(SPH)</span>
                      </span>
                      <el-select size="mini" v-model="prescription[0].Sphere" placeholder="None">
                        <el-option
                          v-for="item in prescription2.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                      <el-select size="mini" v-model="prescription[1].Sphere" placeholder="None">
                        <el-option
                          v-for="item in prescription2.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                      <el-select size="mini" v-model="prescription[2].Sphere" placeholder="None">
                        <el-option
                          v-for="item in prescription6.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>

                      <el-select
                        size="mini"
                        v-model="prescription[3].Sphere"
                        placeholder="None"
                        v-if="prescription1Tab!=4"
                      >
                        <el-option
                          v-for="item in prescription7.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col class="item2">
                      <span>
                        Cylinder
                        <span style="color:#999999">(CYL)</span>
                      </span>
                      <el-select size="mini" v-model="prescription[0].Cylinder" placeholder="None">
                        <el-option
                          v-for="item in prescription3.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                      <el-select size="mini" v-model="prescription[1].Cylinder" placeholder="None">
                        <el-option
                          v-for="item in prescription3.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                      <el-select size="mini" v-model="prescription[2].Cylinder" placeholder="None">
                        <el-option
                          v-for="item in prescription6.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col class="item2">
                      <span>
                        Axis
                        <span style="color:#999999">(AXI)</span>
                      </span>

                      <el-select disabled size="mini" v-model="disabled1" placeholder="None">
                        <el-option></el-option>
                      </el-select>
                      <el-select disabled size="mini" v-model="disabled2" placeholder="None">
                        <el-option></el-option>
                      </el-select>
                    </el-col>
                    <el-col class="item2" v-if="prescription1Tab!=4">
                      <span>
                        Add
                        <span style="color:#999999">(Near addition)</span>
                      </span>
                      <el-select size="mini" v-model="prescription[0].Add" placeholder="None">
                        <el-option
                          v-for="item in prescription5.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                      <el-select size="mini" v-model="prescription[1].Add" placeholder="None">
                        <el-option
                          v-for="item in prescription5.valueList[0].stringList"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row class="input_c">
                    <el-col :span="19">
                      <el-input
                        type="textarea"
                        :rows="4"
                        :placeholder="$t('m.productDetail.placeholder1')"
                        v-model="comment"
                      ></el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-if="currentTab==2" class="tabs_2">222</div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="DESCRIPTION" name="2" class="item_2">
            <p>{{product.descript}}</p>
          </el-collapse-item>
          <el-collapse-item title="DEtails" name="3" class="item_3">
            <div v-for="(item,index) in baseProp" :key="index">{{item}}</div>
          </el-collapse-item>
          <el-collapse-item :title="'Reviews ('+commentList.total+')'" name="4" class="item_4">
            <div class="comment">
              <span class="title">
               {{$t('m.productDetail.iphone11')}}
                <span>></span>
              </span>
              <div class="comment_list" v-for="(item,index) in commentList.list" :key="index">
                <div class="list_1">
                  <!-- <span>Awesome & Inexpensive!</span> -->
                  <el-rate v-model="item.commentStar" disabled text-color="#ff9900"></el-rate>
                </div>
                <div class="list_2">
                  <span>{{item.firstName}}{{item.lastName}} In {{item.payTime}}</span>
                  <span>{{$t('m.productDetail.iphone12')}}: {{item.productSpecs.Color.split("|")[1]}}; {{$t('m.productDetail.iphone13')}}: L</span>
                </div>
                <div class="list_3">{{item.content}}</div>
                <div class="list_4">
                  <img v-for="(item2,index) in item.imgList" :key="index" :src="imgUrl+item2" alt>
                </div>
                <div class="list_5">
                  <span>{{$t('m.productDetail.iphone14')}}</span>
                  <span
                    v-if="!item.thumbUp"
                    class="zan"
                    @click="zanChange(item.commentId,item.productId)"
                  ></span>
                  <span v-else class="zan_n" @click="zanChange(item.commentId,item.productId)"></span>
                  <span>({{item.upvoteNum}})</span>
                </div>
              </div>
              <div class="list6">
                <span @click="allReviews">{{$t('m.productDetail.iphone15')}}</span>
                <span>{{$t('m.productDetail.iphone16')}}</span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="banner_2" v-if="StyleProduct.length>0">
        <p>{{$t('m.productDetail.iphone17')}}</p>
        <el-carousel v-if="widthH<=1024" :interval="5000" height="3.5rem" arrow="always">
          <el-carousel-item v-for="(item,index) in StyleProduct" :key="index" class="banner_item" @click="gotoDetail(item.productId)">
            <img style="height:80%;width:80%" :src="imgUrl+item.productImage">
            <span>{{item.productName}}</span>
            <span>${{item.price}}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="section_2" v-if="widthH<=1024">
      <div v-for="(item,index) in 3" :key="index">
        <span>WOMEN'SUNGLASSES</span>
        <span>OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimOPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minimJIM OPTICAL has hundreds of men's eyeglasses ranging from minim</span>
      </div>
    </div>
  </div>
</template>
<script>
import History from "@/components/common/History.vue";
import {
  getProductDetail,
  getPrescriptionKVList,
  addPrescriptionByUser,
  getPrescriptionUserList
} from "@/Ajax/modules/productDetail";
import { AddCollection } from "@/Ajax/modules/myWish";
import { getCommentList, giveALike } from "@/Ajax/modules/addComment";
import { addShopCart } from "@/Ajax/modules/cart";
import { mapState } from "vuex";
import { join } from "path";
import { rejects } from "assert";
import { resolve } from "url";
export default {
  name: "productDetail",
  components: { History },
  data() {
    return {
      history: [
        { name: "Home", url: "/index/home" },
        { name: "MEN", url: "/index/home" },
        { name: "MENS GLASESSES", url: "/index/home" }
      ], //传递给历史导航组件的参数
      side_img3: [
        require("@/assets/product-detail/tupian6.png"),
        require("@/assets/product-detail/tupian7.png"),
        require("@/assets/product-detail/tupian8.png")
      ],
      color_list: [],
      currentImage: "",
      size_list: [],
      currentColor: 0, //当前选中的颜色的下标
      currentSize: 0, //当前选中尺寸的下标
      currentActive: 0, //当前图片下标
      h: 400, //默认滑动距离
      value5: 5, //评分
      isZhan: false,
      sideFixed: false, //侧栏是否固定
      currentTab: 1, //属性页默认显示
      currentTabs2: 1, //详情页默认显示
      value: "",
      productDetail: [], //当前展示的产品规格的详情
      productList: [], //产品规格集合
      StyleProduct: [], //下边商品列表
      HotProduct: [], //左侧分类列表
      widthH: "",
      product: [],
      baseProp: [], //基本属性
      imgUrl: "", //图片域名
      isLike: 0, //是否收藏的标记  0未收藏 1收藏
      activeNames: "1", //折叠页面效果 手风琴string 不是array
      currentAttribute: {
        Color: "",
        Size: ""
      }, //当前选中用于匹配的属性
      prescription1Tab: 0, //处方头部选择项切换值 默认为0
      prescription1: {}, //处方头部选择项
      prescription2: {}, //Right_Left-Sphere
      prescription3: {}, //Right_Left-Cylinder
      prescription4: {}, //Right_Left-Axis
      prescription5: {}, //Right_Left-Add
      prescription6: {}, //Right_Left-PD
      prescription7: {}, //Near-PD
      disabled1: "",
      disabled2: "",
      isPrescript: 0,
      prescription: [
        {
          Sphere: "",
          Cylinder: "",
          Add: ""
        },
        {
          Sphere: "",
          Cylinder: "",
          Add: ""
        },
        {
          Sphere: "",
          Cylinder: ""
        },
        {
          Sphere: ""
        }
      ], //用户选中处方的参数
      prescriptionName: "", //处方名称
      comment: "", //附加信息
      userPrescription: {}, //用户新添加 的处方信息
      commentList: {}
    };
  },
  created() {
    this.widthH = this.$root.widthH;
    this.imgUrl = this.$root.imgUrl;
    let Pid = this.$route.params.id;
    this.getProductDetail(Pid);
    this.getPrescriptionKVList();
    this.getCommentList(5, Pid, 1, 3, this.userId);
  },
  mounted() {
    //添加滚动事件
    if (this.widthH > 1024)
      window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    //离开页面销毁
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    //获取产品详情
    getProductDetail(id) {
      getProductDetail(id, this.userId).then(res => {
        if (res.data.code == 0) {
          this.isPrescript = res.data.data.product.isPrescript;
          this.productList = res.data.data.product.specList;
          this.productDetail = res.data.data.product.specList[0];
          this.currentImage = this.productDetail.productImages[0].imageUrl;
          this.size_list = res.data.data.product.map.Size;
          this.isLike = res.data.data.product.isCollection;
          //拆分颜色与色值 从新组合
          let color_list = res.data.data.product.map.Color;
          let color_list2 = [];
          for (let item of color_list) {
            let a = item.split("|");
            color_list2.push(a);
          }
          this.color_list = color_list2;
          console.log(color_list2);
          // 下边分类商品列表
          this.StyleProduct = res.data.data.StyleProduct;
          this.HotProduct = res.data.data.HotProduct;
          this.product = res.data.data.product;
          //基础属性 拆分
          let baseProp = res.data.data.product.baseProp;
          console.log(baseProp);
          let baseProp2 = eval("(" + baseProp + ")");
          console.log(baseProp2);
          let baseProp3 = [];
          for (let item in baseProp2) {
            let o = {};
            o[item] = baseProp2[item];
            baseProp3.push(o);
          }
          console.log(baseProp3);
          let baseProp4 = [];
          for (let item of baseProp3) {
            let a = JSON.stringify(item);
            let b = a.replace(/{/, "");
            let c = b.replace(/}/, "");
            let d = c.replace(/"/g, "");
            baseProp4.push(d);
          }
          this.baseProp = baseProp4;
          console.log(baseProp4);
        }
      });
    },
    gotoDetail(id) {
      this.getProductDetail(id);
      this.getPrescriptionKVList();
      this.getCommentList(5, id, 1, 3, this.userId);
    },
    //获取定义处方信息
    getPrescriptionKVList() {
      getPrescriptionKVList().then(res => {
        if (res.data.code == 0) {
          for (let item of res.data.data) {
            if (item.pkId == 1) {
              this.prescription1 = item;
            } else if (item.pkId == 2) {
              this.prescription2 = item;
            } else if (item.pkId == 3) {
              this.prescription3 = item;
            } else if (item.pkId == 4) {
              this.prescription4 = item;
            } else if (item.pkId == 5) {
              this.prescription5 = item;
            } else if (item.pkId == 6) {
              this.prescription6 = item;
            } else if (item.pkId == 7) {
              this.prescription7 = item;
            }
          }
        }
      });
    },
    //选择商品颜色
    colorChange(index) {
      this.currentColor = index;
      this.currentAttribute.Color = this.color_list[index].join("|");
      this.currentAttribute.Size = this.size_list[0];
      // 选中的属性拆分重组进行匹配
      let productSpecs = JSON.stringify(this.currentAttribute).replace(
        /"/g,
        "'"
      );
      console.log(productSpecs);
      if (this.currentAttribute.Color && this.currentAttribute.Size) {
        for (let item of this.productList) {
          console.log(item.productSpecs, productSpecs);
          if (item.productSpecs == productSpecs) {
            this.productDetail = item;
            console.log("匹配成功");
          }
        }
      }
    },
    //选择产品尺寸
    sizeChange(index) {
      this.currentSize = index;
      this.currentAttribute.Size = this.size_list[index];
      // 选中的属性拆分重组进行匹配
      let productSpecs = JSON.stringify(this.currentAttribute).replace(
        /"/g,
        "'"
      );
      console.log(productSpecs);
      if (this.currentAttribute.Color && this.currentAttribute.Size) {
        for (let item of this.productList) {
          console.log(item.productSpecs, productSpecs);
          if (item.productSpecs == productSpecs) {
            this.productDetail = item;
            console.log("匹配成功");
          }
        }
      }
    },
    //滚动监听
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#side_img").offsetTop;
      // console.log(scrollTop,offsetTop)
      // if (scrollTop > offsetTop) {
      //   this.sideFixed = true;
      // } else {
      //   this.sideFixed = false;
      // }
      if (scrollTop < 2300) {
        this.sideFixed = true;
      } else {
        this.sideFixed = false;
      }
      if (scrollTop > this.h) {
        this.h += 400;
        this.currentActive += 1;
      }
    },
    //平滑移动
    jump(index) {
      this.currentActive = index;
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll(".d_jump");
      let total = jump[index].offsetTop;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    },
    getImgUrl(e) {
      this.currentActive = e;
      this.currentImage = this.productDetail.productImages[e].imageUrl;
    },
    //属性页面切换
    tabChange(e) {
      if (e == 3) {
        //获取用户的处方信息
        getPrescriptionUserList(this.userId).then(res => {
          if (res.data.code == 0) {
            let userPrescription = res.data.data[res.data.data.length - 1];
            this.prescription[0].Sphere = userPrescription.rightSphere;
            this.prescription[0].Cylinder = userPrescription.rightCylinder;
            this.prescription[0].Add = userPrescription.rightAdd;
            this.prescription[1].Sphere = userPrescription.leftSphere;
            this.prescription[1].Cylinder = userPrescription.leftCylinder;
            this.prescription[1].Add = userPrescription.leftAdd;
            this.prescription[2].Sphere = userPrescription.rightPd;
            this.prescription[2].Cylinder = userPrescription.leftPd;
            this.prescription[3].Sphere = userPrescription.nearPd;
            this.prescriptionName = userPrescription.prescriptionName; //处方名称
            this.comment = userPrescription.comment; //附加信息
          }
        });
      }
      this.currentTab = e;
    },
    //详情页面切换
    detailTabs(e) {
      this.currentTabs2 = e;
    },
    //处方头部切换
    prescription1Change(index) {
      this.prescription1Tab = index;
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
          _this.getCommentList(5, productId, 1, 3, _this.userId);
        }
      });
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
    // 去评论页
    allReviews() {
      let parmas = {
        imgSrc: this.productDetail.productImages[0].imageUrl,
        productName: this.product.productName,
        productId: this.$route.query.id,
        productPrice: this.productDetail.preferentialPrice
          ? this.productDetail.preferentialPrice
          : this.productDetail.price
      };
      this.$router.push({
        path: "/commentList",
        query: {
          params: JSON.stringify(parmas)
        }
      });
    },
    //加入购物车
    addCart(productDetail) {
      console.log(this.prescription);
      if (!this.$store.state.userId) {
        this.judgeIslogn();
        return;
      }
      //处方镜与非处方镜加购物车
      if (this.isPrescript) {
        if (
          this.prescription[0].Sphere == "" ||
          this.prescription[0].Cylinder == "" ||
          this.prescription[0].Add == "" ||
          this.prescription[1].Sphere == "" ||
          this.prescription[1].Cylinder == "" ||
          this.prescription[1].Add == "" ||
          this.prescription[2].Sphere == "" ||
          this.prescription[2].Cylinder == "" ||
          this.prescription[3].Sphere == ""
        ) {
          this.$alert(this.$t('m.productDetail.tips1'), "Tips", {
            confirmButtonText: "confirm"
          });
          return;
        }
        //添加处方信息
        this.getaddPrescriptionByUser().then(data => {
          console.log(data);
          let _this = this;
          if (data.data.code == 0) {
            getPrescriptionUserList(_this.userId).then(res => {
              let userPrescription = res.data.data[res.data.data.length - 1];
              console.log(userPrescription);
              let params = {
                prescriptionId: userPrescription.prescriptionId,
                userId: _this.userId,
                productId: productDetail.productId,
                specId: productDetail.specId,
                productNum: 1
              };
              addShopCart(params).then(response => {
                if (response.data.code == 0) {
                  _this.$message({
                    message:this.$t('m.productDetail.tips2'),
                    type: "success"
                  });
                }
              });
            });
          }
        });
      } else {
        let _this = this;
        let params = {
          userId: _this.userId,
          productId: productDetail.productId,
          specId: productDetail.specId,
          productNum: 1
        };
        addShopCart(params).then(response => {
          if (response.data.code == 0) {
            _this.$message({
              message: this.$t('m.productDetail.tips2'),
              type: "success"
            });
          }
        });
      }
    },
    //下单页面
    gotoPay() {
      if (!this.$store.state.userId) {
        this.judgeIslogn();
        return;
      }
      //处方镜片与非处方镜片去下单页面  true为处方镜片
      if (this.isPrescript) {
        if (
          this.prescription[0].Sphere == "" ||
          this.prescription[0].Cylinder == "" ||
          this.prescription[0].Add == "" ||
          this.prescription[1].Sphere == "" ||
          this.prescription[1].Cylinder == "" ||
          this.prescription[1].Add == "" ||
          this.prescription[2].Sphere == "" ||
          this.prescription[2].Cylinder == "" ||
          this.prescription[3].Sphere == ""
        ) {
          this.$alert(this.$t('m.productDetail.tips1'), "Tips", {
            confirmButtonText: "confirm"
          });
          return;
        }
        //添加处方信息
        this.getaddPrescriptionByUser().then(res => {
          console.log(res);
          let _this = this;
          if (res.data.code == 0) {
            getPrescriptionUserList(_this.userId).then(res => {
              let userPrescription = res.data.data[res.data.data.length - 1];
              console.log(userPrescription);
              let params = {
                userId: _this.userId,
                productId: _this.productDetail.productId,
                specId: _this.productDetail.specId,
                productName: _this.product.productName,
                quantity: 1,
                prescriptionId: userPrescription.prescriptionId,
                stock: _this.productDetail.stock,
                productPrice: _this.productDetail.preferentialPrice
                  ? _this.productDetail.preferentialPrice
                  : _this.productDetail.price
              };
              localStorage.removeItem("paramsList"),
                localStorage.setItem("params", JSON.stringify(params));
              _this.$router.push({
                name: "/transportation",
                params: { params: JSON.stringify(params) }
              });
            });
          }
        });
      } else {
        let _this = this;
        let params = {
          userId: _this.userId,
          productId: _this.productDetail.productId,
          specId: _this.productDetail.specId,
          productName: _this.product.productName,
          quantity: 1,
          stock: _this.productDetail.stock,
          productPrice: _this.productDetail.preferentialPrice
            ? _this.productDetail.preferentialPrice
            : _this.productDetail.price
        };
        localStorage.removeItem("paramsList"),
          localStorage.setItem("params", JSON.stringify(params));
        _this.$router.push({
          name: "/transportation",
          params: { params: JSON.stringify(params) }
        });
      }
    },
    //添加用户处方信息
    getaddPrescriptionByUser() {
      return new Promise((resolve, reject) => {
        let parmas = {
          comment: this.comment,
          leftAdd: this.prescription[1].Add,
          leftAxis: "",
          leftCylinder: this.prescription[1].Cylinder,
          leftPd: this.prescription[2].Cylinder,
          leftSphere: this.prescription[1].Sphere,
          nearPd: this.prescription[3].Sphere,
          // prescriptionId: 0,
          prescriptionName: this.prescriptionName,
          rightAdd: this.prescription[0].Add,
          rightAxis: "",
          rightCylinder: this.prescription[0].Cylinder,
          rightPd: this.prescription[2].Sphere,
          rightSphere: this.prescription[0].Sphere,
          userId: this.userId
        };
        addPrescriptionByUser(parmas).then(res => {
          resolve(res);
        });
      });
    },
    //添加取消收藏
    AddCollection(id) {
      if (!this.$store.state.userId) {
        this.judgeIslogn();
        return;
      }
      let dataFailure = "";
      if (this.isLike == 0) {
        this.isLike = 1;
        dataFailure = 1;
      } else {
        this.isLike = 0;
        dataFailure = 0;
      }
      // if(this.isLike)
      let params = {
        userId: this.userId,
        productId: id,
        dataFailure: dataFailure //0取消收藏 1收藏
      };
      AddCollection(params).then(res => {
        // if (res.data.code == 0) {  
        this.$message({
          message: this.$t('m.productDetail.tips3'),
          type: "success"
        });
        // }
      });
    },
    // 判断是否登陆然后跳转登陆页的弹框
    judgeIslogn() {
      this.$confirm(this.$t('m.productDetail.tips4'), "Tips", {
        confirmButtonText: "confirm ",
        cancelButtonText: "cancel",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    currentClass() {
      if (this.widthH > 1024) {
        return "productDetail";
      } else {
        return "productDetail2";
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
.productDetail2 {
  width: 100%;
  .content {
    padding: 0.4rem 0.35rem;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      display: flex;
      flex-direction: column;
      span {
        font-family: "Regular";
        font-weight: bold;
        &:first-of-type {
          font-size: 0.32rem;
          color: #231815;
        }
        &:last-of-type {
          font-size: 0.14rem;
          color: #cccccc;
        }
      }
    }
    .color {
      width: 100%;
      margin-top: 0.2rem;
      padding-left: 1.5rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .title {
        font-size: 0.12rem;
        font-family: "Bold";
        color: #666666;
        margin-right: 0.5rem;
      }
      span {
        height: 0.35rem;
        width: 0.35rem;
        border-radius: 100%;
        box-sizing: border-box;
        padding: 0.1rem;
        cursor: pointer;
        &.colorActive {
          border: 2px solid red;
        }
        &:not(:first-of-type) {
          margin-left: 0.2rem;
        }
      }
    }
    .img_list {
      margin-top: 0.3rem;
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      div {
        width: 0.8rem;
        height: 0.6rem;
        font-size: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(204, 204, 204);
        margin-left: 0.1rem;
        &.active {
          background-color: #ffffff;
          border: 1px solid #999999;
        }
        // &:last-of-type {
        //   position: absolute;
        //   right: 0;
        //   width: 1rem;
        //   background-color: #e8e316;
        // }
        img {
          height: 80%;
          width: 80%;
        }
      }
    }
    .banner {
      width: 100%;
      height: 4rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .size {
      margin-top: 0.5rem;
      width: 100%;
      box-sizing: border-box;
      padding-left: 1.5rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      span {
        height: 0.35rem;
        width: 0.35rem;
        border-radius: 100%;
        color: #999999;
        border: 1px solid #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.sizeActive {
          border: 1px solid #231815;
          color: #231815;
        }
        &:not(:first-of-type) {
          margin-left: 0.2rem;
        }
      }
      p {
        height: 0.35rem;
        width: 0.9rem;
        line-height: 0.35rem;
        margin-left: 0.15rem;
        color: #004ea5;
        font-size: 0.16rem;
        font-weight: bold;
      }
      .like {
        margin-left: 2rem;
        height: 0.6rem;
        width: 0.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .price {
      margin-top: 0.3rem;
      width: 100%;
      box-sizing: border-box;
      padding-left: 1.5rem;
      display: flex;
      align-items: center;
      span {
        font-size: 0.24rem;
        font-family: "Bold";
        color: #666666;
      }
      .price_item {
        margin-left: 0.2rem;
        display: flex;
        align-items: center;
        span {
          font-size: 0.28rem;
          font-family: "Regular";
          font-weight: bold;
          color: rgba(32, 24, 21, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #231815;
          &:nth-of-type(2) {
            margin-left: 0.2rem;
            font-size: 0.18rem;
            color: red;
            text-decoration: line-through;
          }
        }
      }
    }
    .btn {
      width: 100%;
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        width: 6rem;
        height: 0.7rem;
        border-radius: 0.1rem;
        text-align: center;
        line-height: 0.7rem;
        font-size: 0.26rem;
        font-family: "regular";
        font-weight: bold;
        &:first-of-type {
          background-color: #231815;
          color: #ffffff;
        }
        &:nth-of-type(2) {
          margin-top: 0.2rem;
          color: #999999;
          border: 1px solid #999999;
        }
      }
    }
    .zhedie {
      width: 100%;
      .item_1 {
        display: flex;
        flex-direction: column;
        .params {
          margin-top: 0.8rem;
          background-color: #f5f5f5;
          padding: 0.1rem;
          box-sizing: border-box;
          width: 100%;
          .content_1 {
            margin-top: 0.45rem;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-content: space-between;
            cursor: pointer;
            div {
              margin-left: 0.2rem;
              margin-top: 0.2rem;
              height: 1.8rem;
              width: 1.8rem;
              background-color: #fff;
              display: flex;
              text-align: center;
              flex-direction: column;
              align-items: center;
              position: relative;
              &.active {
                border: 1px solid #231815;
              }
              span {
                padding: 0 0.1rem;
                &:first-of-type {
                  margin-top: 0.2rem;
                  font-family: "regular";
                  font-size: 0.14rem;
                  color: #231815;
                  font-weight: bold;
                }
                &:nth-of-type(2) {
                  margin-top: 0.14rem;
                  font-family: "regular";
                  font-size: 0.13rem;
                  color: #999999;
                  font-weight: bold;
                }
                &:last-of-type {
                  position: absolute;
                  bottom: 0.14rem;
                  // width: 1.2rem;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  font-size: 0.14rem;
                  font-family: "regular";
                  color: #231815;
                  font-weight: bold;
                  background-color: #ede945;
                }
              }
            }
          }
          .content_2 {
            margin-top: 0.25rem;
            width: 100%;
            .tabs {
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              span {
                width: 33%;
                height: 0.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: auto;
                position: relative;
                z-index: 9;
                border-radius: 2px;
                font-size: 0.14rem;
                color: #231815;
                font-weight: bold;
                background-color: #fff;
                cursor: pointer;
                &::after {
                  position: absolute;
                  content: "";
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  background: #231815;
                  z-index: -1;
                  transform: scaleX(0);
                  transition: all 0.2s linear;
                }
                &:not(:first-of-type) {
                  margin-left: 0.1rem;
                }
                &.tabsActive {
                  background-color: #fff;
                  color: #fff;
                  &::after {
                    transform: scaleX(1);
                  }
                }
              }
            }
            .tabs_1 {
              padding: 0.4rem 0;
              p {
                font-size: 0.14rem;
                color: #231815;
                font-family: "regular";
                font-weight: bold;
              }
              .tab_1_main {
                margin-top: 0.2rem;
                .item1 {
                  margin-top: 0.6rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  width: 0.7rem;
                  span {
                    width: 0.1rem;
                    font-size: 0.14rem;
                    margin-top: 0.3rem;
                    font-family: "regular";
                    &:last-of-type {
                      margin-top: 0.4rem;
                    }
                  }
                }
                .item2 {
                  margin-left: 0;
                  width: 1.33rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  .el-select {
                    height: 0.35rem;
                    margin-top: 0.45rem;
                  }
                  span {
                    height: 0.35rem;
                    line-height: 0.35rem;
                    font-size: 0.13rem;
                    font-family: "regular";
                  }
                }
              }
              .input_c {
                margin-top: 0.4rem;
              }
            }
          }
          p {
            font-size: 0.18rem;
            color: #231815;
            font-family: "Reqular";
            font-weight: bold;
            &:nth-of-type(2) {
              margin-top: 0.45rem;
            }
          }
        }
      }
      .item_4 {
        display: flex;
        flex-direction: column;
        .comment {
          .title {
            margin-top: 0.39rem;
            font-size: 0.16rem;
            color: #424242;
            font-family: "regular";
            font-weight: bold;
          }
          .comment_list {
            margin-top: 0.2rem;
            display: flex;
            flex-direction: column;
            border-top: 1px dashed #dddddd;
            .list_1 {
              margin-top: 0.29rem;
              display: flex;
              span {
                font-size: 0.14rem;
                font-family: "bold";
                margin-right: 1.2rem;
                color: #424242;
              }
            }
            .list_2 {
              margin-top: 0.15rem;
              display: flex;
              flex-direction: column;
              font-size: 0.12rem;
              color: #cccccc;
            }
            .list_3 {
              font-family: "Regular";
              margin-top: 0.18rem;
              font-size: 0.14rem;
              color: #666666;
            }
            .list_4 {
              margin-top: 0.1rem;
              display: flex;
              flex-wrap: wrap;
              img {
                margin-left: 0.15rem;
                width: 0.8rem;
                height: 0.8rem;
              }
            }
            .list_5 {
              margin-top: 0.1rem;
              font-family: "Regular";
              font-size: 0.13rem;
              color: #427cb7;
              display: flex;
              align-items: center;
              span {
                height: 0.2rem;
                line-height: 0.3rem;
              }
              .zan {
                height: 0.18rem;
                width: 0.18rem;
                margin: 0 0.05rem;
                background-image: url("../../../assets/product-detail/dianzan.png");
                background-size: 0.18rem 0.18rem;
                cursor: pointer;
              }
              .zan_n {
                height: 0.18rem;
                width: 0.18rem;
                margin: 0 0.05px;
                background-image: url("../../../assets/product-detail/dianzan-shixin.png");
                background-size: 0.18rem 0.18rem;
                cursor: pointer;
              }
            }
          }
          .list6 {
            margin-top: 0.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              font-size: 0.22rem;
              font-family: "regular";
              font-weight: bold;
              cursor: pointer;
              &:first-of-type {
                width: 80%;
                border: 1px solid #231815;
                text-align: center;
                height: 0.7rem;
                line-height: 0.7rem;
              }
              &:last-of-type {
                margin-top: 0.2rem;
                color: #427cb7;
              }
            }
          }
        }
      }
    }
    .banner_2 {
      margin-top: 0.6rem;
      width: 100%;
      .banner_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 0.22rem;
          font-weight: bold;
          font-family: "regular";
          color: #231815;
        }
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 0.26rem;
        font-weight: bold;
        font-family: "regular";
        color: #231815;
      }
    }
  }
  .section_2 {
    margin-top: 1rem;
    width: 100%;
    box-sizing: border-box;
    background-color: rgb(244, 244, 244);
    padding: 0.3rem;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      span {
        font-family: "regular";
        &:first-of-type {
          font-size: 0.28rem;
          color: #231815;
        }
        &:last-of-type {
          font-size: 0.14rem;
          color: #666666;
        }
      }
      &:not(:first-of-type) {
        margin-top: 0.46rem;
      }
    }
  }
}
.productDetail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .main {
      margin-top: 50px;
      width: 13rem;
      display: flex;
      .left {
        display: flex;
        flex-direction: column;
        .img_list {
          width: 1rem;
          height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          background-color: #f5f5f5;
          border: 1px solid #f5f5f5;
          margin-top: 10px;
          cursor: pointer;
          img {
            width: 80%;
            height: 80%;
          }
          &.active {
            background-color: #fff;
            border: 1px solid #999999;
          }
        }
        .try {
          margin-top: 10px;
          width: 1rem;
          height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          background-color: #ede945;
          font-size: 14px;
          font-family: "Regular";
          font-weight: bold;
        }
        &.isFixed {
          position: fixed;
          top: 1.8rem;
        }
      }
      .middle {
        // width: 1000px;
        margin-left: 0.2rem;
        display: flex;
        flex-direction: column;
        .img_list1 {
          width: 6rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          margin-top: 10px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        &.isFixed {
          margin-left: 1.2rem;
        }
        .img_list2 {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          img {
            margin-top: 10px;
            width: 3.95rem;
            height: 4rem;
            &:nth-of-type(odd) {
              margin-right: 10px;
            }
          }
        }
        .params {
          margin-top: 80px;
          background-color: #f5f5f5;
          padding: 0.3rem;
          box-sizing: border-box;
          width: 100%;
          .content_1 {
            margin-top: 45px;
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            cursor: pointer;
            div {
              height: 1.28rem;
              width: 1rem;
              background-color: #fff;
              display: flex;
              text-align: center;
              flex-direction: column;
              align-items: center;
              position: relative;
              &.active {
                border: 2px solid #231815;
              }
              &:not(:first-of-type) {
                margin-left: 8px;
              }
              span {
                padding: 0 10px;
                &:first-of-type {
                  margin-top: 20px;
                  font-family: "regular";
                  font-size: 14px;
                  color: #231815;
                  font-weight: bold;
                }
                &:nth-of-type(2) {
                  margin-top: 14px;
                  font-family: "regular";
                  font-size: 13px;
                  color: #999999;
                  font-weight: bold;
                }
                &:last-of-type {
                  position: absolute;
                  bottom: 14px;
                  width: 0.8rem;
                  height: 0.3rem;
                  line-height: 0.3rem;
                  font-size: 14px;
                  font-family: "regular";
                  color: #231815;
                  font-weight: bold;
                  background-color: #ede945;
                }
              }
            }
          }
          .content_2 {
            margin-top: 45px;
            width: 100%;
            .tabs {
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                position: relative;
                z-index: 9;
                border-radius: 2px;
                font-size: 14px;
                color: #231815;
                padding: 35px 45px;
                font-weight: bold;
                background-color: #fff;
                cursor: pointer;
                &::after {
                  position: absolute;
                  content: "";
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  background: #231815;
                  z-index: -1;
                  transform: scaleX(0);
                  transition: all 0.2s linear;
                }
                &:not(:first-of-type) {
                  margin-left: 10px;
                }
                &.tabsActive {
                  background-color: #fff;
                  color: #fff;
                  &::after {
                    transform: scaleX(1);
                  }
                }
              }
            }
            .tabs_1 {
              padding: 40px 0;
              p {
                font-size: 14px;
                color: #231815;
                font-family: "regular";
                font-weight: bold;
              }
              .tab_1_main {
                margin-top: 20px;
                .item1 {
                  margin-top: 35px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  width: 100px;
                  span {
                    font-size: 14px;
                    height: 35px;
                    line-height: 35px;
                    margin-top: 12px;
                    font-family: "regular";
                  }
                }
                .item2 {
                  margin-left: 20px;
                  width: 133px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  .el-select {
                    height: 35px;
                    margin-top: 12px;
                  }
                  span {
                    height: 35px;
                    line-height: 35px;
                    font-size: 13px;
                    font-family: "regular";
                  }
                }
              }
              .input_c {
                margin-top: 40px;
              }
            }
          }
          p {
            font-size: 18px;
            color: #231815;
            font-family: "Reqular";
            font-weight: bold;
            &:nth-of-type(2) {
              margin-top: 45px;
            }
          }
        }
      }
      .right {
        width: 4rem;
        margin-left: 0.48rem;
        .name {
          display: flex;
          flex-direction: column;
          span {
            font-family: "Regular";
            font-weight: bold;
            &:first-of-type {
              font-size: 32px;
              color: #231815;
            }
            &:last-of-type {
              font-size: 14px;
              color: #cccccc;
            }
          }
        }
        .color {
          margin-top: 0.2rem;
          span {
            font-size: 12px;
            font-family: "Bold";
            color: #666666;
          }
          .color_item {
            display: flex;
            align-items: center;
            margin-top: 0.15rem;
            span {
              height: 0.25rem;
              width: 0.25rem;
              border-radius: 100%;
              box-sizing: border-box;
              padding: 0.1rem;
              cursor: pointer;
              &.colorActive {
                border: 2px solid red;
              }
              &:not(:first-of-type) {
                margin-left: 0.2rem;
              }
            }
          }
        }
        .size {
          width: 5.8rem;
          margin-top: 20px;
          span {
            font-size: 12px;
            font-family: "Bold";
            color: #666666;
          }
          .size_item {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 10px;
            span {
              height: 0.25rem;
              width: 0.25rem;
              border-radius: 100%;
              color: #999999;
              border: 1px solid #999999;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              &.sizeActive {
                border: 1px solid #231815;
                color: #231815;
              }
              &:not(:first-of-type) {
                margin-left: 0.2rem;
              }
            }
            p {
              height: 0.35rem;
              width: 0.9rem;
              line-height: 0.35rem;
              margin-left: 0.15rem;
              color: #004ea5;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
        .price {
          margin-top: 20px;
          position: relative;
          span {
            font-size: 12px;
            font-family: "Bold";
            color: #666666;
          }
          .price_item {
            display: flex;
            align-items: center;
            margin-top: 10px;
            span {
              font-size: 24px;
              font-family: "Regular";
              font-weight: bold;
              color: rgba(32, 24, 21, 0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #231815;
              &:nth-of-type(2) {
                margin-left: 20px;
                font-size: 18px;
                color: red;
                text-decoration: line-through;
              }
            }
          }
          .like {
            position: absolute;
            right: 1rem;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            img {
              height: 0.25rem;
              width: 0.25rem;
            }
          }
        }
        .btn {
          font-size: 16px;
          margin-top: 15px;
          display: flex;
          span {
            display: block;
            height: 0.45rem;
            width: 2.4rem;
            line-height: 0.45rem;
            text-align: center;
            border-radius: 2px;
            color: #918b8a;
            font-family: "Regular";
            font-weight: bold;
            border: 1px solid #918b8a;
            cursor: pointer;
            &:last-of-type {
              margin-left: 0.2rem;
            }
            &:hover {
              color: #fff;
              background-color: #231815;
            }
          }
        }
        .Rate {
          margin-top: 30px;
          span {
            font-size: 12px;
            font-family: "Bold";
            color: #666666;
          }
          .Rate_item {
            margin-top: 10px;
            display: flex;
            align-items: center;
            span {
              &:first-of-type {
                font-family: "Bold";
                font-size: 32px;
                color: #231815;
              }
              &:last-of-type {
                margin-left: 10px;
                font-size: 12px;
                color: #999999;
                font-family: "Regular";
                font-weight: bold;
                margin-right: 25px;
              }
            }
          }
        }
        .detail {
          margin-top: 10px;
          width: 100%;
          padding: 0 30px 30px 30px;
          display: flex;
          flex-direction: column;
          border: 1px solid #dddddd;
          .tabs {
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              height: 100%;
              line-height: 0.6rem;
              font-size: 18px;
              color: #666666;
              font-weight: bold;
              font-family: "Regular";
              position: relative;
              cursor: pointer;
              &::after {
                content: "";
                height: 4px;
                width: 100%;
                background-color: #231815;
                position: absolute;
                top: -2px;
                left: 0;
                transition: all 0.2s linear;
                transform: scaleX(0);
              }
              &.active {
                color: #231815;
                &::after {
                  transform: scaleX(1);
                }
              }
            }
          }
          .content_2 {
            font-size: 16px;
            font-family: "Regular";
            color: #666666;
            .params {
              display: flex;
              flex-direction: column;
              margin-top: 40px;
              span {
                margin-top: 5px;
              }
            }
          }
          .comment {
            .title {
              margin-top: 39px;
              font-size: 16px;
              color: #424242;
              font-family: "regular";
              font-weight: bold;
            }
            .comment_list {
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              border-top: 1px dashed #dddddd;
              .list_1 {
                margin-top: 29px;
                display: flex;
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
            .list6 {
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              span {
                font-size: 14px;
                font-family: "regular";
                font-weight: bold;
                cursor: pointer;
                &:first-of-type {
                  width: 80%;
                  border: 1px solid #231815;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                }
                &:last-of-type {
                  margin-top: 20px;
                  color: #427cb7;
                }
              }
            }
          }
        }
        .detail2 {
          margin-top: 30px;
          width: 100%;
          padding: 30px;
          display: flex;
          flex-direction: column;
          border: 1px solid #dddddd;
          position: relative;
          p {
            font-size: 16px;
            font-family: "Regular";
            color: #666666;
          }
          span {
            font-family: "Regular";
            font-weight: bold;
            font-size: 18px;
            width: 130px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: absolute;
            top: -15px;
            background-color: #fff;
          }
        }
        .detail3 {
          margin-top: 30px;
          width: 100%;
          padding: 30px;
          display: flex;
          border: 2px solid #f4d929;
          div {
            &:first-of-type {
              font-size: 16px;
              font-family: "Regular";
              width: 100px;
            }
            &:last-of-type {
              display: flex;
              flex-direction: column;
              margin-left: 20px;
              font-size: 16px;
              font-family: "Regular";
              color: #666666;
              span {
                &:last-of-type {
                  cursor: pointer;
                  color: #231815;
                }
              }
            }
          }
        }
        .detail_img {
          margin-top: 20px;
          width: 100%;
          height: 400px;
          background-position: right;
          background-size: 50% 100%;
          background-repeat: no-repeat;
          position: relative;
          .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(237, 233, 69, 0.5);
            // z-index: 999;
          }
          .content {
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            color: #fff;
            font-family: "reg";
            span {
              margin-left: 30px;
              background-color: #231815;
              &:first-of-type {
                font-size: 24px;
                width: 253px;
              }
              &:nth-of-type(2) {
                margin-top: 15px;
                width: 204px;
                font-size: 14px;
              }
              &:last-of-type {
                margin-top: 15px;
                width: 115px;
                height: 25px;
                text-align: center;
                line-height: 35px;
                font-size: 14px;
                cursor: pointer;
              }
            }
          }
        }
        .hot_title {
          width: 100%;
          text-align: center;
          font-size: 26px;
          font-family: "regular";
          font-weight: bold;
          margin-top: 30px;
        }
        .img_item {
          margin-top: 20px;
          cursor: pointer;
          width: 100%;
          .bg_img {
            width: 100%;
            height: 340px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .params {
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
              &:first-of-type {
                margin-top: 20px;
                font-size: 20px;
                font-family: "Bold";
              }
              &:last-of-type {
                margin-top: 18px;
                font-size: 18px;
                font-family: "Regular";
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .product_list {
      margin-top: 20px;
      width: 1500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        font-size: 26px;
        font-family: "Regular";
        color: #231815;
        font-weight: bold;
      }
      .content_2 {
        width: 100%;
        display: flex;
        justify-content: center;
        .img_list {
          margin-left: 24px;
          margin-top: 45px;
          width: 468px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .list_item {
            width: 100%;
            height: 351px;
            background-color: rgb(244, 244, 244);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          span {
            &:first-of-type {
              margin-top: 20px;
              font-size: 20px;
              font-family: "Bold";
            }
            &:nth-of-type(2) {
              margin-top: 18px;
              font-size: 18px;
              font-family: "Regular";
              font-family: "Bold";
            }
            &:last-of-type {
              cursor: pointer;
              margin-top: 20px;
              border: 1px solid #ede945;
              width: 120px;
              height: 45px;
              line-height: 45px;
              font-size: 14px;
              font-family: "Regular";
              text-align: center;
              font-family: "Bold";
            }
          }
        }
      }
    }
    .section_2 {
      margin-top: 100px;
      width: 100%;
      box-sizing: border-box;
      background-color: rgb(244, 244, 244);
      padding: 60px 290px 70px 150px;
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        span {
          font-family: "regular";
          &:first-of-type {
            font-size: 28px;
            color: #231815;
          }
          &:last-of-type {
            font-size: 14px;
            color: #666666;
          }
        }
        &:not(:first-of-type) {
          margin-top: 46px;
        }
      }
    }
  }
}
</style>
