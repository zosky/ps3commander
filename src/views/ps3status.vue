<template>
  <div v-if="!status?.on" class="w-10/12 mx-auto p-7 max-w-5xl">
    <my-svg i="ps3" class="loading" />
    <DatabaseEditOutline
      class="
        absolute
        right-7
        top-14
        w-20
        text-9xl text-blue-600
        hover:text-purple-500
      "
      :class="{ 'animate-pulse': !status?.on }"
      @click="$router.push({ name: 'admin' })"
    />
  </div>
  <div v-else class="flex flex-row flex-wrap w-full p-4 gap-x-4 gap-y-2">
    <div
      class="
        flex flex-row flex-wrap
        w-3/4
        mx-auto
        gap-y-1 gap-x-8
        from-blue-100
        bg-gradient-to-t
        rounded-2xl
        shadow-lg
        justify-center
        sm:justify-around
      "
    >
      <div class="border-b text-blue-500 border-blue-300 w-full px-2 h-10 pt-4">
        users
      </div>
      <Lock
        v-if="status?.user?.icon == 'lock'"
        class="text-9xl text-purple-500 w-min"
      />
      <familySVGs
        v-for="u in ['ben', 'mel', 'marc']"
        :key="u"
        :u="u"
        class="text-9xl text-blue-500 w-min"
        :class="
          status?.user?.name == u
            ? 'transform scale-125 origin-center'
            : 'opacity-25'
        "
        @click="switchUser(u)"
      />
    </div>

    <div
      v-if="status?.disk?.id"
      class="
        flex flex-row flex-wrap
        gap-2
        w-1/2
        from-blue-100
        bg-gradient-to-t
        rounded-2xl
        items-center
        justify-center
        shadow-lg
      "
    >
      <div class="border-b text-blue-500 border-blue-300 w-full px-2">
        now playing
      </div>

      <img
        class="w-3/4"
        :src="`${IMGdir}wheels/${status.disk.id}.png`"
        :alt="status.disk.name"
      />
      <Eject
        class="
          text-9xl text-red-500
          bg-red-300 bg-opacity-50
          w-3/4
          p-4
          m-2
          -mt-24
          rounded-xl
          shadow-xl
          ring ring-red-500
          cursor-pointer
        "
      />
    </div>

    <div
      class="
        flex flex-col
        w-1/4
        justify-items-center
        place-items-center
        mx-auto
        gap-4
        from-blue-100
        bg-gradient-to-t
        rounded-2xl
        shadow-xl
        pb-4
        justify-center
      "
    >
      <div
        class="
          border-b
          text-blue-500
          border-blue-300
          col-span-full
          h-7
          px-4
          mt-4
        "
      >
        power ON
      </div>
      <timer class="transform scale-150 text-blue-500" />
    </div>

    <div
      class="
        grid grid-cols-3
        w-3/4
        mx-auto
        gap-4
        from-blue-100
        bg-gradient-to-t
        rounded-2xl
        shadow-xl
        pb-4
      "
    >
      <div
        class="
          border-b
          text-blue-500
          border-blue-300
          col-span-full
          h-7
          px-4
          mt-4
        "
      >
        drives
      </div>
      <template v-if="drives">
        <div
          v-for="drive in drives"
          :key="drive"
          class="
            flex
            text-purple-400
            flex-row
            justify-center
            flex-wrap
            px-6
            mx-2
            gap-2
            select-none
          "
        >
          <!-- {{ drive.percent }} -->
          <svg-pie
            v-if="drive?.percent"
            :n="drive?.percent"
            class="w-full"
            :key="drive"
          />
          <div
            class="
              flex flex-row flex-wrap
              justify-evenly
              items-end
              w-full
              text-xl
              font-bold
            "
          >
            <Harddisk v-if="drive?.size == 1000" class="text-6xl" />
            <Memory v-else-if="drive?.size == 308" class="text-6xl" />
            <ServerNetwork v-else-if="drive?.size == 3667" class="text-6xl" />

            <!-- <div
            class="text-center py-2 "
            v-text="
              drive?.size == 1000
                ? 'external'
                : drive?.size == 308
                ? 'internal'
                : drive == true
                ? 'online'
                : ''
            "
          /> -->
            <div>
              <GamepadVariantOutline class="text-4xl" />
              <div
                class="text-center -mt-2"
                v-text="
                  games[
                    drive?.size == 1000
                      ? 'external'
                      : drive?.size == 308
                      ? 'internal'
                      : drive?.size == 3667
                      ? 'netfs'
                      : ''
                  ]
                "
              />
            </div>
            <div v-if="drive?.free" class="flex flex-col justify-center">
              <FlaskEmptyOutline class="text-4xl self-center" />
              <div class="" v-text="`${drive.free}gb`" />
            </div>
          </div>
        </div>
      </template>
      <Reload
        class="animate-spin text-purple-500 col-span-full text-9xl"
        v-else
      />
    </div>
    <div v-if="DEV" class="grid grid-cols-2 gap-2 text-xs">
      <pre class="text-red-400" v-text="status" />
      <pre class="text-green-400" v-text="drives" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import familySVGs from "@/components/family.vue";
import timer from "@/components/ps3api/timer.vue";
import {
  GamepadVariantOutline,
  DatabaseEditOutline,
  FlaskEmptyOutline,
  ServerNetwork,
  Harddisk,
  Reload,
  Memory,
  Eject,
  Lock,
} from "mdue";
export default {
  name: "ps3status",
  components: {
    timer,
    familySVGs,
    GamepadVariantOutline,
    DatabaseEditOutline,
    FlaskEmptyOutline,
    ServerNetwork,
    Harddisk,
    Reload,
    Memory,
    Lock,
    Eject,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      IMGdir: process.env.VUE_APP_IMG_BASE,
      WAN: computed(() => dataStore.data?.WAN),
      status: computed(() => dataStore.data?.status),
      drives: computed(() => dataStore.data?.drives),
      demoMode: computed(() => dataStore.data.API == "demo"),
      g: dataStore?.data?.games,
      games: {
        internal: dataStore?.data?.games?.filter((g) =>
          g?.name?.includes("PSN")
        )?.length,
        external: dataStore?.data?.games?.filter((g) =>
          g?.ps3?.file?.includes("ntfs")
        )?.length,
        netfs: dataStore?.data?.games?.filter((g) =>
          g?.ps3?.file?.includes("net0")
        )?.length,
      },
      loading: computed(() => dataStore.filters?.loading),
      getStatus: dataStore.getters.getData,
      switchUser: (u) => {
        dataStore.getters.postData("user", null, { name: u });
        state.getStatus;
      },
      bubbleCSS: computed(() => {
        return [
          "p-3 shadow-xl mx-auto sm:mx-0 rounded-xl text-center transition-all w-full sm:max-w-min",
          "flex flex-row gap-1 justify-start align-middle items-center",
          state.loading
            ? "animate-pulse text-purple-500 bg-purple-100"
            : state.WAN
            ? "text-indigo-500 bg-indigo-200 hover:text-indigo-700 hover:bg-indigo-300"
            : "text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300",
        ];
      }),
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
