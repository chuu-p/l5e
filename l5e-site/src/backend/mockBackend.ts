import type { DiaryEntry, MoodEntry } from "@/types/domain";

export async function fetchDiaryEntries(): Promise<DiaryEntry[]> {
  return [
    {
      payload: {
        diary: {
          message: "Today I built a Vue MVP",
          date: "2025-01-15",
        },
      },
    },
  ];
}

export async function fetchMoodEntries(): Promise<MoodEntry[]> {
  return [
    {
      payload: {
        mood: {
          value: 7,
          date: "2025-01-15",
        },
      },
    },
  ];
}
