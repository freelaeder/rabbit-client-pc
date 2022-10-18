<!-- src/views/goods/components/GoodsTab.vue -->
<script lang="ts" setup>
import GoodsDetail from "./GoodsDetail.vue";
import GoodsComment from "./GoodsComment.vue";
// 定义显示的组件
const activComponent = ref<"GoodsDetail" | "GoodsComment">("GoodsDetail");
</script>
<template>
  <div class="goods-tabs">
    <nav>
      <a
        class="active"
        href="javascript:"
        @click="activComponent = 'GoodsDetail'"
      >
        商品详情
      </a>
      <a href="javascript:" @click="activComponent = 'GoodsComment'">
        商品评价
        <span>(500+)</span>
      </a>
    </nav>
    <!-- 切换内容的地方 -->
    <component
      :is="activComponent === 'GoodsDetail' ? GoodsDetail : GoodsComment"
    ></component>
  </div>
</template>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
