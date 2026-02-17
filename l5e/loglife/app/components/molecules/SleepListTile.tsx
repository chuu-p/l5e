import { View, Text } from "react-native";
import { ProgressBar } from "../atoms/CircularProgress";
import { SyncButton } from "../atoms/SyncButton";

type SleepListTileProps = {
  score: number;
  title: string;
  subtitle: string;
  syncing?: boolean;
  onSync?: () => void;
};

export function SleepListTile({
  score,
  title,
  subtitle,
  syncing,
  onSync,
}: SleepListTileProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-2xl bg-neutral-900 p-4">
      {/* Left */}
      <CircularProgress value={score} />

      {/* Middle */}
      <View className="flex-1 gap-1">
        <Text className="text-base font-semibold text-white">
          {title}
        </Text>
        <Text className="text-sm text-neutral-400">
          {subtitle}
        </Text>

      </View>

      {/* Right */}
      <SyncButton syncing={syncing} onPress={onSync} />
    </View>
  );
}

