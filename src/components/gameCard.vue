<template>
  <div>
    <img :src="IMG" :alt="game?.id" class="w-full h-full" />
  </div>
</template>
<script>
export default {
  name: "game",
  props: { game: { type: Object, default: () => {} } },
  setup(props) {
    return {
      IMG: process.env.VUE_APP_IMG_BASE + props?.game?.images?.cover,
    };
  },
};
</script>
