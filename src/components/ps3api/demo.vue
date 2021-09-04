<template>
  <div class="flex flex-col py-1 justify-center select-none ring-1">
    <span class="text-sm font-bold"> demoMode </span>
    <div
      v-for="b in buttons"
      :key="b"
      class="hover:bg-blue-300 w-full rounded-full px-5"
      :class="
        b == 'close'
          ? 'text-red-600'
          : b == 'wan' && WAN
          ? 'bg-purple-300 '
          : ''
      "
      @click="b == 'close' ? demoExit() : b == 'wan' ? wanToggle() : ''"
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
      powerOFF: { on: false },
      WAN: computed(() => dataStore.data?.WAN),
      wanToggle: () => (dataStore.data.WAN = !dataStore.data.WAN),
      demoExit: () => (dataStore.data.API = null),
      DEV: process.env.NODE_ENV == "development",
      buttons: ["on", "off", "wan", "close"],
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
