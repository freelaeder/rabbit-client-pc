<script setup lang="ts">
const changeds = () => {};
</script>
<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <SubCategoryBread />
    <!-- 筛选组件 -->
    <SubCategoryFilter onChanged="changeds" />
    <!-- 商品区块 -->
    <div class="goods-list">
      <!-- 排序组件 -->
      <SubCategorySort />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
