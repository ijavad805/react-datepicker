import React, { useContext } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import usePersian from "../../../../hooks/usePersian";
import { DatepickerContext } from "../../../../provider";
import { Body } from "../body";
import "./pickYear.scss";

interface IProps {
    onStep: any;
}

const PickYear = ({ onStep }: IProps) => {
    const { date } = useDateTools();
    const config = useContext(DatepickerContext);
    const { convertNumbers } = usePersian();

    const between = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handlePrevAndNext = (prev: boolean) => () => {
        if (config.setDate) {
            if (prev) {
                config.setDate(date.add(-19, "year"));
            } else {
                config.setDate(date.add(19, "year"));
            }
        }
    };
    return (
        <Body
            onNext={handlePrevAndNext(false)}
            onPrev={handlePrevAndNext(true)}
            headerText={`${convertNumbers(date.year() - 9)} - ${convertNumbers(date.year() + 10)}`}>
            <div className="__datepicker-pick-year">
                {between.map(i => (
                    <div
                        className="__datepicker-year"
                        onClick={() => {
                            if (config.setDate) {
                                config.setDate(date.add(i, "year"));
                                onStep(1);
                            }
                        }}>
                        {convertNumbers(date.year() + i)}
                    </div>
                ))}
            </div>
        </Body>
    );
};

export default PickYear;
