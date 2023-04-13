import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/goods",
        name: "goods",
        component: () =>
          import(/* webpackChunkName: "goods" */ "@/views/GoodsView.vue"),
        meta: {
          isShow: true,
          title: "商品列表",
        },
      },
      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "goods" */ "@/views/UsersView.vue"),
        meta: {
          isShow: true,
          title: "用户列表",
        },
      },
      {
        path: "/roles",
        name: "roles",
        component: () =>
          import(/* webpackChunkName: "goods" */ "@/views/RoleView.vue"),
        meta: {
          isShow: true,
          title: "角色列表",
        },
      },

      {
        path: "/autauthority",
        name: "autauthority",
        component: () =>
          import(
            /* webpackChunkName: "goods" */ "@/views/AutauthorityView.vue"
          ),
        meta: {
          isShow: false,
          title: "权限列表",
        },
      },

      // 使用路由重定向
      {
        path: "/",
        redirect: "/goods",
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  console.log(token);

  if (!token && to.path !== '/login') {
    next('./login')
  } else {
    next()
  }
})
export default router;
