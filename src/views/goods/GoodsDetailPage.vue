<script lang="ts" setup>
import { useGoodsStore } from "@/stores/goodsStore";
import { onBeforeRouteUpdate } from "vue-router";

// 用于储存 商品信息的store对象

const goodsStore = useGoodsStore();
// 获取发送请求的方法
const { getGoodsInfo } = goodsStore;
//获取路由对象
const route = useRoute();
// 获取商品信息
const { goodsInfo } = storeToRefs(goodsStore);
// 获取商品信息
getGoodsInfo(route.params.id as string);
// 路由切换
// 向服务器端发送请求获取商品详情信息
onBeforeRouteUpdate((to) => getGoodsInfo(to.params.id as string));
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodsInfo.status === 'success'">
      <!-- 面包屑 -->
      <GoodsBread />
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media">
          <!-- 图片预览 -->
          <GoodsImages />
          <!--商品销售组件  -->
          <GoodsSales />
        </div>
        <!-- 右侧 -->
        <div class="spec">
          <!-- 商品信息组件 -->
          <GoodsInfo />
          <!-- 规格组件 -->
          <GoodsSku
            :skus="goodsInfo.result.skus"
            :specs="goodsInfo.result.specs"
          />
        </div>
      </div>
      <!-- 同类商品 -->
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜 -->
        <div class="goods-aside"></div>
      </div>
    </div>
    <div class="container loading-container" v-else>
      <img src="@/assets/images/loading.gif" />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: #fff;
}
</style>
