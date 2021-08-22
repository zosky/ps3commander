<template>
  <div>
    <img
      :src="`/images/${game.images.cover}`"
      :alt="game.id"
      class="w-full h-full"
    />
  </div>
</template>
<script>
export default {
  name: "game",
  props: { game: { type: Object, default: () => {} } },
};
</script>
