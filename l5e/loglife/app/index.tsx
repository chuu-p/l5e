import { Text, View } from "react-native";
import SampleExample from "./sample";
import BaseExample from "./base";
import SleepComponent from "./SleepComponent";
import "./global.css"

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
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text style={{ color: "white" }}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <SampleExample />
      <BaseExample />
      <SleepComponent />
    </View>
  );
}
