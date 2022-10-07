<!-- src/views/category/components/AllSubCategories.vue -->
<script lang="ts" setup>
import { useCategoryStore } from "@/stores/categoryStore";

// 获取路由对象
const route = useRoute();
// 获取分类状态仓库
const categoryStore = useCategoryStore();
// 获取当前一级分类状态
const { currentTop } = storeToRefs(categoryStore);
</script>

<template>
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <li
        v-for="item in currentTop(route.params.id as string)?.children"
        :key="item.id"
      >
        <a href="javascript:">
          <img :src="item.picture" alt="" />
          <p>{{ item.name }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.sub-list {
  margin-top: 20px;
  background-color: #fff;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
