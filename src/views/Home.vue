<template>
  <div>
    <div
      :class="[
        'grid justify-center items-center py-3 ',
        `grid-cols-${flexWidth.mobile}`,
        `sm:grid-cols-${flexWidth.big}`,
        ps3Mode ? 'mx-auto w-5/6 sm:w-11/12' : 'w-10/12 ml-8',
      ]"
      v-if="
        $route.matched[$route.matched.length - 1].components.default.name ==
        'Home'
      "
    >
      <template v-for="(game, i) in games" :key="game.id">
        <game-card
          :game="game"
          :ps3="ps3Mode"
          :class="ps3Mode ? '-mr-5' : '-mr-44'"
          class="transform transition-transform hover:scale-110"
          @click="$router.push({ name: 'game', params: { id: game.id } })"
        />
        <!-- desktopShelf OR LAST -->
        <img
          v-if="i % flexWidth.big == flexWidth.big - 1 || i + 1 == games.length"
          :src="shelf"
          alt="shelf"
          class="col-span-full h-20 w-full -mt-16 hidden sm:block"
        />
        <!-- mobile shelf OR-->
        <img
          v-if="
            i % flexWidth.mobile == flexWidth.mobile - 1 ||
            i + 1 == games.length
          "
          :src="shelf"
          alt="shelf"
          class="col-span-full h-16 w-full pl-7 pr-3 -mt-12 visible sm:hidden"
        />
      </template>
    </div>
    <router-view />
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { useRoute } from "vue-router";
import gameCard from "@/components/gameCard.vue";
export default {
  name: "Home",
  components: { gameCard },
  setup() {
    const route = useRoute();
    const dataStore = inject("$dataStore");
    dataStore.filters.flexWidth = { mobile: 3, big: 6 };
    if (route?.params?.console)
      dataStore.filters.viewMode = route?.params?.console;

    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      shelf: `${process.env.VUE_APP_IMG_BASE}woodShelf.png`,
      games: computed(() => dataStore.data?.theseGames),
      flexWidth: computed(() => dataStore.filters.flexWidth),
      ps3Mode: computed(() => dataStore?.filters?.viewMode == "ps3"),
    });
    return { ...toRefs(state) };
  },
};
</script>
