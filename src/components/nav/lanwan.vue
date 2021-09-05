<template>
  <span class="text-lg hidden sm:block pr-1">
    {{ filters.myList ? "collected" : favMode ? "myFavs" : "all" }}
  </span>
  <component
    :is="filters.myList ? 'HomeAccount' : 'Earth'"
    @click="goTime()"
    class="text-3xl transition-all"
    :class="{ 'transform scale-125': filters.myList }"
  />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { HomeAccount, Earth } from "mdue";
export default {
  name: "navLanWan",
  components: { HomeAccount, Earth },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      filters: dataStore.filters,
      gameCount: computed(() => dataStore.data?.theseGames?.length, 0),
      favMode: computed(() => dataStore.filters.viewFavs),
      goTime: () => {
        dataStore.filters.myList = !dataStore.filters.myList;
        dataStore.filters.viewMode = dataStore.filters.myList
          ? "ps3"
          : "gametdb";
      },
    });
    return { ...toRefs(state) };
  },
};
</script>
