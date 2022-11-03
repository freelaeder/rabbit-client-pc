<script lang="ts" setup>
import { useMemberStore } from "@/stores/memberStore";

// 获取store
const memberStore = useMemberStore();

//发送请求
memberStore.getCollections({ page: 1, pageSize: 10, collectType: 1 });
</script>

<template>
  <div class="member-home">
    <MemberHomeOverview />
    <MemberHomePanel title="我的收藏">
      <GoodsItem
        :key="item.id"
        v-for="item in memberStore.collections[1].result.items?.slice(0, 4)"
        :goods="item"
      />
    </MemberHomePanel>
    <MemberHomePanel title="我的足迹"></MemberHomePanel>
    <GoodsRelevant />
  </div>
</template>

<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
