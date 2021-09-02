<template>
  <StarCircle
    v-if="filters?.viewFavs"
    @click="filters.viewFavs = !filters?.viewFavs"
    class="text-3xl transition-all transform text-blue-600"
  />
  <StarCircleOutline
    v-if="!filters?.viewFavs"
    class="text-3xl transition-all transform"
    @click="filters.viewFavs = !filters?.viewFavs"
  />
  <nav-bubble :value="`${myFavs}`" class="z-10" />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import navBubble from "./navBubble.vue";
import { StarCircle, StarCircleOutline } from "mdue";
export default {
  name: "myFavs",
  components: {
    navBubble,
    StarCircle,
    StarCircleOutline,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      myFavs: computed(() => dataStore?.filters?.myFavs?.length, 0),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
