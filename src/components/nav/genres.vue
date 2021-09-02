<template>
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
  <nav-dropdown
    :list="filters.viewMode == 'snes' ? filters.snes.genres : filters.genres"
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
</template>
<script>
import { reactive, toRefs, inject } from "vue";
import { Tag } from "mdue";
import navDropdown from "./dropdown.vue";
import navBubble from "./bubble.vue";
export default {
  name: "navPlayerCount",
  components: { navDropdown, navBubble, Tag },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      showGenres: false,
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
