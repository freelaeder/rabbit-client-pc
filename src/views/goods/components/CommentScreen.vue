<!-- 评价筛选组件: src/views/goods/components/CommentScreen.vue -->
<script lang="ts" setup>
import { useGoodsStore } from "@/stores/goodsStore";
import type { EvaluateRequestParams } from "@/types/Goods";

// 获取goodsStore
const goodsStore = useGoodsStore();
// 评价状态
const { evaluateInfo } = storeToRefs(goodsStore);
// 评价状态方法
const { getEvaluateInfo } = goodsStore;
// 路由
const route = useRoute();
console.log(route.params, "route.params");

// 发送请求
getEvaluateInfo(route.params.id as string);
const props = defineProps<{ reqParams: EvaluateRequestParams }>();
const emit = defineEmits(["update:reqParams"]);
// 数据双向绑定
const reqParams = useVModel(props, "reqParams", emit);

// 更新请求参数
function updateReqParams(target: Partial<EvaluateRequestParams>) {
  reqParams.value = {
    ...reqParams.value,
    ...target,
    tag: target.hasPicture ? "" : target.tag!,
    hasPicture: typeof target.hasPicture !== "undefined",
    page: 1,
  };
}
</script>
<template>
  <div class="head">
    <div class="data">
      <p>
        <span>{{ evaluateInfo.result.salesCount }}</span>
        <span>人购买</span>
      </p>
      <p>
        <span>{{ evaluateInfo.result.praisePercent }}</span>
        <span>好评率</span>
      </p>
    </div>
    <div class="tags">
      <div class="dt">大家都在说：</div>
      <div class="dd">
        <a
          @click="updateReqParams({ tag: '全部评价' })"
          href="javascript:"
          :class="{ active: reqParams.tag === '全部评价' }"
        >
          全部评价 ({{ evaluateInfo.result.evaluateCount }})
        </a>
        <a
          :class="{ active: reqParams.hasPicture }"
          @click="updateReqParams({ hasPicture: true })"
          href="javascript:"
        >
          有图( {{ evaluateInfo.result.hasPictureCount }})
        </a>
        <a
          :class="{ active: reqParams.tag === item.title }"
          @click="updateReqParams({ tag: item.title })"
          href="javascript:"
          v-for="item in evaluateInfo.result.tags"
          :key="item.tagCount"
        >
          {{ item.title }} ({{ item.tagCount }})
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.head {
  display: flex;
  padding: 30px 0;
  .data {
    width: 340px;
    display: flex;
    padding: 20px;
    p {
      flex: 1;
      text-align: center;
      span {
        display: block;
        &:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        &:last-child {
          color: #999;
        }
      }
    }
  }
  .tags {
    flex: 1;
    display: flex;
    border-left: 1px solid #f5f5f5;
    .dt {
      font-weight: bold;
      width: 100px;
      text-align: right;
      line-height: 42px;
    }
    .dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      > a {
        width: 132px;
        height: 42px;
        margin-left: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        border: 1px solid #e4e4e4;
        background: #f5f5f5;
        color: #999;
        text-align: center;
        line-height: 40px;
        &:hover {
          border-color: @xtxColor;
          background: lighten(@xtxColor, 50%);
          color: @xtxColor;
        }
        &.active {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
      }
    }
  }
}
</style>
