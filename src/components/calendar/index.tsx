import moment from "moment";
import React, { StyleHTMLAttributes } from "react";
import { DatepickerProvider } from "../../provider";
import MonthCalendar from "./content/monthly";
import "./style.scss";

export interface IEvent {
    id?: number;
    title: React.ReactNode | string;
    date:
        | moment.Moment
        | moment.MomentInput
        | string
        | moment.Moment[]
        | string[]
        | moment.MomentInput[];
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
    // TODO :: hoverEventComponent?: React.ReactNode;
    // TODO :: onDropEvent?: () => void;
}

const Calender = ({ lang = "en", theme = "blue", events }: IProps) => {
    return (
        <DatepickerProvider config={{ lang, theme, events }}>
            <div className="__calendar">
                <MonthCalendar />
            </div>
        </DatepickerProvider>
    );
};

export default Calender;
