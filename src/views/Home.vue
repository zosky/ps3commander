<template>
  <div class="flex flex-col">
    <div
      :class="[
        'grid justify-center items-center py-3 w-5/6 sm:w-11/12 mx-auto',
        `grid-cols-${flexWidth.mobile}`,
        `sm:grid-cols-${flexWidth.big}`,
      ]"
      v-if="
        $route.matched[$route.matched.length - 1].components.default.name ==
        'Home'
      "
    >
      <template v-for="(game, i) in games" :key="game.id">
        <game-card
          :game="game"
          class="transform transition-transform -mr-5 hover:scale-110"
          @click="$router.push({ name: 'game', params: { id: game.id } })"
        />
        <!-- desktopShelf -->
        <img
          v-if="i % flexWidth.big == flexWidth.big - 1"
          :src="shelf"
          alt="shelf"
          class="col-span-full h-20 w-full -mt-16 hidden sm:block"
        />
        <!-- mobile shelf -->
        <img
          v-if="i % flexWidth.mobile == flexWidth.mobile - 1"
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
import gameCard from "@/components/gameCard.vue";
export default {
  name: "Home",
  components: { gameCard },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.flexWidth = { mobile: 3, big: 6 };
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      shelf: `${process.env.VUE_APP_IMG_BASE}woodShelf.png`,
      games: computed(() => dataStore.data?.theseGames),
      flexWidth: computed(() => dataStore.filters.flexWidth),
    });
    return { ...toRefs(state) };
  },
};
</script>
