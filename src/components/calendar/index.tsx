import moment from "moment";
import React, { StyleHTMLAttributes } from "react";
import { DatepickerProvider } from "../../provider";
import MonthCalendar from "./content/monthly";
import "./style.scss";

type DateEvent =
    | string
    | {
          start: string;
          end: string;
      };
export interface IEvent {
    id: number;
    title: React.ReactNode | string;
    date: DateEvent;
    style?: React.CSSProperties;
    className?: string;
    dotColor?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    // extraData?: any;
}

export interface IEventLogic extends IEvent {
    date: {
        start: string;
        end: string;
    };
    priority?: number;
}

export type IOnDateFunc = (date: string) => {
    className?: string;
};
export interface IProps {
    lang?: "en" | "fa";
    theme?: "blue";
    events: IEvent[];
    onDay?: IOnDateFunc;
    disabledDate?: (date: moment.Moment) => Boolean;
    onClickEvent?: (item: IEvent) => void;
    onDoubleClickEvent?: (item: IEvent) => void;
    onDropEvent?: (item: IEvent) => void;
    onDateClick?: (date: string) => void;
    onMonthChange?: (start: string, end: string) => void;
    style?: React.CSSProperties;
    // TODO :: hoverEventComponent?: React.ReactNode;
}

const Calender = ({
    lang = "en",
    theme = "blue",
    events,
    onDropEvent,
    onClickEvent,
    onDoubleClickEvent,
    style,
    onDateClick,
    onDay,
    onMonthChange,
}: IProps) => {
    return (
        <DatepickerProvider
            config={{
                lang,
                theme,
                events,
                onDropEvent,
                onClickEvent,
                onDoubleClickEvent,
                onDateClick,
                onDay,
                onMonthChange,
            }}>
            <div className={`__calendar __calendar-theme-${theme}`} style={style}>
                <MonthCalendar />
            </div>
        </DatepickerProvider>
    );
};

export default Calender;
