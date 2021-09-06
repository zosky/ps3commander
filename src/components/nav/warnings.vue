<template>
  <div
    :class="[
      'flex flex-row flex-wrap mx-auto max-w-max',
      'gap-x-12 gap-y-2 justify-center my-2',
    ]"
  >
    <warning v-if="!haveFavs" @click="viewAll()">
      <template #icon><SelectionOff /></template>
      <template #msg
        >showing the top 20 f/metecritic.<br />
        <em class="font-bold"
          >smash <StarCircle class="inline-block text-xl -mx-0.5" /> for all </em
        >(or this)
      </template>
    </warning>
    <warning
      v-if="!haveAPI"
      @click="$router.push({ name: 'admin', params: { api: 'edit' } })"
    >
      <template #icon><my-svg i="ps3" class="loading h-20" /></template>
      <template #default>API url missing</template>
      <template #msg>
        <em> "you may be missing some of the benefits sterio can provide" </em>
      </template>
    </warning>
    <div class="flex flex-row text-blue-500" v-if="demoMode">
      <MessageSettingsOutline
        :class="[
          'w-20 h-20 p-2 inline-block self-center shadow-md',
          'rounded-l-xl bg-blue-200 ring-1',
        ]"
      />
      <ps3demo-mode
        :class="[
          'min-w-max px-1 shadow-md',
          'ring-1 rounded-xl bg-blue-200 text-center',
        ]"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { SelectionOff, MessageSettingsOutline, StarCircle } from "mdue";
import warning from "@/components/MSGtimeOut.vue";
import ps3demoMode from "../ps3api/demo.vue";
export default {
  name: "warnings",
  components: {
    warning,
    ps3demoMode,
    SelectionOff,
    MessageSettingsOutline,
    StarCircle,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      haveFavs: computed(() => dataStore?.filters?.myFavs?.length),
      haveAPI: computed(() => dataStore.data.API),
      demoMode: computed(() => dataStore.data.API == "demo"),
      viewAll: () => (dataStore.filters.viewFavs = false),
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
