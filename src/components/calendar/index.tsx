import moment from "moment";
import React, { StyleHTMLAttributes } from "react";
import { DatepickerProvider, modeViewEnum } from "../../provider";
import MonthCalendar from "./content/monthly";
import "./style.scss";
import { IYearOption, YearlyCalendar } from "./content/yearly";

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
    view?: "Yearly" | "Monthly";
    yearlyOptions?: IYearOption;
    className?: string;
    extra?: React.ReactNode;
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
    view = modeViewEnum.Monthly,
    yearlyOptions,
    className,
    extra,
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
            <div className={`__calendar __calendar-theme-${theme} ${className}`} style={style}>
                {view === modeViewEnum.Monthly && <MonthCalendar />}
                {view === modeViewEnum.Yearly && (
                    <YearlyCalendar options={yearlyOptions} extra={extra} />
                )}
            </div>
        </DatepickerProvider>
    );
};
export default Calender;
