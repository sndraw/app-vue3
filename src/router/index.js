import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "canvas" */ "../views/Canvas.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "webgl" */ "../views/Home.vue"),
  },
  {
    path: "/webgl",
    name: "WebGL",
    component: () =>
      import(/* webpackChunkName: "webgl" */ "../views/WebGL.vue"),
  },
  {
    path: "/db",
    name: "DB",
    component: () => import(/* webpackChunkName: "db" */ "../views/DB.vue"),
  },
  {
    path: "/wechat",
    name: "Wechat",
    component: () =>
      import(/* webpackChunkName: "wechat" */ "../views/Wechat.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
