<!-- src/views/home/components/HomeBanner.vue -->
<script lang="ts" setup>
import { useHomeStore } from "@/stores/homeStore";

// 获取用于存储首页状态的 store 对象
const homeStore = useHomeStore();
console.log(homeStore, "------------------------------------");

// 获取首页轮播图状态
const { banners } = storeToRefs(homeStore);
// 获取用于请求轮播图状态的方法
const { getBanners } = homeStore;
// 发送请求获取轮播图状态
getBanners();
</script>
<template>
  <div class="home-banner" v-if="banners.status === 'success'">
    <!-- <XtxCarousel  :carousels="banners.result" v-if="banners.status === 'success'"/> -->
    <XtxCarousel :count="banners.result.length">
      <template
        v-for="(item, index) in banners.result"
        v-slot:[`default-${index}`]
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" :alt="item.id" />
        </RouterLink>
      </template>
    </XtxCarousel>
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>
