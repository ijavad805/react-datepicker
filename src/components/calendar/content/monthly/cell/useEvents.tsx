import { useContext, useEffect, useState } from "react";
import { IEvent, IEventLogic } from "../../..";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import moment from "moment";

const useEvents = (date: moment.MomentInput) => {
    const config = useContext(DatepickerContext);
    const [events, setEvents] = useState<IEventLogic[]>();

    const handleFilterEvents = (item: IEventLogic) => {
        const selectedDate = moment(date);
        if (item.id === 2)
            console.log(
                selectedDate.locale("en").format("YYYY-MM-DD"),
                item.date.start,
                moment(item.date.start).locale("en").format("YYYY-MM-DD")
            );

        const startDate = moment(item.date.start).locale("en").format("YYYY-MM-DD");
        const endDate = moment(item.date.end).locale("en").format("YYYY-MM-DD");

        return (
            selectedDate.locale("en").format("YYYY-MM-DD") >= startDate &&
            selectedDate.locale("en").format("YYYY-MM-DD") <= endDate
        );
    };

    useEffect(() => {
        const thisDayEvents = config.events?.filter(handleFilterEvents);
        const thisDayEventsWithoutPriority =
            thisDayEvents
                ?.filter(i => i.priority === undefined)
                ?.map((item, index) => {
                    const setPriority = index => {
                        if (item.priority !== undefined) {
                            return item.priority;
                        } else {
                            const findSamePriority = thisDayEvents.find(i => i.priority === index);
                            if (findSamePriority === undefined) {
                                return index;
                            } else {
                                return setPriority(index + 1);
                            }
                        }
                    };
                    return {
                        ...item,
                        priority: setPriority(index),
                    };
                }) || [];
        const thisDayEventsWithPriority =
            thisDayEvents?.filter(i => i.priority !== undefined) || [];

            console.log(thisDayEvents);
            
        setEvents(
            [...thisDayEventsWithPriority, ...thisDayEventsWithoutPriority]?.sort((a, b) => {
                const startA = moment(a.date.start).valueOf();
                const startB = moment(b.date.start).valueOf();

                // Sort by the sooner start date
                const dateComparison = startA - startB;

                if (a.priority !== undefined && b.priority !== undefined) {
                    // If both events have a priority number, sort by priority
                    return a.priority - b.priority;
                } else {
                    // If one or both events don't have a priority, just sort by start date
                    return dateComparison;
                }
            })
        );
    }, [config.events]);

    return { events };
};

export default useEvents;
