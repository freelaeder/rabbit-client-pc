<!-- 商品详情组件: src/views/goods/components/GoodsDetail.vue -->

<script lang="ts" setup>
import { useGoodsStore } from "@/stores/goodsStore";

const goodsStore = useGoodsStore();
const { goodsProperties } = storeToRefs(goodsStore);
</script>
<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goodsProperties.properties" :key="item.name">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goodsProperties.pictures" :src="item" alt="" />
  </div>
</template>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
