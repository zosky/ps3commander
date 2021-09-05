<template>
  <div
    id="nowPlaying"
    :class="[
      loading
        ? 'h-12 bg-purple-500'
        : status?.on
        ? 'h-20 bg-purple-500'
        : WAN
        ? 'h-12 bg-indigo-500'
        : 'h-12 w-12 bg-yellow-200',
      'fixed bottom-0 right-0 m-2 p-2',
      'text-green-200 bg-opacity-60',
      'flex flex-row justify-end align-bottom',
      'rounded-xl font-bold cursor-pointer shadow-lg',
      'z-20 transition transform',
      { 'scale-150 origin-bottom-right': loading },
    ]"
    v-if="!['ps3status', 'admin'].includes($route.name)"
    @click="$router.push({ name: 'ps3status' })"
    @click.middle="getData()"
  >
    <img
      v-if="status?.disk?.id"
      :src="`${IMGdir}wheels/${status.disk.id}.png`"
      :alt="status.disk.name"
    />
    <div
      class="flex flex-col w-1/2 justify-end place-items-end pl-4"
      v-if="status?.on && !loading"
    >
      <timer class="self-end origin-right Xmx-4 transform scale-150 pt-1" />
      <div
        class="flex flex-row self-end transform scale-150 origin-top-right pb-3"
      >
        <Lock
          v-if="status?.user?.icon == 'lock'"
          class="text-red-400 -mr-1 text-3xl"
        />
        <familySVGs
          v-else-if="status?.on"
          :u="status?.user?.name"
          class="X-mr-2 text-purple-200 text-3xl"
        />
        <div v-if="status?.on" class="X-mr-1 Xml-1">
          <Harddisk v-if="drives?.ext?.free" class="text-purple-200 text-sm" />
          <HarddiskRemove v-else class="text-red-400 text-sm" />
          <ServerNetwork v-if="drives?.netfs" class="text-purple-200 text-sm" />
          <ServerNetworkOff v-else class="text-red-400 text-sm" />
        </div>
        <LanDisconnect v-if="!loading && WAN" class="text-green-200" />
        <Ethernet
          v-else-if="!loading"
          :class="[
            status?.on
              ? 'text-3xl text-purple-200'
              : 'text-red-400 h-9 -mr-1.5 mt-1 w-9',
          ]"
        />
      </div>
    </div>
    <Reload
      class="animate-spin text-purple-500 text-3xl m-1 mb-2 w-10 h-10"
      v-if="loading"
    />
  </div>
</template>
<script>
import { reactive, toRefs, inject, computed } from "vue";
import timer from "./timer.vue";
import familySVGs from "../family.vue";
import {
  Ethernet,
  Harddisk,
  HarddiskRemove,
  ServerNetwork,
  ServerNetworkOff,
  Reload,
  Lock,
  LanDisconnect,
} from "mdue";
export default {
  name: "ps3status",
  components: {
    timer,
    familySVGs,
    Ethernet,
    Harddisk,
    HarddiskRemove,
    ServerNetwork,
    ServerNetworkOff,
    Reload,
    Lock,
    LanDisconnect,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      IMGdir: process.env.VUE_APP_IMG_BASE,
      loading: computed(() => dataStore.filters?.loading),
      status: computed(() => dataStore.data?.status),
      drives: computed(() => dataStore.data?.drives),
      WAN: computed(() => dataStore.data?.WAN),
      getData: dataStore.getters.getData,
    });
    if (!dataStore.data?.status) dataStore.getters.getData();
    return { ...toRefs(state) };
  },
};
</script>
