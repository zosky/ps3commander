<template>
  <div
    class="
      transform
      -rotate-90
      max-w-min
      origin-bottom-left
      translate-x-full
      leading-none
      -mr-1
      text-xs
      font-light
      text-center
      scale-75
    "
  >
    data from
  </div>
  <my-svg
    i="gameTDB"
    class="h-8 transform transition-transform hover:scale-110 origin-top"
    @click="$router.push({ name: 'superHome', params: { console: 'gametdb' } })"
  />
</template>
<script>
export default {
  name: "gtdbCreds",
};
</script>
