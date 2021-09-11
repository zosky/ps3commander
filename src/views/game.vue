<template>
  <div class="p-2 sm:grid sm:grid-cols-2">
    <img :src="`${IMGdir}${game.images.image}`" :alt="game?.id" />
    <div>
      <div
        :class="[
          'mt-10 mb-3 pt-4 w-max p-3',
          'mx-auto',
          'transform -rotate-6',
          'bg-blue-300 bg-opacity-50',
          'flex flex-col',
          'rounded-xl shadow-lg',
        ]"
      >
        <div class="text-xl font-bold text-blue-800 border-b border-blue-300">
          {{ game?.name }}
        </div>
        <div class="text-sm text-blue-600">
          {{ $moment(game?.date).from($moment()) }}
        </div>
        <div class="text-xs font-light text-gray-400">
          {{ game?.developer }} > {{ game?.publisher }}
        </div>
      </div>

      <div
        :class="[
          'flex flex-row justify-center gap-3',
          '-mt-3 ml-2 mb-5',
          'text-xs transform -rotate-6',
        ]"
      >
        <div
          v-for="g in game?.genre"
          :key="g"
          class="ring p-1 rounded-xl px-2 text-blue-600 ring-blue-200 shadow"
        >
          {{ g }}
        </div>
      </div>
      <div class="text-2xl w-full flex flex-row p-2 items-center pt-5"></div>
      <div
        v-if="game?.desc"
        :class="[
          'col-span-full p-4 m-3',
          'ring ring-blue-300',
          'text-blue-800 text-xs',
          'rounded-2xl shadow-sm',
          'hidden sm:block',
        ]"
      >
        {{ game?.desc }}
      </div>
    </div>
    <div class="flex flex-row-reverse col-span-full items-center">
      <div
        @click="
          readyToMount
            ? mountDisk(game.id)
            : user == false
            ? $router.push({ name: 'ps3status' })
            : ''
        "
        :class="[
          'rounded-2xl  text-center text-blue-50 text-9xl',
          readyToMount
            ? 'cursor-pointer bg-blue-400'
            : 'cursor-wait ring ring-purple-200 text-purple-200 bg-purple-300 ',
        ]"
      >
        <DiscPlayer v-if="game?.ps3?.info == '/dev_ntfs/PS3ISO'" />
        <ServerPlus v-else-if="game?.ps3?.info == '/net0/PS3ISO'" />
        <Application v-else />
      </div>

      <Backburger
        class="
          px-3
          mx-2
          ring ring-blue-400
          rounded-2xl
          text-center text-blue-400 text-9xl
          cursor-pointer
        "
        @click="$router.go(-1)"
      />
      <div
        id="controllers"
        class="
          p-3
          m-2
          flex flex-row
          place-items-center
          ring ring-blue-400
          rounded-2xl
          text-center text-blue-400 text-8xl
        "
      >
        {{ game?.players ? game?.players : "?" }}
        <my-svg
          v-if="controllers?.move"
          i="move"
          class="w-20 h-20 -ml-10 -mr-4 fill-current"
        />
        <my-svg
          v-else-if="controllers?.guitar"
          i="guitar"
          class="w-20 h-20 fill-current"
        />
        <my-svg v-else i="ps3" class="w-20 h-20" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { DiscPlayer, Backburger, ServerPlus, Application } from "mdue";
export default {
  name: "game",
  components: {
    DiscPlayer,
    Backburger,
    ServerPlus,
    Application,
  },
  setup() {
    const dataStore = inject("$dataStore");
    const route = useRoute();
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      IMGdir: process.env.VUE_APP_IMG_BASE,
      game: dataStore.data.theseGames.find((g) => g.id == route.params.id),
      viewMode: computed(() => dataStore.filters.viewMode),
      playing: computed(() => dataStore?.data?.status?.game?.id),
      user: computed(() => dataStore?.data?.status?.user?.icon != "lock"),
      powerOn: computed(() => dataStore?.data?.status?.on),
      readyToMount: computed(
        () => !state.playing && state.user && state.powerOn
      ),
      controllers: computed(() => {
        return {
          move: dataStore?.data?.gameTags?.controllers?.move.find(
            (G) => G == state.game.id
          ),
          guitar: dataStore?.data?.gameTags?.controllers?.guitar.find(
            (G) => G == state.game.id
          ),
        };
      }),
      mountDisk: (gameId) => {
        dataStore.getters.postData("play", null, { id: gameId });
        dataStore.getters.getData();
        dataStore.filters.history.mounted.push(gameId);
        state.pushHistory("mounted", gameId); //++
      },
      pushHistory: (toWhere, withWhat) => {
        // add to history -- max 10 -- store in browser
        // push only if not in history already
        if (!dataStore.filters.history[toWhere].includes(withWhat))
          dataStore.filters.history[toWhere].push(withWhat);
        if (dataStore.filters.history[toWhere]?.length > 10)
          dataStore.filters.history[toWhere] =
            dataStore.filters.history[toWhere].slice(1);
        localStorage.setItem(
          `history${toWhere == "viewed" ? "VIEW" : "MOUNT"}`,
          JSON.stringify(dataStore.filters.history[toWhere])
        );
      },
    });

    watchEffect(() => {
      // update page when route changed
      const rID = route.params.id;
      state.game = dataStore.data.theseGames.find((g) => g.id == rID);
    });

    // INIT -- add this game to history
    if (!dataStore.filters.history.viewed)
      dataStore.filters.history.viewed = [];
    state.pushHistory("viewed", state.game.id); // ++
    return { ...toRefs(state) };
  },
};
</script>
