<template>
  <div
    class="
      mx-auto
      px-4
      pb-4
      pt-1
      col-span-full
      bg-blue-200
      ring-blue-300 ring-2nb
      rounded-xl
      text-sm
      shadow-lg
      flex flex-row
      select-none
      pr-10
      pl-10
    "
    :class="{ hidden: !timeLeft }"
  >
    <div class="text-8xl self-center pr-1 mt-2 -mb-2 -ml-16 text-blue-500">
      <slot name="icon"><ApplicationSettings /> </slot>
    </div>

    <div
      class="
        text-sm text-blue-400
        flex flex-col
        gap-0
        align-middle
        pt-2
        max-w-min
      "
    >
      <div
        class="
          text-lg text-blue-500
          font-bold
          border-b border-blue-500 border-1
          min-w-max
        "
      >
        <slot> no favourites yet </slot>
      </div>
      <div class="flex flex-row Xw-1/2">
        <div class="self-start">
          <slot name="msg"> this msg will self-destruct</slot>
        </div>
        <div class="self-end -mr-14">
          <svg-pie
            :n="timeLeft"
            :d="total"
            :label="false"
            color="blue"
            class="animate-pulse w-10"
          />
          <div class="flex flex-row justify-center">
            <div class="text-sm">
              {{ $moment(timeLeft, "X").format("m") }}
            </div>
            <div class="transform scale-75">
              {{ $moment(timeLeft, "X").format("ss") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import { ApplicationSettings } from "mdue";
import svgPie from "./svgPie.vue";
export default {
  name: "warningMSG",
  components: { svgPie, ApplicationSettings },
  setup() {
    const state = reactive({
      timer: null,
      total: null,
      timeLeft: 60 + Math.floor(Math.random() * 30),
      tick: setInterval(() => state.timeLeft--, 1000),
    });
    watchEffect(() => {
      if (state.timer && state.timeLeft) {
        state.tick();
      } else if (state.timeLeft < 0) {
        if (state?.timer) state.timer.cancel();
        state.timer = null;
        state.timeLeft = 0;
      }
    });

    if (!state.total) state.total = state.timeLeft;

    return { ...toRefs(state) };
  },
};
</script>

<style></style>
