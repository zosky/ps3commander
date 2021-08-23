<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'from-blue-400 to-blue-800 bg-gradient-to-r',
      'shadow-lg',
      'overflow-x-scroll overflow-y-visible',
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
        <div
          :class="[
            'flex flex-row justify-around items-center',
            'px-2 mx-2 text-blue-200',
          ]"
        >
          <template v-for="(gs, u) in users" :key="u">
            <family :u="u" @click="$router.push(`/user/${u}`)" />
            <!-- @click="$router.push(`/user/${u}`)" -->
            <!-- <div v-else>{{ u }}</div> -->
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
              @click="$router.push({ name: 'controller', params: { name: c } })"
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
              $router.push({ name: 'genre', params: { name: e } });
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
              $router.push({ name: 'players', params: { num: e } });
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
          :placeholder="`search (${games.length})`"
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
      games: computed(() => dataStore.data.games),
      controllers: computed(() => dataStore.data.gameTags.controllers),
      users: computed(() => dataStore.data.gameTags.players),
      filters: dataStore.filters,
      showSearch: false,
      showGenres: false,
      showPlayer: false,
    });
    return { ...toRefs(state) };
  },
};
</script>
