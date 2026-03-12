import React from 'react';
import { Card, Image, Text, YStack } from 'tamagui';
import type { Channel } from '../data/channels';

type ChannelCardProps = {
  channel: Channel;
  onPress: (channel: Channel) => void;
};

export const ChannelCard = React.memo(function ChannelCard({
  channel,
  onPress,
}: ChannelCardProps) {
  return (
    <Card
      elevate
      bordered
      width={220}
      height={160}
      borderRadius="$5"
      overflow="hidden"
      pressTheme
      onPress={() => onPress(channel)}
    >
      <Image
        source={{ uri: channel.thumbnail }}
        width="100%"
        height={110}
        resizeMode="cover"
      />
      <YStack padding="$3" gap="$1" backgroundColor="$background">
        <Text fontSize="$4" fontWeight="700" numberOfLines={1}>
          {channel.name}
        </Text>
      </YStack>
    </Card>
  );
});
