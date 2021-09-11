<template>
  <div>
    <div
      :class="[
        'grid justify-center items-center py-3 ',
        `grid-cols-${flexWidth.mobile}`,
        `sm:grid-cols-${flexWidth.big}`,
        ps3mode ? 'mx-auto w-5/6 sm:w-11/12' : 'w-10/12 ml-8',
      ]"
      v-if="
        $route.matched[$route.matched.length - 1].components.default.name ==
        'Home'
      "
    >
      <template v-for="(game, i) in games" :key="game.id">
        <game-card
          :game="game"
          :noLabel="!label"
          :class="[{ '-mr-5': ps3mode }]"
          class="transform transition-transform hover:scale-110 z-10"
          @click="
            $router.push({
              name: 'game',
              params: { id: game.id },
            })
          "
        />
        <!-- desktopShelf OR LAST -->
        <img
          v-if="i % flexWidth.big == flexWidth.big - 1 || i + 1 == games.length"
          :src="shelf"
          alt="shelf"
          class="col-span-full h-20 w-full -mt-16 hidden sm:block"
        />
        <!-- mobile shelf OR LAST-->
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
import { reactive, toRefs, inject, computed, onUpdated } from "vue";
import { useRoute } from "vue-router";
import gameCard from "@/components/gameCard.vue";
export default {
  name: "Home",
  components: { gameCard },
  setup() {
    const route = useRoute();
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      shelf: `${process.env.VUE_APP_IMG_BASE}woodShelf.png`,
      games: computed(() =>
        dataStore.data?.theseGames?.slice(
          dataStore.filters.pager.p * dataStore.filters.pager.pp,
          (dataStore.filters.pager.p + 1) * dataStore.filters.pager.pp
        )
      ),
      flexWidth: computed(() => dataStore.filters.flexWidth),
      ps3mode: computed(() => dataStore?.filters?.viewMode == "ps3"),
      label: computed(() => dataStore.filters.label),
    });
    onUpdated(() => {
      if (route?.params?.console)
        dataStore.filters.viewMode = route?.params?.console;
    });
    return { ...toRefs(state) };
  },
};
</script>
