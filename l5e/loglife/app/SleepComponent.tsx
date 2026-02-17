import { View, Text } from "react-native";

export default function SleepComponent() {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <View className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
        <Text className="text-neon text-2xl font-black tracking-tighter">
          SYSTEM ACTIVE
        </Text>
        <Text className="text-zinc-500 mt-2">Syncing sleep data...</Text>
      </View>
    </View>
  );
}
