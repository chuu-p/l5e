import { Text, View } from "react-native";

type SleepScoreBadgeProps = {
  score: number;
};

export default function SleepScoreBadge({ score }: SleepScoreBadgeProps) {
  return (
    <View className="w-12 items-center">
      <Text className="text-xl">😴</Text>
      <Text className="text-xs text-neutral-400 mt-0.5">{score}</Text>
    </View>
  );
}
