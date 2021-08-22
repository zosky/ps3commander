<template>
  <div class="dropdown-wrapper float-right mr-2 mt-2">
    <div class="w-3 h-3 rounded-t-full bg-blue-500 -mb-2" />
    <div
      :class="[
        'bg-blue-500 bg-opacity-90 text-blue-50',
        'mt-1 z-10 w-40 max-w-max text-xs',
        'rounded absolute shadow-lg',
      ]"
    >
      <ul class="list-none overflow-hidden rounded py-2 text-right">
        <transition-group name="fade">
          <li
            v-for="i in list"
            :key="i"
            :class="[
              'px-2 justify-evenly',
              'transition duration-300',
              'hover:scale-110 hover:bg-blue-700',
            ]"
          >
            {{ i }}
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropDown",
  props: { list: { type: Array, default: () => [] } },
};
</script>

<style scoped>
/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
