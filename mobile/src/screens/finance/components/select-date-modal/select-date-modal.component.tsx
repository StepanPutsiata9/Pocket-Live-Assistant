import { Calendar } from '@/components/ui/calendar';

import { SelectDateModalProps } from './select-date-modal.types';

export const SelectDateModal = ({
  visible,
  selectedDate,
  onDateSelect,
  onClose,
}: SelectDateModalProps) => {
  return (
    <Calendar
      modal
      open={visible}
      selectedDate={selectedDate}
      onDateSelect={date => {
        onDateSelect(date);
        onClose();
      }}
      onCancel={onClose}
    />
  );
};
