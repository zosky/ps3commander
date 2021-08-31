<template>
  <div>
    <img :src="IMG" :alt="game?.id" class="min-w-full min-h-full gameCard" />
    <div
      :class="[
        'fixed h-0  w-0 bottom-8 right-8',
        'overflow-visible text-blue-500',
        'transform -skew-x-12',
      ]"
    >
      <DiscPlayer
        v-if="game?.ps3?.info == '/dev_ntfs/PS3ISO'"
        class="h-10 relative"
      />
      <ServerNetwork
        v-else-if="game?.ps3?.info == '/net0/PS3ISO'"
        class="h-10 relative"
      />
      <Application v-else class="h-10 relative" />
    </div>
  </div>
</template>
<script>
import { DiscPlayer, ServerNetwork, Application } from "mdue";
export default {
  name: "game",
  props: { game: { type: Object, default: () => {} } },
  components: { DiscPlayer, ServerNetwork, Application },
  setup(props) {
    return {
      IMG: process.env.VUE_APP_IMG_BASE + props?.game?.images?.cover,
    };
  },
};
</script>
<style scoped>
img.gameCard {
  aspect-ratio: 8/11;
}
</style>
