<!-- 商品详情组件: src/views/goods/components/GoodsDetail.vue -->
<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li>
        <span class="dt">属性名称</span>
        <span class="dd">属性值</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img src="" alt="" />
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
