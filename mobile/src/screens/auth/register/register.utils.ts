import { TFunction } from 'i18next';

import { RegisterFieldItem } from './register.types';

export const getRegisterFields = (t: TFunction): RegisterFieldItem[] => [
  {
    id: 'email',
    label: t('Auth.emailLabel'),
    placeholder: t('Auth.emailPlaceholder'),
    keyboardType: 'email-address',
    secureTextEntry: false,
  },
  {
    id: 'password',
    label: t('Auth.passwordLabel'),
    placeholder: t('Auth.passwordPlaceholder'),
    keyboardType: 'default',
    secureTextEntry: true,
  },
  {
    id: 'confirmPassword',
    label: t('Auth.confirmPasswordLabel'),
    placeholder: t('Auth.confirmPasswordPlaceholder'),
    keyboardType: 'default',
    secureTextEntry: true,
  },
];
