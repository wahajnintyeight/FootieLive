import React from 'react';
import { Box, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';
import type { Channel } from '../data/channels';
import { useThemeController } from '../theme/theme';
import { getChannelCardTheme } from './ChannelCard.theme';
import { styles } from './ChannelCard.styles';

interface ChannelCardProps {
  channel: Channel;
  onPress: (channel: Channel) => void;
}

export const ChannelCard = React.memo<ChannelCardProps>(function ChannelCard({
  channel,
  onPress,
}) {
  const { mode } = useThemeController();
  const theme = getChannelCardTheme(mode);

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
      onPress={() => onPress(channel)}
    >
      <Box style={styles.imageContainer}>
        <Image
          source={{ uri: channel.thumbnail }}
          style={styles.image}
          alt={channel.name}
          resizeMode="cover"
        />
        <Box style={[styles.imageOverlay, { backgroundColor: theme.overlay }]} />
        <Box
          style={[
            styles.badge,
            {
              backgroundColor: theme.accent,
              shadowColor: theme.accentGlow,
            },
          ]}
        >
          <Box style={[styles.badgeDot, { backgroundColor: '#F5F7F0' }]} />
          <Text style={styles.badgeText}>LIVE</Text>
        </Box>
      </Box>
      <VStack style={[styles.footer, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {channel.name}
        </Text>
        <HStack style={styles.metaRow}>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Streaming now
          </Text>
          <Box style={[styles.dot, { backgroundColor: theme.muted }]} />
          <Text style={[styles.subtitle, { color: theme.accent }]}>
            Tap to watch
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
});
