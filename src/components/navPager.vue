<template>
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
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import { SkipForwardOutline, SkipBackwardOutline } from "mdue";
export default {
  name: "navPager",
  components: {
    SkipForwardOutline,
    SkipBackwardOutline,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
