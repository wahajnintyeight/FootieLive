import type { Channel } from '../data/channels';

export type RootStackParamList = {
  Home: undefined;
  Player: { channel: Channel };
  Settings: undefined;
};
