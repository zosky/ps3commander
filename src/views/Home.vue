<template>
  <div class="flex flex-col">
    <div
      class="flex flex-row flex-wrap justify-center items-center py-3"
      v-if="$route.name == 'Home'"
    >
      <game-card
        v-for="game in games"
        :key="game.id"
        :game="game"
        class="transform transition-all w-1/4 sm:w-1/6 -mr-5 hover:scale-110"
        @click="$router.push({ name: 'game', params: { id: game.id } })"
      />
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
export default {
  name: "Home",
  components: { gameCard },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() => dataStore.data.games),
    });
    return { ...toRefs(state) };
  },
};
</script>
