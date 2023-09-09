import { useContext, useEffect, useState } from "react";
import { IEvent } from "../../..";
import useDateTools from "../../../../../hooks/useDateTools";
import { DatepickerContext } from "../../../../../provider";

const useEvents = (date: moment.MomentInput) => {
    const { moment } = useDateTools();
    const config = useContext(DatepickerContext);
    const [events, setEvents] = useState<IEvent[]>();

    const handleFilterEvents = (item: IEvent) => {
        const selectedDate = moment(date).locale("en");

        if (typeof item.date === "string") {
            const eventDate = moment(item.date).format("YYYY-MM-DD");

            return eventDate === selectedDate.format("YYYY-MM-DD");
        } else if ("start" in item.date && "end" in item.date) {
            const startDate = moment(item.date.start).format("YYYY-MM-DD");
            const endDate = moment(item.date.end).format("YYYY-MM-DD");

            return selectedDate.format("YYYY-MM-DD") >= startDate && selectedDate.format("YYYY-MM-DD") <= endDate;
        }

        return false;
    };

    useEffect(() => {
        setEvents(config.events?.filter(handleFilterEvents));
    }, [config.events]);

    return { events };
};

export default useEvents;
