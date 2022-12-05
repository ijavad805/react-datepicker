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
    <div style={{ direction: "ltr" }}>
        <Calender {...args} />
    </div>
);

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    theme: "blue",
    lang: "en",
    events: [
        {
            title: "Holiday",
            date: moment().format(),
            style: {
                background: "rgba(0,0,0,0.125)",
            },
        },
        {
            title: "Holiday",
            date: moment().format(),
        },
    ],
};
