import React from 'react';
import { View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  LinearTransition,
  SlideOutLeft,
} from 'react-native-reanimated';

import { TransactionRow } from '@/components/ui/transaction-row';

import { RightAction } from './components';
import { useItem } from './transaction-item.hook';
import { styles } from './transaction-item.styles';
import { TransactionItemProps } from './transaction-item.types';

const TransactionItemComponent = ({ item, onDelete }: TransactionItemProps) => {
  const {
    category,
    formattedDate,
    formattedAmount,
    swipeableRef,
    animatedContainerStyle,
    handleSwipeableWillOpen,
  } = useItem(item, onDelete);

  const content = (
    <View style={styles.container}>
      <TransactionRow
        item={item}
        categoryLabel={category}
        formattedDate={formattedDate}
        formattedAmount={formattedAmount}
      />
    </View>
  );

  if (!onDelete) return content;

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      exiting={SlideOutLeft.duration(200)}
      style={[styles.itemWrapper, animatedContainerStyle]}
    >
      <Swipeable
        ref={swipeableRef}
        friction={1.5}
        enableTrackpadTwoFingerGesture
        rightThreshold={100}
        renderRightActions={(_progress, drag) => <RightAction drag={drag} />}
        onSwipeableWillOpen={handleSwipeableWillOpen}
        containerStyle={styles.swipeableContainer}
      >
        {content}
      </Swipeable>
    </Animated.View>
  );
};

export const TransactionItem = React.memo(TransactionItemComponent);
