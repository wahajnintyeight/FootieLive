import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H3, Text, XStack, YStack } from 'tamagui';
import { Home } from '@tamagui/lucide-icons';
import { ChannelSlider } from '../components/ChannelSlider';
import { channels, type Channel } from '../data/channels';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const handleSelect = useCallback(
    (channel: Channel) => {
      navigation.navigate('Player', { channel });
    },
    [navigation]
  );

  return (
    <YStack flex={1} paddingTop={insets.top} backgroundColor="$background">
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingVertical="$3"
      >
        <XStack alignItems="center" gap="$2">
          <Button
            size="$2"
            circular
            icon={Home}
            accessibilityLabel="Home"
          />
          <H3>FootieLive</H3>
        </XStack>
        <Button
          size="$2"
          chromeless
          onPress={() => navigation.navigate('Settings')}
        >
          Settings
        </Button>
      </XStack>

      <YStack paddingVertical="$4" gap="$3">
        <Text paddingHorizontal="$4" fontSize="$5" fontWeight="700">
          Live Channels
        </Text>
        <ChannelSlider channels={channels} onSelect={handleSelect} />
      </YStack>
    </YStack>
  );
}
