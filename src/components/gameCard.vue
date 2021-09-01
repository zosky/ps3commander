<template>
  <div>
    <img
      :src="IMG"
      :alt="game?.id"
      :class="[
        'min-w-full min-h-full',
        `${viewMode}${!myList ? 'ALL' : ''}`,
        {
          'mt-4 sm:mt-8 mb-4 rounded-lg ring-2 ring-blue-400 border-l-4 sm:border-l-8 border-blue-600 border-b-4':
            !myList,
        },
      ]"
      :style="!myList ? 'transform:perspective(60em) rotateY(20deg)' : ''"
    />
    <div
      v-if="ps3Mode && myList"
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
import { DiscPlayer, ServerNetwork, Application } from "mdue";
export default {
  name: "game",
  props: {
    ps3: { type: Boolean, default: true },
    myList: { type: Boolean, default: true },
    game: { type: Object, default: () => {} },
  },
  components: { DiscPlayer, ServerNetwork, Application },
  setup(props) {
    const state = {
      ps3Mode: props.ps3,
      viewMode: props.ps3 ? "ps3" : "snes",
      hdd: props.game?.ps3?.info == "/dev_ntfs/PS3ISO",
      netfs: props.game?.ps3?.info == "/net0/PS3ISO",
      app: props.game?.name.includes("PSN"),
      IMG: `${
        !props.myList
          ? props?.game?.img
          : process.env.VUE_APP_IMG_BASE +
            (props.ps3 ? props?.game?.images?.cover : props?.game?.cover)
      }`,
    };
    return { ...state };
  },
};
</script>
<style scoped>
img.ps3 {
  aspect-ratio: 8/11;
}
img.ps3ALL {
  aspect-ratio: 8/11;
}
img.snes {
  aspect-ratio: 5/3;
}
</style>
