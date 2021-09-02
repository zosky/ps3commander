<template>
  <div>
    <img
      :src="IMG"
      :alt="game?.id"
      :class="['min-w-full min-h-full', viewMode, notMyList, isFav]"
      :style="!myList ? 'transform:perspective(60em) rotateY(20deg)' : ''"
    />
    <div
      v-if="ps3"
      :class="[
        'fixed h-0  w-0 bottom-8 right-8',
        'overflow-visible ',
        'transform -skew-x-12',
        fav ? 'text-indigo-500' : 'text-blue-500',
      ]"
    >
      <component
        :is="thisIcon"
        :class="fav ? (!myList ? 'right-10 w-10' : 'right-5') : ''"
        class="relative h-10"
      />
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
  HelpRhombusOutline,
} from "mdue";
export default {
  name: "game",
  props: {
    game: { type: Object, default: () => {} },
    ps3: { type: Boolean, default: true },
    myList: { type: Boolean, default: true },
    fav: { type: Boolean, default: false },
  },
  components: {
    DiscPlayer,
    ServerNetwork,
    Application,
    StarCheckOutline,
    StarCheck,
    HelpRhombusOutline,
  },
  setup(props) {
    const state = {
      viewMode: `${props.ps3 ? "ps3" : "snes"}${!props.myList ? "ALL" : ""}`,
      IMG: `${
        process.env.VUE_APP_IMG_BASE +
        (!props.myList
          ? `all/${props.game.id}.jpg`
          : props.ps3
          ? props?.game?.images?.cover
          : props?.game?.cover)
      }`,
      thisIcon: !props.myList
        ? props.fav
          ? "StarCheck"
          : "StarCheckOutline"
        : props.game?.ps3?.info == "/dev_ntfs/PS3ISO"
        ? "DiscPlayer"
        : props.game?.ps3?.info == "/net0/PS3ISO"
        ? "ServerNetwork"
        : props.game?.name?.includes("PSN")
        ? "Application"
        : "HelpRhombusOutline",
      notMyList: !props.myList
        ? "mt-4 sm:mt-8 mb-4 ring-2 border-l-4 sm:border-l-8 border-b-4 rounded-xl rounded-l-3xl"
        : "",
      isFav: !props.myList
        ? props.fav
          ? "ring-blue-400 border-blue-600"
          : "ring-blue-200 border-blue-300"
        : "",
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
