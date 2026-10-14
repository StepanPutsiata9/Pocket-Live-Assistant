import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardTypeOptions } from 'react-native';

import { RegisterFormData } from './register.hook';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

export interface RegisterFieldItem {
  id: keyof RegisterFormData;
  label: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry: boolean;
}
