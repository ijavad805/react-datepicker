import React, { useContext, useState } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../provider";
import { Body } from "../body";
import Day from "./day";
import "./pickDay.scss";

interface IProps {
    onStep: Function;
}

const PickDay = ({ onStep }: IProps) => {
    const config = useContext(DatepickerContext);
    const { getMonth, getYear, date, getWeakDayName } = useDateTools();

    const handleNextPrev =
        (mines: boolean, year: boolean = false) =>
        () => {
            if (config.setDate) {
                config.setDate(date.add(mines ? -1 : 1, year ? "year" : "month"));
            }
        };

    return (
        <Body
            onNext={handleNextPrev(false)}
            onNextDouble={handleNextPrev(false, true)}
            onPrevDouble={handleNextPrev(true, true)}
            onClick={() => onStep(1)}
            headerText={`${getMonth()?.name} ${getYear()}`}
            onPrev={handleNextPrev(true)}>
            <div className={`__datepicker-pick-day-container`}>
                <div className="__datepicker-weak">
                    {getWeakDayName().map(item => (
                        <div className={`__datepicker-weak-item`}>{item}</div>
                    ))}
                </div>
                <div className={`__datepicker-pick-day`}>
                    <FillEndAndStart
                        start={true}
                        onNext={handleNextPrev(true)}
                        onPrev={handleNextPrev(true)}
                    />
                    {new Array(getMonth()?.countDay).fill("DefaultValue").map((i, index) => (
                        <Day day={date.format("YYYY-MM-") + (index + 1)} date={date} />
                    ))}
                    <FillEndAndStart
                        start={false}
                        onNext={handleNextPrev(false)}
                        onPrev={handleNextPrev(false)}
                    />
                </div>
            </div>
        </Body>
    );
};

interface IPropsFillEndAndStart {
    start: boolean;
    onNext: (e?: any) => void;
    onPrev: (e?: any) => void;
}
const FillEndAndStart = ({ start, onNext, onPrev }: IPropsFillEndAndStart) => {
    const { getMonth, getMonthStartWith, date } = useDateTools();

    const getPrevMonthCount = () => {
        const month = getMonth(-1);
        if (month) {
            return month.countDay;
        }

        return 0;
    };
    const getMonthCountToEnd = () => {
        const countNow = getMonthStartWith() + getMonth().countDay;
        return Math.ceil(countNow / 7) * 7 - countNow;
    };

    return (
        <>
            {new Array(start ? getMonthStartWith() : getMonthCountToEnd())
                .fill("DefaultValue")
                .map((i, index) => (
                    <div
                        className="__datepicker-days __datepicker-day-disabled"
                        key={index}
                        onClick={start ? onPrev : onNext}>
                        {start
                            ? getPrevMonthCount() - (getMonthStartWith() - (index + 1))
                            : index + 1}
                    </div>
                ))}
        </>
    );
};

export default PickDay;
