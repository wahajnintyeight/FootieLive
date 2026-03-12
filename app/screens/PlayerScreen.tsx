import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, XStack, YStack } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

export function PlayerScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { channel } = route.params;

  const html = useMemo(
    () => `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: #000; }
      iframe { width: 100%; height: 100%; border: 0; }
    </style>
  </head>
  <body>
    <iframe src="${channel.streamUrl}" allow="autoplay; fullscreen" allowfullscreen></iframe>
  </body>
</html>`,
    [channel.streamUrl]
  );

  return (
    <YStack flex={1} backgroundColor="$background">
      <WebView
        style={styles.webview}
        source={{ html }}
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
      />

      <XStack
        position="absolute"
        top={insets.top + 12}
        left={16}
      >
        <Button
          size="$3"
          circular
          icon={ArrowLeft}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Back"
        />
      </XStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
