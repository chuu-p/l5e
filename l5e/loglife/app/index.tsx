import { Text, View } from "react-native";
import SampleExample from "./sample";
import BaseExample from "./base";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <SampleExample />
      <BaseExample />
    </View>
  );
}
