<template>
  <div>
    <component
      :is="editMode ? 'ContentSaveSettings' : 'DatabaseCog'"
      class="text-6xl sm:text-9xl"
      @click="goTime()"
    />
    <div v-if="editMode">
      <textarea
        v-model="API"
        type="text"
        class="p-2 rounded-xl text-sm ring-1 focus-within:ring-0 bg-current-300"
        @keydown.enter="editMode = false"
      />
      <div
        @click="
          API = 'demo';
          editMode = false;
          goTime();
        "
        class="ring-1 rounded-xl hover:bg-black hover:bg-opacity-10"
      >
        <b>demo</b>Mode
      </div>
    </div>
    <div v-else class="text-left" @click="editMode = !editMode">
      <div class="font-bold" v-text="`edit API url`" />
      <div class="w-28">
        <div class="text-xs break-words" v-text="api ? api : 'not-set-yet'" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import { DatabaseCog, ContentSaveSettings } from "mdue";
import { useRoute } from "vue-router";
export default {
  name: "ps3apiURL",
  components: { DatabaseCog, ContentSaveSettings },
  setup() {
    const route = useRoute();
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      IMGdir: process.env.VUE_APP_IMG_BASE,
      API: dataStore.data.API,
      api: computed(() => dataStore.data.API),
      editMode: route?.params?.api == "edit" ? true : false,
      getData: dataStore.getters.getData,
      goTime: () => {
        state.editMode = !state.editMode;
        const newAPI = state.API;
        const demo = newAPI == "demo";
        const SAVEDapi = localStorage.getItem("APIurl");
        if (!state.editMode && newAPI != SAVEDapi) {
          dataStore.data.API = newAPI;
          localStorage.setItem("APIurl", newAPI);
        }
        if (demo) console.log("demo TODO");
        else if (newAPI) dataStore.getters.getData();
      },
    });
    state.API = localStorage.getItem("APIurl");
    return { ...toRefs(state) };
  },
};
</script>
