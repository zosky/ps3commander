<template>
  <component :is="label" @click="changeLabel()" />
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { Label, LabelOffOutline } from "mdue";
export default {
  name: "navPlayerCount",
  components: { Label, LabelOffOutline },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      filters: dataStore.filters,
      label: computed(
        () => `Label${dataStore?.filters?.label ? "" : "OffOutline"}`
      ),
      changeLabel: () => (dataStore.filters.label = !dataStore.filters.label),
    });
    return { ...toRefs(state) };
  },
};
</script>
