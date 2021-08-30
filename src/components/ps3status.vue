<template>
  <div
    id="nowPlaying"
    :class="[
      status?.on ? 'h-20 bg-purple-500' : 'h-12 bg-yellow-200',
      'fixed bottom-0 right-0 m-2 p-2',
      'text-green-200 bg-opacity-60',
      'flex flex-row justify-end align-bottom',
      'rounded-xl font-bold cursor-pointer shadow-lg',
    ]"
    v-if="$route.name != 'ps3status'"
    @click="$router.push({ name: 'ps3status' })"
  >
    <img
      v-if="status?.disk?.id"
      :src="`${IMGdir}wheels/${status.disk.id}.png`"
      :alt="status.disk.name"
    />
    <!-- <div class="text-xs -mt-5 pb-2 pr-2 self-end animate-pulse">
        now playing
      </div> -->
    <!-- <div class="text-purple-200 font-light font-mono text-xs self-center pb-1">
      running for
    </div> -->
    <div class="flex flex-col w-1/2 justify-end place-items-end">
      <timer
        v-if="status?.on"
        class="self-end transform scale-125 origin-right Xmx-4"
      />
      <div class="flex flex-row self-end">
        <Lock
          v-if="status?.user?.icon == 'lock'"
          class="text-red-400 -mr-3"
          @click="$router.push({ name: 'ps3status' })"
        />
        <familySVGs
          v-if="status?.user?.name"
          :u="status?.user?.name"
          class="X-mr-2 text-purple-200"
          @click="$router.push({ name: 'ps3status' })"
        />
        <!-- <div v-else>{{ status?.user?.icon }}
      {{ status?.user?.name }}</div> -->
        <div v-if="status?.on" class="X-mr-1 Xml-1">
          <Harddisk v-if="drives?.ext?.free" class="text-purple-200 text-sm" />
          <HarddiskRemove v-else class="text-red-400 text-sm" />
          <ServerNetwork v-if="drives?.netfs" class="text-purple-200 text-sm" />
          <ServerNetworkOff v-else class="text-red-400 text-sm" />
        </div>
        <Ethernet
          v-if="!loading"
          :class="status?.on ? 'text-purple-200' : 'text-red-400'"
          @click="getData()"
        />
        <Reload class="animate-spin text-purple-200" v-if="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, inject, computed } from "vue";
import timer from "./ps3timer.vue";
import familySVGs from "./family.vue";
import {
  Ethernet,
  Harddisk,
  HarddiskRemove,
  ServerNetwork,
  ServerNetworkOff,
  Reload,
  Lock,
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
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      IMGdir: process.env.VUE_APP_IMG_BASE,
      API: dataStore.data.API,
      loading: computed(() => dataStore.filters?.loading),
      status: computed(() => dataStore.data?.status),
      drives: computed(() => dataStore.data?.drives),
      getData: dataStore.getters.getData,
    });
    if (!dataStore.data?.status) dataStore.getters.getData();
    return { ...toRefs(state) };
  },
};
</script>
