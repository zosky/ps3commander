<template>
  <div v-if="pTime">
    <div class="flex flex-row items-center text-xl font-bold">
      <template v-for="(i, x) in pTimerPIE" :key="x">
        <!-- {{ x }}:{{ i }} -->
        <div v-if="x == 0">
          {{ i }}<span class="text-sm font-light">h</span>
        </div>
        <svgPie
          v-else
          :n="parseInt(i, 10)"
          :d="60"
          class="h-5"
          :label="x != 2"
          color="rgb(59, 130, 246)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  inject,
  computed,
  watchEffect,
  onUnmounted,
} from "vue";
export default {
  name: "ps3Timer",
  setup() {
    const dataStore = inject("$dataStore");
    const moment = inject("moment");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      powerSec: dataStore.data?.status?.time?.seconds?.power,
      pTime: computed(() => {
        const x = dataStore.data?.status?.time?.seconds;
        return x ? moment.duration(x.power, "seconds") : null;
      }),
      pTimeHU: computed(() => {
        const x = state?.pTime;
        const y = state?.pTime?.asSeconds();
        return x ? moment().startOf("day").seconds(y).format("H:mm:ss") : null;
      }),
      pTimerPIE: computed(() => {
        const x = state?.pTime;
        const y = state?.pTime?.asSeconds();
        return x
          ? [
              moment().startOf("day").seconds(y).format("H"),
              moment().startOf("day").seconds(y).format("mm"),
              moment().startOf("day").seconds(y).format("ss"),
            ]
          : null;
      }),
    });
    watchEffect(() => {
      if (!dataStore.filters?.ps3tick)
        dataStore.filters.ps3tick = setInterval(
          () => dataStore.data.status.time.seconds.power++,
          1000
        );
    });
    onUnmounted(() => {
      clearInterval(dataStore.filters.ps3tick);
      dataStore.filters.ps3tick = null;
    });
    return { ...toRefs(state) };
  },
};
</script>
