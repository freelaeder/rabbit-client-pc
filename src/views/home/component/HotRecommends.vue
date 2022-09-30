<!-- src/views/home/components/HotRecommends.vue -->
<script lang="ts" setup>
import useLazyLoad from "@/logics/useLazyLoad";
import { useHomeStore } from "@/stores/homeStore";

const homeStore = useHomeStore();
const { hotRecommends } = storeToRefs(homeStore);
const { getHotRecommends } = homeStore;
// 返回值是 ref ，通过监听 元素是否进入可视区，动态发送请求
const target = useLazyLoad(getHotRecommends);
// getHotRecommends();
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div class="relative">
      <ul class="goods-list" ref="target">
        <li v-for="item in hotRecommends.result" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.alt" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>

      <!-- 骨架屏 -->
      <Transition name="fade">
        <HomeSkeleton v-if="hotRecommends.status === 'loading'" />
      </Transition>
    </div>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
.fade {
  &-leave {
    &-active {
      transition: opacity 0.5s;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>
