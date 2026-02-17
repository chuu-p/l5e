import { Text, TextStyle } from "react-native";

interface TypographyProps {
  text: string;
  style?: TextStyle; // Optional: Allows you to override styles later
}

export default function Typography({ text, style }: TypographyProps) {
  return (
    <Text style={[{ color: "white" }, style]}>
      {text}
    </Text>
  );
}
