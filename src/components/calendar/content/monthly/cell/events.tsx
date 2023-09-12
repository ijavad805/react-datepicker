import React, { useContext, useEffect, useState } from "react";
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
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        setTimeout(() => {
            let defaultHeight = 15;
            let height = 0;

            const findThisEvent = document.querySelectorAll(
                `.${eventsUniqueClass} .__calendar-table-td-body-events-item`
            );
            findThisEvent.forEach(i => {
                height += ((i.clientHeight + 10) / window.innerHeight) * 100;
            });

            setStyle(() => ({
                minHeight: `${defaultHeight > height ? defaultHeight : height}vh`,
            }));
        }, 100);
    }, [events]);

    return (
        <div className={`__calendar-table-td-body-events ${eventsUniqueClass}`} style={style}>
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
                    />
                ))}
        </div>
    );
};

export default Events;
