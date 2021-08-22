<template>
  <my-nav />
  <router-view />
</template>

<script>
import myNav from "@/components/nav.vue";
export default {
  name: "App",
  components: { myNav },
};
</script>

<style></style>
