import { useState } from "react";
import { SleepDataTile } from "../organisms/SleepDataTile";

type SyncState = "idle" | "syncing" | "synced";

export default function SleepSyncContainer() {
  const [syncState, setSyncState] = useState<SyncState>("idle");

  async function handleSync() {
    setSyncState("syncing");

    try {
      // pretend async work
      await new Promise((r) => setTimeout(r, 1500));
      setSyncState("synced");
    } catch {
      setSyncState("idle");
    }
  }

  return (
    <SleepSyncContainer
      score={82}
      title="Sleep"
      subtitle="7h 42m • Last night"
      syncState={syncState}
      onSync={handleSync}
    />
  );
}
