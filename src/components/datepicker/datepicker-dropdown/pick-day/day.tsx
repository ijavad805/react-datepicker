import React from "react";
import { useContext } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../provider";

interface IProps {
    day: string;
    date: moment.Moment;
}
const Day = ({ day, date }: IProps) => {
    const config = useContext(DatepickerContext);
    const { moment } = useDateTools();

    return (
        <div
            className={`__datepicker-days ${
                day === moment().format("YYYY-MM-D") ? "__datepicker-today" : ""
            } ${day === config.value?.format("YYYY-MM-D") ? "__datepicker-selected" : ""}`}
            onClick={() => {
                if (config.setValue) {
                    console.log(day);

                    config.setValue(moment(day));
                }
            }}>
            {moment(day).format("D")}
        </div>
    );
};

export default Day;
