<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'bg-gradient-to-r',
      'overflow-x-scroll overflow-y-visible',
      'sticky top-0 z-20',
      'sm:shadow-lg',
      { 'shadow-lg': showSearch },
      loading
        ? 'from-purple-400 to-purple-800'
        : ps3on
        ? 'from-blue-400 to-blue-800'
        : WAN
        ? 'from-indigo-400 to-indigo-800'
        : 'from-yellow-400 to-yellow-800',
    ]"
  >
    <div class="overflow-visible z-20 fixed">
      <myIcons
        i="ps3"
        :class="[
          'absolute h-16 sm:h-20 w-auto',
          '-mt-4 -mb-10 mr-14 sm:-ml-3 -ml-1',
          'cursor-pointer select-none',
          'transform transition-all origin-top-left',
          'hover:scale-110',
          '-rotate-6',
          filters.viewMode == 'ps3' ? 'z-20' : 'z-10 scale-95',
          { 'animate-pulse': loading },
        ]"
        @click="
          filters.viewMode = 'ps3';
          $router.push({
            name: 'superHome',
            params: { console: filters.viewMode },
          });
        "
      />
      <myIcons
        v-if="myList"
        i="snes"
        :class="[
          'absolute p-2 sm:h-20 h-16',
          '-mt-4 -mb-5 mr-14 sm:-ml-3 -ml-1',
          'left-10 -rotate-6',
          'cursor-pointer select-none',
          'transform transition-all origin-top-left',
          'hover:scale-110',
          filters.viewMode == 'snes' ? 'z-20' : 'z-10 scale-95 ',
          { 'animate-pulse': loading },
        ]"
        @click="
          filters.viewMode = 'snes';
          $router.push({
            name: 'superHome',
            params: { console: filters.viewMode },
          });
        "
      />
    </div>
    <div id="logoPlaceHolder" class="pr-20" />
    <div
      class="
        flex flex-row
        gap-1
        justify-around
        items-center
        text-3xl text-blue-300
      "
    >
      <div
        v-if="filters.viewMode == 'ps3'"
        :class="[
          'flex flex-row justify-around items-center',
          'px-2 mx-2 text-blue-200 pl-2',
        ]"
      >
        <span class="text-lg hidden sm:block pr-1">
          {{ filters.myList ? "collected" : "all" }}
        </span>
        <HomeAccount
          v-if="filters.myList"
          @click="filters.myList = !filters.myList"
          class="text-3xl transition-all transform scale-125 text-blue-600"
        />
        <Earth
          v-else
          class="text-3xl transition-all transform"
          @click="filters.myList = !filters.myList"
        />

        <SkipBackwardOutline
          @click="filters?.pager?.p ? filters.pager.p-- : ''"
          class="text-3xl transition-all transform ml-2"
        />
        <span @click="filters.pager.p = 0">{{
          filters?.pager?.p ? filters?.pager?.p + 1 : "1"
        }}</span>
        <SkipForwardOutline
          @click="filters.pager.p++"
          class="text-3xl transition-all transform"
        />
      </div>
      <div
        v-if="filters.viewMode == 'ps3' && filters.myList"
        :class="[
          'flex flex-row justify-around items-center',
          'px-2 mx-2 text-blue-200',
        ]"
      >
        <template v-for="(gs, u) in users" :key="u">
          <family
            :u="u"
            :class="[
              'transition-all transform',
              {
                'text-blue-600 scale-125 ': $route.params?.name == u,
              },
            ]"
            @click="
              $router.push({
                name: 'superHome',
                params: {
                  console: filters.viewMode,
                  name: `${u == $route?.params?.name ? '' : u}`,
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
        v-if="filters.viewMode == 'ps3' && filters.myList"
        :class="[
          'flex flex-row justify-around items-center',
          'px-2 mx-2 text-blue-400 -my-2',
        ]"
      >
        <template v-for="(gs, c) in controllers" :key="c">
          <my-icons
            :i="c"
            class="h-10 fill-current"
            :class="[
              c == 'guitar' ? '-mr-6' : c == 'move' ? '-mr-1' : '',
              'transition-all transform',
              {
                'text-blue-600 scale-125 ': $route.params?.controller == c,
              },
            ]"
            @click="
              $router.push({
                name: 'superHome',
                params: {
                  console: filters.viewMode,
                  controller: `${c == $route?.params?.controller ? '' : c}`,
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
        :list="
          filters.viewMode == 'snes' ? filters.snes.genres : filters.genres
        "
        v-if="showGenres"
        @mouseleave="showGenres = false"
        @thisOne="
          (e) => {
            filters.genre = e;
            showGenres = false;
            $router.push({
              name: 'superHome',
              params: {
                console: filters.viewMode,
                genre: `${e == $route?.params?.genre ? '' : e}`,
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
      <template v-if="filters.myList">
        <Tag
          class="text-2xl"
          @click="showGenres = !showGenres"
          :class="[
            'transition-all transform',
            {
              'text-blue-600 scale-125 ': $route.params?.genre,
            },
          ]"
        />
        <nav-bubble
          :value="
            filters.viewMode == 'snes'
              ? filters.snes.genres.length.toString()
              : filters.genres.length.toString()
          "
          :key="filters.genres.length"
        />
        <!-- player count + bubble -->
        <nav-dropdown
          v-if="showPlayer"
          :list="
            filters.viewMode == 'snes' ? filters.snes.players : filters?.players
          "
          @mouseleave="showPlayer = false"
          @thisOne="
            (e) => {
              filters.player = e;
              showPlayer = false;
              $router.push({
                name: 'superHome',
                params: {
                  console: filters.viewMode,
                  players: `${e == $route?.params?.players ? '' : e}`,
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
          :class="[
            'transition-all transform',
            {
              'text-blue-600 scale-125 ': $route?.params?.players,
            },
          ]"
          @click="showPlayer = !showPlayer"
        />
        <nav-bubble
          :value="$route?.params?.players ? $route?.params?.players : '-'"
          :key="filters?.player"
          @mouseleave="filters.showPlayer = false"
        />
      </template>
      <!-- search DESKTOP + count + bubble -->
      <input
        type="search"
        v-model="filters.search"
        placeholder="search"
        :class="[
          'px-3 mx-2 hidden sm:block',
          'ring ring-blue-300 rounded-3xl max-w-xs text-lg',
          'bg-opacity-75 bg-blue-400 placeholder-blue-100',
        ]"
      />
      <!-- mobile seach show/hide -->
      <DatabaseSearchOutline
        v-if="!showSearch"
        class="sm:hidden"
        @click="showSearch = !showSearch"
      />
      <DatabaseSearch v-else @click="showSearch = !showSearch" />
      <nav-bubble
        :value="games?.length?.toString()"
        :key="games?.length"
        class="transform rotate-45"
      />
      <!-- zoom -->
      <DotsGrid
        :class="[
          '-mr-2 ml-1',
          filters?.flexWidth?.big == 6
            ? 'sm:opacity-60'
            : filters?.flexWidth?.mobile == 6
            ? 'opacity-100 sm:opacity-100'
            : '',
        ]"
        @click="
          filters?.flexWidth?.big < 6 ? filters.flexWidth.big++ : '';
          filters?.flexWidth?.mobile < 6 ? filters.flexWidth.mobile++ : '';
        "
      />
      <ViewGrid
        :class="[
          filters?.flexWidth?.big == 1
            ? 'sm:opacity-60'
            : filters?.flexWidth?.mobile == 1
            ? 'opacity-100 sm:opacity-100'
            : '',
        ]"
        @click="
          filters?.flexWidth?.big > 1 ? filters.flexWidth.big-- : '';
          filters?.flexWidth?.mobile > 1 ? filters.flexWidth.mobile-- : '';
        "
      />
      <!-- floating ps3 status -->
      <ps3status />
    </div>
  </div>
  <!-- MOBILE SEARCH ON SEPERATE ROW -->
  <div
    :class="[
      'bg-gradient-to-r px-5',
      loading
        ? 'from-purple-400 to-purple-800'
        : ps3on
        ? 'from-blue-400 to-blue-800'
        : 'from-yellow-400 to-yellow-800',
    ]"
  >
    <input
      v-if="showSearch"
      type="search"
      v-model="filters.search"
      :class="[
        'px-3 my-3 mx-2 self-center',
        'w-full sm:hidden rounded-3xl text-lg',
        'ring ring-blue-300',
        'bg-opacity-75 bg-blue-400',
        'placeholder-blue-100',
      ]"
      :placeholder="`search (${games?.length})`"
    />
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
  GamepadVariant,
  Tag,
  ViewGrid,
  DotsGrid,
  HomeAccount,
  Earth,
  SkipForwardOutline,
  SkipBackwardOutline,
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
    GamepadVariant,
    Tag,
    ViewGrid,
    DotsGrid,
    HomeAccount,
    Earth,
    SkipForwardOutline,
    SkipBackwardOutline,
  },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.search = null;
    dataStore.filters.player = null;
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() => dataStore.data?.theseGames),
      controllers: computed(() => dataStore.data.gameTags.controllers),
      users: computed(() => dataStore.data.gameTags.players),
      loading: computed(() => dataStore.filters?.loading),
      myList: computed(() => dataStore.filters?.myList),
      ps3on: computed(() => dataStore.data?.status?.on),
      WAN: computed(() => dataStore.data?.WAN),
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
