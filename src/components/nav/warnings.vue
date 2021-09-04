<template>
  <div
    :class="[
      'flex flex-row flex-wrap mx-auto max-w-max',
      'gap-x-12 gap-y-2 justify-center my-2',
    ]"
  >
    <warning v-if="!haveFavs">
      <template #icon><SelectionOff /></template>
    </warning>
    <warning
      v-if="!haveAPI"
      @click="$router.push({ name: 'ps3status', params: { api: 'edit' } })"
    >
      <template #icon><svg-icon i="ps3" class="loading h-20" /></template>
      <template #default>API url missing</template>
      <template #msg>
        <em> "you may be missing some of the benefits sterio can provide" </em>
      </template>
    </warning>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { SelectionOff } from "mdue";
import warning from "@/components/MSGtimeOut.vue";
import SvgIcon from "@/components/svgIcons.vue";
export default {
  name: "warnings",
  components: { warning, SvgIcon, SelectionOff },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      haveFavs: computed(() => dataStore?.filters?.myFavs?.length),
      haveAPI: computed(() => dataStore.data.API),
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
