<template>
  <component :is="xRefIcon" />
</template>

<script>
import { AccountChild, HomeModern, Face, Memory, HelpCircle } from "mdue";
export default {
  name: "familySVGs",
  props: { u: { type: String, default: "error" } },
  components: { AccountChild, HomeModern, Face, Memory, HelpCircle },
  data(props) {
    return {
      xRefIcon:
        props.u == "ben"
          ? "AccountChild"
          : props.u == "mel"
          ? "Face"
          : props.u == "marc"
          ? "Memory"
          : props.u == "family"
          ? "HomeModern"
          : "HelpCircle",
    };
  },
};
</script>
