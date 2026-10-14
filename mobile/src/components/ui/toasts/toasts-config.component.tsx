import React from 'react';
import { View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

import { Text } from '@/components/ui/text';

import { styles } from './toasts.styles';

export const toastConfig: ToastConfig = {
  success: props => (
    <View style={styles.successToast}>
      <Text variant="body" style={styles.title}>
        {props.text1}
      </Text>
      {props.text2 && (
        <Text variant="caption" style={styles.subtitle}>
          {props.text2}
        </Text>
      )}
    </View>
  ),
  error: props => (
    <View style={styles.errorToast}>
      <Text variant="body" style={styles.title}>
        {props.text1}
      </Text>
      {props.text2 && (
        <Text variant="caption" style={styles.subtitle}>
          {props.text2}
        </Text>
      )}
    </View>
  ),
};
