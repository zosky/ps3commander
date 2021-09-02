<template>
  <input
    v-if="!mobile"
    type="search"
    v-model="filters.search"
    placeholder="search"
    :class="[
      'px-3 mx-2 hidden sm:block',
      'ring ring-blue-300 rounded-3xl max-w-xs text-lg',
      'bg-opacity-75 bg-blue-400 placeholder-blue-100',
    ]"
  />
  <nav-bubble :value="games?.length?.toString()" :key="games?.length" />

  <!-- mobile seach show/hide -->
  <DatabaseSearchOutline
    v-if="!showSearch"
    class="sm:hidden"
    @click="showSearch = !showSearch"
  />
  <DatabaseSearch v-else @click="showSearch = !showSearch" />

  <div
    v-if="mobile && showSearch"
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
      type="search"
      placeholder="search"
      v-model="filters.search"
      :class="[
        'px-3 my-3 mx-2 self-center',
        'w-full sm:hidden rounded-3xl text-lg',
        'ring ring-blue-300',
        'bg-opacity-75 bg-blue-400',
        'placeholder-blue-100',
      ]"
    />
  </div>
</template>
<script>
import { reactive, toRefs, inject, computed } from "vue";
import { DatabaseSearchOutline, DatabaseSearch } from "mdue";
import navBubble from "./bubble.vue";
export default {
  name: "navSearch",
  props: { mobile: { type: Boolean, default: false } },
  components: { navBubble, DatabaseSearchOutline, DatabaseSearch },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      showSearch: false,
      loading: computed(() => dataStore.filters?.loading),
      ps3on: computed(() => dataStore.data?.status?.on),
      games: computed(() => dataStore.data?.theseGames),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
