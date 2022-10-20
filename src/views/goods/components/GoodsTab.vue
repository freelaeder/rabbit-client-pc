<!-- src/views/goods/components/GoodsTab.vue -->
<script lang="ts" setup>
import GoodsDetail from "./GoodsDetail.vue";
import GoodsComment from "./GoodsComment.vue";
import { useGoodsStore } from "@/stores/goodsStore";
// 定义显示的组件ff
const activComponent = ref<"GoodsDetail" | "GoodsComment">("GoodsDetail");
// 获取评价信息
const goodsStore = useGoodsStore();
const { evaluateInfo } = storeToRefs(goodsStore);
</script>
<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:"
        @click="activComponent = 'GoodsDetail'"
        :class="{ active: activComponent === 'GoodsDetail' }"
      >
        商品详情
      </a>
      <a
        :class="{ active: activComponent === 'GoodsComment' }"
        href="javascript:"
        @click="activComponent = 'GoodsComment'"
      >
        商品评价
        <span>({{ evaluateInfo.result.evaluateCount }}+)</span>
      </a>
    </nav>
    <!-- 切换内容的地方 -->
    <!-- <component
      :is="activComponent === 'GoodsDetail' ? GoodsDetail : GoodsComment"
    ></component> -->
    <!-- 切换内容的地方 -->
    <GoodsDetail v-show="activComponent === 'GoodsDetail'" />
    <GoodsComment v-show="activComponent === 'GoodsComment'" />
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
