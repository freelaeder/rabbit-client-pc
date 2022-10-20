<!-- 评价列表组件: src/views/goods/components/CommentList.vue -->

<script lang="ts" setup>
import { useGoodsStore } from "@/stores/goodsStore";
import type { EvaluateRequestParams, EvaluateSpec } from "@/types/Goods";
import { onBeforeRouteUpdate } from "vue-router";

// 接收外部传递的评价列表请求参数
const props = defineProps<{ reqParams: EvaluateRequestParams }>();
// 商品列表
const goodsStore = useGoodsStore();
// 商品列表 方法
const { getEvaluateList } = goodsStore;
// 商品列表数据
const { evaluateList } = storeToRefs(goodsStore);
// 路由
const route = useRoute();
// 发送请求 初次发送
// getEvaluateList(route.params.id as string, props.reqParams);
// 路由变化 发送
onBeforeRouteUpdate((to) => {
  getEvaluateList(to.params.id as string, props.reqParams);
});
// 监听变化
watch(
  () => props.reqParams,
  () => {
    getEvaluateList(route.params.id as string, props.reqParams);
  },
  {
    // // 发送请求 初次发送
    immediate: true,
    // 深度监听
    deep: true,
  }
);

// 处理名字
function formNickname(nickname: string) {
  return (
    nickname.substring(0, 1) + "****" + nickname.substring(nickname.length - 1)
  );
}
// 处理规格
function formatSpecs(specs: EvaluateSpec[]) {
  return specs.map((item) => `${item.name} : ${item.nameValue}    `).join("");
}
</script>

<template>
  <div class="list">
    <div class="item" v-for="item in evaluateList.result.items" :key="item.id">
      <div class="user">
        <img :src="item.member.avatar" :alt="item.member.id" />
        <span>{{ formNickname(item.member.nickname) }}</span>
      </div>
      <div class="body">
        <div class="score">
          <i
            v-for="i in 5"
            :class="['iconfont', i <= item.score ? 'icon-wjx01' : 'icon-wjx02']"
          ></i>
          <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
        </div>
        <div class="text">
          {{ item.content }}
        </div>
        <!-- 评价图片 -->
        <CommentImage v-if="item.pictures" :pictures="item.pictures" />
        <div class="time">
          <span>{{ item.createTime }}</span>
          <span class="zan">
            <i class="iconfont icon-dianzan"></i>
            {{ item.praiseCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
