import { colors, sizes } from '@theme/tokens';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './week-navigator.styles';
import { PeriodNavigatorProps } from './week-navigator.types';

export const WeekNavigator = ({
  rangeStart,
  rangeEnd,
  offset,
  period,
  onPrev,
  onNext,
}: PeriodNavigatorProps) => {
  const isCurrentPeriod = offset === 0;

  const { i18n } = useActiveTranslation();

  const label =
    period === 'week'
      ? `${format(rangeStart, 'dd MMMM yyyy', {
          locale: i18n.language === 'ru' ? ru : enUS,
        })} – ${format(rangeEnd, 'dd MMMM yyyy', {
          locale: i18n.language === 'ru' ? ru : enUS,
        })}`
      : format(rangeStart, 'MMM yyyy', {
          locale: i18n.language === 'ru' ? ru : enUS,
        });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPrev}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicon
          name="chevron-back"
          size={sizes.icon.lg}
          color={colors.primary}
        />
      </TouchableOpacity>

      <Text variant="bodySmall" colorType="main" style={styles.label}>
        {label}
      </Text>

      <TouchableOpacity
        onPress={onNext}
        disabled={isCurrentPeriod}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={isCurrentPeriod && styles.arrowDisabled}>
          <Ionicon
            name="chevron-forward"
            size={sizes.icon.lg}
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
