<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import loader from "@monaco-editor/loader";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const container = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  const monaco = await loader.init();

  const editor = monaco.editor.create(container.value!, {
    value: props.modelValue,
    language: "typescript",
    theme: "vs-dark",
    automaticLayout: true,
  });

  editor.onDidChangeModelContent(() => {
    emit("update:modelValue", editor.getValue());
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (editor.getValue() !== v) editor.setValue(v);
    }
  );
});
</script>

<template>
  <div ref="container" style="height: 200px; border: 1px solid #333" />
</template>

