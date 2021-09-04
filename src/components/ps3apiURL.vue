<template>
  <div>
    <component
      :is="editMode ? 'ContentSaveSettings' : 'DatabaseCog'"
      class="text-6xl sm:text-9xl"
      @click="goTime()"
    />
    <textarea
      v-if="editMode"
      v-model="API"
      type="text"
      class="p-2 rounded-xl text-sm ring-1 focus-within:ring-0 bg-current-300"
    />
    <div v-else class="text-left" @click="editMode = !editMode">
      <div class="font-bold" v-text="`edit API url`" />
      <div class="w-28">
        <div class="text-xs break-words" v-text="API ? API : 'not-set-yet'" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject } from "vue";
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
      editMode: route?.params?.api == "edit" ? true : false,
      getData: dataStore.getters.getData,
      goTime: () => {
        state.editMode = !state.editMode;
        const newAPI = state.API;
        const SAVEDapi = localStorage.getItem("APIurl");
        console.log(
          !state.editMode ? "updating" : "closing",
          state.editMode,
          newAPI,
          SAVEDapi
        );
        if (!state.editMode && newAPI != SAVEDapi) {
          dataStore.data.API = newAPI;
          localStorage.setItem("APIurl", newAPI);
        }
        if (newAPI) dataStore.getters.getData();
      },
    });
    state.API = localStorage.getItem("APIurl");
    return { ...toRefs(state) };
  },
};
</script>
