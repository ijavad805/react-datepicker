import moment from "moment";
import React from "react";
import { DatepickerProvider } from "../../provider";
export interface IEvent {
    day: moment.MomentInput;
    dayBackground: string;
    events?: {
        title: string;
        color?: string;
        background?: string;
        dotColor?: string;
        disabled?: boolean;
        icon?: JSX.Element;
        onClick?: () => void;
        onDoubleClick?: () => void;
    }[];
}
interface IProps {
    lang?: "en" | "fa";
    theme?: "blue";
    events: IEvent[];
    disabledDate?: (date: moment.Moment) => Boolean;
}

const Calender = ({ lang = "en", theme = "blue", events }: IProps) => {
    return (
        <DatepickerProvider config={{ lang, theme, events }}>
            <div className="__calendar"></div>
        </DatepickerProvider>
    );
};

export default Calender;
