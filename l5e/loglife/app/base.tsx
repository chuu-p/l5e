import pb from "./pb";
import { Text, View, Button } from "react-native";
import { useState } from "react";


export default function BaseExample() {
  const [data, setData] = useState("Loading...");

  async function handlePress() {
    try {
      await pb
        .collection("users")
        .authWithPassword("chuu801@pm.me", "artemis1");

      const result = await pb.collection("entries").getList();
      setData(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(err);
      setData("Error loading data");
    }
  }

  return (
    <View>
      <Text style={{ color: "white" }}>{data}</Text>
      <Button title="Load pb data" onPress={handlePress} />
    </View>
  );
}


