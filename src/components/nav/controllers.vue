<template>
  <div
    :class="[
      'flex flex-row justify-around items-center',
      'px-2 mx-2 text-blue-400 -my-2',
    ]"
  >
    <template v-for="(gs, c) in controllers" :key="c">
      <my-svg
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
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import navBubble from "./bubble.vue";
export default {
  name: "navControllers",
  components: { navBubble },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      controllers: computed(() => dataStore.data.gameTags.controllers),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
