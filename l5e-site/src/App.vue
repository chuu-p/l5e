<script setup lang="ts">
import { ref, onMounted } from "vue";
import PanelRenderer from "@/components/PanelRenderer.vue";
import MonacoEditor from "@/components/MonacoEditor.vue";
import type { Panel } from "@/types/domain";
import { fetchDiaryEntries, fetchMoodEntries } from "@/backend/mockBackend";

const diaryEntries = ref<any[]>([]);
const moodEntries = ref<any[]>([]);

onMounted(async () => {
    diaryEntries.value = await fetchDiaryEntries();
    moodEntries.value = await fetchMoodEntries();
});

const panels = ref<Panel[]>([
    {
        id: "1",
        title: "Static Text",
        type: "staticText",
        data: { text: "Hello World" },
        script: `
return {
  text: panel.data.text
}
    `,
    },
    {
        id: "2",
        title: "Diary Entry",
        type: "diary",
        script: `
const entry = entries[0];
return {
  text: entry.payload.diary.message + " (" + entry.payload.diary.date + ")"
}
    `,
    },
    {
        id: "3",
        title: "Mood",
        type: "mood",
        script: `
const avg =
  entries.reduce((s, e) => s + e.payload.mood.value, 0) / entries.length;

return {
  text: "Average mood: " + avg.toFixed(1)
}
    `,
    },
]);
</script>

<template>
    <main>
        <h1>Grafana-like MVP</h1>

        <div v-for="panel in panels" :key="panel.id">
            <PanelRenderer
                :panel="panel"
                :entries="
                    panel.type === 'diary'
                        ? diaryEntries
                        : panel.type === 'mood'
                          ? moodEntries
                          : []
                "
            />

            <MonacoEditor v-model="panel.script" />
        </div>
    </main>
</template>

<style>
body {
    background: #111;
    color: #ddd;
    font-family: system-ui;
}
main {
    padding: 16px;
}
</style>
