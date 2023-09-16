import React, { useContext, useEffect, useRef, useState } from "react";
import { DatepickerContext } from "../../../../../provider";
import useEvents from "./useEvents";
import RangeEvent from "./rangeEvent";
import { IEvent, IEventLogic } from "../../..";

interface IProps {
    date: moment.MomentInput;
    cellIndexInWeek: number;
    cellWith: number;
    events?: IEventLogic[];
}
const Events: React.FC<IProps> = ({ date, cellIndexInWeek, cellWith, events }) => {
    const eventsUniqueClass = `__calendar-table-events-${date}`;
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={`__calendar-table-td-body-events ${eventsUniqueClass}`} ref={ref}>
            {events
                ?.sort((a, b) => {
                    if (a?.priority && b?.priority) {
                        return a?.priority - b?.priority;
                    }

                    return -1;
                })
                ?.map((item, index) => (
                    <RangeEvent
                        index={index}
                        item={item as any}
                        date={date}
                        cellIndexInWeek={cellIndexInWeek}
                        cellWith={cellWith}
                        key={`event-${item.id}-${item.priority}-${item.date}`}
                        setParentHeight={(h: any) => {
                            if (ref.current !== null) {
                                if (h > 15) ref.current.style.minHeight = `${h}vh`;
                            }
                        }}
                    />
                ))}
        </div>
    );
};

export default Events;
