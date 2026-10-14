import { useId } from 'react';
import {
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text } from '@/components/ui/text';

import { useDropdown } from './dropdown.hook';
import { styles } from './dropdown.styles';
import { DropdownProps } from './dropdown.types';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
const DROPDOWN_OFFSET = 50;

export const Dropdown = ({
  id,
  data,
  value,
  onSelect,
  onOpenChange,
  style,
}: DropdownProps & { id?: string }) => {
  const generatedId = useId();
  const dropdownId = id || generatedId;
  const {
    isRendered,
    toggleDropdown,
    handleSelect,
    animatedDropdownStyle,
    animatedIconStyle,
    inputRef,
    dropdownLayout,
    handleToggle,
  } = useDropdown(dropdownId, onSelect, onOpenChange);

  const selectedOption = data.find(item => item.value === value);

  return (
    <View style={[styles.container, style]}>
      <Pressable ref={inputRef} style={styles.inputBox} onPress={handleToggle}>
        <Text variant="body" colorType="main">
          {selectedOption ? selectedOption.label : value}
        </Text>

        <AnimatedIonicons
          name="chevron-down-outline"
          style={[styles.icon, animatedIconStyle]}
        />
      </Pressable>

      {isRendered && (
        <Modal
          visible={true}
          transparent={true}
          animationType="none"
          onRequestClose={toggleDropdown}
          statusBarTranslucent={true}
        >
          <TouchableWithoutFeedback onPress={toggleDropdown}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[
                  styles.dropdownMenu,
                  {
                    top: dropdownLayout.top + DROPDOWN_OFFSET,
                    left: dropdownLayout.left,
                    width: dropdownLayout.width,
                  },
                  animatedDropdownStyle,
                ]}
              >
                <ScrollView
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.scrollContent}
                >
                  {data.map((item, index) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.optionRow(index === data.length - 1)}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text
                        variant="body"
                        style={styles.optionText(value === item.value)}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};
