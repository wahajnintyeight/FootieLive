import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import type { Channel } from '../data/channels';
import { ChannelCard } from './ChannelCard';

type ChannelSliderProps = {
  channels: Channel[];
  onSelect: (channel: Channel) => void;
};

export function ChannelSlider({ channels, onSelect }: ChannelSliderProps) {
  const renderItem = useCallback(
    ({ item }: { item: Channel }) => (
      <ChannelCard channel={item} onPress={onSelect} />
    ),
    [onSelect]
  );

  return (
    <FlatList
      data={channels}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <Box style={styles.separator} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  separator: {
    width: 16,
  },
});
