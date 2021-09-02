<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'overflow-x-scroll overflow-y-visible',
      'bg-gradient-to-r sticky top-0 z-20 shadow-lg',
      navThemeColor,
    ]"
  >
    <nav-mastheads class="overflow-visible z-20 fixed top-7" />
    <div id="logoPlaceHolder" class="pr-40" />
    <div
      :class="[
        'flex flex-row gap-1  justify-around  items-center',
        { 'px-2 mx-2 text-blue-200 pl-2': ps3mode },
        'text-3xl text-blue-300',
      ]"
    >
      <nav-lan-wan />
      <nav-favs v-if="!myList" />
      <nav-pager />
      <template v-if="myList">
        <nav-family v-if="ps3mode" />
        <nav-controllers v-if="ps3mode" />
        <nav-genres />
        <nav-player-count />
      </template>
      <nav-search />
      <nav-zoom />
    </div>
  </div>
  <nav-search :mobile="true" />
  <ps3status />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import ps3status from "./ps3status.vue";
import navPlayerCount from "./nav/players.vue";
import navControllers from "./nav/controllers.vue";
import navMastheads from "./nav/mastheads.vue";
import navSearch from "./nav/search.vue";
import navLanWan from "./nav/lanwan.vue";
import navFamily from "./nav/family.vue";
import navGenres from "./nav/genres.vue";
import navPager from "./nav/pager.vue";
import navZoom from "./nav/zoom.vue";
import navFavs from "./nav/favs.vue";
export default {
  name: "Nav",
  components: {
    ps3status,
    navPlayerCount,
    navControllers,
    navMastheads,
    navSearch,
    navLanWan,
    navFamily,
    navGenres,
    navPager,
    navZoom,
    navFavs,
  },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.search = null;
    dataStore.filters.player = null;
    const state = reactive({
      WAN: computed(() => dataStore.data?.WAN),
      loading: computed(() => dataStore.filters?.loading),
      myList: computed(() => dataStore.filters?.myList),
      ps3on: computed(() => dataStore.data?.status?.on),
      ps3mode: computed(() => dataStore.filters.viewMode == "ps3"),
      filters: dataStore.filters,
      navThemeColor: computed(() =>
        state.loading
          ? "to-purple-800 from-purple-400"
          : state.ps3on
          ? "to-blue-800 from-blue-400"
          : state.WAN
          ? "to-indigo-800 from-indigo-400"
          : "to-yellow-800 from-yellow-400"
      ),
    });
    return { ...toRefs(state) };
  },
};
</script>
<style scoped>
#nav::-webkit-scrollbar {
  display: none;
}
</style>
