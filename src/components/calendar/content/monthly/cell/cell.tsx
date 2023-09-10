import "./style.scss";
import React, { useContext } from "react";
import moment from "moment";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import { IEvent, IEventLogic } from "../../..";
import Events from "./events";
import useEvents from "./useEvents";

interface IProps {
    date: moment.MomentInput;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell = ({ date, disabled, onClick, cellIndexInWeek }: IProps) => {
    const { moment } = useDateTools();
    const config = useContext(DatepickerContext);
    const { events } = useEvents(moment(date).locale("en").format("YYYY-MM-DD"));

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation()
        const id: any = e.dataTransfer.getData("text");
        config.setEvents((prev: IEventLogic[]) => {
            let clone = [...prev].map(i => ({ ...i, priority: undefined }));
            const find = prev.findIndex(i => i.id === parseInt(id));
            if (find !== -1) {
                const eventToMove = clone[find];
                const newStartDate = moment(date).locale("en").format("YYYY-MM-DD");

                // If it's a range event, update both start and end dates
                const rangeDuration = moment(eventToMove.date.end, "YYYY-MM-DD").diff(
                    moment(eventToMove.date.start, "YYYY-MM-DD"),
                    "days"
                );
                eventToMove.date.start = newStartDate;
                if (rangeDuration > 0) {
                    eventToMove.date.end = moment(newStartDate, "YYYY-MM-DD")
                        .add(rangeDuration, "days")
                        .format("YYYY-MM-DD");
                } else {
                    eventToMove.date.end = newStartDate;
                }

                if (
                    eventToMove.date.end !== "Invalid date" &&
                    eventToMove.date.start !== "Invalid date"
                ) {
                    if (config.onDropEvent) config.onDropEvent(eventToMove);

                    // Remove the event from its current position and push it to the end
                    const item: any = clone.splice(find, 1);
                    item.priority = undefined;
                    clone.push(item[0]);
                } else {
                    console.log("calendar error", "the date is invalid!!");
                }
            }

            return clone;
        });
    };

    const cellClasses = () => {
        const classes: string[] = [];

        if (disabled) {
            classes.push("__calender-disabled-cell");
        }
        if (moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
            classes.push("__calender-today");
        }
        if (moment(date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
            classes.push("__calender-past");
        }
        return classes.join(" ");
    };
    const elm = document.querySelector(".__calender-table-td") as HTMLDivElement;

    return (
        <td
            onClick={() => {
                if (onClick) onClick();
                if (config.onDateClick) config.onDateClick(moment(date));
            }}
            className={`__calender-table-td  ${cellClasses()}`}
            onDragOver={e => {
                e.preventDefault();
            }}
            onDrop={handleDrop}>
            <div className="__calendar-table-td-body">
                <div className={`__calendar-table-td-body-date`}>
                    {moment(date).format("MMMM DD")}
                </div>

                <Events
                    date={moment(date).locale("en").format("YYYY-MM-DD")}
                    cellIndexInWeek={cellIndexInWeek}
                    cellWith={!!elm ? (elm.clientWidth / window.innerWidth) * 100 : 0}
                    events={events}
                />
            </div>
        </td>
    );
};

export default Cell;
