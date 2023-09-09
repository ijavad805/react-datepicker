import React, { useContext } from "react";
import { DatepickerContext } from "../../../../../provider";
import useEvents from "./useEvents";
import NormalEvent from "./event/normalEvent";
import RangeEvent from "./event/rangeEvent";
import { IEvent } from "../../..";

interface IProps {
    date: moment.MomentInput;
    cellIndexInWeek: number;
    cellWith: number;
    events?: IEvent[];
}
const Events: React.FC<IProps> = ({ date, cellIndexInWeek, cellWith, events }) => {
    return (
        <div className={`__calendar-table-td-body-events`}>
            {events
                ?.filter(i => typeof i.date !== "string")
                .map((item, index) => (
                    <RangeEvent
                        index={index}
                        item={item as any}
                        date={date}
                        cellIndexInWeek={cellIndexInWeek}
                        cellWith={cellWith}
                    />
                ))}
            {events
                ?.filter(i => typeof i.date === "string")
                .map((item, index) => (
                    <NormalEvent index={index} item={item} />
                ))}
        </div>
    );
};

export default Events;
