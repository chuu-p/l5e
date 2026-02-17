
import { useState } from "react";
import { Button, Text, View } from "react-native";
import {
    initialize,
    readRecords,
    requestPermission,
} from "react-native-health-connect";



export default function SleepComponent() {
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



