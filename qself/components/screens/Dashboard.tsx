import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ListTile } from '@/components/molecules/ListTile';
import { ListTileList } from '@/components/organisms/ListTileList';
import { ChevronRightIcon, MoonStarIcon, SunIcon, StarIcon } from 'lucide-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTailwind } from 'nativewind';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import { useState } from 'react';

const readSampleData = async () => {
  // initialize the client
  const isInitialized = await initialize();

  // request permissions
  const grantedPermissions = await requestPermission([
    { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
  ]);

  // check if granted
  const { records } = await readRecords('ActiveCaloriesBurned', {
    timeRangeFilter: {
      operator: 'between',
      startTime: '2023-01-09T12:00:00.405Z',
      endTime: '2023-01-09T23:53:15.405Z',
    },
  });

  return records;
};

export function Dashboard() {
  const [data, setData] = useState('inirial');

  const handleClick = async () => {
    console.log('onClick');
    const _data = await readSampleData();
    setData(JSON.stringify(_data));
  };

  return (
    <View className="mt-40 h-full w-full">
      <ListTileList>
        <ListTile
          leading={
            <View>
              <AnimatedCircularProgress
                size={80}
                width={8}
                backgroundWidth={5}
                fill={50}
                tintColor="#ffffff"
                tintColorSecondary="#ff0000"
                backgroundColor="#3F51B5"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round">
                {(fill) => <Icon as={MoonStarIcon} className="size-10 text-indigo-500" />}
              </AnimatedCircularProgress>
            </View>
          }
          title="7h 16min"
          subtitle="Last synced 2h ago"
          trailing={
            <Button onPress={handleClick}>
              <Text>sync</Text>
            </Button>
          }
        />
      </ListTileList>
      <Text>{data}</Text>
    </View>
  );
}
