import { View } from 'react-native';

import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';

import { styles } from './toggle-row.styles';
import { ToggleRowProps } from './toggle-row.types';

export const ToggleRow = ({
  label,
  title,
  description,
  value,
  onValueChange,
  icon,
  style,
  containerStyle,
  disabled = false,
  switchAnimationDuration,
  switchKey,
}: ToggleRowProps) => {
  styles.useVariants({
    isDisabled: disabled,
  });

  return (
    <View style={[styles.root, style]}>
      {label && (
        <Text variant="bodySmall" colorType="secondary">
          {label}
        </Text>
      )}

      <View style={[styles.container, containerStyle]}>
        <View style={styles.content}>
          {icon && <View>{icon}</View>}
          <View style={styles.textContainer}>
            <Text variant="body" colorType="main">
              {title}
            </Text>
            {description && (
              <Text variant="caption" colorType="secondary">
                {description}
              </Text>
            )}
          </View>
        </View>

        <Switch
          key={switchKey}
          value={value}
          onValueChange={onValueChange}
          animationDuration={switchAnimationDuration}
        />
      </View>
    </View>
  );
};
