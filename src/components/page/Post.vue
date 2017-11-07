<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="点餐" name="first">
            <el-table :highlight-current-row="true" :data="tableData" border style="width: 100%">
              <el-table-column label="商品名称" prop="goodsName"></el-table-column>
              <el-table-column label="数量" prop="count"></el-table-column>
              <el-table-column label="金额" prop="price"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="deleteGoods(scope.row)">删除</el-button>
                  <el-button size="mini" type="text" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totaDiv">
              <span>数量:{{totaCount}}</span>
              <span>金额:{{totaMoney}}</span>
            </div>
            <div class="operration">
              <el-button type="warning" :disabled="active">挂单</el-button>
              <el-button type="danger" @click="deleteAllGoods" :disabled="active">删除</el-button>
              <el-button type="success" :disabled="active">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">

          </el-tab-pane>
          <el-tab-pane label="外卖" name="last">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="commodity">
          <h3>常用商品</h3>
          <ul>
            <li v-for="(item,index) in oftenGoods" @click="addOrderList(item)">
              <span v-text="item.goodsName"></span>
              <span class="price" v-text="'￥'+item.price+'元'"></span>
            </li>
          </ul>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="(item,index) in typeGodds" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName" v-text="item.goodsName"></span>
                    <span class="foodPrice" v-text="'￥'+item.price+'元'"></span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="零食">
              <div>
                <ul class="cookList">
                  <li v-for="(item,index) in typeGodds1" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName" v-text="item.goodsName"></span>
                    <span class="foodPrice" v-text="'￥'+item.price+'元'"></span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="(item,index) in typeGodds2" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName" v-text="item.goodsName"></span>
                    <span class="foodPrice" v-text="'￥'+item.price+'元'"></span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="(item,index) in typeGodds3" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName" v-text="item.goodsName"></span>
                    <span class="foodPrice" v-text="'￥'+item.price+'元'"></span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Post',
    data() {
      return {
        activeName: 'first',
        active:true,
        tableData: [],
        oftenGoods: [],
        typeGodds: [],
        typeGodds1: [],
        typeGodds2: [],
        typeGodds3: [],
        totaMoney: 0,
        totaCount: 0
      }
    },
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php').then(reponse => {
        if (reponse.status === 200) {
          this.oftenGoods = reponse.data;
        }
      }).catch(error => {
        console.log('服务器错误');
      });
      axios.get('http://jspang.com/DemoApi/typeGoods.php').then(resp => {
        if (resp.status === 200) {
          this.typeGodds = resp.data[0];
          this.typeGodds1 = resp.data[1];
          this.typeGodds2 = resp.data[2];
          this.typeGodds3 = resp.data[3];
        }
      }).catch(err => {
        console.log('服务器错误');
      })
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addOrderList(goods) {
        //商品是否存在于订单列表中
        let isHave = false;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId == goods.goodsId) {
            isHave = true
          }
        }
        //根据判断的值编写业务逻辑
        if (isHave) { //存在订单列表中
          //改变列表中商品的数量
          let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
          arr[0].count++
        } else { //不存在订单列表中
          let newGoods = {
            goodsId: goods.goodsId,
            goodsName: goods.goodsName,
            price: goods.price,
            count: 1
          };
          this.tableData.push(newGoods);
        }
        this.getAllMoney();
      },
      deleteGoods(goods) {
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
        this.getAllMoney();
      },
      deleteAllGoods(){
        this.totaCount = 0;
        this.totaMoney = 0;
        this.tableData = [];
        this.active = true;
      },
      getAllMoney() { //汇总数量和金额
        this.totaCount = 0;
        this.totaMoney = 0;
        if (this.tableData[0]) {
          this.tableData.forEach(element => {
            this.totaCount += element.count;
            this.totaMoney += (element.price * element.count)
          });
          this.active = false;
        }else{
          this.active = true
        }
      }
    },
    mounted() {
      var orderHeight = document.body.clientHeight;
      document.getElementById('order-list').style.height = orderHeight + 'px';
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos-order {
    padding-left: 10px;
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
    height: 100%;
  }

  .operration {
    margin-top: 10px;
  }

  .commodity h3 {
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    text-align: left;
  }

  .commodity ul li {
    list-style: none;
    float: left;
    border: 1px solid #dce5f8;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
  }

  .commodity ul li .price {
    color: #58b7ff;
  }

  .goods-type {
    clear: both;
    padding-left: 10px;
  }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
  }

  .cookList li:hover {
    border: 1px solid #58b7ff;
  }

  .cookList li span {
    display: block;
    float: left;
  }

  .foodImg {
    width: 40%;
    max-width: 120px;
    border: 1px solid rgb(204, 204, 204);
  }

  .foodName {
    display: block;
    width: 50%;
    text-align: left;
    font-size: 18px;
    padding-left: 10px;
    color: brown;
  }

  .foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totaDiv {
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #d3dce6;
  }

  .totaDiv span {
    display: inline-block;
    padding: 5px 15px;
  }

</style>
