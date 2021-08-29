<template>
  <div class="flex flex-col from-blue-100 to-blue-200 bg-gradient-to-r">
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
    <!-- <pre
      v-if="DEV"
      class="w-full overflow-scroll h-32 p-2 text-xs bg-red-100"
      >{{ games }}</pre
    > -->
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
      games: computed(() => dataStore.data?.theseGames),
    });

    dataStore.data.theseGames = computed(() =>
      route.name == "superHome"
        ? dataStore?.data?.games
            //users
            ?.filter((G) => {
              const tcN = route?.params?.name;
              const tg = dataStore.data.gameTags.players[tcN];
              return tcN ? tg.includes(G.id) : G;
            })
            //genres
            ?.filter((G) =>
              route.params?.genre ? G?.genre.includes(route.params?.genre) : G
            )
            //controllers
            ?.filter((G) => {
              const tc = route.params?.controller;
              const tg = dataStore.data.gameTags.controllers[tc];
              return tc ? tg.includes(G.id) : G;
            })
            //players
            ?.filter((G) =>
              route?.params?.players
                ? G?.players == dataStore?.filters?.player
                : G
            )
            // search
            ?.filter((G) =>
              dataStore.filters?.search
                ? G.name
                    .toLowerCase()
                    .includes(dataStore.filters.search.toLowerCase())
                : G
            )
        : dataStore.data.games
    );

    return { ...toRefs(state) };
  },
};
</script>
