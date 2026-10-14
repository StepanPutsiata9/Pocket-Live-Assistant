import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useActiveTranslation } from '@/hooks';

import { useAuth } from '../auth.hook';

const registerSchemaStatic = yup
  .object({
    email: yup
      .string()
      .email('Auth.errorInvalidEmail')
      .required('Auth.errorEmptyFields'),
    password: yup
      .string()
      .min(6, 'Auth.errorShortPassword')
      .required('Auth.errorEmptyFields'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Auth.errorPasswordMismatch')
      .required('Auth.errorEmptyFields'),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchemaStatic>;

export const useRegister = () => {
  const { t } = useActiveTranslation();
  const { signUp, loading: isAuthLoading, error: firebaseError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchemaStatic),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    if (isAuthLoading) return;
    try {
      await signUp(data.email.trim(), data.password);
    } catch (err) {
      console.error(err);
    }
  };

  const errorKey =
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message;

  let backendError = '';
  if (typeof firebaseError === 'string') {
    backendError = firebaseError;
  } else if (
    firebaseError &&
    typeof firebaseError === 'object' &&
    'message' in firebaseError
  ) {
    backendError = String(firebaseError.message);
  }

  const currentError = errorKey ? t(errorKey) : backendError;

  return {
    control,
    isLoading: isAuthLoading,
    error: currentError,
    isValid,
    onSubmit: handleSubmit(handleRegister),
    t,
  };
};
