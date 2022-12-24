import moment from "moment";
import React, { StyleHTMLAttributes } from "react";
import { DatepickerProvider } from "../../provider";
import MonthCalendar from "./content/monthly";
import "./style.scss";

export interface IEvent {
    id: number;
    title: React.ReactNode | string;
    date: string;
    style?: React.CSSProperties;
    className?: string;
    dotColor?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    extraData?: any;
}
export interface IProps {
    lang?: "en" | "fa";
    theme?: "blue";
    events: IEvent[];
    disabledDate?: (date: moment.Moment) => Boolean;
    onClickEvent?: (item: IEvent) => void;
    onDoubleClickEvent?: (item: IEvent) => void;
    onDropEvent?: (item: IEvent) => void;
    // TODO :: hoverEventComponent?: React.ReactNode;
}

const Calender = ({
    lang = "en",
    theme = "blue",
    events,
    onDropEvent,
    onClickEvent,
    onDoubleClickEvent,
}: IProps) => {
    return (
        <DatepickerProvider
            config={{ lang, theme, events, onDropEvent, onClickEvent, onDoubleClickEvent }}>
            <div className={`__calendar __calendar-theme-${theme}`}>
                <MonthCalendar />
            </div>
        </DatepickerProvider>
    );
};

export default Calender;
