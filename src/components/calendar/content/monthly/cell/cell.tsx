import "./style.scss";
import React, { useContext } from "react";
import moment from "moment";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import { IEvent } from "../../..";
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
    const { events } = useEvents(date);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        var id: any = e.dataTransfer.getData("text");
        config.setEvents((prev: IEvent[]) => {
            let clone = [...prev];
            const find = prev.findIndex(i => i.id === parseInt(id));
            if (find !== -1) {
                if (config.lang === "fa") {
                    clone[find].date = moment
                        .from(date, config.lang)
                        .locale("en")
                        .format("YYYY-MM-DD");
                } else {
                    clone[find].date = moment(date).locale("en").format("YYYY-MM-DD");
                }
                if (config.onDropEvent) config.onDropEvent(clone[find]);
                const item: any = clone.splice(find, 1);
                clone.push(item[0]);
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
                    date={date}
                    cellIndexInWeek={cellIndexInWeek}
                    cellWith={!!elm ? (elm.clientWidth / window.innerWidth) * 100 : 0}
                    events={events}
                />
            </div>
        </td>
    );
};

export default Cell;
