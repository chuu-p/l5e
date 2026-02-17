import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View } from "react-native";

type ProgressBarProps = {
  value: number; // 0–100
};

export default function CircularProgress({ value }: ProgressBarProps) {
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={value}
      tintColor="#00e0ff"
      onAnimationComplete={() => console.log("onAnimationComplete")}
      backgroundColor="#3d5875"
    />
  );
}
