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
          ? state.powerToggle()
          : b == "close"
          ? state.demoOver()
          : b == "wan"
          ? state.wanToggle()
          : "",
      powerToggle: () => {
        const pON = dataStore.data.status?.on;
        dataStore.data.status = pON ? state.powerOFF : state.powerON;
        dataStore.data.drives = dataStore.data.status?.on ? state.drives : null;
      },
      wanToggle: () => {
        dataStore.data.status = state.powerOFF;
        dataStore.data.WAN = !dataStore.data.WAN;
      },
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
      drives: {
        ext: {
          free: 73,
          size: 1000,
          percent: 93,
        },
        int: {
          free: 61,
          size: 308,
          percent: 80,
        },
        netfs: {
          free: 49,
          used: 3618,
          size: 3667,
          percent: 99,
        },
      },
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
