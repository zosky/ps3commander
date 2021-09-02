<template>
  <span class="text-lg hidden sm:block pr-1">
    {{ filters.myList ? "collected" : "all" }}
  </span>
  <component
    :is="filters.myList ? 'HomeAccount' : 'Earth'"
    @click="filters.myList = !filters.myList"
    class="text-3xl transition-all"
    :class="{ 'transform scale-125 text-blue-600': filters.myList }"
  />
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import { HomeAccount, Earth } from "mdue";
export default {
  name: "navLanWan",
  components: { HomeAccount, Earth },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
