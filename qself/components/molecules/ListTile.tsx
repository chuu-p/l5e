import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export type ListTileProps = {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

export function ListTile({
  leading,
  title,
  subtitle,
  trailing,
  onPress,
  className,
}: ListTileProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-center gap-4 px-4 py-3 active:bg-muted/50',
        className
      )}
    >
      {/* Leading */}
      {leading && (
        <View className="items-center justify-center">
          {leading}
        </View>
      )}

      {/* Title + Subtitle */}
      <View className="flex-1 gap-0.5">
        {typeof title === 'string' ? (
          <Text className="text-base font-medium">{title}</Text>
        ) : (
          title
        )}

        {subtitle &&
          (typeof subtitle === 'string' ? (
            <Text className="text-sm text-muted-foreground">
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </View>

      {/* Trailing */}
      {trailing && (
        <View className="items-center justify-center">
          {trailing}
        </View>
      )}
    </Pressable>
  );
}

