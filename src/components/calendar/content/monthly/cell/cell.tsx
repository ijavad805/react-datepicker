import "./style.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import { IEvent, IEventLogic } from "../../..";
import Events from "./events";
import useEvents from "./useEvents";
import { priorityStore, priorityStoreInit } from "./priorityStore";

interface IProps {
    date: moment.MomentInput;
    disabled?: boolean;
    onClick?: () => void;
    cellIndexInWeek: number;
}
const Cell = ({ date, disabled, onClick, cellIndexInWeek }: IProps) => {
    const { moment: moment_ } = useDateTools();
    const config = useContext(DatepickerContext);
    const { events } = useEvents(moment_(date).locale("en").format("YYYY-MM-DD"));
    const ref = useRef<any>(null);
    const [, forceUpdate] = useState({ update: true });
    // Define a state variable to track the drag state

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const date_clone = moment_(date).locale("en").format("YYYY-MM-DD");
        const id: any = e.dataTransfer.getData("text");
        priorityStoreInit.clear();

        config.setEvents((prev: IEventLogic[]) => {
            let clone = [...prev];
            const find = prev.findIndex(i => i.id === parseInt(id));
            if (find !== -1) {
                const eventToMove = clone[find];
                const newStartDate = moment(date_clone, "YYYY-MM-DD")
                    .locale("en")
                    .format("YYYY-MM-DD");

                // If it's a range event, update both start and end dates
                const rangeDuration = moment(eventToMove.date.end, "YYYY-MM-DD").diff(
                    moment(eventToMove.date.start, "YYYY-MM-DD"),
                    "days"
                );
                eventToMove.date.start = newStartDate;

                eventToMove.date.end = moment(newStartDate)
                    .locale("en")
                    .add(rangeDuration, "days")
                    .format("YYYY-MM-DD");

                if (
                    eventToMove.date.end !== "Invalid date" &&
                    eventToMove.date.start !== "Invalid date"
                ) {
                    if (config.onDropEvent) config.onDropEvent(eventToMove);

                    // Remove the event from its current position and push it to the end
                    const item: any = clone.splice(find, 1);
                    clone.push(item[0]);
                } else {
                    console.log("calendar error", "the date is invalid!!");
                    return prev;
                }
            }

            return clone.map(i => ({ ...i, priority: undefined }));
        });
        ref.current.classList.remove("__calender-table-td-drag-hover");
    };
    const onThisDay = config.onDay
        ? config.onDay(moment_(date).locale("en").format("YYYY-MM-DD"))
        : {};

    const cellClasses = () => {
        const classes: string[] = [];

        if (disabled) {
            classes.push("__calender-disabled-cell");
        }
        if (moment_(date).format("YYYY-MM-DD") === moment_().format("YYYY-MM-DD")) {
            classes.push("__calender-today");
        }
        if (moment_(date).format("YYYY-MM-DD") < moment_().format("YYYY-MM-DD")) {
            classes.push("__calender-past");
        }
        if (config.onDateClick) {
            classes.push("__calender-table-td-clickable");
        }
        if (onThisDay) {
            if (onThisDay.className) classes.push(onThisDay.className);
        }
        return classes.join(" ");
    };

    const elm = document.querySelector(".__calender-table-td") as HTMLDivElement;

    useEffect(() => {
        const forceRerenderPage = () => {
            forceUpdate({ update: true });
        };
        // Add event listener to window resize event
        window.addEventListener("resize", forceRerenderPage);

        // Remove event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", forceRerenderPage);
        };
    }, []);

    return (
        <td
            ref={ref}
            onClick={() => {
                if (onClick) onClick();
                if (config.onDateClick)
                    config.onDateClick(moment_(date).locale("en").format("YYYY-MM-DD"));
            }}
            className={`__calender-table-td ${cellClasses()}`}
            onDragOver={e => {
                e.preventDefault();
            }}
            onDrop={handleDrop}>
            <div className="__calendar-table-td-body">
                <div className={`__calendar-table-td-body-date`}>
                    {moment_(date).format("DD MMMM")}
                </div>

                <Events
                    date={moment_(date).locale("en").format("YYYY-MM-DD")}
                    cellIndexInWeek={cellIndexInWeek}
                    cellWith={!!elm ? (elm.offsetWidth / window.innerWidth) * 100 : 0}
                    events={events}
                />
            </div>
        </td>
    );
};

export default Cell;
