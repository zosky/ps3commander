<template>
  <div
    class="table max-w-max mx-auto overflow-x-scroll overflow-y-visible my-6"
  >
    <div class="table-caption">
      <div
        :class="[
          'text-xl font-bold text-blue-700',
          'border-b border-blue-300',
          'px-4 sm:pt-6',
        ]"
      >
        git<em>-auto-</em>commit-log
      </div>
    </div>
    <div
      v-for="(commit, ix) in gitLog"
      :key="commit.commit"
      :class="[
        'table-row justify-between hover:bg-blue-300 hover:text-blue-600',
        { 'bg-blue-200': ix % 2 },
        { 'text-blue-600 text-base sm:text-lg': 0 == ix % 10 },
      ]"
    >
      <div class="table-cell text-right font-serif pl-3 whitespace-nowrap">
        {{
          0 != ix % 10
            ? $moment(commit.author.date).from($moment())
            : $moment(commit.author.date).format("YYYY MM DD")
        }}
      </div>
      <div class="table-cell font-mono font-light text-blue-400 px-3 text-sm">
        {{ commit.abbreviated_commit }}
      </div>
      <div class="table-cell font-bold pr-3 text-xs sm:text-lg">
        {{
          commit.subject
            .replaceAll("|", " |")
            .replaceAll("github.com:zosky/", "")
        }}
      </div>
    </div>
  </div>
</template>

<script>
import gitLogJson from "@/store/gitLog.json";
export default {
  name: "gitLog",
  setup() {
    return {
      gitLog: gitLogJson,
    };
  },
};
</script>

<style></style>
