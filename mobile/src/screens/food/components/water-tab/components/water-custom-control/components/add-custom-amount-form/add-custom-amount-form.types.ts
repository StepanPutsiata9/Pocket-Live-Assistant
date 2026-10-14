export interface AddCustomAmountFormProps {
  customValue: string;
  setCustomValue: (customValue: string) => void;
  handleCustomSubmit: () => void;
  handleCancel: () => void;
}
