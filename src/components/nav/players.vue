<template>
  <nav-dropdown
    v-if="showPlayer"
    :list="filters.viewMode == 'snes' ? filters.snes.players : filters?.players"
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
    @mouseleave="showPlayer = false"
  />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { GamepadVariant } from "mdue";
import navDropdown from "./dropdown.vue";
import navBubble from "./bubble.vue";
export default {
  name: "navPlayerCount",
  components: { navDropdown, navBubble, GamepadVariant },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      showPlayer: false,
      users: computed(() => dataStore.data.gameTags.players),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
