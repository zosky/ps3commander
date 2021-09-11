<template>
  <div
    id="nav"
    :class="[
      'p-4 flex flex-row justify-between items-center',
      'overflow-x-scroll overflow-y-hidden',
      'bg-gradient-to-r sticky top-0 z-20 shadow-lg',
      navThemeColor,
    ]"
  >
    <nav-mastheads class="overflow-visible z-20 fixed top-7" />
    <nav-history
      :class="[
        'fixed w-full z-10 transform overflow-y-visible',
        '-bottom-1 right-6 sm:w-96 sm:left-44',
        'sm:-top-2 sm:right-auto sm:bottom-auto',
        'scale-50 sm:scale-100 origin-right',
      ]"
    />

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
      <nav-zoom />
      <nav-search />
      <nav-gametdb />
      <AlertRhombusOutline
        @click="$router.push({ name: 'howTo' })"
        v-if="!API"
      />
    </div>
  </div>
  <nav-search :mobile="true" />
  <ps3status />
  <navWarnings />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import ps3status from "./ps3api/status.vue";
import navPlayerCount from "./nav/players.vue";
import navControllers from "./nav/controllers.vue";
import navMastheads from "./nav/mastheads.vue";
import navWarnings from "./nav/warnings.vue";
import navHistory from "./nav/history.vue";
import navGametdb from "./nav/gametdb.vue";
import navSearch from "./nav/search.vue";
import navLanWan from "./nav/lanwan.vue";
import navFamily from "./nav/family.vue";
import navGenres from "./nav/genres.vue";
import navPager from "./nav/pager.vue";
import navZoom from "./nav/zoom.vue";
import navFavs from "./nav/favs.vue";
import { AlertRhombusOutline } from "mdue";
export default {
  name: "Nav",
  components: {
    ps3status,
    navPlayerCount,
    navControllers,
    navMastheads,
    navWarnings,
    navHistory,
    navGametdb,
    navSearch,
    navLanWan,
    navFamily,
    navGenres,
    navPager,
    navZoom,
    navFavs,
    AlertRhombusOutline,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      WAN: computed(() => dataStore.data?.WAN),
      API: computed(() => dataStore.data?.API),
      loading: computed(() => dataStore.filters?.loading),
      myList: computed(() => dataStore.filters?.myList),
      ps3on: computed(() => dataStore.data?.status?.on),
      ps3mode: computed(() =>
        ["ps3", "gametdb"].includes(dataStore.filters.viewMode)
      ),
      filters: dataStore.filters,
      navThemeColor: computed(() =>
        state.loading
          ? "to-purple-800 from-purple-400"
          : state.ps3on
          ? "to-blue-800 from-blue-300"
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
