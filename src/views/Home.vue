<template>
  <div>
    <div
      :class="[
        'grid justify-center items-center py-3 ',
        `grid-cols-${flexWidth.mobile}`,
        `sm:grid-cols-${flexWidth.big}`,
        ps3Mode || gametdb ? 'mx-auto w-5/6 sm:w-11/12' : 'w-10/12 ml-8',
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
          :myList="myList"
          :fav="myFavs?.includes(game.id)"
          :favView="viewFavs"
          :gametdb="gametdb"
          :class="[
            ps3Mode ? '-mr-5' : gametdb ? '-ml-3 -mr-3' : '-mr-44',
            { 'pr-6': !myList },
          ]"
          class="transform transition-transform hover:scale-110 z-10"
          @click="
            viewFavs
              ? $router.push({ name: 'game', params: { id: game.id } })
              : changeFav(game)
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
import { reactive, toRefs, inject, computed } from "vue";
import gameCard from "@/components/gameCard.vue";
export default {
  name: "Home",
  components: { gameCard },
  setup() {
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
      ps3Mode: computed(() => dataStore?.filters?.viewMode == "ps3"),
      gametdb: computed(() => dataStore?.filters?.viewMode == "gametdb"),
      viewFavs: computed(() => dataStore?.filters?.viewFavs),
      myList: computed(() =>
        state.gametdb ? false : dataStore?.filters?.myList
      ),
      myFavs: computed(() => dataStore?.filters?.myFavs, []),
      changeFav: (game) => {
        if (!dataStore.filters.viewFavs) {
          if (state.myFavs?.includes(game.id)) {
            const ix = state.myFavs?.indexOf(game.id);
            dataStore.filters.myFavs.splice(ix, 1);
          } else dataStore.filters.myFavs?.push(game.id);
          localStorage.setItem("myFavs", JSON.stringify(state.myFavs));
        }
      },
    });
    return { ...toRefs(state) };
  },
};
</script>
