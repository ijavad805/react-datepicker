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
    },
} as ComponentMeta<typeof Datepicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Datepicker> = args => <Datepicker {...args} />;

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
    theme: "blue",
    lang: "en",
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
                        setValue(moment());
                    }}>
                    امروز
                </div>
            </>
        );
    },
};
