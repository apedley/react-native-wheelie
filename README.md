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

## Multi-column picker

Use `MultiWheelPicker` for side-by-side wheels — like iOS date/time pickers.

```tsx
import { useState } from 'react';
import { MultiWheelPicker } from 'react-native-wheelie';

const hourItems = Array.from({ length: 24 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: i,
}));

const minuteItems = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: i,
}));

export default function TimePicker() {
  const [hours, setHours] = useState(9);
  const [minutes, setMinutes] = useState(30);

  return (
    <MultiWheelPicker
      columns={[
        { items: hourItems, selectedIndex: hours },
        { items: minuteItems, selectedIndex: minutes },
      ]}
      separators={[':']}
      onValuesChange={([h, m]) => {
        setHours(h);
        setMinutes(m);
      }}
    />
  );
}
```

### MultiWheelPicker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `WheelPickerColumn[]` | **required** | Array of column definitions |
| `onValuesChange` | `(indices: number[]) => void` | — | Called when any column settles, with all current indices |
| `itemHeight` | `number` | `44` | Row height in pixels (shared across columns) |
| `visibleItems` | `number` | `5` | Visible rows (shared across columns) |
| `containerStyle` | `ViewStyle` | — | Style for the outer container |
| `indicatorStyle` | `ViewStyle` | — | Style for the unified selection indicator |
| `decelerationRate` | `number` | `0.997` | Momentum deceleration (shared across columns) |
| `separators` | `string[]` | — | Strings rendered between columns (e.g., `[":"]`) |
| `separatorTextStyle` | `TextStyle` | — | Style for separator text |

### WheelPickerColumn

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `WheelPickerItem[]` | **required** | Items for this column |
| `selectedIndex` | `number` | `0` | Currently selected index |
| `flex` | `number` | `1` | Flex weight controlling column width |
| `itemTextStyle` | `TextStyle` | — | Text style for this column's items |
| `renderItem` | `({ item, index }) => ReactElement` | — | Custom renderer for this column |

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
