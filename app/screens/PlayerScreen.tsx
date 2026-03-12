import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  ButtonIcon,
} from '@gluestack-ui/themed';
import { ArrowLeft, ExternalLink } from 'lucide-react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { themeColors } from '../theme/colors';
import { useThemeController } from '../theme/theme';
import { openStreamInBrowser } from '../../utils/streamingHelpers';
import { buildPlayerHtml } from '../../utils/buildPlayerHtml';
import { PLAYER_INJECTED_JS } from '../../utils/playerInjectedJs';
import { styles } from './PlayerScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

export function PlayerScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { channel } = route.params;
  const { mode } = useThemeController();
  const colors = themeColors[mode];
  const [showExternalButton, setShowExternalButton] = useState(false);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('[FootieLive Player WebView]', data);
    } catch {
      console.log('[FootieLive Player WebView] Raw message:', event.nativeEvent.data);
    }
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('[FootieLive Player] WebView error:', nativeEvent);
    setShowExternalButton(true);
  };

  const handleWebViewLoad = () => {
    console.log('[FootieLive Player] WebView loaded successfully');
  };

  const handleWebViewLoadStart = () => {
    console.log('[FootieLive Player] WebView load started for:', channel.streamUrl);
  };

  return (
    <Box style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          html: buildPlayerHtml(channel.streamUrl),
          baseUrl: new URL(channel.streamUrl).origin,
        }}
        originWhitelist={['*']}
        javaScriptEnabled
        injectedJavaScript={PLAYER_INJECTED_JS}
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        mixedContentMode="always"
        allowsInlineMediaPlayback
        onMessage={handleWebViewMessage}
        onError={handleWebViewError}
        onLoad={handleWebViewLoad}
        onLoadStart={handleWebViewLoadStart}
        onLoadEnd={() => console.log('[FootieLive Player] WebView load ended')}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('[FootieLive Player] HTTP error:', nativeEvent.statusCode, nativeEvent.description);
          setShowExternalButton(true);
        }}
        domStorageEnabled
        startInLoadingState
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      />

      <Box style={[styles.backButton, { top: insets.top + 12 }]}> 
        <Button
          style={[styles.iconButton, { backgroundColor: colors.iconButton }]}
          onPress={() => navigation.goBack()}
        >
          <ButtonIcon as={ArrowLeft} color={colors.text} size={18} />
        </Button>
      </Box>

      {showExternalButton && (
        <Box style={[styles.backButton, { top: insets.top + 60, right: 16 }]}> 
          <Button
            style={[styles.iconButton, { backgroundColor: colors.iconButton }]}
            onPress={() => openStreamInBrowser(channel.streamUrl)}
          >
            <ButtonIcon as={ExternalLink} color={colors.text} size={18} />
          </Button>
        </Box>
      )}
    </Box>
  );
}
