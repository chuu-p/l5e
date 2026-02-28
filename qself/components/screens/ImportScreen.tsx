import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ListTile } from '@/components/molecules/ListTile';
import { ListTileList } from '@/components/organisms/ListTileList';
import { ChevronRightIcon, MoonStarIcon, SunIcon, StarIcon } from 'lucide-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
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

export function ImportScreen() {
  const [latestReadTime, setLatestReadTime] = useState('2023-01-09T12:00:00.405Z');
  const [status, setStatus] = useState('inirial');

  type RecordType =
    | 'ActiveCaloriesBurned'
    | 'BasalBodyTemperature'
    | 'BasalMetabolicRate'
    | 'BloodGlucose'
    | 'BloodPressure'
    | 'BodyFat'
    | 'BodyTemperature'
    | 'BoneMass'
    | 'CervicalMucus'
    | 'CyclingPedalingCadence'
    | 'Distance'
    | 'ElevationGained'
    | 'ExerciseSession'
    | 'FloorsClimbed'
    | 'HeartRate'
    | 'Height'
    | 'Hydration'
    | 'LeanBodyMass'
    | 'MenstruationFlow'
    | 'MenstruationPeriod'
    | 'Nutrition'
    | 'OvulationTest'
    | 'OxygenSaturation'
    | 'Power'
    | 'RespiratoryRate'
    | 'RestingHeartRate'
    | 'SexualActivity'
    | 'SleepSession'
    | 'Speed'
    | 'StepsCadence'
    | 'Steps'
    | 'TotalCaloriesBurned'
    | 'Vo2Max'
    | 'Weight'
    | 'WheelchairPushes';

  // --------------------
  // Permission Helpers
  // --------------------
  const getRecordTypes = (): readonly RecordType[] =>
    [
      'ActiveCaloriesBurned',
      'BasalBodyTemperature',
      'BasalMetabolicRate',
      'BloodGlucose',
      'BloodPressure',
      'BodyFat',
      'BodyTemperature',
      'BoneMass',
      'CervicalMucus',
      'CyclingPedalingCadence',
      'Distance',
      'ElevationGained',
      'ExerciseSession',
      'FloorsClimbed',
      'HeartRate',
      'Height',
      'Hydration',
      'LeanBodyMass',
      'MenstruationFlow',
      'MenstruationPeriod',
      'Nutrition',
      'OvulationTest',
      'OxygenSaturation',
      'Power',
      'RespiratoryRate',
      'RestingHeartRate',
      'SexualActivity',
      'SleepSession',
      'Speed',
      'StepsCadence',
      'Steps',
      'TotalCaloriesBurned',
      'Vo2Max',
      'Weight',
      'WheelchairPushes',
    ] as const;

  const requestAllPermissions = async () => {
    const recordTypes = getRecordTypes();
    const permissionsToRequest = recordTypes.map((type) => ({
      accessType: 'read' as const,
      recordType: type,
    }));

    const allPermissions = [
      ...permissionsToRequest,
      { accessType: 'read' as const, recordType: 'BackgroundAccessPermission' as const },
    ];

    return requestPermission(allPermissions as any[]);
  };

  // --------------------
  // Time Utilities
  // --------------------
  const getWeeklyTimeRanges = (weeksBack: number): { start: Date; end: Date }[] => {
    const now = new Date();
    const ranges: { start: Date; end: Date }[] = [];

    for (let i = 0; i < weeksBack; i++) {
      const end = new Date(now);
      end.setDate(now.getDate() - i * 7 * 50);
      const start = new Date(end);
      start.setDate(end.getDate() - 7 * 50);
      ranges.push({ start, end });
    }
    return ranges;
  };

  const sleep = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 1000)
    );
  };

  const readRecordsInBatches = async (recordType: RecordType, weeks: number) => {
    const weeklyRanges = getWeeklyTimeRanges(weeks);
    const allRecords: any[] = [];

    for (let i = 0; i < weeklyRanges.length; i++) {
      const { start, end } = weeklyRanges[i];
      // console.log(
      //   `Reading ${recordType}, week ${i + 1}/${weeks} (${start.toISOString()} -> ${end.toISOString()})`
      // );

      let pageToken: string | undefined = undefined;

      do {
        try {
          const { records, nextPageToken } = await readRecords(recordType, {
            timeRangeFilter: {
              operator: 'between',
              startTime: start.toISOString(),
              endTime: end.toISOString(),
            },
            pageToken,
            pageSize: 1000, // or any max allowed by the API
          });

          // Add recordType to every record
          records.forEach((record) => (record.recordType = recordType));
          allRecords.push(...records);

          // Update token for next page
          pageToken = nextPageToken;
        } catch (error) {
          console.error(`Failed to read ${recordType}, week ${i + 1}:`, error);
          pageToken = undefined; // stop pagination on error
        }
      } while (pageToken); // keep fetching until no more pages
    }

    return allRecords;
  };

  // --------------------
  // Main Function
  // --------------------
  const readAllHealthData = async () => {
    try {
      const isInitialized = await initialize();
      if (!isInitialized) throw new Error('Health client failed to initialize.');

      await requestAllPermissions();

      const recordTypes = getRecordTypes();
      const allRecords: Record<string, any[]> = {};

      for (const recordType of recordTypes) {
        allRecords[recordType] = await readRecordsInBatches(recordType, 3); // last 50 weeks
        console.log(`Finished ${recordType}, total records: ${allRecords[recordType].length}`);
        // console.log('sleeping start');
        await sleep();
        // console.log('sleeping end');
      }

      console.log('All health data has been read successfully!');
      return allRecords;
    } catch (error) {
      console.error('Failed to read all health data:', error);
      return {};
    }
  };

  function extractEventMeta(record: any) {
    // console.log(JSON.stringify(record));
    return {
      data_type: record.recordType ?? 'unknown', // or record.recordType if you have multiple HC types
      data_source: record?.metadata?.dataOrigin ?? 'unknown',
    };
  }

  const handleInsertDbClick = async () => {
    try {
      console.log('Generate / fetch Health Connect records');
      const recordsByType = await readAllHealthData();
      // console.log('debug recordsByType', recordsByType);

      // Flatten into a single array
      const records = Object.values(recordsByType).flat();

      console.log('Total records:', records.length);

      console.log('Authenticate');
      setStatus('Authenticating...');
      const auth = await pb.collection('users').authWithPassword('chuu801@pm.me', 'artemis1');
      const userId = auth.record.id;

      console.log('Insert records as events');

      let index = 0;
      let maxIndex = records.length;
      for (const record of records) {
        const { data_type, data_source } = extractEventMeta(record);

        console.log(`data_type: ${data_type}, data_source: ${data_source}`);

        // console.log(`record: ${JSON.stringify(record, null, 2)}`);

        await pb.collection('events').create({
          user_id: userId,
          data_type,
          data_source,
          payload: record,
        });
        setStatus(`Inserting record ${++index} of ${maxIndex}`);
      }
    } catch (error) {
      console.error('Failed to insert records:', error);
    }
  };

  return (
    <View className="mt-40 h-full w-full">
      <Button onPress={handleInsertDbClick}>
        <Text>insert test data to db</Text>
      </Button>
      <Text>status: {status}</Text>
    </View>
  );
}
