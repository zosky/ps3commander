<template>
  <div>
    <img
      :src="IMG"
      :alt="game?.id"
      :class="[viewMode, 'min-w-full min-h-full']"
    />
    <div
      v-if="ps3Mode"
      :class="[
        'fixed h-0  w-0 bottom-8 right-8',
        'overflow-visible text-blue-500',
        'transform -skew-x-12',
      ]"
    >
      <DiscPlayer v-if="hdd" class="h-10 relative" />
      <ServerNetwork v-else-if="netfs" class="h-10 relative" />
      <Application v-else-if="app" class="h-10 relative" />
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, inject } from "vue";
import { DiscPlayer, ServerNetwork, Application } from "mdue";
export default {
  name: "game",
  props: { game: { type: Object, default: () => {} } },
  components: { DiscPlayer, ServerNetwork, Application },
  setup(props) {
    const dataStore = inject("$dataStore");
    const state = reactive({
      viewMode: dataStore.filters.viewMode,
      snesMode: dataStore.filters.viewMode == "snes",
      ps3Mode: dataStore.filters.viewMode == "ps3",
      hdd: props.game?.ps3?.info == "/dev_ntfs/PS3ISO",
      netfs: props.game?.ps3?.info == "/net0/PS3ISO",
      app: props.game?.name.includes("PSN"),
      IMG: `${process.env.VUE_APP_IMG_BASE}${
        dataStore.filters.viewMode == "ps3"
          ? props?.game?.images?.cover
          : props?.game?.cover
      }`,
    });
    return { ...toRefs(state) };
  },
};
</script>
<style scoped>
img.ps3 {
  aspect-ratio: 8/11;
}
img.snes {
  aspect-ratio: 5/3;
}
</style>
