# react-datepicker
![alt text](./poster.jpg?raw=true)
A cool datepicker for english and persian you can see some features here :
 <ul>
 <li>You can choice betweens 5 color.</li>
 <li>Dark mode and Light mode</li>
 <li>Show loading... and you can change it to whatever you want :)</li>
 <li>You can use any input component for this datepicker</li>
 <li>You can set event for days and make them different vs normal days</li>
 <li>Change your input format </li>
 <li>Disable some date</li>
 <li>Set your custom footer for datepicker</li>
 </ul>

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
  return (
    <Datepicker />
    )
}

// full options
function App() {
  return (
    <Datepicker footer={(moment, setValue) => {
        return (
           <>
             <div
              onClick={() => {
                  if (setValue) setValue(moment());
                }}>
                Today
             </div>
            </>
        )
    }}
    closeWhenSelectADay={true} // boolean
    dayEffects={[
      {
        day: "2022-09-12",
        color: "red",
        dotColor: "red",
        title: "What ever you want"
      }
    ]} 
    disabled={false} // disable input
    disabledDate={(day) => day === moment()} // today should be disabled
    format={"YYYY-MM-DD"}
    input={<input placeholder='Select a date'/>} // whatever you want
    onOpen={() => {
      console.log("datepicker is open");
    }} 
    lang={"en"} // en and fa
    loading={false} // show loading in datepicker if is open
    modeTheme={"dark"} // dark and light
    theme={"blue"} // blue , orange , red , green , yellow
    onChange={(val: any) => {
      console.log(val.format());
    }} />
  );
}

```

## Coming soon ...
This is my todo list for feature :
<ul>
<li>Auto adjust</li>
<li>Pick year</li>
<li>Pick month</li>
<li>Pick weak</li>
<li>Pick time</li>
<li>Range picker</li>
<li>Calender</li>
</ul>

## Report issues
My friend, if you see any bugs, please tell me, I check my mails more then my SMS: 
<ul>
<li>Email: ijavad805@gmail.com</li>
<li>Github issues: <a href="https://github.com/ijavad805/react-datepicker/issues" target="_blank">https://github.com/ijavad805/react-datepicker/issues</a></li>
</ul>