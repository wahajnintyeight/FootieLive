import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config/v3';

const tamaguiConfig = createTamagui(config);

type AppTamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
