import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardTypeOptions } from 'react-native';
import * as yup from 'yup';

import { useActiveTranslation } from '@/hooks';

import { useAuth } from '../auth.hook';

const loginSchemaStatic = yup
  .object({
    email: yup
      .string()
      .email('Auth.errorInvalidEmail')
      .required('Auth.errorEmptyFields'),
    password: yup
      .string()
      .min(6, 'Auth.errorShortPassword')
      .required('Auth.errorEmptyFields'),
  })
  .required();

type LoginFormData = yup.InferType<typeof loginSchemaStatic>;

export const useLogin = () => {
  const { t } = useActiveTranslation();
  const { signIn, loading: isAuthLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchemaStatic),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (data: LoginFormData) => {
    if (isAuthLoading) return;
    try {
      await signIn(data.email.trim(), data.password);
    } catch (err) {
      console.error(err);
    }
  };

  const formFields = useMemo(
    () => [
      {
        id: 'email' as const,
        label: t('Auth.emailLabel'),
        placeholder: t('Auth.emailPlaceholder'),
        keyboardType: 'email-address' as KeyboardTypeOptions,
        secureTextEntry: false,
      },
      {
        id: 'password' as const,
        label: t('Auth.passwordLabel'),
        placeholder: t('Auth.passwordPlaceholder'),
        keyboardType: 'default' as KeyboardTypeOptions,
        secureTextEntry: true,
      },
    ],
    [t],
  );

  const errorKey = errors.email?.message || errors.password?.message;
  const currentError = errorKey ? t(errorKey) : '';

  return {
    formFields,
    control,
    isLoading: isAuthLoading,
    error: currentError,
    isValid,
    onSubmit: handleSubmit(handleLogin),
    t,
  };
};
