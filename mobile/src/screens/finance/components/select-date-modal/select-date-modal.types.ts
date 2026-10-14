export interface SelectDateModalProps {
  visible: boolean;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}
