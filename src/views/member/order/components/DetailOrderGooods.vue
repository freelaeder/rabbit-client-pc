<!-- src/views/member/order/components/DetailOrderGooods.vue -->
<script lang="ts" setup>
import { useOrderStore } from "@/stores/orderStore";

// 获取订单信息
const orderStore = useOrderStore();
const route = useRoute();

orderStore.getOrderInfoById(route.params.id as string);

// 格式化电话
function changeMobile(mobile: string) {
  return mobile.substring(0, 3) + "****" + mobile.substring(mobile.length - 4);
}
</script>
<template>
  <div class="order-info" v-if="orderStore.orderInfo.status === 'success'">
    <!-- 商品列表 -->
    <h3>订单商品</h3>
    <table class="goods-table">
      <thead>
        <tr>
          <th>商品信息</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>实付</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="skus in orderStore.orderInfo.result.skus" :key="skus.id">
          <td>
            <a href="javascript:" class="product">
              <img :src="skus.image" alt="" />
              <div class="info">
                <p class="name ellipsis">{{ skus.name }}</p>
                <p class="attrs ellipsis">{{ skus.attrsText }}</p>
              </div>
            </a>
          </td>
          <td>¥{{ skus.curPrice }}</td>
          <td>{{ skus.quantity }}</td>
          <td>¥{{ skus.realPay }}</td>
          <td>¥{{ skus.realPay }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 收货信息 -->
    <h3>收货信息</h3>
    <div class="info-box">
      <dl>
        <dt>
          收
          <i></i>
          货 人：
        </dt>
        <dd>{{ orderStore.orderInfo.result.receiverContact }}</dd>
      </dl>
      <dl>
        <dt>联系方式：</dt>
        <dd>
          {{ changeMobile(String(orderStore.orderInfo.result.receiverMobile)) }}
        </dd>
      </dl>
      <dl>
        <dt>收货地址：</dt>
        <dd>{{ orderStore.orderInfo.result.receiverAddress }}</dd>
      </dl>
    </div>
    <!-- 支付方式及送货时间 -->
    <h3>支付方式及送货时间</h3>
    <div class="info-box">
      <dl>
        <dt>支付方式：</dt>
        <dd>在线支付</dd>
      </dl>
      <dl>
        <dt>送货时间：</dt>
        <dd>双休日、假日送货(适合于家庭地址)</dd>
      </dl>
    </div>
    <!-- 发票信息 -->
    <h3>发票信息</h3>
    <div class="info-box">
      <dl>
        <dt>发票类型：</dt>
        <dd>电子发票</dd>
      </dl>
      <dl>
        <dt>发票内容：</dt>
        <dd>日用品</dd>
      </dl>
      <dl>
        <dt>发票抬头：</dt>
        <dd>个人</dd>
      </dl>
    </div>
    <!-- 订单信息 -->
    <h3>订单信息</h3>
    <div class="info-box">
      <dl>
        <dt>订单编号：</dt>
        <dd>{{ orderStore.orderInfo.result.id }}</dd>
      </dl>
      <dl>
        <dt>下单时间：</dt>
        <dd>{{ orderStore.orderInfo.result.createTime }}</dd>
      </dl>
    </div>
    <!-- 汇总信息 -->
    <div class="sum-info">
      <div class="info">
        <div class="item">
          <label>商品件数：</label>
          <span>{{ orderStore.orderInfo.result.totalNum }}件</span>
        </div>
        <div class="item">
          <label>商品总价：</label>
          <span>¥{{ orderStore.orderInfo.result.totalMoney }}</span>
        </div>
        <div class="item">
          <label>
            运
            <i></i>
            费：
          </label>
          <span>{{ orderStore.orderInfo.result.postFee }}</span>
        </div>
        <div class="item">
          <label>应付总额：</label>
          <span class="price">¥{{ orderStore.orderInfo.result.payMoney }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.order-info {
  padding: 0 50px;
  h3 {
    font-weight: normal;
    font-size: 16px;
    padding: 25px 5px;
  }
}
// 商品表格
.goods-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto;
  th {
    font-weight: normal;
    line-height: 60px;
    background: #f5f5f5;
    &:first-child {
      text-align: left;
      padding-left: 20px;
    }
  }
  td {
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    &:first-child {
      padding-left: 20px;
      border-left: 1px solid #f5f5f5;
    }
    &:last-child {
      border-right: 1px solid #f5f5f5;
    }
  }
  .product {
    display: flex;
    padding: 20px 0;
    img {
      width: 70px;
      height: 70px;
      border: 1px solid #f5f5f5;
    }
    .info {
      align-self: center;
      padding-left: 20px;
      text-align: left;
      p {
        margin-bottom: 5px;
        width: 280px;
      }
      .attrs {
        color: #999;
      }
    }
  }
}
// 信息盒子
.info-box {
  border: 1px solid #f5f5f5;
  padding: 20px;
  dl {
    display: flex;
    line-height: 30px;
    dt {
      width: 80px;
      color: #999;
      font-size: 14px;
      i {
        display: inline-block;
        width: 0.5em;
      }
    }
    dd {
      flex: 1;
    }
  }
}
// 汇总信息
.sum-info {
  padding: 30px 30px 100px 30px;
  overflow: hidden;
  .info {
    width: 250px;
    height: 160px;
    float: right;
    font-size: 16px;
    .item {
      line-height: 40px;
      display: flex;
      label {
        width: 90px;
        i {
          display: inline-block;
          width: 2em;
        }
      }
      span {
        flex: 1;
        text-align: right;
        padding-right: 30px;
        &.price {
          font-size: 20px;
          color: @priceColor;
        }
      }
    }
  }
}
</style>
