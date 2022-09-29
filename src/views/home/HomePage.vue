<script setup lang="ts">
import FreshGoods from "./component/FreshGoods.vue";
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
</template>
<style lang="less" scoped></style>
