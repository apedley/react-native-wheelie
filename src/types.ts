import type { ViewStyle, TextStyle } from 'react-native';
import type { ReactElement } from 'react';

export interface WheelPickerItem {
  label: string;
  value: string | number;
}

export interface WheelPickerProps {
  /** Array of items to display */
  items: WheelPickerItem[];
  /** Currently selected item index (default: 0) */
  selectedIndex?: number;
  /** Called when the selected index changes after the wheel settles */
  onIndexChange?: (index: number) => void;
  /** Height of each item row in pixels (default: 44) */
  itemHeight?: number;
  /** Number of visible item rows — odd numbers recommended (default: 5) */
  visibleItems?: number;
  /** Style for the outer container */
  containerStyle?: ViewStyle;
  /** Style applied to all item text */
  itemTextStyle?: TextStyle;
  /** Style for the selection indicator overlay */
  indicatorStyle?: ViewStyle;
  /** Momentum deceleration rate, 0–1 (default: 0.997) */
  decelerationRate?: number;
  /** Custom render function for each item row */
  renderItem?: (info: { item: WheelPickerItem; index: number }) => ReactElement;
  /** Whether to show the selection indicator (default: true) */
  showIndicator?: boolean;
}

export interface WheelPickerColumn {
  /** Items for this column */
  items: WheelPickerItem[];
  /** Currently selected item index in this column (default: 0) */
  selectedIndex?: number;
  /** Flex weight controlling this column's width (default: 1) */
  flex?: number;
  /** Style applied to item text in this column */
  itemTextStyle?: TextStyle;
  /** Custom render function for items in this column */
  renderItem?: WheelPickerProps['renderItem'];
}

export interface MultiWheelPickerProps {
  /** Column definitions */
  columns: WheelPickerColumn[];
  /** Called when any column's selected index changes. Receives all current indices. */
  onValuesChange?: (indices: number[]) => void;
  /** Height of each item row in pixels — shared across all columns (default: 44) */
  itemHeight?: number;
  /** Number of visible item rows — shared across all columns (default: 5) */
  visibleItems?: number;
  /** Style for the outer container wrapping all columns */
  containerStyle?: ViewStyle;
  /** Style for the unified selection indicator overlay */
  indicatorStyle?: ViewStyle;
  /** Momentum deceleration rate, shared across columns (default: 0.997) */
  decelerationRate?: number;
  /** Separator strings rendered between columns (e.g., [":"] for a time picker). Length should be columns.length - 1. */
  separators?: string[];
  /** Style for separator text */
  separatorTextStyle?: TextStyle;
}
