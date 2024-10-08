import React, { useContext, useState } from "react";
import "./style.scss";
import useDateTools from "../../../../hooks/useDateTools";
import PickDay from "../../../datepicker/datepicker-dropdown/pick-day/pickDay";
import { DatepickerContext } from "../../../../provider";
import { Moment } from "moment";
import { EventsList } from "./events-list";
import Body from "../body";

export interface IYearOption {
    hideEventsList?: boolean;
    onYearChange?: (start: string, end: string) => void;
}
interface IProps {
    options?: IYearOption;
    extra?: React.ReactNode;
}
export const YearlyCalendar: React.FC<IProps> = props => {
    const { getMonths, date, moment } = useDateTools();
    const config = useContext(DatepickerContext);

    const handelChangeYear = (prev: boolean) => {
        if (!config.setDate) return;
        if (prev) {
            config.setDate(date.add(-1, "year"));
        } else {
            config.setDate(date.add(1, "year"));
        }

        if (props.options?.onYearChange) {
            if (config.lang === "en") {
                props.options.onYearChange(
                    date.startOf("year").format("YYYY-MM-DD"),
                    date.endOf("year").format("YYYY-MM-DD")
                );
            } else {
                const date_ = moment(date);
                props.options.onYearChange(
                    date_.startOf("jYear").locale("en").format("YYYY-MM-DD"),
                    date_.endOf("jYear").locale("en").format("YYYY-MM-DD")
                );
            }
        }
    };
    return (
        <Body
            side={props.extra}
            header={date.year().toString()}
            onNextClick={handelChangeYear.bind(this, false)}
            onPrevClick={handelChangeYear.bind(this, true)}>
            <div className={`yearly-view`}>
                {getMonths().map((month: string, index: number) => (
                    <MonthView monthIndex={index} title={month} options={props.options} />
                ))}
            </div>
        </Body>
    );
};

interface IPropsMonthView {
    title: string;
    monthIndex: number;
    options?: IYearOption;
}
const MonthView: React.FC<IPropsMonthView> = props => {
    const config = useContext(DatepickerContext);
    const { getMonth } = useDateTools();
    const [visibleEventList, setVisibleEventList] = useState<Moment | undefined>();

    return (
        <div className={`month-container`}>
            <div className="month-wrapper">
                <div className={`month-header`}>
                    <span>{props.title}</span>
                </div>
                <PickDay
                    onStep={() => {}}
                    onlyView
                    customMonth={getMonth(props.monthIndex, false).date}
                    onDayClick={date => {
                        config.onDateClick && config.onDateClick(date.format());
                        if (!props.options?.hideEventsList) {
                            setVisibleEventList(date);
                        }
                    }}
                />
            </div>
            {visibleEventList !== undefined && (
                <EventsList
                    onClose={() => setVisibleEventList(undefined)}
                    visible={visibleEventList !== undefined}
                    date={visibleEventList}
                />
            )}
        </div>
    );
};
