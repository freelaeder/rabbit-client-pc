<!-- src/views/member/order/components/OrderItem.vue -->
<script setup lang="ts">
import { orderStatus } from "@/contants/orderStatus";
import useCountDown from "@/logics/useCuountDown";
import type { OrderResponse } from "@/types/Order";
import dayjs from "dayjs";
const props = defineProps<{ item: OrderResponse }>();

const { count, start } = useCountDown();
if (props.item.orderState === 1) {
  start(props.item.countdown);
}
</script>
<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间: {{ item.createTime }}</span>
      <span>订单编号: {{ item.id }}</span>
      <span v-if="item.orderState === 1" class="down-time">
        <i class="iconfont icon-down-time"></i>
        <b>付款截止: {{ dayjs.unix(count).format("mm分ss秒") }}</b>
      </span>
      <a v-if="[5, 6].includes(item.orderState)" href="javascript:" class="del">
        删除
      </a>
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in item.skus" :key="goods.id">
            <a class="image" href="javascript:">
              <img :src="goods.image" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }}</span>
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[item.orderState].label }}</p>
        <a v-if="item.orderState === 3" href="javascript:" class="green">
          查看物流
        </a>
        <a v-if="item.orderState === 4" href="javascript:" class="green">
          评价商品
        </a>
        <a v-if="item.orderState === 5" href="javascript:" class="green">
          查看评价
        </a>
      </div>
      <div class="column amount">
        <p class="red">¥{{ item.payMoney }}</p>
        <p>(含运费: ¥{{ item.postFee }})</p>
        <p>{{ item.payChannel === 1 ? "在线付款" : "货到付款" }}</p>
      </div>
      <div class="column action">
        <XtxButton v-if="item.orderState === 1" type="primary" size="small">
          立即付款
        </XtxButton>
        <XtxButton v-if="item.orderState === 3" type="primary" size="small">
          确认收货
        </XtxButton>
        <p v-if="[1, 2, 3, 4, 5, 6].includes(item.orderState)">
          <a href="javascript:">查看详情</a>
        </p>
        <p v-if="item.orderState === 1"><a href="javascript:">取消订单</a></p>
        <p v-if="[2, 3, 4, 5].includes(item.orderState)">
          <a href="javascript:">再次购买</a>
        </p>
        <p v-if="[4, 5].includes(item.orderState)">
          <a href="javascript:">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
