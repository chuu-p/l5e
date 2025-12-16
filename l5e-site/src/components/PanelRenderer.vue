<script setup lang="ts">
import { computed } from "vue";
import { runPanelScript } from "@/runtime/runPanelScript";
import type { Panel } from "@/types/domain";

const props = defineProps<{
  panel: Panel;
  entries?: any[];
}>();

const output = computed(() => {
  try {
    return runPanelScript(props.panel.script, {
      panel: props.panel,
      entries: props.entries,
    });
  } catch (e) {
    return { error: String(e) };
  }
});
</script>

<template>
  <div class="panel">
    <h3>{{ panel.title }}</h3>

    <pre v-if="output?.error" class="error">
{{ output.error }}
    </pre>

    <div v-else>
      <div v-if="output.text">{{ output.text }}</div>
      <div v-if="output.html" v-html="output.html" />
    </div>
  </div>
</template>

<style scoped>
.panel {
  border: 1px solid #444;
  padding: 12px;
}
.error {
  color: red;
}
</style>

