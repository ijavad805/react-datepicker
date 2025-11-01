---
title: Datepicker
---

![React Datepicker](../../poster.jpg)

The `@ijavad805/react-datepicker` package provides a feature-rich datepicker component with built-in support for both English and Persian locales. This guide covers installation, available features, and usage examples to help you get started quickly.

## Features

- Choose between five preset color themes.
- Built-in dark and light modes.
- Configurable loading indicator with custom content support.
- Use any custom input component.
- Highlight days with custom events and styles.
- Flexible date formatting options.
- Disable specific dates programmatically.
- Provide a custom footer for the datepicker.
- Automatic or manual positioning modes.

## Quick Start

1. Install the package:

   ```bash
   npm install @ijavad805/react-datepicker
   ```

2. Import the component and render it with the default configuration:

   ```tsx
   import { Datepicker } from '@ijavad805/react-datepicker';

   function AppSimple() {
     return <Datepicker />;
   }
   ```

## Advanced Usage

Use the component with the full set of customization options:

```tsx
import { Datepicker } from '@ijavad805/react-datepicker';
import moment from 'moment';

function App() {
  return (
    <Datepicker
      footer={(moment, setValue) => (
        <div
          onClick={() => {
            if (setValue) setValue(moment());
          }}
        >
          Today
        </div>
      )}
      closeWhenSelectADay
      dayEffects={[
        {
          day: '2022-09-12',
          color: 'red',
          dotColor: 'red',
          title: 'Whatever you want',
        },
      ]}
      disabled={false}
      disabledDate={(day) => day === moment()}
      format="YYYY-MM-DD"
      input={<input placeholder="Select a date" />}
      onOpen={() => {
        console.log('datepicker is open');
      }}
      lang="en"
      loading={false}
      modeTheme="dark"
      theme="blue"
      defaultValue={moment()}
      adjustPosition="auto"
      onChange={(val) => {
        console.log(val.format());
      }}
    />
  );
}
```

## Reporting Issues

If you encounter any problems, feel free to reach out:

- Email: [ijavad805@gmail.com](mailto:ijavad805@gmail.com)
- GitHub Issues: [https://github.com/ijavad805/react-datepicker/issues](https://github.com/ijavad805/react-datepicker/issues)
