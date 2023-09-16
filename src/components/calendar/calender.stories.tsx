import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "antd/dist/antd.css";
import Calender from ".";
import moment from "moment";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Calender",
    component: Calender,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Calender>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Calender> = args => (
    <div style={{ direction: args.lang === "fa" ? "rtl" : "ltr" }}>
        <Calender {...args} style={{ height: 600 }} />
    </div>
);

const fakeEvents = [
    {
        date: { start: "2023-07-03", end: "2023-07-08" },
        id: 625,
        className: "style_event__i+3Eb style_doneStatus__E8fPq",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-07-05", end: "2023-07-11" },
        id: 626,
        className: "style_event__i+3Eb style_doingStatus__w0gMV",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-07-10", end: "2023-07-12" },
        id: 627,
        className: "style_event__i+3Eb style_doneStatus__E8fPq",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-07-15", end: "2023-07-20" },
        id: 628,
        className: "style_event__i+3Eb style_doneStatus__E8fPq",
        title: "مرحله چهارم",
        icon: null,
    },
    {
        date: { start: "2023-07-17", end: "2023-07-23" },
        id: 629,
        className: "style_event__i+3Eb style_undoneStatus__MIaz-",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-07-19", end: "2023-07-23" },
        id: 630,
        className: "style_event__i+3Eb style_undoneStatus__MIaz-",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-07-25", end: "2023-07-30" },
        id: 631,
        className: "style_event__i+3Eb style_stopStatus__FIH02",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-07-31", end: "2023-08-03" },
        id: 632,
        className: "style_event__i+3Eb style_approvedStatus__YF7jX",
        title: "مرحله چهارم",
        icon: null,
    },
    {
        date: { start: "2023-08-05", end: "2023-08-07" },
        id: 633,
        className: "style_event__i+3Eb style_approvedStatus__YF7jX",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-08-11", end: "2023-08-12" },
        id: 634,
        className: "style_event__i+3Eb style_doingStatus__w0gMV",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-08-15", end: "2023-08-21" },
        id: 635,
        className: "style_event__i+3Eb style_doingStatus__w0gMV",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-08-21", end: "2023-08-25" },
        id: 636,
        className: "style_event__i+3Eb style_rejectStatus__bLyJi",
        title: "مرحله چهارم",
        icon: null,
    },
    {
        date: { start: "2023-08-27", end: "2023-08-30" },
        id: 637,
        className: "style_event__i+3Eb style_waitingStatus__zz-6h",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-09-01", end: "2023-09-03" },
        id: 638,
        className: "style_event__i+3Eb style_undoneStatus__MIaz-",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-09-03", end: "2023-09-07" },
        id: 639,
        className: "style_event__i+3Eb style_rejectStatus__bLyJi",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-09-06", end: "2023-09-12" },
        id: 640,
        className: "style_event__i+3Eb style_approvedStatus__YF7jX",
        title: "مرحله چهارم",
        icon: null,
    },
    {
        date: { start: "2023-09-12", end: "2023-09-15" },
        id: 641,
        className: "style_event__i+3Eb style_waitingStatus__zz-6h",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-09-14", end: "2023-09-15" },
        id: 642,
        className: "style_event__i+3Eb style_waitingStatus__zz-6h",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-09-17", end: "2023-09-20" },
        id: 643,
        className: "style_event__i+3Eb style_undoneStatus__MIaz-",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-09-23", end: "2023-09-26" },
        id: 644,
        className: "style_event__i+3Eb style_rejectStatus__bLyJi",
        title: "مرحله چهارم",
        icon: null,
    },
    {
        date: { start: "2023-09-28", end: "2023-09-30" },
        id: 645,
        className: "style_event__i+3Eb style_rejectStatus__bLyJi",
        title: "مرحله اول",
        icon: null,
    },
    {
        date: { start: "2023-10-03", end: "2023-10-09" },
        id: 646,
        className: "style_event__i+3Eb style_approvedStatus__YF7jX",
        title: "مرحله دوم",
        icon: null,
    },
    {
        date: { start: "2023-10-05", end: "2023-10-11" },
        id: 647,
        className: "style_event__i+3Eb style_rejectStatus__bLyJi",
        title: "مرحله سوم",
        icon: null,
    },
    {
        date: { start: "2023-10-10", end: "2023-10-15" },
        id: 648,
        className: "style_event__i+3Eb style_undoneStatus__MIaz-",
        title: "مرحله چهارم",
        icon: null,
    },
];
export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    lang: "en",
    events: fakeEvents,
    onDropEvent: item => {
        console.log(item);
    },
};

export const Persian = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Persian.args = {
    lang: "fa",
    events: fakeEvents,
    onDropEvent: item => {
        console.log(item);
    },
    onDay: date => {
        console.log(moment(date).format("YYYY"));

        return {
            className: "test",
        };
    },
};
