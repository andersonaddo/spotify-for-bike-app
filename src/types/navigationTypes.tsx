// https://reactnavigation.org/docs/typescript/

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    MainScreen: undefined;
    Settings: undefined
  };

export type MainScreenNavProps = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;
export type SettingsNavProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

