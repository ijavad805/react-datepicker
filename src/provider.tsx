import moment from "moment";
import React, {createContext, useEffect, useState} from "react";
import {IEvent, IEventLogic, IOnDateFunc} from "./components/calendar";
import {EnumLang, EnumTheme} from "./components/datepicker/enum";
import {priorityStoreInit} from "./components/calendar/content/monthly/cell/priorityStore";
import useDateTools from "./hooks/useDateTools";

var moment_jalali = require("jalali-moment");

export enum modeViewEnum {
    Monthly = "Monthly",
    Yearly = "Yearly",
}

export interface IConfigDatePicker {
    lang: "fa" | "en";
    theme: keyof typeof EnumTheme;
    pick?: "day" | "month" | "year";
    setPick?: (val: "day" | "month" | "year") => void;
    setDate?: Function;
    setValue?: Function;
    value?: Date;
    dayEffects?: {
        title?: string;
        color?: string;
        dotColor?: string;
        day: string;
    }[];
    disabledDate?: (date: Date | string) => Boolean;

    // calendar
    events?: IEventLogic[];
    setEvents?: any;
    onClickEvent?: (item: IEvent) => void;
    onDoubleClickEvent?: (item: IEvent) => void;
    onDropEvent?: (item: IEvent) => void;
    onDateClick?: (date: string) => void;
    onMonthChange?: (start: string, end: string) => void;
    onAddEventClick?: (date: string) => void;
    onDay?: IOnDateFunc;
    view?: modeViewEnum;
    eventsGroup: eventsGroupType;
}

export type eventsGroupType = { [key: string]: IEvent[] };

const DatepickerContext = createContext<IConfigDatePicker>({
    lang: "en",
    theme: EnumTheme.blue,
    pick: "day",
    value: new Date(),
    eventsGroup: {},
});

interface IProps {
    children: React.ReactNode;
    config: {
        // share
        lang: keyof typeof EnumLang;
        theme: keyof typeof EnumTheme;
        disabledDate?: (date: Date | string) => Boolean;

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
        onDateClick?: (date: string) => void;
        onMonthChange?: (start: string, end: string) => void;
        onAddEventClick?: (date: string) => void;
        onDay?: IOnDateFunc;
        view?: modeViewEnum;
    };
    input?: any;
    format?: string;
    onChange?: (val?: Date) => void;
    value?: Date;
    defaultValue?: Date;
    closeWhenSelectADay?: boolean;
    setOpen?: Function;
}

const DatepickerProvider = (config: IProps) => {
    const [value, setValue] = useState(config.value);
    const [pick, setPick] = useState<"day" | "month" | "year">("day");
    const [events, setEvents] = useState<IEventLogic[] | undefined>();
    const [eventsGroup, setEventsGroup] = useState<eventsGroupType>({});
    const dateTools = useDateTools();

    useEffect(() => {
        if (document.activeElement !== config.input?.current && config.input) {
            if (config.input !== null && config.input !== undefined) {
                try {
                    config.input.current.value =
                        value !== null && value !== undefined ? dateTools.format(value, config.format ?? "YYYY-MM-DD") : null;
                } catch {
                    config.input.current.value = "Invalid Date";
                }
            }
            if (config.closeWhenSelectADay && config.setOpen) config.setOpen(false);
        }
    }, [value]);

    useEffect(() => {
        priorityStoreInit.clear();
        const events_ = events?.map(item => {
            return {
                ...item,
                date:
                    typeof item.date === "string"
                        ? {
                            start: moment(item.date).format("YYYY-MM-DD"),
                            end: moment(item.date).format("YYYY-MM-DD"),
                        }
                        : {
                            start: moment(item.date?.start).format("YYYY-MM-DD"),
                            end: moment(item.date?.end).format("YYYY-MM-DD"),
                        },
            };
        });
        setEvents(events_);
        const events_map: eventsGroupType = {};
        events_?.forEach(item => {
            const startDate = moment(item.date.start);
            const endDate = moment(item.date.end);

            const currentDate = startDate.clone(); // Start from the start date

            while (currentDate.isSameOrBefore(endDate, "day")) {
                // Loop through each day between start and end
                const eventKey = currentDate.format("YYYY-MM-DD");
                if (!events_map[eventKey]) {
                    events_map[eventKey] = []; // Initializing an array for events on this date if it doesn't exist already
                }
                events_map[eventKey].push(item); // Adding the event to the array for this date
                currentDate.add(1, "day"); // Move to the next day
            }
        });
        setEventsGroup(events_map);
    }, [events]);

    return (
        <DatepickerContext.Provider
            value={{
                ...config.config,
                setPick,
                pick,
                value,
                setValue: (i: Date) => {
                    setValue(i);
                    config.onChange && config.onChange(i);
                },
                events,
                setEvents: (events: IEventLogic[]) => {
                    priorityStoreInit.clear();
                    setEvents(events);
                },
                eventsGroup,
            }}>
            {config.children}
        </DatepickerContext.Provider>
    );
};

export {DatepickerProvider, DatepickerContext};
