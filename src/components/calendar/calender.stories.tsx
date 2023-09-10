import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "antd/dist/antd.css";
import Calender from ".";
import moment from "jalali-moment";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Calender",
    component: Calender,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Calender>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Calender> = args => (
    <Calender {...args} style={{ height: 600 }} />
);

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    lang: "en",
    events: [
        {
            id: 1,
            title: "Holiday",
            date: "2023-9-09",
            style: {
                background: "rgba(0,0,0,0.125)",
            },
        },
        {
            id: 2,
            title: "Holiday",
            date: "2023-9-09",
        },
        {
            id: 3,
            title: "Event Range",
            date: {
                start: "2023-9-05",
                end: "2023-9-09",
            },
        },
    ],
    onDropEvent: item => {
        console.log(item);
    },
};

export const Persian = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Persian.args = {
    lang: "fa",
    events: [
        {
            id: 1,
            title: "Holiday",
            date: "2023-9-09",
        },
        {
            id: 2,
            title: "Holiday",
            date: "2023-9-10",
        },
        {
            id: 3,
            title: "Event Range 1",
            date: {
                start: "2023-9-05",
                end: "2023-9-09",
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
    ],
    onDropEvent: item => {
        console.log(item);
    },
};
