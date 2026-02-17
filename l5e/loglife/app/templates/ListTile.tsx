import { Pressable, View } from "react-native";

type ListTileProps = {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

export function ListTile({
  leading,
  title,
  subtitle,
  trailing,
  onPress,
  className = "",
}: ListTileProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-4 py-3 ${className}`}
    >
      {leading && (
        <View className="mr-4 justify-center">
          {leading}
        </View>
      )}

      <View className="flex-1 justify-center">
        {title}
        {subtitle && (
          <View className="mt-0.5">
            {subtitle}
          </View>
        )}
      </View>

      {trailing && (
        <View className="ml-4 justify-center">
          {trailing}
        </View>
      )}
    </Pressable>
  );
}

