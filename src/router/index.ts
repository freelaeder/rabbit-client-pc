import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 单页面切换时 回到 页面顶部
  scrollBehavior: () => ({ top: 1 }),
  routes: [
    {
      path: "/",
      component: () => import("@/components/XtxLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/home/HomePage.vue"),
        },
        {
          path: "category/:id",
          component: () => import("@/views/category/TopCategoryPage.vue"),
        },
        {
          path: "category/sub/:top/:sub",
          component: () => import("@/views/category/SubCategoryPage.vue"),
        },
        {
          path: "goods/:id",
          component: () => import("@/views/goods/GoodsDetailPage.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/LoginPage.vue"),
    },
  ],
});

export default router;
