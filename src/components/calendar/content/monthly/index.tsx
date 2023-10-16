import useDateTools from "../../../../hooks/useDateTools";
import Body from "../body";
import React, { useContext } from "react";
import Table from "../../../table";
import Cell from "./cell/cell";
import usePersian from "../../../../hooks/usePersian";
import { DatepickerContext } from "../../../../provider";

const MonthCalendar = () => {
    const { getWeakDayName, getMonth, getMonthStartWith, moment, date, getYear } = useDateTools();
    const { convertNumbers } = usePersian();
    const config = useContext(DatepickerContext);

    const countTr = Math.ceil((getMonth().countDay + getMonthStartWith()) / 7);

    const handleNextPrev =
        (mines: boolean, year: boolean = false) =>
        () => {
            if (config.setDate) {
                const newDate = date.add(mines ? -1 : 1, year ? "year" : "month");
                config.setDate(newDate);

                const clone = newDate.clone();
                config.onMonthChange &&
                    config.onMonthChange(
                        clone.startOf("month").locale("en").format("YYYY-MM-DD"),
                        clone.endOf("month").locale("en").format("YYYY-MM-DD")
                    );
            }
        };
    return (
        <Body
            onNextClick={handleNextPrev(true)}
            onPrevClick={handleNextPrev(false)}
            onTodayClick={() => {
                if (config.setDate) {
                    config.setDate(moment());
                }
            }}
            header={
                <div className="__calender-month-header">
                    <div className="__calender-header-title">
                        {convertNumbers(getYear())} {getMonth()?.fullName}
                    </div>
                </div>
            }>
            <Table>
                <thead>
                    <tr>
                        {getWeakDayName(false).map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {new Array(countTr).fill("w").map((i, index) => {
                        const rangeOfDays = {
                            start: index * 7 - getMonthStartWith(),
                            end: (index + 1) * 7,
                        };

                        return (
                            <tr>
                                {index === 0 && <FillStart emptyCount={rangeOfDays.start * -1} />}
                                {new Array(7).fill("d").map((i, index) => {
                                    const day = index + 1 + rangeOfDays.start;
                                    if (day <= getMonth().countDay && day > 0)
                                        return (
                                            <Cell
                                                date={date.format("YYYY-MM-") + day}
                                                key={`${index}-${date.format("YYYY-MM-") + day}`}
                                                cellIndexInWeek={index}
                                            />
                                        );
                                })}
                                {index === countTr - 1 && <FillEnd />}
                            </tr>
                        );
                    })}
                    <tr></tr>
                </tbody>
            </Table>
        </Body>
    );
};

interface IProps {
    emptyCount: number;
}
const FillStart: React.FC<IProps> = ({ emptyCount }) => {
    const { getMonthStartWith, getMonth, date } = useDateTools();

    const getPrevMonthCount = () => {
        const month = getMonth(-1);
        if (month) {
            return month.countDay;
        }

        return 0;
    };

    const getEndOfPrevMonth = (index: number) => {
        const date_ = date.clone().add(-1, "month").endOf("month");

        return date_.add(index - emptyCount + 1, "day").format("YYYY-MM-DD");
    };

    return (
        <>
            {new Array(emptyCount).fill("d").map((i, index) => (
                <Cell date={getEndOfPrevMonth(index)} disabled={true} cellIndexInWeek={index} />
            ))}
        </>
    );
};

const FillEnd = () => {
    const { getMonthStartWith, getMonth, date } = useDateTools();

    const getMonthCountToEnd = () => {
        const countNow = getMonthStartWith() + getMonth().countDay;
        const res = Math.ceil(countNow / 7) * 7 - countNow;
        return res;
    };

    const getEndOfPrevMonth = (index: number) => {
        const day = index + 1;
        const date_ = date.clone().add(1, "month");
        return date_.format("YYYY-MM-") + day;
    };

    return (
        <>
            {new Array(getMonthCountToEnd()).fill("d").map((i, index) => (
                <Cell
                    date={getEndOfPrevMonth(index)}
                    disabled={true}
                    cellIndexInWeek={7 - getMonthCountToEnd() + index}
                />
            ))}
        </>
    );
};
export default MonthCalendar;
