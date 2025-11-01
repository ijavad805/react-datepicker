---
title: Calendar
---

The `Calendar` component offers an interactive month view with extensive customization options, including localization, event rendering, and drag-and-drop support.

## Quick Start

1. Install the package:

   ```bash
   npm install @ijavad805/react-datepicker
   ```

2. Render a calendar with default styling and an empty event list:

   ```tsx
   import { Calendar } from '@ijavad805/react-datepicker';

   function AppSimple() {
     return <Calendar events={[]} />;
   }
   ```

## Usage Example

```tsx
import { Calendar, IEvent } from '@ijavad805/react-datepicker';
import moment from 'moment';

function App() {
  return (
    <Calendar
      lang="en"
      theme="blue"
      events={[
        {
          id: 1,
          title: 'Test',
          date: '2023-09-16',
          className: 'test',
          dotColor: '#000',
          disabled: false,
          icon: '$',
        },
      ]}
      onDropEvent={(item: IEvent) => {
        console.log(item);
      }}
      onClickEvent={(item: IEvent) => console.log(item)}
      onDoubleClickEvent={(item: IEvent) => console.log(item)}
      style={{
        height: 600,
      }}
      onDateClick={(date: moment.Moment) => console.log(date)}
    />
  );
}
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `lang` | `"en" \| "fa"` | Language for the calendar. Either English (`"en"`) or Persian (`"fa"`). |
| `theme` | `"blue"` | Theme for the calendar. Currently, only `"blue"` is supported. |
| `events` | `IEvent[]` | Array of calendar events. |
| `onDay` | `(date: string) => { className?: string }` | Customize the appearance of a day by returning a class name. |
| `disabledDate` | `(date: moment.Moment) => boolean` | Disable specific dates by returning `true`. |
| `onClickEvent` | `(item: IEvent) => void` | Handle event click interactions. |
| `onDoubleClickEvent` | `(item: IEvent) => void` | Handle event double-click interactions. |
| `onDropEvent` | `(item: IEvent) => void` | Handle event drag-and-drop interactions. Provide this prop to enable drag-and-drop. |
| `onDateClick` | `(date: string) => void` | Handle clicks on calendar dates. |
| `onMonthChange` | `(start: string, end: string) => void` | Respond to month changes with the new visible range. |
| `style` | `React.CSSProperties` | Apply inline styles to the calendar container. |
| `allowClear` | `boolean` | Allow users to clear the current selection. |

## `IEvent` Interface

Events displayed in the calendar implement the `IEvent` interface:

| Property | Type | Description |
| --- | --- | --- |
| `id` | `number` | Unique identifier for the event. |
| `title` | `React.ReactNode \| string` | Event title as a React node or string. |
| `date` | `DateEvent` | Event date as a string or an object with `start` and `end`. |
| `style` | `React.CSSProperties` | Additional styles for the event. |
| `className` | `string` | Additional class names. |
| `dotColor` | `string` | Color of the event indicator dot. |
| `disabled` | `boolean` | Whether the event is disabled. |
| `icon` | `React.ReactNode` | Icon displayed with the event. |

## Reporting Issues

If you encounter any problems, please let us know:

- Email: [ijavad805@gmail.com](mailto:ijavad805@gmail.com)
- GitHub Issues: [https://github.com/ijavad805/react-datepicker/issues](https://github.com/ijavad805/react-datepicker/issues)
