<template>
  <svg viewBox="0 0 20 20">
    <circle r="10" cx="10" cy="10" fill="#ffffff44" />
    <circle
      r="5"
      cx="10"
      cy="10"
      fill="transparent"
      transform="rotate(-90) translate(-20)"
      stroke-width="10"
      :stroke="color"
      :stroke-dasharray="`calc(${n / d}*31.4) 31.4`"
    />
    <template v-if="label">
      <text
        x="50%"
        y="55%"
        font-size="100%"
        dominant-baseline="middle"
        text-anchor="middle"
        :style="{ 'mix-blend-mode': 'difference', fill: `${color}` }"
        class="font-bold"
      >
        {{ n }}
      </text>
      <text
        x="85%"
        y="85%"
        font-size="40%"
        dominant-baseline="middle"
        text-anchor="end"
        Xtransform="rotate(90,10,10)"
        :style="{ 'mix-blend-mode': 'difference', fill: `${color}` }"
        class="font-light"
      >
        {{ d - n }}
      </text>
    </template>
  </svg>
</template>

<script>
export default {
  name: "SvgPIE",
  props: {
    n: { type: Number, default: 30 },
    d: { type: Number, default: 100 },
    // size: { type: Number, default: 15 },
    label: { type: Boolean, default: true },
    color: { type: String, default: "#d1201f" },
  },
};
</script>

<style></style>
