<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'bg-gradient-to-r',
      'shadow-lg',
      'overflow-x-scroll overflow-y-visible',
      'sticky top-0 z-10',
      loading
        ? 'from-purple-400 to-purple-800'
        : ps3on
        ? 'from-blue-400 to-blue-800'
        : 'from-red-400 to-red-800',
    ]"
  >
    <div class="flex flex-row">
      <myIcons
        i="ps3"
        class="w-10 h-auto mr-5 cursor-pointer"
        @click="$router.push('/')"
      />
    </div>
    <div
      class="
        flex flex-row
        gap-1
        justify-around
        items-center
        text-3xl text-blue-300
      "
    >
      <!-- notHome: back -->
      <Backburger
        v-if="$route.name != 'Home'"
        class="cursor-pointer"
        @click="$router.go(-1)"
      />
      <div
        :class="[
          'flex flex-row justify-around items-center',
          'px-2 mx-2 text-blue-200',
        ]"
      >
        <template v-for="(gs, u) in users" :key="u">
          <family
            :u="u"
            @click="
              $router.push({
                name: 'superHome',
                params: {
                  name: u,
                  genre: $route?.params?.genre,
                  players: $route?.params?.players,
                  controller: $route?.params?.controller,
                },
              })
            "
          />
          <nav-bubble :value="`${gs.length}`" />
        </template>
      </div>

      <!-- contollers -->
      <div
        :class="[
          'flex flex-row justify-around items-center',
          'px-2 mx-2 text-blue-400 -my-2',
        ]"
      >
        <template v-for="(gs, c) in controllers" :key="c">
          <my-icons
            :i="c"
            class="h-10 fill-current"
            :class="c == 'guitar' ? '-mr-6' : c == 'move' ? '-mr-1' : ''"
            @click="
              $router.push({
                name: 'superHome',
                params: {
                  controller: c,
                  name: $route?.params?.name,
                  genre: $route?.params?.genre,
                  players: $route?.params?.players,
                },
              })
            "
          />
          <nav-bubble :value="`${gs.length}`" />
        </template>
      </div>

      <!-- genre dropDown -->
      <nav-dropdown
        :list="filters.genres"
        v-if="showGenres"
        @mouseleave="showGenres = false"
        @thisOne="
          (e) => {
            filters.genre = e;
            showGenres = false;
            $router.push({
              name: 'superHome',
              params: {
                genre: e,
                name: $route?.params?.name,
                controller: $route?.params?.controller,
                players: $route?.params?.players,
              },
            });
          }
        "
      />
      <!-- @thisOne="(e) => (filters.genre = e)" -->

      <!-- genre button+bubble -->
      <Tag class="text-2xl" @click="showGenres = !showGenres" />
      <nav-bubble
        :value="filters.genres.length.toString()"
        :key="filters.genres.length"
      />
      <!-- player count + bubble -->
      <nav-dropdown
        class=""
        :list="filters?.players"
        v-if="showPlayer"
        @mouseleave="showPlayer = false"
        @thisOne="
          (e) => {
            filters.player = e;
            showPlayer = false;
            $router.push({
              name: 'superHome',
              params: {
                players: e,
                name: $route?.params?.name,
                genre: $route?.params?.genre,
                controller: $route?.params?.controller,
              },
            });
          }
        "
      />
      <GamepadVariant
        class="text-3xl"
        :class="{ 'text-purple-300': filters.player }"
        @click="showPlayer = !showPlayer"
      />
      <nav-bubble
        :value="filters?.players[filters?.player]"
        :key="filters?.player"
        @mouseleave="filters.showPlayer = false"
      />
      <!-- search + count + bubble -->
      <input
        v-if="showSearch"
        type="search"
        v-model="filters.search"
        class="
          ring ring-blue-300
          px-3
          mx-2
          w-full
          sm:hidden
          rounded-3xl
          max-w-xs
          text-lg
          bg-opacity-75 bg-blue-400
          placeholder-blue-100
        "
        :placeholder="`search (${games?.length})`"
      />
      <input
        type="search"
        v-model="filters.search"
        class="
          ring ring-blue-300
          px-3
          mx-2
          hidden
          sm:block
          rounded-3xl
          max-w-xs
          text-lg
          bg-opacity-75 bg-blue-400
          placeholder-blue-100
        "
        :placeholder="`search (${games?.length})`"
      />
      <DatabaseSearchOutline
        v-if="!showSearch"
        @click="showSearch = !showSearch"
      />
      <DatabaseSearch v-else @click="showSearch = !showSearch" />
      <nav-bubble :value="games?.length?.toString()" :key="games?.length" />

      <ps3status />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import ps3status from "./ps3status.vue";
import navBubble from "./navBubble.vue";
import navDropdown from "./navDropdown.vue";
import myIcons from "./svgIcons.vue";
import family from "./family.vue";
import {
  DatabaseSearch,
  DatabaseSearchOutline,
  Backburger,
  GamepadVariant,
  Tag,
} from "mdue";
export default {
  name: "Nav",
  components: {
    ps3status,
    navBubble,
    navDropdown,
    myIcons,
    family,
    DatabaseSearch,
    DatabaseSearchOutline,
    Backburger,
    GamepadVariant,
    Tag,
  },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.search = null;
    dataStore.filters.player = null;
    dataStore.filters.player = null;
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() => dataStore.data?.theseGames),
      controllers: computed(() => dataStore.data.gameTags.controllers),
      users: computed(() => dataStore.data.gameTags.players),
      loading: computed(() => dataStore.filters?.loading),
      ps3on: computed(() => dataStore.data?.status?.on),
      filters: dataStore.filters,
      showSearch: false,
      showGenres: false,
      showPlayer: false,
    });
    return { ...toRefs(state) };
  },
};
</script>
<style scoped>
#nav::-webkit-scrollbar {
  display: none;
}
</style>
