import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
            component: () => import("@/views/category/TopCategoryPage.vue")
          },
          {
            path: "category/sub/:top/:sub",
            component: () => import("@/views/category/SubCategoryPage.vue")
          },
      ],
    },
  ],
});

export default router;