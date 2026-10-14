import { Text } from '@/components/ui/text';
import { useActiveTranslation } from '@/hooks';

import { styles } from './screen-title.styles';

export const ScreenTitle = ({ titleKey }: { titleKey: string }) => {
  const { t } = useActiveTranslation();
  return (
    <Text variant="h1" colorType="main" style={styles.title} numberOfLines={1}>
      {t(titleKey)}
    </Text>
  );
};
