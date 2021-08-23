<template>
  <div class="flex flex-col bg-blue-100">
    <div
      class="flex flex-row flex-wrap justify-center items-center py-3"
      v-if="
        $route.matched[$route.matched.length - 1].components.default.name ==
        'Home'
      "
    >
      <template v-for="(game, i) in games" :key="game.id">
        <game-card
          :game="game"
          class="
            transform
            transition-transform
            w-1/4
            sm:w-1/6
            -mr-5
            hover:scale-110
          "
          @click="$router.push({ name: 'game', params: { id: game.id } })"
        />
        <img
          v-if="i % 6 == 5"
          src="/images/woodShelf.png"
          alt="shelf"
          class="col-span-full h-20 w-full px-7 -mt-16 hidden md:block"
        />
        <img
          v-if="i % 4 == 3"
          src="/images/woodShelf.png"
          alt="shelf"
          class="col-span-full h-16 w-full pl-7 pr-3 -mt-12 visible sm:hidden"
        />
      </template>
    </div>
    <router-view />
    <pre
      v-if="DEV"
      class="w-full overflow-scroll h-32 p-2 text-xs bg-red-100"
      >{{ games }}</pre
    >
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import gameCard from "@/components/gameCard.vue";
import { useRoute } from "vue-router";
export default {
  name: "Home",
  components: { gameCard },
  setup() {
    const dataStore = inject("$dataStore");
    const route = useRoute();
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() =>
        route.name == "genre"
          ? dataStore?.data?.games?.filter((G) =>
              G?.genre.includes(route.params.name)
            )
          : route.name == "players"
          ? dataStore?.data?.games?.filter(
              (G) => G?.players == dataStore?.filters?.player
            )
          : route.name == "controller"
          ? dataStore?.data?.games?.filter((G) => {
              const tc = route.params.name;
              const tg = dataStore.data.gameTags.controllers[tc];
              return tg.includes(G.id);
            })
          : route.name == "user"
          ? dataStore?.data?.games?.filter((G) => {
              const tc = route.params.name;
              const tg = dataStore.data.gameTags.players[tc];
              return tg.includes(G.id);
            })
          : dataStore.data.games
      ),
    });
    return { ...toRefs(state) };
  },
};
</script>
