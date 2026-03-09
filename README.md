# react-native-wheelie

iOS-style wheel picker for React Native — pure JS, powered by Reanimated & Gesture Handler.

## Features

- 3D cylindrical rotation matching the native iOS picker look
- Momentum scrolling with snap-to-item
- Rubber-band overscroll at boundaries
- Animated text color transitions
- Custom item rendering
- Fully controlled via `selectedIndex` / `onIndexChange`

## Installation

```sh
npm install react-native-wheelie
```

### Peer dependencies

Make sure you have these installed and configured in your project:

- `react-native-reanimated` (>= 3.0)
- `react-native-gesture-handler` (>= 2.0)

## Usage

```tsx
import { useState } from 'react';
import { WheelPicker } from 'react-native-wheelie';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <WheelPicker
      items={fruits}
      selectedIndex={index}
      onIndexChange={setIndex}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `WheelPickerItem[]` | **required** | Array of `{ label, value }` objects |
| `selectedIndex` | `number` | `0` | Controlled selected index |
| `onIndexChange` | `(index: number) => void` | — | Called when the wheel settles on a new item |
| `itemHeight` | `number` | `44` | Row height in pixels |
| `visibleItems` | `number` | `5` | Visible rows (odd numbers recommended) |
| `containerStyle` | `ViewStyle` | — | Style for the outer container |
| `itemTextStyle` | `TextStyle` | — | Style for item text |
| `indicatorStyle` | `ViewStyle` | — | Style for the selection indicator |
| `decelerationRate` | `number` | `0.997` | Momentum deceleration (0–1) |
| `renderItem` | `({ item, index }) => ReactElement` | — | Custom item renderer |

## Custom rendering

```tsx
<WheelPicker
  items={colors}
  selectedIndex={index}
  onIndexChange={setIndex}
  renderItem={({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: item.value }} />
      <Text style={{ fontSize: 20 }}>{item.label}</Text>
    </View>
  )}
/>
```

## License

MIT
