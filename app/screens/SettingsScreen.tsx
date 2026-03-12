import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  ButtonIcon,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { themeColors } from '../theme/colors';
import { ThemeMode, useThemeController } from '../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { mode, setMode } = useThemeController();
  const colors = themeColors[mode];

  const handleToggle = useCallback(
    (checked: boolean) => {
      setMode(checked ? ThemeMode.Dark : ThemeMode.Light);
    },
    [setMode]
  );

  return (
    <VStack style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}> 
      <HStack style={styles.header}>
        <HStack style={styles.headerLeft}>
          <Button
            style={[styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}
            onPress={() => navigation.goBack()}
          >
            <ButtonIcon as={ArrowLeft} color={colors.text} size={18} />
          </Button>
          <Heading style={[styles.title, { color: colors.text }]}>Settings</Heading>
        </HStack>
      </HStack>

      <VStack style={styles.content}>
        <VStack style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <HStack style={styles.row}>
            <VStack style={styles.labelContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.description, { color: colors.mutedText }]}>Toggle between light and dark theme</Text>
            </VStack>
            <Switch
              size="md"
              isChecked={mode === ThemeMode.Dark}
              onToggle={handleToggle}
            />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
  },
});
