<template>
  <div>
    <!-- <div class="text-xs">{{ game?.id }}</div> -->
    <!-- <div class="text-sm font-bold">{{ game.name }}</div> -->
    <img :src="`/images/${game.images.cover}`" :alt="game.id" />
    <!-- <img :src="`/images/${game.images.image}`" :alt="game.id" /> -->
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { reactive, toRefs } from "vue";
// import { useRoute } from "vue-router";

export default {
  name: "game",
  props: { game: { type: Object, default: () => {} } },
  setup() {
    // const route = useRoute()
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      // L2: route.matched[0].name,
      // honner hidden items
      // subNAV: computed( () => { return route.matched[0].children.filter( (r)=> !r.meta.hide ) }),
      // thisONE: computed( () => { return route.name }),
    });
    return { ...toRefs(state) };
  },
};
</script>
