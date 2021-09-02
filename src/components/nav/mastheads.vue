<template>
  <div>
    <myIcons
      i="ps3"
      :class="[
        'absolute h-16 sm:h-20 w-auto',
        '-mt-4 -mb-10 mr-14 sm:-ml-3 -ml-1',
        'cursor-pointer select-none',
        'transform transition-all origin-top-left',
        'hover:scale-110',
        '-rotate-6',
        ps3powerLEDs,
        filters.viewMode == 'ps3' ? 'z-20' : 'z-10 scale-95',
        $route?.matched?.[$route?.matched?.length - 1]?.components?.default
          ?.name == 'Home'
          ? 'home'
          : '',
      ]"
      @click="
        filters.viewMode = 'ps3';
        $router.push({
          name: 'superHome',
          params: { console: filters.viewMode },
        });
      "
    />
    <myIcons
      v-if="myList"
      i="snes"
      :class="[
        'absolute p-2 sm:h-20 h-16',
        '-mt-4 -mb-5 mr-14 sm:-ml-3 -ml-1',
        'left-10 -rotate-6',
        'cursor-pointer select-none',
        'transform transition-all origin-top-left',
        'hover:scale-110',
        filters.viewMode == 'snes' ? 'z-20' : 'z-10 scale-95 ',
        { 'animate-pulse': loading },
      ]"
      @click="
        filters.viewMode = 'snes';
        $router.push({
          name: 'superHome',
          params: { console: filters.viewMode },
        });
      "
    />
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import myIcons from "../svgIcons.vue";
export default {
  name: "navMastheads",
  components: { myIcons },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      loading: computed(() => dataStore.filters?.loading),
      myList: computed(() => dataStore.filters?.myList),
      ps3powerLEDs: computed(() =>
        state.loading ? "loading" : dataStore?.data?.status?.on ? "on" : "off"
      ),
      filters: dataStore.filters,
    });
    return { ...toRefs(state) };
  },
};
</script>
