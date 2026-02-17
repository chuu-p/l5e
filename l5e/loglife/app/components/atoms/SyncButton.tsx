import { Pressable, Text, ActivityIndicator } from "react-native";

type SyncButtonProps = {
  syncing?: boolean;
  onPress?: () => void;
};

export default function SyncButton({ syncing, onPress }: SyncButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={syncing}
      className="h-10 w-10 items-center justify-center rounded-full bg-neutral-800 active:bg-neutral-700"
    >
      {syncing ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text className="text-lg">⟳</Text>
      )}
    </Pressable>
  );
}

