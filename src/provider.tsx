import moment from "moment";
import React, { createContext, useEffect, useState } from "react";
import { IEvent } from "./components/calendar";
import { EnumLang, EnumTheme } from "./components/datepicker/enum";
var moment_jalali = require("jalali-moment");

export interface IConfigDatePicker {
    lang: "fa" | "en";
    theme: keyof typeof EnumTheme;
    pick?: "day" | "month" | "year";
    setPick?: (val: "day" | "month" | "year") => void;
    date: moment.Moment;
    setDate?: Function;
    setValue?: Function;
    value?: moment.Moment;
    dayEffects?: {
        title?: string;
        color?: string;
        dotColor?: string;
        day: string;
    }[];
    disabledDate?: (date: moment.Moment) => Boolean;

    // calendar
    events?: IEvent[];
    setEvents?: any;
    onClickEvent?: (item: IEvent) => void;
    onDoubleClickEvent?: (item: IEvent) => void;
    onDropEvent?: (item: IEvent) => void;
}

const DatepickerContext = createContext<IConfigDatePicker>({
    lang: "en",
    theme: EnumTheme.blue,
    pick: "day",
    date: moment(),
    value: moment(),
});

interface IProps {
    children: React.ReactNode;
    config: {
        // share
        lang: keyof typeof EnumLang;
        theme: keyof typeof EnumTheme;
        disabledDate?: (date: moment.Moment) => Boolean;

        // datepicker
        dayEffects?: {
            title?: string;
            color?: string;
            dotColor?: string;
            day: string;
        }[];

        // calendar
        events?: IEvent[];
        onClickEvent?: (item: IEvent) => void;
        onDoubleClickEvent?: (item: IEvent) => void;
        onDropEvent?: (item: IEvent) => void;
    };
    input?: any;
    format?: string;
    onChange?: (val?: moment.Moment) => void;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    closeWhenSelectADay?: boolean;
    setOpen?: Function;
}

const DatepickerProvider = ({
    children,
    config,
    input,
    format,
    onChange,
    value: value_,
    defaultValue,
    setOpen,
    closeWhenSelectADay,
}: IProps) => {
    const moment_ = config.lang === "fa" ? moment_jalali : moment;
    moment_.locale(config.lang);
    const [pick, setPick] = useState<"day" | "month" | "year">("day");
    const [date, setDate] = useState(moment_());
    const [events, setEvents] = useState(config.events);
    const [value, setValue] = useState(
        defaultValue !== undefined ? moment_(defaultValue.format()) : undefined
    );

    useEffect(() => {
        if (value && document.activeElement !== input.current && input) {
            if (input !== null && input !== undefined) {
                input.current.value = value.format(format);
            } else {
                console.log("input is null ", input);
            }
            if (closeWhenSelectADay && setOpen) setOpen(false);
        }
        if (value) setDate(value);
    }, [value]);

    useEffect(() => {
        if (value_) setValue(value_);
    }, [value_]);

    return (
        <DatepickerContext.Provider
            value={{
                ...config,
                setPick,
                pick,
                date: date.clone(),
                setDate: (i: moment.Moment) => {
                    setDate(i);
                },
                value,
                setValue: (i: moment.Moment) => {
                    if (onChange && i !== undefined) onChange(i.clone().locale("en"));
                    setValue(i);
                },
                events,
                setEvents
            }}>
            {children}
        </DatepickerContext.Provider>
    );
};

export { DatepickerProvider, DatepickerContext };
