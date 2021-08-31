import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: ":id",
        name: "game",
        component: () =>
          import(/* webpackChunkName: "game" */ "@/views/game.vue"),
      },
    ],
  },
  {
    path: "/u=:name?/g=:genre?/c=:controller?/p=:players?",
    name: "superHome",
    component: Home,
  },
  {
    path: "/ps3/status",
    name: "ps3status",
    component: () =>
      import(/* webpackChunkName: "ps3" */ "@/views/ps3status.vue"),
  },
  {
    path: "/howTo",
    name: "ps3howTo",
    component: () =>
      import(/* webpackChunkName: "util" */ "@/views/ps3howTo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
