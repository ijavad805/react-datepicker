import React, { useContext } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import usePersian from "../../../../hooks/usePersian";
import { DatepickerContext } from "../../../../provider";
import { Body } from "../body";
import "./pickMonth.scss";

interface IProps {
    onStep: Function;
}
const PickMonth = ({ onStep }: IProps) => {
    const { moment, date, getYear, getMonths } = useDateTools();
    const config = useContext(DatepickerContext);
    const { convertNumbers } = usePersian();

    const headerButton =
        (mines: boolean = false, count: number = 1) =>
        () => {
            if (config.setDate) {
                config.setDate(date.add(count * (mines ? -1 : 1), "year"));
            }
        };

    return (
        <Body
            headerText={`${convertNumbers(getYear())}`}
            onNext={headerButton(false, 1)}
            onClick={() => onStep(2)}
            onPrev={headerButton(true, 1)}
            onNextDouble={headerButton(false, 5)}
            onPrevDouble={headerButton(true, 5)}>
            <div className={`__datepicker-pick-month`}>
                {getMonths().map((month: string, index: number) => (
                    <div
                        key={`month-${index}`}
                        className={`__datepicker-pick-month-item ${
                            date.format("YYYY-") + (index + 1) === moment().format("YYYY-M")
                                ? "__datepicker-today"
                                : ""
                        }`}
                        onClick={() => {
                            if (config.setDate) config.setDate(date?.set({ month: index }));
                            onStep(0);
                        }}>
                        {month}
                    </div>
                ))}
            </div>
        </Body>
    );
};

export default PickMonth;
