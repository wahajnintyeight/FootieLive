import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, H3, Switch, Text, XStack, YStack } from 'tamagui';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useThemeController } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { mode, setMode } = useThemeController();

  const handleToggle = useCallback(
    (checked: boolean) => {
      setMode(checked ? 'dark' : 'light');
    },
    [setMode]
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
            icon={ArrowLeft}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Back"
          />
          <H3>Settings</H3>
        </XStack>
      </XStack>

      <YStack padding="$4" gap="$3">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$5" fontWeight="600">
            Dark Mode
          </Text>
          <Switch checked={mode === 'dark'} onCheckedChange={handleToggle}>
            <Switch.Thumb animation="quick" />
          </Switch>
        </XStack>
      </YStack>
    </YStack>
  );
}
