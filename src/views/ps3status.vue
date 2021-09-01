<template>
  <div
    v-if="status?.on != true"
    class="flex flex-row w-full p-8 gap-2 mt-20 cursor-pointer"
  >
    <div
      :class="[
        'p-6 shadow-xl mx-auto rounded-xl text-center transition-all',
        loading
          ? 'animate-bounce text-purple-500 bg-purple-100'
          : WAN
          ? 'text-indigo-500 bg-indigo-200 hover:text-indigo-700 hover:bg-indigo-300'
          : 'text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300',
      ]"
      @click="getStatus()"
    >
      <Refresh v-if="loading" class="text-9xl" />
      <LanDisconnect v-else-if="WAN" class="text-9xl" />
      <Ethernet v-else class="text-9xl" />
      <span v-if="loading">checking again...</span>
      <span v-else-if="WAN">API blocked?</span>
      <span v-else>system off ?</span>
    </div>
    <div
      :class="[
        'p-6 shadow-xl mx-auto rounded-xl text-center transition-all',
        loading
          ? 'animate-bounce text-purple-500 bg-purple-100'
          : WAN
          ? 'text-indigo-500 bg-indigo-200 hover:text-indigo-700 hover:bg-indigo-300'
          : 'text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300',
      ]"
      @click="$router.push({ name: 'ps3howTo' })"
    >
      <HelpRhombusOutline class="text-9xl" />
      <span>how this works... </span>
    </div>
    <div
      :class="[
        'p-6 shadow-xl mx-auto rounded-xl text-center transition-all',
        loading
          ? 'animate-bounce text-purple-500 bg-purple-100'
          : WAN
          ? 'text-indigo-500 bg-indigo-200 hover:text-indigo-700 hover:bg-indigo-300'
          : 'text-red-500 bg-red-200 hover:text-red-700 hover:bg-red-300',
      ]"
      @click="$router.push({ name: 'gitLog' })"
    >
      <CodeBracesBox class="text-9xl" />
      <span>git<em>-auto-</em>log</span>
    </div>
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
    <div class="grid grid-cols-2 gap-2 text-xs">
      <pre class="text-red-400" v-text="status" />
      <pre class="text-green-400" v-text="drives" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed } from "vue";
import SvgPie from "@/components/svgPie.vue";
import familySVGs from "@/components/family.vue";
import timer from "@/components/ps3timer.vue";
import {
  Ethernet,
  Harddisk,
  GamepadVariantOutline,
  Memory,
  ServerNetwork,
  FlaskEmptyOutline,
  Eject,
  Reload,
  Lock,
  HelpRhombusOutline,
  Refresh,
  LanDisconnect,
  CodeBracesBox,
} from "mdue";
export default {
  name: "ps3status",
  components: {
    SvgPie,
    timer,
    familySVGs,
    Memory,
    Harddisk,
    ServerNetwork,
    GamepadVariantOutline,
    FlaskEmptyOutline,
    Ethernet,
    Lock,
    Reload,
    Eject,
    HelpRhombusOutline,
    Refresh,
    LanDisconnect,
    CodeBracesBox,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      IMGdir: process.env.VUE_APP_IMG_BASE,
      WAN: computed(() => dataStore.data?.WAN),
      status: computed(() => dataStore.data?.status),
      drives: computed(() => dataStore.data?.drives),
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
    });
    return { ...toRefs(state) };
  },
};
</script>

<style></style>
