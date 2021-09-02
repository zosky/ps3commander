<template>
  <div>
    <img
      :src="IMG"
      :alt="game?.id"
      :class="[
        'min-w-full min-h-full',
        `${viewMode}${!myList ? 'ALL' : ''}`,
        {
          'mt-4 sm:mt-8 mb-4 ring-2 border-l-4 sm:border-l-8 border-b-4 rounded-xl rounded-l-3xl':
            !myList,
        },
        !myList
          ? fav
            ? 'ring-blue-400 border-blue-600'
            : 'ring-blue-200 border-blue-300'
          : '',
      ]"
      :style="!myList ? 'transform:perspective(60em) rotateY(20deg)' : ''"
    />
    <div
      v-if="ps3Mode"
      :class="[
        'fixed h-0  w-0 bottom-8 right-8',
        'overflow-visible ',
        'transform -skew-x-12',
        fav ? 'text-indigo-500' : 'text-blue-500',
      ]"
    >
      <StarCheck v-if="!myList && fav" class="h-10 w-10 relative right-10" />
      <StarCheckOutline v-else-if="!myList" class="h-10 relative right-5" />
      <DiscPlayer v-else-if="hdd" class="h-10 relative" />
      <ServerNetwork v-else-if="netfs" class="h-10 relative" />
      <Application v-else-if="app" class="h-10 relative" />
    </div>
  </div>
</template>
<script>
import {
  DiscPlayer,
  ServerNetwork,
  Application,
  StarCheckOutline,
  StarCheck,
} from "mdue";
export default {
  name: "game",
  props: {
    ps3: { type: Boolean, default: true },
    myList: { type: Boolean, default: true },
    game: { type: Object, default: () => {} },
    fav: { type: Boolean, default: false },
  },
  components: {
    DiscPlayer,
    ServerNetwork,
    Application,
    StarCheckOutline,
    StarCheck,
  },
  setup(props) {
    const state = {
      ps3Mode: props.ps3,
      viewMode: props.ps3 ? "ps3" : "snes",
      hdd: props.game?.ps3?.info == "/dev_ntfs/PS3ISO",
      netfs: props.game?.ps3?.info == "/net0/PS3ISO",
      app: props.game?.name.includes("PSN"),
      IMG: `${
        process.env.VUE_APP_IMG_BASE +
        (!props.myList
          ? `all/${props.game.id}.jpg`
          : props.ps3
          ? props?.game?.images?.cover
          : props?.game?.cover)
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
