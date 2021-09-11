<template>
  <div>
    <my-svg
      i="ps3"
      :class="[
        'absolute h-16 sm:h-20 w-auto',
        '-mt-4 -mb-10 mr-14 sm:-ml-3 -ml-1',
        'cursor-pointer select-none',
        'transform transition-all origin-top-left',
        'hover:scale-110 -rotate-6',
        { 'scale-150': loading },
        ps3powerLEDs,
        viewMode == 'ps3' ? 'z-20' : 'z-10 scale-95',
        $route?.matched?.[$route?.matched?.length - 1]?.components?.default
          ?.name == 'Home'
          ? 'home'
          : '',
      ]"
      @click="goTime('ps3')"
    />
    <my-svg
      i="snes"
      :class="[
        'absolute p-2 sm:h-20 h-16',
        '-mt-4 -mb-5 mr-14 sm:-ml-3 -ml-1',
        'left-10 -rotate-6',
        'cursor-pointer select-none',
        'transform transition-all origin-top-left',
        'hover:scale-110',
        viewMode == 'snes' ? 'z-20' : 'z-10 scale-95 ',
        { 'animate-pulse': loading },
      ]"
      @click="goTime('snes')"
    />
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "navMastheads",
  setup() {
    const router = useRouter();
    const dataStore = inject("$dataStore");
    const state = reactive({
      viewMode: computed(() => dataStore.filters?.viewMode),
      loading: computed(() => dataStore.filters?.loading),
      ps3powerLEDs: computed(() =>
        state.loading ? "loading" : dataStore?.data?.status?.on ? "on" : "off"
      ),
      goTime: (where) => {
        dataStore.filters.viewMode = where;
        router.push({
          name: "superHome",
          params: { console: where },
        });
      },
    });
    return { ...toRefs(state) };
  },
};
</script>
