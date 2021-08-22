<template>
  <div>
    <Android class="text-4xl font-bold text-blue-600" />
    <div
      class="flex flex-row flex-wrap justify-center items-center"
      v-if="$route.name == 'Home'"
    >
      <game-card
        v-for="game in games.slice(0, 10)"
        :key="game.id"
        :game="game"
        class="transform transition-all w-1/4 -mr-5 hover:scale-110"
        @click="$router.push({ name: 'game', params: { id: game.id } })"
      />
    </div>
    <router-view />
    <pre>{{ games }}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, toRefs } from "vue";
import { Android } from "mdue";
import gamesList from "@/store/ps3games.json";
import gameCard from "@/components/gameCard.vue";
export default {
  name: "Home",
  components: { gameCard, Android },
  setup() {
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: gamesList,
    });
    return { ...toRefs(state) };
  },
};
</script>
