import React, { useContext, useEffect, useRef, useState } from "react";
import { IEvent, IEventLogic } from "../../..";
import { DatepickerContext } from "../../../../../provider";
import { Moment } from "moment";

import moment from "moment";

interface IProps {
    index: number;
    item: IEventLogic;
    date: moment.MomentInput;
    cellIndexInWeek: number;
    cellWith: number;
}
const RangeEvent: React.FC<IProps> = ({ index, item, cellIndexInWeek, date, cellWith }) => {
    const config = useContext(DatepickerContext);
    date = moment(date).locale("en").format("YYYY-MM-DD");
    const hide = cellIndexInWeek !== 0 && item.date.start !== date;
    const ref = useRef<HTMLDivElement>(null);
    const [, forceUpdate] = useState({ update: true });

    const handlePriority = () => {
        const find = config.events?.findIndex(i => i.id === item.id);
        const clone = config.events ? [...config.events] : [];
        if (
            find &&
            find !== -1 &&
            clone[find].priority === undefined &&
            !hide &&
            item.date.start !== item.date.end
        ) {
            clone[find].priority = index;

            config.setEvents(clone);
        }
    };

    const calcStyleForRange = (): React.CSSProperties => {
        const calcRight = () => {
            const difDays = moment(item.date.end).diff(moment(date), "days") + 1;

            if (7 - cellIndexInWeek > difDays) {
                return difDays;
            } else {
                return 7 - cellIndexInWeek;
            }
        };
        if (!hide && ref.current !== null) {
            return {
                width: calcRight() * cellWith + "vw",
                top: (ref.current?.offsetHeight + 5) * index,
            };
        }

        return {};
    };

    useEffect(() => {
        if (ref.current !== null) {
            forceUpdate({ update: true });
            handlePriority();
        }
    }, [ref, config.events]);

    return (
        <div
            draggable={config.onDropEvent !== undefined}
            onDrag={(e: any) => {
                e.target.style.opacity = 0;
            }}
            onDragStart={e => {
                e.dataTransfer.setData("text", item.id.toString());
            }}
            onDragEnd={(e: any) => {
                e.target.style.opacity = 1;
            }}
            ref={ref}
            key={`range-event-${index}`}
            className={`__calendar-table-td-body-events-item ${item?.className} ${
                hide ? "hide" : ""
            } `}
            style={{ ...item?.style, ...calcStyleForRange() }}
            onClick={config.onClickEvent?.bind(this, item)}
            onDoubleClick={config.onDoubleClickEvent?.bind(this, item)}>
            {!item.icon ? (
                <div
                    className={`__calendar-table-td-body-events-item-circle`}
                    style={{ background: item.dotColor }}
                />
            ) : (
                item.icon
            )}
            {item.title}
        </div>
    );
};

export default RangeEvent;
