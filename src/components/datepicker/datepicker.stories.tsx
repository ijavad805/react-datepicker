import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Datepicker from "./datepicker";
import "antd/dist/antd.css";
import { Input } from "antd";
import moment from "moment";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Datepicker",
    component: Datepicker,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        theme: {
            control: "select",
            options: ["blue", "red", "orange", "yellow", "green"],
        },
        lang: {
            control: "disabled",
        },
        modeTheme: {
            control: "select",
            options: ["dark", "light"],
        },
        loading: {
            control: "select",
            options: [true, false],
        },
        format: {
            control: "string",
            defaultValue: "YYYY-MM-DD",
        },
        adjustPosition: {
            control: "select",
            options: ["right-top", "left-top", "right-bottom", "left-bottom", "modal", "auto"],
        },
    },
} as ComponentMeta<typeof Datepicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Datepicker> = args => (
    <div style={{ height: 400, direction: "ltr" }}>
        <Datepicker {...args} />
    </div>
);

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    theme: "blue",
    lang: "en",
    modeTheme: "dark",
    input: <Input />,
    footer: (moment, setValue) => {
        return (
            <>
                <div
                    onClick={() => {
                        if (setValue) setValue(moment());
                    }}>
                    Today
                </div>
            </>
        );
    },
};

export const Persian = Template.bind({});

Persian.args = {
    theme: "blue",
    lang: "fa",
    modeTheme: "dark",
    value: moment(),
    input: <Input />,
    footer: (moment, setValue) => {
        return (
            <>
                <div
                    onClick={() => {
                        if (setValue) setValue(moment());
                    }}>
                    امروز
                </div>
            </>
        );
    },
};

export const AllParams = Template.bind({});

AllParams.args = {
    theme: "blue",
    lang: "en",
    modeTheme: "dark",
    loading: true,
    dayEffects: [
        {
            day: "2022-08-26",
            title: "Custom day",
            color: "red",
            dotColor: "red",
        },
    ],
    footer: (moment, setValue) => {
        return (
            <>
                <div
                    onClick={() => {
                        if (setValue) setValue(moment());
                    }}>
                    Today
                </div>
            </>
        );
    },
};
