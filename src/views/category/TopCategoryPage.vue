<script setup lang="ts">
import { useCategoryStore } from "@/stores/categoryStore";
import AllSubCategories from "./components/AllSubCategories.vue";

const categoryStore = useCategoryStore();
const { banners } = storeToRefs(categoryStore);
const { getBanners } = categoryStore;
getBanners();
</script>
<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <TopCategoryBread />
    <!-- 轮播图 -->
    <XtxCarousel
      v-if="banners.status === 'success'"
      :count="banners.result.length"
      style="height: 500px"
    >
      <template
        v-for="(item, index) in banners.result"
        :key="item.id"
        v-slot:[`default-${index}`]
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" :alt="item.imgUrl" />
        </RouterLink>
      </template>
    </XtxCarousel>
    <!-- 一级分类 全部分类 -->
    <AllSubCategories />
    <!-- 二级 推荐分类 -->
    <Recommends />
  </div>
</template>
