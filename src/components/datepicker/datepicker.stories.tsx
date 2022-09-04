import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Datepicker from "./datepicker";

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
            control: "select",
            options: ["fa", "en"],
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
    },
} as ComponentMeta<typeof Datepicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Datepicker> = args => <Datepicker {...args} />;

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    theme: "blue",
    lang: "en",
    modeTheme: "dark",
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
