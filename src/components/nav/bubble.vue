<template>
  <div
    :class="[
      'align-top px-1 -ml-3 -mt-4 select-none',
      'h-4',
      'ring-1 ring-purple-100 rounded-full',
      'text-purple-100 text-xs tracking-tighter font-bold',
      'bg-purple-600 bg-opacity-25',
    ]"
  >
    {{ value ? value : "-" }}
  </div>
</template>
<script>
export default {
  name: "navBubble",
  props: { value: { type: String, default: null } },
};
</script>
