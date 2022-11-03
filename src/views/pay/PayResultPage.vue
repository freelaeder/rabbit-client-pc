<!-- 支付结果页面组件: src/views/pay/PayResultPage.vue -->
<script setup lang="ts">
import { useOrderStore } from "@/stores/orderStore";
// 获取订单 store 对象
const orderStore = useOrderStore();
// 获取路由信息对象
const route = useRoute();
// 获取订单详细信息
orderStore.getOrderInfoById(route.query.orderId as string);
</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem path="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付结果</XtxBreadItem>
      </XtxBread>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <!-- <span class="iconfont icon-shanchu red" ></span> -->
        <p class="tit">订单支付成功</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>
          支付方式：
          <span>
            {{ orderStore.orderInfo.result.payType === 1 ? "支付宝" : "微信" }}
          </span>
        </p>
        <p>
          支付金额：
          <span>¥{{ orderStore.orderInfo.result.payMoney }}</span>
        </p>
        <div class="btn">
          <XtxButton
            as="link"
            :to="`/member/order/${orderStore.orderInfo.result.id}`"
            type="primary"
            style="margin-right: 20px"
          >
            查看订单
          </XtxButton>
          <XtxButton as="link" to="/" type="gray">进入首页</XtxButton>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
