import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import authGuard from "./authGuard";

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
        {
          path: "/cart",
          component: () => import("@/views/cart/CartPage.vue"),
        },
        {
          path: "checkout/order",
          component: () => import("@/views/pay/CheckoutPage.vue"),
        },
        {
          path: "checkout/pay",
          component: () => import("@/views/pay/PayPage.vue"),
        },
        {
          path: "pay/callback",
          component: () => import("@/views/pay/PayResultPage.vue"),
        },
        {
          path: "member",
          component: () => import("@/components/XtxMemberLayout.vue"),
          redirect: "/member/home",
          children: [
            {
              path: "home",
              component: () => import("@/views/member/home/MemberHomePage.vue"),
            },
            {
              path: "order",
              component: h(RouterView),
              children: [
                {
                  path: "",
                  component: () =>
                    import("@/views/member/order/OrderListPage.vue"),
                },
                {
                  path: ":id",
                  component: () =>
                    import("@/views/member/order/OrderDetailPage.vue"),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/LoginPage.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/login/QQLoginBack.vue"),
      beforeEnter: () => {
        if (!window.QC.Login.check()) {
          return false;
        }
      },
    },
  ],
});

router.beforeEach(authGuard);
export default router;
