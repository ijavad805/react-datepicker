---
sidebar_position: 1
---

# Getting Started

React Datepicker ships with an English and Persian calendar experience. This documentation is built with Docusaurus and replaces the legacy Storybook examples.

## Installation

```bash
npm install @ijavad805/react-datepicker
```

## Basic usage

```tsx
import { Datepicker } from "@ijavad805/react-datepicker";

function Example() {
  return <Datepicker onChange={(value) => console.log(value)} />;
}
```

## Calendar only

```tsx
import { Calendar } from "@ijavad805/react-datepicker";

export function CalendarExample() {
  return <Calendar value={new Date()} onChange={(value) => console.log(value)} />;
}
```

## Localization

The components understand both Gregorian and Jalali calendars out of the box. Set the `calendarType` prop to switch between `gregorian` and `jalali` calendars. Use the `locale` prop to control numeral rendering.

```tsx
<Datepicker calendarType="jalali" locale="fa" />
```

## Styling

The package ships with ready-to-use styles. Import the bundled stylesheet once in your application entry point.

```ts
import "@ijavad805/react-datepicker/dist/react-datepicker.css";
```

Customize styles by overriding the generated CSS classes in your own stylesheet.
