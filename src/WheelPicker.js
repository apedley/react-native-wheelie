import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDecay, withTiming, cancelAnimation, runOnJS, interpolate, interpolateColor, Extrapolation, Easing, } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const PickerItem = memo(({ index, item, scrollY, itemHeight, centerY, radius, maxAngle, itemTextStyle, renderItem, }) => {
    const anglePerItem = itemHeight / radius;
    const animatedStyle = useAnimatedStyle(() => {
        const currentIndex = -scrollY.value / itemHeight;
        const offset = index - currentIndex;
        const angle = offset * anglePerItem;
        // Items far outside the visible arc — hide completely
        if (Math.abs(angle) > maxAngle + 0.15) {
            return {
                opacity: 0,
                transform: [{ translateY: -9999 }],
            };
        }
        const clamped = Math.min(Math.max(angle, -maxAngle), maxAngle);
        // Cylindrical projection
        const y = radius * Math.sin(clamped);
        const rotateXDeg = -(clamped * 180) / Math.PI;
        const absAngle = Math.abs(clamped);
        const opacity = interpolate(absAngle, [0, maxAngle * 0.55, maxAngle], [1, 0.6, 0.12], Extrapolation.CLAMP);
        return {
            opacity,
            transform: [
                { perspective: 800 },
                { translateY: centerY + y },
                { rotateX: `${rotateXDeg}deg` },
            ],
        };
    });
    // Animate text color: selected → dark, far → lighter gray
    const animatedTextStyle = useAnimatedStyle(() => {
        const currentIndex = -scrollY.value / itemHeight;
        const dist = Math.abs(index - currentIndex);
        const color = interpolateColor(dist, [0, 2, 4], [
            '#000000',
            '#6B6B6B',
            '#A0A0A0',
        ]);
        return { color };
    });
    if (renderItem) {
        return (_jsx(Animated.View, { style: [styles.item, { height: itemHeight }, animatedStyle], children: renderItem({ item, index }) }));
    }
    return (_jsx(Animated.View, { style: [styles.item, { height: itemHeight }, animatedStyle], children: _jsx(Animated.Text, { style: [styles.itemText, itemTextStyle, animatedTextStyle], numberOfLines: 1, children: item.label }) }));
});
// ---------------------------------------------------------------------------
// WheelPicker
// ---------------------------------------------------------------------------
export const WheelPicker = ({ items, selectedIndex = 0, onIndexChange, itemHeight = 44, visibleItems = 5, containerStyle, itemTextStyle, indicatorStyle, decelerationRate = 0.997, renderItem, showIndicator = true, }) => {
    const containerHeight = itemHeight * visibleItems;
    const centerY = (containerHeight - itemHeight) / 2;
    const radius = containerHeight / 2;
    const maxAngle = Math.PI / 2;
    const minScrollY = -(items.length - 1) * itemHeight;
    const maxScrollY = 0;
    const scrollY = useSharedValue(-selectedIndex * itemHeight);
    const lastScrollY = useSharedValue(-selectedIndex * itemHeight);
    const isUserScrolling = useRef(false);
    // ------ sync with controlled selectedIndex ------
    useEffect(() => {
        if (!isUserScrolling.current) {
            scrollY.value = withTiming(-selectedIndex * itemHeight, {
                duration: 300,
                easing: Easing.out(Easing.cubic),
            });
        }
    }, [selectedIndex, itemHeight]);
    const setScrolling = useCallback((value) => {
        isUserScrolling.current = value;
    }, []);
    const reportIndex = useCallback((idx) => {
        onIndexChange === null || onIndexChange === void 0 ? void 0 : onIndexChange(idx);
    }, [onIndexChange]);
    // ------ worklet: snap to nearest item ------
    const snapToNearest = (fromY) => {
        'worklet';
        const idx = Math.round(-fromY / itemHeight);
        const clamped = Math.max(0, Math.min(items.length - 1, idx));
        scrollY.value = withTiming(-clamped * itemHeight, { duration: 400, easing: Easing.out(Easing.cubic) }, (finished) => {
            if (finished) {
                runOnJS(setScrolling)(false);
            }
        });
        runOnJS(reportIndex)(clamped);
    };
    // ------ gesture ------
    const panGesture = Gesture.Pan()
        .activeOffsetY([-5, 5])
        .onBegin(() => {
        cancelAnimation(scrollY);
        lastScrollY.value = scrollY.value;
        runOnJS(setScrolling)(true);
    })
        .onUpdate((e) => {
        let newY = lastScrollY.value + e.translationY;
        // Rubber-band at boundaries
        if (newY > maxScrollY) {
            newY = maxScrollY + (newY - maxScrollY) * 0.3;
        }
        else if (newY < minScrollY) {
            newY = minScrollY + (newY - minScrollY) * 0.3;
        }
        scrollY.value = newY;
    })
        .onEnd((e) => {
        // If already out-of-bounds, spring back and snap
        if (scrollY.value > maxScrollY || scrollY.value < minScrollY) {
            const clampedY = Math.min(maxScrollY, Math.max(minScrollY, scrollY.value));
            snapToNearest(clampedY);
            return;
        }
        // Momentum → snap
        scrollY.value = withDecay({
            velocity: e.velocityY,
            deceleration: decelerationRate,
            clamp: [minScrollY, maxScrollY],
        }, (finished) => {
            if (finished) {
                snapToNearest(scrollY.value);
            }
        });
    });
    // ------ render ------
    return (_jsx(GestureDetector, { gesture: panGesture, children: _jsxs(Animated.View, { style: [styles.container, { height: containerHeight }, containerStyle], children: [items.map((item, i) => (_jsx(PickerItem, { index: i, item: item, scrollY: scrollY, itemHeight: itemHeight, centerY: centerY, radius: radius, maxAngle: maxAngle, itemTextStyle: itemTextStyle, renderItem: renderItem }, `${item.value}-${i}`))), showIndicator && (_jsx(View, { pointerEvents: "none", style: [
                        styles.indicator,
                        { top: centerY, height: itemHeight },
                        indicatorStyle,
                    ] }))] }) }));
};
// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    item: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 22,
        fontWeight: '400',
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
//# sourceMappingURL=WheelPicker.js.map