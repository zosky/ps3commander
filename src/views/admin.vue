<template>
  <div
    class="
      flex flex-row flex-wrap
      w-full
      p-4
      gap-3
      cursor-pointer
      sm:justify-center
    "
  >
    <div :class="bubbleCSS" @click="getStatus">
      <component
        :is="
          loading
            ? 'Refresh'
            : WAN
            ? 'LanDisconnect'
            : status?.on
            ? 'Ethernet'
            : 'PowerPlugOff'
        "
        class="text-6xl sm:text-9xl"
      />
      <div
        v-text="
          loading
            ? 'checking now'
            : WAN
            ? 'API error'
            : status?.on
            ? 'ps3 ON'
            : !status?.on
            ? 'ps3 off'
            : '???'
        "
      />
    </div>
    <ps3-api-demo :class="bubbleCSS" v-if="demoMode" />
    <ps3-api-url :class="bubbleCSS" />
    <div
      :class="bubbleCSS"
      @click="
        $route.name == 'howTo'
          ? $router.go(-1)
          : $router.push({ name: 'howTo' })
      "
    >
      <HelpRhombusOutline class="text-6xl sm:text-9xl" />
      <span>how this works</span>
    </div>
    <div :class="bubbleCSS" @click="$router.push({ name: 'gitLog' })">
      <CodeBraces class="text-6xl sm:text-9xl" />
      <div class="max-w-min leading-none text-sm">
        git
        <em class="text-base">auto</em>
        log
      </div>
    </div>
  </div>
  <router-view class="w-1/2 mx-auto" />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import familySVGs from "@/components/family.vue";
import timer from "@/components/ps3api/timer.vue";
import ps3ApiUrl from "@/components/ps3api/apiURL.vue";
import ps3ApiDemo from "@/components/ps3api/demo.vue";
import {
  Ethernet,
  Harddisk,
  GamepadVariantOutline,
  Memory,
  ServerNetwork,
  FlaskEmptyOutline,
  Eject,
  Reload,
  Lock,
  HelpRhombusOutline,
  Refresh,
  LanDisconnect,
  CodeBraces,
  PowerPlugOff,
} from "mdue";
export default {
  name: "ps3status",
  components: {
    timer,
    familySVGs,
    ps3ApiUrl,
    ps3ApiDemo,
    Memory,
    Harddisk,
    ServerNetwork,
    GamepadVariantOutline,
    FlaskEmptyOutline,
    Ethernet,
    Lock,
    Reload,
    Eject,
    HelpRhombusOutline,
    Refresh,
    LanDisconnect,
    CodeBraces,
    PowerPlugOff,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      WAN: computed(() => dataStore.data?.WAN),
      status: computed(() => dataStore.data?.status),
      demoMode: computed(() => dataStore.data.API == "demo"),
      loading: computed(() => dataStore.filters?.loading),
      getStatus: dataStore.getters.getData,
      bubbleCSS: computed(() => {
        return [
          "p-3 shadow-xl mx-auto sm:mx-0 rounded-xl text-center transition-all w-full sm:max-w-min",
          "flex flex-row gap-1 justify-start align-middle items-center",
          state.loading
            ? "animate-pulse text-purple-500 bg-purple-100"
            : state.status?.on
            ? "text-blue-500 bg-blue-200 hover:text-blue-700 hover:bg-blue-300"
            : state.WAN
            ? "text-indigo-500 bg-indigo-200 hover:text-indigo-700 hover:bg-indigo-300"
            : "text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300",
        ];
      }),
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
