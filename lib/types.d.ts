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
    renderItem?: (info: {
        item: WheelPickerItem;
        index: number;
    }) => ReactElement;
}
//# sourceMappingURL=types.d.ts.map