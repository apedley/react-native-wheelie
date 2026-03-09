import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WheelPicker } from './WheelPicker';
export const MultiWheelPicker = ({ columns, onValuesChange, itemHeight = 44, visibleItems = 5, containerStyle, indicatorStyle, decelerationRate, separators, separatorTextStyle, }) => {
    if (columns.length === 0) {
        return null;
    }
    const containerHeight = itemHeight * visibleItems;
    const centerY = (containerHeight - itemHeight) / 2;
    // Track the latest indices so onValuesChange always receives the full picture
    const indicesRef = useRef(columns.map((c) => { var _a; return (_a = c.selectedIndex) !== null && _a !== void 0 ? _a : 0; }));
    // Keep ref in sync when column count changes
    if (indicesRef.current.length !== columns.length) {
        indicesRef.current = columns.map((c) => { var _a; return (_a = c.selectedIndex) !== null && _a !== void 0 ? _a : 0; });
    }
    const handleColumnChange = useCallback((columnIndex, itemIndex) => {
        indicesRef.current[columnIndex] = itemIndex;
        onValuesChange === null || onValuesChange === void 0 ? void 0 : onValuesChange([...indicesRef.current]);
    }, [onValuesChange]);
    return (_jsxs(View, { style: [styles.container, { height: containerHeight }, containerStyle], children: [_jsx(View, { style: styles.columnsRow, children: columns.map((column, colIdx) => {
                    var _a;
                    return (_jsxs(React.Fragment, { children: [_jsx(View, { style: { flex: (_a = column.flex) !== null && _a !== void 0 ? _a : 1 }, children: _jsx(WheelPicker, { items: column.items, selectedIndex: column.selectedIndex, onIndexChange: (idx) => handleColumnChange(colIdx, idx), itemHeight: itemHeight, visibleItems: visibleItems, itemTextStyle: column.itemTextStyle, renderItem: column.renderItem, decelerationRate: decelerationRate, showIndicator: false }) }), (separators === null || separators === void 0 ? void 0 : separators[colIdx]) != null && colIdx < columns.length - 1 && (_jsx(View, { style: styles.separatorContainer, pointerEvents: "none", children: _jsx(Text, { style: [styles.separatorText, separatorTextStyle], children: separators[colIdx] }) }))] }, colIdx));
                }) }), _jsx(View, { pointerEvents: "none", style: [
                    styles.indicator,
                    { top: centerY, height: itemHeight },
                    indicatorStyle,
                ] })] }));
};
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    columnsRow: {
        flex: 1,
        flexDirection: 'row',
    },
    separatorContainer: {
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    separatorText: {
        fontSize: 22,
        fontWeight: '400',
        color: '#000',
    },
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(60, 60, 67, 0.29)',
    },
});
//# sourceMappingURL=MultiWheelPicker.js.map