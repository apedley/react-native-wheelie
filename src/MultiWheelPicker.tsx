import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WheelPicker } from './WheelPicker';
import type { MultiWheelPickerProps } from './types';

export const MultiWheelPicker: React.FC<MultiWheelPickerProps> = ({
  columns,
  onValuesChange,
  itemHeight = 44,
  visibleItems = 5,
  containerStyle,
  indicatorStyle,
  decelerationRate,
  separators,
  separatorTextStyle,
}) => {
  if (columns.length === 0) {
    return null;
  }

  const containerHeight = itemHeight * visibleItems;
  const centerY = (containerHeight - itemHeight) / 2;

  // Track the latest indices so onValuesChange always receives the full picture
  const indicesRef = useRef<number[]>(
    columns.map((c) => c.selectedIndex ?? 0),
  );

  // Keep ref in sync when column count changes
  if (indicesRef.current.length !== columns.length) {
    indicesRef.current = columns.map((c) => c.selectedIndex ?? 0);
  }

  const handleColumnChange = useCallback(
    (columnIndex: number, itemIndex: number) => {
      indicesRef.current[columnIndex] = itemIndex;
      onValuesChange?.([...indicesRef.current]);
    },
    [onValuesChange],
  );

  return (
    <View style={[styles.container, { height: containerHeight }, containerStyle]}>
      <View style={styles.columnsRow}>
        {columns.map((column, colIdx) => (
          <React.Fragment key={colIdx}>
            <View style={{ flex: column.flex ?? 1 }}>
              <WheelPicker
                items={column.items}
                selectedIndex={column.selectedIndex}
                onIndexChange={(idx) => handleColumnChange(colIdx, idx)}
                itemHeight={itemHeight}
                visibleItems={visibleItems}
                itemTextStyle={column.itemTextStyle}
                renderItem={column.renderItem}
                decelerationRate={decelerationRate}
                showIndicator={false}
              />
            </View>
            {separators?.[colIdx] != null && colIdx < columns.length - 1 && (
              <View style={styles.separatorContainer} pointerEvents="none">
                <Text style={[styles.separatorText, separatorTextStyle]}>
                  {separators[colIdx]}
                </Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Unified selection indicator spanning all columns */}
      <View
        pointerEvents="none"
        style={[
          styles.indicator,
          { top: centerY, height: itemHeight },
          indicatorStyle,
        ]}
      />
    </View>
  );
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
