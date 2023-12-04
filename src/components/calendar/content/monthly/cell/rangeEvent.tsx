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
    key: any;
    setParentHeight?: any;
}
const RangeEvent: React.FC<IProps> = ({
    index,
    item,
    cellIndexInWeek,
    date,
    cellWith,
    key,
    setParentHeight,
}) => {
    const config = useContext(DatepickerContext);
    date = moment(date).locale("en").format("YYYY-MM-DD");
    const hide = cellIndexInWeek !== 0 && item.date.start !== date;
    const ref = useRef<HTMLDivElement>(null);
    const [, forceUpdate] = useState({ update: true });
    const classEvent = `item-e-${item.id}`;

    const calcStyleForRange = (): React.CSSProperties => {
        const calcRight = () => {
            const difDays = moment(item.date.end).diff(moment(date), "days") + 1;

            if (7 - cellIndexInWeek > difDays) {
                return difDays;
            } else {
                return 7 - cellIndexInWeek;
            }
        };
        if (ref.current !== null) {
            const style = {
                width: `calc(${calcRight() * cellWith + "vw"} - 5px)`,
                top:
                    (ref.current?.offsetHeight + 5) *
                    (item?.priority !== undefined ? item.priority : index),
            };

            setParentHeight &&
                setParentHeight(
                    ((ref.current.offsetHeight + 10 + style.top) / window.innerHeight) * 100
                );
            return style;
        }

        return {};
    };

    const handleMouseHover = (leave: boolean) => (e: any) => {
        const elm: any = document.querySelectorAll(`.${classEvent}`);

        elm.forEach((item: HTMLDivElement) => {
            if (leave) {
                item.classList.remove("hover");
            } else {
                item.classList.add("hover");
            }
        });
    };

    useEffect(() => {
        if (ref.current !== null) {
            forceUpdate({ update: true });
        }
    }, []);

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
            } ${classEvent}`}
            style={{ ...item?.style, ...calcStyleForRange() }}
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                config.onClickEvent && config.onClickEvent(item);
            }}
            onMouseEnter={handleMouseHover(false)}
            onMouseLeave={handleMouseHover(true)}
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
