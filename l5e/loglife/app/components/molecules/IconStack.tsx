import { View } from "react-native";

type IconStackProps = {
  back: React.ReactNode;
  front: React.ReactNode;
  size?: number;
};

export function IconStack({
  back,
  front,
  size = 40,
}: IconStackProps) {
  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center"
    >
      <View className="absolute">
        {back}
      </View>
      <View className="absolute">
        {front}
      </View>
    </View>
  );
}

