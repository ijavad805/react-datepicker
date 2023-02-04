# react-datepicker

![alt text](./poster.jpg?raw=true)
A cool datepicker for english and persian you can see some features here :

 <ul>
 <li>You can choosing between 5 colors.</li>
 <li>Dark mode and Light mode</li>
 <li>Show loading... and you can change it to whatever you want :)</li>
 <li>You can use any input component for this datepicker</li>
 <li>You can set event for days and make them different vs normal days</li>
 <li>Change your input format </li>
 <li>Disable some date</li>
 <li>Set your custom footer for datepicker</li>
 <li>Auto adjust position</li>
 <li>Calendar</li>
 </ul>

&#127775; If you like this Datepicker, please bookmark it on your github with the star button.

## Installation

Use the package manager [npm](https://npmjs.com) to install @ijavad805/react-datepicker.

```bash
npm install @ijavad805/react-datepicker
```

## Usage

```javascript
import { Datepicker } from '@ijavad805/react-datepicker';
// simple
function AppSimple() {
  return <Datepicker />;
}

// full options
function App() {
  return (
    <Datepicker
      footer={(moment, setValue) => {
        return (
          <>
            <div
              onClick={() => {
                if (setValue) setValue(moment());
              }}
            >
              Today
            </div>
          </>
        );
      }}
      closeWhenSelectADay={true} // boolean
      dayEffects={[
        {
          day: '2022-09-12',
          color: 'red',
          dotColor: 'red',
          title: 'What ever you want',
        },
      ]}
      disabled={false} // disable input
      disabledDate={(day) => day === moment()} // today should be disabled
      format={'YYYY-MM-DD'}
      input={<input placeholder="Select a date" />} // whatever you want
      onOpen={() => {
        console.log('datepicker is open');
      }}
      lang={'en'} // en and fa
      loading={false} // show loading in datepicker if is open
      modeTheme={'dark'} // dark and light
      theme={'blue'} // blue , orange , red , green , yellow
      defaultValue={moment()}
      adjustPosition={'auto'} // auto, right-top, left-top, right-bottom, left-bottom, modal
      onChange={(val: any) => {
        console.log(val.format());
      }}
    />
  );
}
```

## Calendar ( BETA )

The first version of the calendar is ready but it is just v1 and, yes, it may have some bugs. Please report bugs. I will fix it. I am working on design in v2. You will see a beautiful calendar.

### en

![alt text](./calendar-en.png?raw=true)

### fa

![alt text](./calendar-fa.png?raw=true)

## Usage Calendar

```javascript
const App = () => {
  return (
      <Calendar
         lang = "en"
         theme = "blue"
         events={[
          {
            id: 1, // it should unique
            title: "Test",
            date: "2022-12-27",
            style: {
              // what ever you want
            }
            className: "test",
            dotColor: "#000",
            disabled: false,
            icon: "$", // also you can use component
          }
         ]}
         onDropEvent={(item: IEvent) => {
          console.log(item);
         }}
         onClickEvent={(item: IEvent) => console.log(item)}
         onDoubleClickEvent={(item: IEvent) => console.log(item)}
         style={{
          height: 600
         }}
         onDateClick={(date: moment.Moment) => console.log(date)}
    />
  )
}

```

## Coming soon ...

This is my todo list for feature :

<ul>
<li>Range picker</li>
<li>Calender new ui</li>
</ul>

## Report issues

My friend, if you see any bugs, please tell me:

<ul>
<li>Email: ijavad805@gmail.com</li>
<li>Github issues: <a href="https://github.com/ijavad805/react-datepicker/issues" target="_blank">https://github.com/ijavad805/react-datepicker/issues</a></li>
</ul>
