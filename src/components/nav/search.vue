<template>
  <template v-if="!mobile">
    <input
      type="search"
      v-model="filters.search"
      placeholder="min 3 letters"
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
      @click="filters.showSearch = !filters?.showSearch"
    />
    <DatabaseSearch v-else @click="filters.showSearch = !filters?.showSearch" />
    <nav-bubble :value="games?.length?.toString()" :key="games?.length" />
  </template>
  <div
    v-if="mobile && showSearch"
    :class="[
      'flex flex-col bg-gradient-to-r px-5 shadow-lg',
      loading
        ? 'from-purple-400 to-purple-800'
        : ps3on
        ? 'from-blue-400 to-blue-800'
        : 'from-yellow-400 to-yellow-800',
    ]"
  >
    <input
      type="search"
      placeholder="min 3 letters"
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
    if (!dataStore.filters?.showSearch) dataStore.filters.showSearch = false;
    const state = reactive({
      showSearch: computed(() => dataStore.filters?.showSearch),
      loading: computed(() => dataStore.filters?.loading),
      ps3on: computed(() => dataStore.data?.status?.on),
      games: computed(() => dataStore.data?.theseGames),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
