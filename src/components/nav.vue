<template>
  <div
    id="nav"
    :class="[
      'w-full p-4 flex flex-row justify-between items-center',
      'from-blue-400 to-blue-800 bg-gradient-to-r',
      'shadow-xl',
    ]"
  >
    <div>
      <span class="italic">ps3</span>
      <b>commander</b>
    </div>
    <div
      class="
        flex flex-row
        gap-1
        justify-around
        items-center
        text-3xl text-blue-300
      "
    >
      <template v-if="$route.name == 'Home'">
        <input
          v-if="showSearch"
          type="search"
          v-model="filters.search"
          class="
            ring ring-blue-300
            px-3
            rounded-3xl
            max-w-xs
            text-lg
            bg-opacity-75 bg-blue-400
            placeholder-blue-100
          "
          :placeholder="`search (${games.length})`"
        />

        <DatabaseSearchOutline
          v-if="!showSearch"
          @click="showSearch = !showSearch"
        />
        <DatabaseSearch v-else @click="showSearch = !showSearch" />
        <div
          class="
            align-top
            ring-1 ring-blue-100
            text-blue-100 text-xs
            bg-blue-600 bg-opacity-25
            tracking-tighter
            font-bold
            rounded-full
            px-1
            -ml-3
            -mt-4
          "
        >
          {{ games.length }}
        </div>
      </template>
      <Backburger v-else class="cursor-pointer" @click="$router.go(-1)" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { DatabaseSearch, DatabaseSearchOutline, Backburger } from "mdue";
export default {
  name: "Nav",
  components: {
    DatabaseSearch,
    DatabaseSearchOutline,
    Backburger,
  },
  setup() {
    const dataStore = inject("$dataStore");
    dataStore.filters.search = null;
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      games: computed(() => dataStore.data.games),
      filters: dataStore.filters,
      showSearch: false,
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
