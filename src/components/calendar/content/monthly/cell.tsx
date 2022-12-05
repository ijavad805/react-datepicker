import "./style.scss";
import React, { useContext } from "react";
import moment from "moment";
import useDateTools from "../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../provider";
import { IEvent } from "../..";

interface IProps {
    date: moment.MomentInput;
    disabled?: boolean;
    onClick?: () => void;
}
const Cell = ({ date, disabled, onClick }: IProps) => {
    const { moment } = useDateTools();
    const config = useContext(DatepickerContext);

    const handleFilterEvents = (item: IEvent) => {
        if (
            typeof item.date === "object" ||
            typeof item.date === "string" ||
            typeof item.date === "number"
        ) {
            return moment(item.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD");
        }

        return false;
    };

    return (
        <td
            onClick={() => {
                if (onClick) onClick();
            }}
            className={`__calender-table-tr ${disabled ? "__calender-disabled-cell" : ""}`}>
            <div className="__calendar-table-tr-body">
                <div className={`__calendar-table-tr-body-date`}>{moment(date).format("DD")}</div>
                <div className={`__calendar-table-tr-body-events`}>
                    {config.events?.filter(handleFilterEvents)?.map(item => {
                        return (
                            <div
                                className={`__calendar-table-tr-body-events-item ${item?.className}`}
                                style={item?.style}
                                onClick={config.onClickEvent?.bind(this, item)}
                                onDoubleClick={config.onDoubleClickEvent?.bind(this, item)}>
                                <div className={`__calendar-table-tr-body-events-item-circle`} />
                                {item.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </td>
    );
};

export default Cell;
