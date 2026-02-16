
import { Text, View, Button } from "react-native";
import { useState } from "react";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";

export default function SampleExample() {
  const [data, setData] = useState("Loading...");

  async function handlePress() {
    try {
      await initialize();

      await requestPermission([
        { accessType: "read", recordType: "ActiveCaloriesBurned" },
      ]);

      const { records } = await readRecords("ActiveCaloriesBurned", {
        timeRangeFilter: {
          operator: "between",
          startTime: "2023-01-09T12:00:00.405Z",
          endTime: "2023-01-09T23:53:15.405Z",
        },
      });

      console.log(JSON.stringify(records, null, 2))
      setData(JSON.stringify(records, null, 2));
    } catch (err) {
      console.log(`Error: ${String(err)}`);
      setData(`Error: ${String(err)}`);
    }
  }

  return (
    <View>
      <Text style={{ color: "white" }}>{data}</Text>
      <Button title="Load data" onPress={handlePress} />
    </View>
  );
}

