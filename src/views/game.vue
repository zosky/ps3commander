<template>
  <div class="p-2 grid grid-cols-2">
    <img :src="`/images/${game?.images?.image}`" :alt="game?.id" />
    <div>
      <div
        :class="[
          'mt-10 mb-3 pt-4 w-max p-3',
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
          'flex flex-row justify-start gap-3',
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
      <div class="text-2xl w-full flex flex-row p-2 items-center">
        {{ game?.players }}<span class="text-sm">player</span>
        <div>
          {{
            game?.ps3?.info == "/net0/PS3ISO"
              ? "@lan"
              : game?.ps3?.info == "/dev_ntfs/PS3ISO"
              ? "@hdd"
              : game?.ps3?.info
          }}
        </div>
      </div>
    </div>
    <div
      :class="[
        'col-span-full p-4 m-3',
        'ring ring-blue-300',
        'text-blue-800 text-xs',
        'rounded-2xl shadow-sm',
      ]"
    >
      {{ game?.desc }}
    </div>
    <div
      class="w-full p-3 m-2 bg-blue-400 rounded-2xl text-center text-blue-50"
      @click="$router.go(-1)"
    >
      back
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import gamesList from "@/store/ps3games.json";
export default {
  name: "game",
  setup() {
    const route = useRoute();
    const state = reactive({
      DEV: process.env.NODE_ENV == "development",
      game: gamesList.find((g) => g.id == route.params.id),
    });
    return { ...toRefs(state) };
  },
};
</script>
