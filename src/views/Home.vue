<template>
  <div class="flex flex-col">
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
          :class="[
            'transform transition-transform',
            `w-1/${flexWidth.mobile} sm:w-1/${flexWidth.big} -mr-5 hover:scale-110`,
          ]"
          @click="$router.push({ name: 'game', params: { id: game.id } })"
        />
        <!-- desktopShelf -->
        <img
          v-if="i % flexWidth.big == flexWidth.big - 1"
          src="/images/woodShelf.png"
          alt="shelf"
          class="col-span-full h-20 w-full px-7 -mt-16 hidden md:block"
        />
        <!-- mobile shelf -->
        <img
          v-if="i % flexWidth.mobile == flexWidth.mobile - 1"
          src="/images/woodShelf.png"
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
      games: computed(() => dataStore.data?.theseGames),
      flexWidth: computed(() => dataStore.filters.flexWidth),
    });
    return { ...toRefs(state) };
  },
};
</script>
