import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type DropdownListener = (id: string | null) => void;
const listeners = new Set<DropdownListener>();

const notifyListeners = (id: string | null) => {
  listeners.forEach(listener => listener(id));
};

export const useDropdown = (
  dropdownId: string,
  onSelect: (value: string) => void,
  onOpenChange?: (isOpen: boolean) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const progress = useSharedValue(0);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
    progress.value = withTiming(
      0,
      {
        duration: 200,
        easing: Easing.out(Easing.ease),
      },
      finished => {
        if (finished) {
          runOnJS(setIsRendered)(false);
        }
      },
    );
  }, [onOpenChange, progress]);

  const openDropdown = useCallback(() => {
    notifyListeners(dropdownId);
    setIsRendered(true);
    setIsOpen(true);
    onOpenChange?.(true);
    progress.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
  }, [dropdownId, onOpenChange, progress]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [isOpen, closeDropdown, openDropdown]);

  useEffect(() => {
    const handleGlobalChange = (id: string | null) => {
      if (id !== dropdownId && isOpen) {
        closeDropdown();
      }
    };

    listeners.add(handleGlobalChange);
    return () => {
      listeners.delete(handleGlobalChange);
    };
  }, [dropdownId, isOpen, closeDropdown]);

  const handleSelect = (itemValue: string) => {
    onSelect(itemValue);
    closeDropdown();
  };

  const animatedDropdownStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleY: progress.value }],
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));
  const inputRef = useRef<View>(null);
  const [dropdownLayout, setDropdownLayout] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleToggle = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setDropdownLayout({
          top: y + height,
          left: x,
          width: width,
        });
        toggleDropdown();
      });
    } else {
      toggleDropdown();
    }
  };

  return {
    isOpen,
    isRendered,
    toggleDropdown,
    handleSelect,
    animatedDropdownStyle,
    animatedIconStyle,
    inputRef,
    dropdownLayout,
    setDropdownLayout,
    handleToggle,
  };
};
