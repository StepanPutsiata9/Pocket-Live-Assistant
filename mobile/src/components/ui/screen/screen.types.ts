import React from 'react';
import { ViewProps } from 'react-native';

export interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  edges?: ('top' | 'bottom')[];
}
