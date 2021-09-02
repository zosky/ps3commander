<template>
  <div
    :class="[
      'flex flex-row justify-around items-center',
      'px-2 mx-2 text-blue-200',
    ]"
  >
    <template v-for="(gs, u) in users" :key="u">
      <family
        :u="u"
        :class="$route.params?.name == u ? 'text-blue-600 scale-125 ' : ''"
        class="transition-all transform"
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
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import family from "../family.vue";
import navBubble from "./bubble.vue";
export default {
  name: "navFamily",
  components: { family, navBubble },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      users: computed(() => dataStore.data.gameTags.players),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
