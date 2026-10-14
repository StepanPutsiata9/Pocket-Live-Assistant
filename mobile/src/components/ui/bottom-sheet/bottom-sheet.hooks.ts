import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ForwardedRef, useCallback, useImperativeHandle, useRef } from 'react';

import { BottomSheetProps, BottomSheetRef } from './bottom-sheet.types';

export const useBottomSheet = (
  props: BottomSheetProps,
  ref: ForwardedRef<BottomSheetRef>,
) => {
  const { onClose } = props;

  const internalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => ({
      open: () => internalRef.current?.present(),
      close: () => internalRef.current?.dismiss(), // Также у модалки лучше вызывать dismiss()
      openOnIndex: (index: number) => {
        internalRef.current?.present();
        internalRef.current?.snapToIndex(index);
      },
    }),
    [],
  );

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  return {
    internalRef,
    handleChange,
  };
};
