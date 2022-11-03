<!-- src/components/XtxMemberLayout.vue -->
<template>
  <div class="container">
    <!-- 侧边栏 -->
    <XtxMemberSidebar />
    <article class="article">
      <!-- 右侧内容 -->
      <RouterView />
    </article>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
    position: relative;
  }
}
</style>
