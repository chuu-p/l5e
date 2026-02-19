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
import { useState } from 'react';
import pb from '@/lib/pb';
import {
  readRecords,
  insertRecords,
  requestPermission,
  initialize,
  RecordingMethod,
  SleepSessionRecord,
} from 'react-native-health-connect';

// Helper function to generate random integers
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Mock function to generate sleep stages mirroring the Kotlin version
const generateSleepStages = (bedtime: Date, wakeUp: Date) => {
  return [
    {
      stage: 2, // 2 generally represents 'STAGE_AWAKE' or 'STAGE_SLEEPING' depending on the exact version enums.
      startTime: bedtime.toISOString(),
      endTime: wakeUp.toISOString(),
    },
  ];
};

const writeSampleSleepData = async () => {
  try {
    const isInitialized = await initialize();
    if (!isInitialized) {
      console.log('Health Connect is not initialized');
      return;
    }

    const grantedPermissions = await requestPermission([
      { accessType: 'write', recordType: 'SleepSession' },
    ]);

    // Check if permission was granted before proceeding (simplified check)
    if (
      !grantedPermissions.some((p) => p.recordType === 'SleepSession' && p.accessType === 'write')
    ) {
      console.log('Write permission for SleepSession denied');
      return;
    }

    const records: SleepSessionRecord[] = [];
    const notesArray = [
      'Slept well',
      'Restless night',
      'Woke up multiple times',
      'Deep sleep',
      'Vivid dreams',
    ];

    // Make yesterday the last day of the sleep data and truncate to the start of the day
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    lastDay.setHours(0, 0, 0, 0);

    // Create 7 days-worth of sleep data
    for (let i = 0; i < 7; i++) {
      // Calculate wakeUp time (7:00 AM to 9:59 AM)
      const wakeUp = new Date(lastDay);
      wakeUp.setDate(wakeUp.getDate() - i);
      wakeUp.setHours(getRandomInt(7, 10)); // 7, 8, or 9
      wakeUp.setMinutes(getRandomInt(0, 60));

      // Calculate bedtime time the day before (7:00 PM to 9:59 PM)
      const bedtime = new Date(wakeUp);
      bedtime.setDate(bedtime.getDate() - 1);
      bedtime.setHours(getRandomInt(19, 22)); // 19, 20, or 21
      bedtime.setMinutes(getRandomInt(0, 60));

      const sleepSession: SleepSessionRecord = {
        recordType: 'SleepSession',
        startTime: bedtime.toISOString(),
        endTime: wakeUp.toISOString(),
        notes: notesArray[getRandomInt(0, notesArray.length)],
        stages: generateSleepStages(bedtime, wakeUp),
        metadata: {
          recordingMethod: RecordingMethod.RECORDING_METHOD_MANUAL_ENTRY,
        },
      };

      records.push(sleepSession);
    }

    const ids = await insertRecords(records);
    console.log('Records inserted ', { ids });
    return ids;
  } catch (error) {
    console.error('Error writing sleep data: ', error);
  }
};

const readSleepSampleData = async () => {
  // initialize the client
  const isInitialized = await initialize();

  // request permissions
  const grantedPermissions = await requestPermission([
    { accessType: 'read', recordType: 'SleepSession' },
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
  const [pbData, setPbData] = useState('inirial pb');
  const [writeData, setWriteData] = useState('inirial write');

  const handleClick = async () => {
    console.log('onClick');
    const _data = await readSampleData();
    setData(JSON.stringify(_data));
  };

  const handleInsertClick = async () => {
    const data = await writeSampleSleepData();
    setWriteData(data);
  };

  const handlePbClick = async () => {
    await pb
      .collection('users') // or your auth collection
      .authWithPassword('chuu801@pm.me', 'artemis1');

    // 2️⃣ Fetch data
    const result = await pb.collection('entries').getList(); // page, perPage

    setPbData(JSON.stringify(result));
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
            <Button onPress={console.log}>
              <Text>sync</Text>
            </Button>
          }
        />
      </ListTileList>
      <Button onPress={handleClick}>
        <Text>debug health</Text>
      </Button>
      <Button onPress={handlePbClick}>
        <Text>debug pocketbase</Text>
      </Button>
      <Button onPress={handleInsertClick}>
        <Text>insert test data</Text>
      </Button>
      <Text>{data}</Text>
      <Text>{pbData}</Text>
      <Text>{writeData}</Text>
    </View>
  );
}
