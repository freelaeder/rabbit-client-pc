<script setup lang="ts">
import FreshGoods from "./component/FreshGoods.vue";
import { useIntersectionObserver } from "@vueuse/core";
const target = ref(null);
// const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    console.log("j");
    // 第一次进入停止监听
    stop();
  }
});
</script>
<template>
  <div class="container">
    <!-- 分类数据 -->
    <HomeCategory />
    <!-- 轮播图 -->
    <HomeBanner />
  </div>
  <!-- 新鲜好物 -->
  <FreshGoods />
  <!-- 人气推荐 -->
  <HotRecommends />
  <!-- 热门品牌 -->
  <HotBrands />
  <!-- 产品区块 -->
  <HomeGoods />
  <!-- 最新专题 -->
  <HomeSpecial />
</template>
<style lang="less" scoped></style>
