import { View } from 'react-native';

import { AddCustomAmountButton } from './components';
import { AddCustomAmountForm } from './components';
import { ClearButton } from './components';
import { useWaterCustomControl } from './water-custom-control.hook';
import { styles } from './water-custom-control.styles';

export const WaterCustomControl = () => {
  const {
    isInputVisible,
    setCustomValue,
    customValue,
    handleCustomSubmit,
    waterAmount,
    handleClear,
    handleAddCustomAmount,
    handleCancel,
  } = useWaterCustomControl();

  return (
    <View style={styles.bottomControlsContainer}>
      {isInputVisible ? (
        <AddCustomAmountForm
          customValue={customValue}
          setCustomValue={setCustomValue}
          handleCustomSubmit={handleCustomSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        <>
          <AddCustomAmountButton onPress={handleAddCustomAmount} />
          <ClearButton onPress={handleClear} waterAmount={waterAmount} />
        </>
      )}
    </View>
  );
};
