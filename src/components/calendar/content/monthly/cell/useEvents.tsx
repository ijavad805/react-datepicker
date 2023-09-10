import { useContext, useEffect, useState } from "react";
import { IEvent, IEventLogic } from "../../..";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";
import moment from "moment";

const priority: any = {};
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
    const setPriority = (todayList, index, item) => {
        if (item.priority !== undefined) {
            return item.priority;
        } else {
            const findSamePriority = todayList.find(i => i.priority === index);

            if (findSamePriority === undefined) {
                return index;
            } else {
                return setPriority(todayList, index + 1, item);
            }
        }
    };
    useEffect(() => {
        const cloneEvents = config.events ? [...config.events] : [];
        cloneEvents.forEach(item => {
            if (priority[date] === undefined) {
                priority[date] = [];
            }
            if (item.date.start !== item.date.end) {
                const tryFindPriority = priority[date].find(i => i.id === item.id);
                if (tryFindPriority === undefined) {
                    const findToDayEvents = cloneEvents.filter(i =>
                        handleFilterEvents(i, item.date.start)
                    );
                    findToDayEvents.forEach((todayEvents, index) => {
                        if (todayEvents.id === item.id) {
                            priority[date].push({
                                id: item.id,
                                priority: index,
                            });
                        }
                    });
                } else {
                    item.priority = tryFindPriority?.priority;
                }
            }
        });

        const thisDayEvents = cloneEvents?.filter(item => handleFilterEvents(item));

        const thisDayEventsWithoutPriority =
            thisDayEvents
                ?.filter(i => i.priority === undefined)
                ?.map((item, index) => {
                    return {
                        ...item,
                        priority: setPriority(thisDayEvents, index, item),
                    };
                }) || [];
        const thisDayEventsWithPriority =
            thisDayEvents?.filter(i => i.priority !== undefined) || [];

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

                    if (a.date.end === a.date.start) {
                        return 1;
                    } else if (b.date.end === b.date.start) {
                        return -1;
                    }
                    return dateComparison;
                }
            })
        );
    }, [config.events]);

    return { events };
};

export default useEvents;
