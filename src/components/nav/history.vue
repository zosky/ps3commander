<template>
  <div class="grid grid-cols-11 X-mb-12 X-mt-8 z-20 ml-5 h-20 overflow-visible">
    <!-- <div class="-rotate-90 transform tracking-tighter text-xs">last10</div> -->
    <game-card
      v-for="game in games"
      :key="game.id"
      :game="game"
      :noLabel="true"
      :class="[
        'min-w-min transform transition-transform',
        'h-20 -ml-20 -mt-4 z-10',
        'hover:scale-75',
        $route?.params?.id == game.id ? 'scale-75' : 'scale-50',
      ]"
      @click="$router.push({ name: 'game', params: { id: game.id } })"
    />
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import gameCard from "@/components/gameCard.vue";
export default {
  name: "navHistory",
  components: { gameCard },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.search = null;
    dataStore.filters.player = null;
    const state = reactive({
      games: computed(
        () =>
          dataStore.data?.theseGames.filter((G) =>
            dataStore.filters?.history?.[
              dataStore.filters?.historyMode
            ]?.includes(G.id)
          ),
        []
      ),
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
