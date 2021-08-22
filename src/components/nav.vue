<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'from-blue-400 to-blue-800 bg-gradient-to-r',
      'shadow-xl',
    ]"
  >
    <div>
      <span class="italic">ps3</span>
      <b>commander</b>
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
      <template v-if="$route.name == 'Home'">
        <!-- genre dropDown -->
        <nav-dropdown
          :list="filters.genres"
          @mouseleave="showGenres = false"
          v-if="showGenres"
        />
        <!-- genre button+bubble -->
        <Tag class="text-2xl" @click="showGenres = !showGenres" />
        <nav-bubble
          :value="filters.genres.length.toString()"
          :key="filters.genres.length"
        />
        <!-- player count + bubble -->
        <GamepadVariant
          class="text-3xl"
          :class="{ 'text-purple-300': filters.player }"
          @click="
            filters.player =
              filters.player > filters.players.length - 2
                ? 0
                : filters.player + 1
          "
        />
        <nav-bubble
          :value="filters?.players[filters?.player]"
          :key="filters?.player"
        />
        <!-- search + count + bubble -->
        <input
          v-if="showSearch"
          type="search"
          v-model="filters.search"
          class="
            ring ring-blue-300
            px-3
            rounded-3xl
            max-w-xs
            text-lg
            bg-opacity-75 bg-blue-400
            placeholder-blue-100
          "
          :placeholder="`search (${games.length})`"
        />
        <DatabaseSearchOutline
          v-if="!showSearch"
          @click="showSearch = !showSearch"
        />
        <DatabaseSearch v-else @click="showSearch = !showSearch" />
        <nav-bubble :value="games.length.toString()" :key="games.length" />
      </template>
      <!-- notHome: back -->
      <Backburger v-else class="cursor-pointer" @click="$router.go(-1)" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import navBubble from "./navBubble.vue";
import navDropdown from "./navDropdown.vue";
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
    navBubble,
    navDropdown,
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
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() => dataStore.data.games),
      filters: dataStore.filters,
      showSearch: false,
      showGenres: true,
    });
    return { ...toRefs(state) };
  },
};
</script>
