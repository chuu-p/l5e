import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

type ListTileListProps = {
  children: React.ReactNode;
  className?: string;
};

export function ListTileList({ children, className }: ListTileListProps) {
  const items = React.Children.toArray(children);

  return (
    <View className={cn('overflow-hidden rounded-xl border border-border', className)}>
      {items.map((child, index) => (
        <View key={index}>
          {child}
          {index < items.length - 1 && (
            <View className="h-px bg-border ml-16" />
          )}
        </View>
      ))}
    </View>
  );
}

