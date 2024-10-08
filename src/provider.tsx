import moment from "moment";
import React, { createContext, useEffect, useState } from "react";
import { IEvent, IEventLogic, IOnDateFunc } from "./components/calendar";
import { EnumLang, EnumTheme } from "./components/datepicker/enum";
import { priorityStoreInit } from "./components/calendar/content/monthly/cell/priorityStore";
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
    date: moment(),
    value: moment(),
    eventsGroup: {},
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
        onDateClick?: (date: string) => void;
        onMonthChange?: (start: string, end: string) => void;
        onAddEventClick?: (date: string) => void;
        onDay?: IOnDateFunc;
        view?: modeViewEnum;
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
    value,
    defaultValue,
    setOpen,
    closeWhenSelectADay,
}: IProps) => {
    const moment_ = config.lang === "fa" ? moment_jalali : moment;
    moment_.locale(config.lang);
    const [pick, setPick] = useState<"day" | "month" | "year">("day");
    const [date, setDate] = useState(moment_());
    const [events, setEvents] = useState<IEventLogic[] | undefined>();
    const [eventsGroup, setEventsGroup] = useState<eventsGroupType>({});

    useEffect(() => {
        if (document.activeElement !== input?.current && input) {
            if (input !== null && input !== undefined) {
                try {
                    input.current.value =
                        value !== null && value !== undefined ? value.format(format) : null;
                } catch {
                    input.current.value = "Invalid Date";
                }
            }
            if (closeWhenSelectADay && setOpen) setOpen(false);
        }
        if (value) setDate(value);
    }, [value]);

    useEffect(() => {
        priorityStoreInit.clear();
        const events_ = config.events?.map(item => {
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
    }, [config.events]);

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
                    onChange && onChange(i ? i : undefined);
                },
                events,
                setEvents: (events: IEventLogic[]) => {
                    priorityStoreInit.clear();
                    setEvents(events);
                },
                eventsGroup,
            }}>
            {children}
        </DatepickerContext.Provider>
    );
};

export { DatepickerProvider, DatepickerContext };
