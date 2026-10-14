import { Button } from '@/components/ui/button';
import { useActiveTranslation } from '@/hooks';

import { SubmitButtonProps } from './submit-button.types';

export const SubmitButton = (props: SubmitButtonProps) => {
  const { onPress, isEditing, isSubmitDisabled } = props;

  const { t } = useActiveTranslation();

  return (
    <Button
      title={
        isEditing ? t('Schedule.habits.save') : t('Schedule.habits.submit')
      }
      onPress={onPress}
      disabled={isSubmitDisabled}
      textVariant={'h3'}
    />
  );
};
