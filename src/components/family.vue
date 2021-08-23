<template>
  <AccountChild v-if="u == 'ben'" />
  <Face v-else-if="u == 'mel'" />
  <Memory v-else-if="u == 'marc'" />
  <HomeModern v-else-if="u == 'family'" />
</template>

<script>
import { AccountChild, HomeModern, Face, Memory } from "mdue";
export default {
  name: "familySVGs",
  props: { u: { type: String, default: "marc" } },
  components: { AccountChild, HomeModern, Face, Memory },
};
</script>
