<template>
  <li class="pl-2">
    <span class="text-blue-800 font-serif border-b border-blue-200">
      <slot name="title" />
    </span>
    <span class="flex flex-row">
      <slot name="row" />
    </span>
    <span class="flex flex-col">
      <slot name="col" />
    </span>
  </li>
</template>

<script>
export default {
  name: "howToLI",
};
</script>
