import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Home, Grid3X3, List, ExternalLink } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useThemeController } from '../theme/theme';
import { ChannelSlider } from '../components/ChannelSlider';
import { ChannelGrid } from '../components/ChannelGrid';
import { channels, type Channel } from '../data/channels';
import { openStreamInBrowser } from '../../utils/streamingHelpers';
import { buildPlayerHtml } from '../../utils/buildPlayerHtml';
import { PLAYER_INJECTED_JS } from '../../utils/playerInjectedJs';
import { getHomeScreenTheme } from './HomeScreen.theme';
import { styles } from './HomeScreen.styles';
import { THEME_CONSTANTS } from '../theme/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { mode } = useThemeController();
  const theme = getHomeScreenTheme(mode);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [showExternalButton, setShowExternalButton] = useState(false);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('[FootieLive Home WebView]', data);
    } catch {
      console.log('[FootieLive Home WebView] Raw message:', event.nativeEvent.data);
    }
  };

  return (
    <Box style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}>
      <Box pointerEvents="none" style={[styles.glow, styles.glowOne, { backgroundColor: theme.glowOne }]} />
      <Box pointerEvents="none" style={[styles.glow, styles.glowTwo, { backgroundColor: theme.glowTwo }]} />
      <Box pointerEvents="none" style={[styles.glow, styles.glowThree, { backgroundColor: theme.glowThree }]} />

      <HStack style={styles.header}>
        <HStack style={styles.headerLeft}>
          <Button
            style={[styles.iconButton, { backgroundColor: theme.surface, borderColor: theme.accentAlt }]}
            onPress={() => navigation.navigate('Home')}
          >
            <ButtonIcon as={Home} color={theme.text} size={18} />
          </Button>
          <VStack>
            <Heading style={[styles.title, { color: theme.text }]}>FootieLive</Heading>
            <Text style={[styles.subtitle, { color: theme.muted }]}>Your matchday control room</Text>
          </VStack>
        </HStack>
        <Button style={styles.linkButton} onPress={() => navigation.navigate('Settings')}>
          <ButtonText style={[styles.linkText, { color: theme.accentAlt }]}>Settings</ButtonText>
        </Button>
      </HStack>

      <VStack style={styles.content}>
        <VStack style={[styles.hero, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <HStack style={styles.heroRow}>
            <Box style={[styles.heroPill, { backgroundColor: theme.accent }]}>
              <Text style={[styles.heroPillText, { color: THEME_CONSTANTS.LIVE_BADGE_TEXT_COLOR }]}>LIVE</Text>
            </Box>
            <Text style={[styles.heroMeta, { color: theme.muted }]}>Streaming now</Text>
          </HStack>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Pick a channel. Play instantly.</Text>
          <Text style={[styles.heroCopy, { color: theme.muted }]}>Tap any card below and the stream pops in under the rail.</Text>
        </VStack>

        <HStack style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Live Channels ({channels.length})
          </Text>
          <HStack style={styles.viewToggle}>
            <Button
              style={[
                styles.toggleButton,
                {
                  backgroundColor: viewMode === 'slider' ? theme.accent : THEME_CONSTANTS.TRANSPARENT,
                  borderColor: theme.accent,
                },
              ]}
              onPress={() => setViewMode('slider')}
            >
              <ButtonIcon
                as={List}
                color={viewMode === 'slider' ? THEME_CONSTANTS.LIVE_BADGE_TEXT_COLOR : theme.accent}
                size={16}
              />
            </Button>
            <Button
              style={[
                styles.toggleButton,
                {
                  backgroundColor: viewMode === 'grid' ? theme.accent : THEME_CONSTANTS.TRANSPARENT,
                  borderColor: theme.accent,
                },
              ]}
              onPress={() => setViewMode('grid')}
            >
              <ButtonIcon
                as={Grid3X3}
                color={viewMode === 'grid' ? THEME_CONSTANTS.LIVE_BADGE_TEXT_COLOR : theme.accent}
                size={16}
              />
            </Button>
          </HStack>
        </HStack>

        {viewMode === 'slider' ? (
          <ChannelSlider channels={channels} onSelect={setSelectedChannel} />
        ) : (
          <Box style={styles.gridContainer}>
            <ChannelGrid channels={channels} onSelect={setSelectedChannel} />
          </Box>
        )}

        {selectedChannel ? (
          <Box style={[styles.playerContainer, { borderColor: theme.accentAlt }]}>
            <HStack style={[styles.playerHeader, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
              <Text style={[styles.playerHeaderLabel, { color: theme.muted }]}>Now Playing</Text>
              <Text style={[styles.playerHeaderTitle, { color: theme.text }]} numberOfLines={1}>
                {selectedChannel.name}
              </Text>
              {showExternalButton && (
                <Button
                  style={[styles.iconButton, { backgroundColor: theme.accent, marginLeft: 8 }]}
                  onPress={() => selectedChannel && openStreamInBrowser(selectedChannel.streamUrl)}
                >
                  <ButtonIcon as={ExternalLink} color={THEME_CONSTANTS.LIVE_BADGE_TEXT_COLOR} size={16} />
                </Button>
              )}
            </HStack>
            <Box style={styles.playerFrame}>
              <WebView
                key={selectedChannel.id} // Force re-render when channel changes
                style={styles.webview}
                source={{
                  html: buildPlayerHtml(selectedChannel.streamUrl),
                  baseUrl: new URL(selectedChannel.streamUrl).origin,
                }}
                originWhitelist={['*']}
                javaScriptEnabled
                injectedJavaScript={PLAYER_INJECTED_JS}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
                mixedContentMode="always"
                allowsInlineMediaPlayback
                onMessage={handleWebViewMessage}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.error('[FootieLive Home] WebView error:', nativeEvent);
                  setShowExternalButton(true);
                }}
                onLoad={() => {
                  console.log('[FootieLive Home] WebView loaded');
                  setShowExternalButton(false); // Reset button state on new load
                }}
                onLoadStart={() => {
                  console.log('[FootieLive Home] WebView load started for:', selectedChannel.streamUrl);
                  setShowExternalButton(false); // Reset button state on load start
                }}
                onLoadEnd={() => console.log('[FootieLive Home] WebView load ended')}
                onHttpError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.error('[FootieLive Home] HTTP error:', nativeEvent.statusCode, nativeEvent.description);
                  setShowExternalButton(true);
                }}
                onRenderProcessGone={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.error('[FootieLive Home] Render process gone:', nativeEvent.didCrash);
                }}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                domStorageEnabled
                startInLoadingState
              />
            </Box>
          </Box>
        ) : (
          <Text style={[styles.helperText, { color: theme.muted }]}>Select a channel to start playing.</Text>
        )}
      </VStack>
    </Box>
  );
}

