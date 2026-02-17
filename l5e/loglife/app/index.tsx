import { Icon, Text, View } from "react-native";
import SampleExample from "./sample";
import BaseExample from "./base";
import SleepComponent from "./SleepComponent";
import ListTile from "./templates/ListTile";
import IconStack from "./components/molecules/IconStack";
import "./global.css";

export function Icon(props: React.ComponentProps<typeof Ionicons>) {
  return <Ionicons {...props} />;
}

export default function Index() {
  return (
    <View className="flex flex-1 justify-center items-center bg-black text-white">
      <ListTile
        leading={
          <IconStack
            back={<Icon name="circle" />}
            front={<Icon name="check" />}
          />
        }
        title={<Text>Title</Text>}
        subtitle={<Text>Subtitle</Text>}
        trailing={<IconButton icon={<Icon name="chevron-right" />} />}
        onPress={() => {}}
      />
    </View>
  );
}
