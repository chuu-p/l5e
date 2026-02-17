import { Pressable } from "react-native";

type IconButtonProps = {
  icon: React.ReactNode;
  onPress?: () => void;
};

export function IconButton({ icon, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="p-2 rounded-full active:opacity-70"
    >
      {icon}
    </Pressable>
  );
}

