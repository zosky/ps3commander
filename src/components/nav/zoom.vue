<template>
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
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import { DotsGrid, ViewGrid } from "mdue";
export default {
  name: "navPlayerCount",
  components: { DotsGrid, ViewGrid },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
