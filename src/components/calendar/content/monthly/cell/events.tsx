import React, { useContext } from "react";
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
    return (
        <div className={`__calendar-table-td-body-events`}>
            {events?.map((item, index) => (
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
