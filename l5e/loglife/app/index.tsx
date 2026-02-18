import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { App } from '@/App';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

export default function Screen() {
  return (
    <>
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <App />
      </View>
    </>
  );
}

