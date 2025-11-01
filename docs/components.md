---
sidebar_position: 2
---

# Component API

## `<Datepicker />`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| string \| null` | `null` | Current selected date. |
| `onChange` | `(value: Date \| null) => void` | — | Fired when the user selects a date. |
| `calendarType` | `'gregorian' \| 'jalali'` | `'gregorian'` | Switch between Gregorian and Jalali calendars. |
| `locale` | `'en' \| 'fa'` | `'en'` | Controls numeral rendering. |
| `showToday` | `boolean` | `true` | Displays a shortcut button for today. |
| `disableBeforeToday` | `boolean` | `false` | Prevents selecting dates in the past. |

Additional props are forwarded to the underlying Ant Design `DatePicker` component.

## `<Calendar />`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date` | `new Date()` | Initial date shown on the calendar. |
| `onChange` | `(value: Date) => void` | — | Fired when the active date changes. |
| `calendarType` | `'gregorian' \| 'jalali'` | `'gregorian'` | Calendar type to display. |
| `locale` | `'en' \| 'fa'` | `'en'` | Locale used for numerals. |

See the source in `src/components` for advanced usage examples.
