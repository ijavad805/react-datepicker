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
            className={`__calender-table-tr ${disabled ? "__calender-disabled-cell" : ""}`} onDragOver={(e) => {
                e.preventDefault();
            }} onDrop={(e) => {
                e.preventDefault();
                var id: any = e.dataTransfer.getData("text");
                config.setEvents((prev: IEvent[]) => {
                    let clone = [...prev];
                    const find = prev.findIndex(i => i.id === parseInt(id));
                    if (find !== -1) {
                        clone[find].date = moment(date).format("YYYY-MM-DD");
                        if (config.onDropEvent) config.onDropEvent(clone[find]);
                        const item: any = clone.splice(find, 1);
                        clone.push(item[0]);
                    }

                    return clone;
                })
            }}>
            <div className="__calendar-table-tr-body">
                <div className={`__calendar-table-tr-body-date`}>{moment(date).format("DD")}</div>
                <div className={`__calendar-table-tr-body-events`}>
                    {config.events?.filter(handleFilterEvents)?.map(item => {
                        return (
                            <div
                                draggable={config.onDropEvent !== undefined}
                                onDrag={(e: any) => {
                                    e.target.style.opacity = 0;
                                }}
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("text", item.id.toString());
                                }}
                                onDragEnd={(e: any) => {
                                    e.target.style.opacity = 1;
                                }}
                                className={`__calendar-table-tr-body-events-item ${item?.className}`}
                                style={item?.style}
                                onClick={config.onClickEvent?.bind(this, item)}
                                onDoubleClick={config.onDoubleClickEvent?.bind(this, item)}>
                                {!item.icon ? <div className={`__calendar-table-tr-body-events-item-circle`} style={{ background: item.dotColor }} /> : item.icon}
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
