import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface ConfirmationModalConfig {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
}

interface ConfirmationModalContextValue extends ConfirmationModalConfig {
  visible: boolean;
  openModal: (config: ConfirmationModalConfig) => void;
  closeModal: () => void;
}

const ConfirmationModalContext = createContext<
  ConfirmationModalContextValue | undefined
>(undefined);

export const ConfirmationModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ConfirmationModalContextValue>({
    visible: false,
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => {},
    openModal: () => {},
    closeModal: () => {},
  });

  const openModal = (config: ConfirmationModalConfig) =>
    setModal(prev => ({ ...prev, ...config, visible: true }));
  const closeModal = () => setModal(prev => ({ ...prev, visible: false }));

  return (
    <ConfirmationModalContext.Provider
      value={{ ...modal, openModal, closeModal }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      'useConfirmationModal must be used within ConfirmationModalProvider',
    );
  }
  return context;
};
