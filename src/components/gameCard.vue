<template>
  <div class="group">
    <img
      v-if="!imgError"
      :src="IMG"
      :alt="game?.id"
      :class="ps3game ? 'ps3' : 'snes'"
      @error="imgError = true"
    />
    <template v-else>
      <StarCircle
        v-if="!noLabel"
        :class="[
          fav ? 'text-green-300' : 'text-blue-300',
          'absolute top-0 righ-0 mx-auto w-full transform',
          'mt-40 -ml-5 -rotate-6 text-9xl text-center',
        ]"
      />
      <my-svg
        i="ps3"
        class="off m-6 transform pb-2"
        :class="noLabel ? 'transform rotate-90 mt-16' : '-rotate-6 mt-52'"
      />
    </template>
    <div
      v-if="noLabel == false"
      :class="[
        'w-3/4 p-1 px-3 transform transition-colors',
        'skew-x-12 -rotate-3 translate-x-1/4 -translate-y-1/4',
        'flex flex-row justify-between',
        'font-bold text-center text-xs leading-tight',
        'bg-opacity-40 ring-1 rounded-full',
        'text-blue-800 bg-blue-200 ring-blue-800',
        'group-hover:text-indigo-800',
        'group-hover:ring-indigo-800',
        'group-hover:bg-indigo-200',
        'group-hover:bg-opacity-40',
      ]"
    >
      <div>
        <span class="transform font-light" v-text="game.id" />
        {{ game.name }}
      </div>
      <div v-if="game.dateY" v-text="game.dateY" />
    </div>

    <div
      v-if="ps3game"
      :class="[
        'fixed h-0  w-0 bottom-8 right-8',
        'overflow-visible ',
        'transform -skew-x-12 text-blue-500',
      ]"
    >
      <component :is="thisIcon" class="relative h-10" />
    </div>
  </div>
</template>
<script>
import { toRefs, reactive } from "vue";
import {
  DiscPlayer,
  ServerNetwork,
  Application,
  HelpRhombusOutline,
  StarCircle,
} from "mdue";
export default {
  name: "game",
  props: {
    game: { type: Object, default: () => {} },
    noLabel: { type: Boolean, default: false },
  },
  components: {
    DiscPlayer,
    ServerNetwork,
    Application,
    HelpRhombusOutline,
    StarCircle,
  },
  setup(props) {
    const state = reactive({
      ps3game: props?.game?.id ? true : false,
      IMG: `${
        process.env.VUE_APP_IMG_BASE +
        (props?.game?.images?.cover
          ? props.game.images.cover
          : props?.game?.cover)
      }`,
      thisIcon:
        props.game?.ps3?.info == "/dev_ntfs/PS3ISO"
          ? "DiscPlayer"
          : props.game?.ps3?.info == "/net0/PS3ISO"
          ? "ServerNetwork"
          : props.game?.name?.includes("PSN")
          ? "Application"
          : "HelpRhombusOutline",
      imgError: false,
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
