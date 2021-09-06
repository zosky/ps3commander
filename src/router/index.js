import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "game/:id",
        name: "game",
        component: () =>
          import(/* webpackChunkName: "game" */ "@/views/game.vue"),
      },
    ],
  },
  {
    path: "/admin/:api?",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/views/admin.vue"),
    children: [
      {
        name: "howTo",
        path: "how/to",
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/adminHowTo.vue"),
      },
      {
        path: "git/log",
        name: "gitLog",
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/gitLog.vue"),
      },
    ],
  },
  {
    path: "/ps3api/:api?",
    name: "ps3status",
    component: () =>
      import(/* webpackChunkName: "ps3" */ "@/views/ps3status.vue"),
  },
  {
    path: "/games/:console?/:name?/:genre?/:controller?/:players?",
    name: "superHome",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
