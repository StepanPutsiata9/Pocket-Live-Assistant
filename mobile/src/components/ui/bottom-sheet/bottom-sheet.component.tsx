import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { forwardRef, memo, useCallback } from 'react';
import { View } from 'react-native';

import {
  DEFAULT_BEHAVIOR_PROPS,
  DEFAULT_SNAP_POINTS,
} from './bottom-sheet.constants';
import { useBottomSheet } from './bottom-sheet.hooks';
import { styles } from './bottom-sheet.styles';
import { BottomSheetProps, BottomSheetRef } from './bottom-sheet.types';

const BottomSheetComponent = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const {
      children,
      enablePanDownToClose = true,
      contentStyle,
      backgroundStyle,
      handleIndicatorStyle,
      snapPoints = DEFAULT_SNAP_POINTS,
      bottomSheetBehaviorProps = DEFAULT_BEHAVIOR_PROPS,
      ...restProps
    } = props;

    const {
      disappearsOnIndex = DEFAULT_BEHAVIOR_PROPS.disappearsOnIndex,
      appearsOnIndex = DEFAULT_BEHAVIOR_PROPS.appearsOnIndex,
      pressBehavior = DEFAULT_BEHAVIOR_PROPS.pressBehavior,
    } = bottomSheetBehaviorProps;

    const { internalRef, handleChange } = useBottomSheet(props, ref);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={disappearsOnIndex}
          appearsOnIndex={appearsOnIndex}
          pressBehavior={pressBehavior}
        />
      ),
      [disappearsOnIndex, appearsOnIndex, pressBehavior],
    );

    return (
      <BottomSheetModal
        ref={internalRef}
        {...restProps}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        detached={true}
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={[backgroundStyle, styles.background]}
        handleIndicatorStyle={[handleIndicatorStyle, styles.handleIndicator]}
        onChange={handleChange}
      >
        <View style={[styles.container, contentStyle]}>{children}</View>
      </BottomSheetModal>
    );
  },
);

BottomSheetComponent.displayName = 'BottomSheet';

export const BottomSheet = memo(BottomSheetComponent);
