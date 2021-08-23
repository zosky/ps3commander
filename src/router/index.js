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
  { path: "/genre/:name", name: "genre", component: Home },
  { path: "/players/:num", name: "players", component: Home },
  { path: "/controller/:name", name: "controller", component: Home },
  { path: "/user/:name", name: "user", component: Home },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
