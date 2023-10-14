import { useContext, useEffect, useState } from "react";
import { IEvent, IEventLogic } from "../../..";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import moment from "moment";
import { priorityStore, priorityStoreInit } from "./priorityStore";

// This custom hook, useEvents, is designed to filter and prioritize events based on a given date.
// It relies on React's useContext and useState hooks to manage state and context from DatepickerContext.
// The hook filters events to find those that fall on the provided date, assigns priorities to events
// without a specified priority, and sorts the events based on start date and priority.
// It is particularly useful for managing events in a datepicker or calendar component.
const useEvents = (date: string) => {
    const config = useContext(DatepickerContext);
    const [events, setEvents] = useState<IEventLogic[]>();

    const handleFilterEvents = (item: IEventLogic, date_ = date) => {
        const selectedDate = moment(date_);

        const startDate = moment(item.date.start).locale("en").format("YYYY-MM-DD");
        const endDate = moment(item.date.end).locale("en").format("YYYY-MM-DD");

        return (
            selectedDate.locale("en").format("YYYY-MM-DD") >= startDate &&
            selectedDate.locale("en").format("YYYY-MM-DD") <= endDate
        );
    };
    const getUniquePriority = (todayList: IEventLogic[]) => {
        // Collect all used priorities in a Set
        const usedPriorities = new Set(todayList.map(item => item.priority));

        // Find the first unused priority
        let priority = 0;
        while (usedPriorities.has(priority)) {
            priority++;
        }

        return priority;
    };
    useEffect(() => {
        const cloneEvents = config.events ? [...config.events] : [];
        const thisDayEvents = cloneEvents
            ?.filter(item => handleFilterEvents(item))
            .map(item => {
                const tryFindPriority = priorityStore.store.find(i => i.id === item.id);

                return {
                    ...item,
                    priority: tryFindPriority?.priority,
                };
            })
            .sort((a, b) => {
                if (a.priority !== undefined && b.priority !== undefined) {
                    return a.priority - b.priority;
                } else {
                    return 1;
                }
            });

        if (thisDayEvents.length > 0) {
            thisDayEvents.forEach((item, index1) => {
                const tryFindPriority = priorityStore.store.find(i => i.id === item.id);
                if (tryFindPriority === undefined) {
                    priorityStoreInit.add({
                        id: item.id,
                        priority: getUniquePriority(thisDayEvents),
                    });
                    thisDayEvents[index1].priority = getUniquePriority(thisDayEvents);
                } else {
                    item.priority = tryFindPriority?.priority;
                }
            });

            setEvents([...thisDayEvents]);
        }else{
            setEvents([])
        }
    }, [config.events]);

    return { events };
};

export default useEvents;
