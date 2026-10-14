import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { AnimatedInput } from '@/components/ui/animated-input';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';

import { useRegister } from './register.hook';
import { styles } from './register.styles';
import { RegisterScreenNavigationProp } from './register.types';
import { getRegisterFields } from './register.utils';

export const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { control, isLoading, error, isValid, onSubmit, t } = useRegister();

  const formFields = useMemo(() => getRegisterFields(t), [t]);

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>{t('Auth.register')}</Text>

            <View style={styles.inputContainer}>
              {formFields.map(field => (
                <Controller
                  key={field.id}
                  control={control}
                  name={field.id}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <AnimatedInput
                      label={field.label}
                      placeholder={field.placeholder}
                      keyboardType={field.keyboardType}
                      secureTextEntry={field.secureTextEntry}
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              ))}
            </View>

            {!!error && <Text style={styles.error}>{error}</Text>}

            <Button
              title={t('Auth.buttonCreateAccount')}
              variant="primary"
              isLoading={isLoading}
              onPress={onSubmit}
              disabled={!isValid}
            />

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.linkButtonText}>{t('Auth.hasAccount')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
};
