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
}
const RangeEvent: React.FC<IProps> = ({ index, item, cellIndexInWeek, date, cellWith, key }) => {
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
            return {
                width: calcRight() * cellWith + "vw",
                top: (ref.current?.offsetHeight + 5) * (item?.priority ? item.priority : index),
            };
        }

        return {};
    };

    const handleMouseHover = (leave: boolean) => (e: any) => {
        const elm: any = document.querySelectorAll(`.${classEvent}`);

        elm.forEach((item: HTMLDivElement) => {
            if (leave) {
                item.className = item.className.replace("hover", "");
            } else {
                item.className = item.className + ` hover`;
            }
        });
    };

    useEffect(() => {
        if (ref.current !== null) {
            forceUpdate({ update: true });
        }
    }, [ref]);

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
            onClick={config.onClickEvent?.bind(this, item)}
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
