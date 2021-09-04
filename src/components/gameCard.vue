<template>
  <div class="group">
    <img
      v-if="!imgError"
      :src="IMG"
      :alt="game?.id"
      :class="[
        'Xmin-w-full Xmin-h-full',
        viewMode,
        notMyList,
        isFav,
        gametdb ? 'gametdb' : '',
      ]"
      :style="
        !myList || gametdb ? 'transform:perspective(60em) rotateY(20deg)' : ''
      "
      @error="imgError = true"
    />
    <template v-else>
      <component
        :is="`StarCircle${!fav ? 'Outline' : ''}`"
        :class="[
          fav ? 'text-green-300' : 'text-blue-300',
          'absolute top-0 righ-0 mx-auto w-full transform',
          'mt-40 -ml-5 -rotate-6 text-9xl text-center',
        ]"
      />
      <my-svg i="ps3" class="off m-6 transform -rotate-6 mt-52 pb-2" />
    </template>
    <div
      v-if="gametdb"
      :class="[
        'w-3/4 p-1 px-3 transform transition-colors',
        'skew-x-12 -rotate-3 translate-x-1/4 -translate-y-1/4',
        'flex flex-row justify-between',
        'font-bold text-center text-xs leading-tight',
        'bg-opacity-40 ring-1 rounded-full',
        fav && !favView
          ? 'text-green-800 bg-green-200 ring-green-800'
          : 'text-blue-800 bg-blue-200 ring-blue-800',
        'group-hover:text-indigo-800',
        'group-hover:ring-indigo-800',
        'group-hover:bg-indigo-200',
        'group-hover:bg-opacity-40',
      ]"
    >
      <div>
        <span class="transform font-light" v-text="game.id" />
        {{ game.name?.split("(")[0] }}
      </div>
      <div v-if="game.dateY" v-text="game.dateY" />
      <component
        v-if="!favView"
        :is="`StarCheck${!fav ? 'Outline' : ''}`"
        :class="fav ? 'text-6xl -top-10' : ''"
        class="text-4xl fixed -top-6 right-0"
      />
    </div>

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
import { toRefs, reactive } from "vue";
import {
  DiscPlayer,
  ServerNetwork,
  Application,
  StarCheckOutline,
  StarCheck,
  HelpRhombusOutline,
  StarCircle,
  StarCircleOutline,
} from "mdue";
export default {
  name: "game",
  props: {
    game: { type: Object, default: () => {} },
    ps3: { type: Boolean, default: true },
    myList: { type: Boolean, default: true },
    fav: { type: Boolean, default: false },
    favView: { type: Boolean, default: false },
    gametdb: { type: Boolean, default: false },
  },
  components: {
    DiscPlayer,
    ServerNetwork,
    Application,
    StarCheckOutline,
    StarCheck,
    StarCircle,
    StarCircleOutline,
    HelpRhombusOutline,
  },
  setup(props) {
    const state = reactive({
      viewMode: props.gametdb
        ? "gametdb"
        : `${props.ps3 ? "ps3" : "snes"}${!props.myList ? "ALL" : ""}`,
      IMG: `${
        process.env.VUE_APP_IMG_BASE +
        (props.gametdb
          ? `gametdb/${props.game.id}.jpg`
          : !props.myList
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
      notMyList:
        !props.myList || props.gametdb
          ? "mt-4 sm:mt-8 mb-4 ring-2 border-l-4 sm:border-l-8 border-b-4 rounded-xl sm:rounded-l-3xl"
          : "",
      isFav: !props.myList
        ? props.fav
          ? "ring-blue-400 border-blue-600"
          : "ring-blue-200 border-blue-300"
        : props.gametdb
        ? "mx-auto"
        : "",
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
img.ps3ALL {
  aspect-ratio: 8/11;
}
img.snes {
  aspect-ratio: 5/3;
}
img.gametdb {
  aspect-ratio: 175/204;
}
</style>
