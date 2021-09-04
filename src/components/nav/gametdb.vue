<template>
  <div
    class="
      transform
      -rotate-90
      max-w-min
      origin-bottom-left
      translate-x-full
      leading-none
      mt-1
      -mr-1
      text-xs
      font-light
      text-center
      ml-2
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
