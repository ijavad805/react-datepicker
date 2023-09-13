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
        id: 1,
        title: "Holiday 1",
        date: "2023-09-10",
        style: {
            background: "#FFCDD2",
        },
    },
    {
        id: 2,
        title: "Holiday 2",
        date: "2023-9-10",
        style: {
            background: "#FFCDD2",
        },
    },
    {
        id: 3,
        title: "Event Range 1",
        date: {
            start: "2023-9-05",
            end: "2023-9-12",
        },
        style: {
            background: "#C8E6C9",
        },
    },
    {
        id: 4,
        title: "Event Range 2",
        date: {
            start: "2023-9-06",
            end: "2023-9-11",
        },
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
