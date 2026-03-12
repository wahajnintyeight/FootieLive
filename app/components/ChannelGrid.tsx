import React from 'react';
import { FlatList } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import type { Channel } from '../data/channels';
import { ChannelCardCompact } from './ChannelCardCompact';
import { styles } from './ChannelGrid.styles';

interface ChannelGridProps {
  channels: Channel[];
  onSelect: (channel: Channel) => void;
  numColumns?: number;
}

export const ChannelGrid = React.memo<ChannelGridProps>(function ChannelGrid({
  channels,
  onSelect,
  numColumns = 2,
}) {
  const renderChannel = ({ item }: { item: Channel }) => (
    <Box style={styles.gridItem}>
      <ChannelCardCompact channel={item} onPress={onSelect} />
    </Box>
  );

  return (
    <FlatList
      data={channels}
      renderItem={renderChannel}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
    />
  );
});