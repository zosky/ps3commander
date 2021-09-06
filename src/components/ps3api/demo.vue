<template>
  <div class="flex flex-col py-1 justify-center select-none ring-1">
    <span class="text-sm font-bold"> demoMode </span>
    <div
      v-for="b in buttons"
      :key="b"
      class="hover:bg-blue-300 w-full rounded-full px-5"
      :class="[
        {
          'opacity-30': WAN && b == 'power',
          'bg-purple-300': WAN && b == 'wan',
          'text-red-600': b == 'close',
        },
      ]"
      @click="buttonSmash(b)"
    >
      {{ b }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
export default {
  name: "demoAPI",
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      WAN: computed(() => dataStore.data?.WAN),
      buttonSmash: (b) =>
        !state.WAN && b == "power"
          ? (dataStore.data.status = !dataStore.data.status?.on
              ? state.powerON
              : state.powerOFF)
          : b == "close"
          ? state.demoOver()
          : b == "wan"
          ? (dataStore.data.WAN = !dataStore.data.WAN)
          : "",
      demoOver: () => {
        dataStore.data.API = state.DEV ? process.env.VUE_APP_API : null;
        localStorage.setItem("APIurl", dataStore.data.API);
        dataStore.getters.getData();
      },
      buttons: ["power", "wan", "close"],
      powerOFF: { on: false },
      powerON: {
        on: true,
        temp: {
          cpu: 66,
          rsx: 68,
          mem: 1900,
          fanSpeed: 30,
        },
        user: {
          id: 1,
          name: "no one",
          icon: "lock",
        },
        time: {
          seconds: {
            power: 975,
            game: 0,
          },
        },
      },
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
