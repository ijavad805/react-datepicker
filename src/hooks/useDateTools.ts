import moment, {Moment} from "moment";
import {useContext, useMemo} from "react";
import {DatepickerContext} from "../provider";
import dateFnsJalali from "date-fns-jalali";
import * as dateFns from "date-fns";

const useDateTools = (customDate?: Date) => {
    const config = useContext(DatepickerContext);
    const tools = useMemo(() => config.lang === "en" ? dateFns : dateFnsJalali, [config.lang]);
    const date = customDate ? new Date(customDate) : config.value;
    const value = config.value;

    const format = (date: Date | string, format: string) => {
        return dateFnsJalali.format(date, format)
    }

    const isSameDay = (date: Date | string, to: Date | string) => {
        return dateFns.isSameDay(date, to)
    }

    const year = (date_: string | Date) => {
        return format(date_, "YYYY");
    };

    const getMonthStartWith = () => {
        if (date)
            return tools.startOfWeek(tools.startOfMonth(date)); //
        return null;
    };

    const getMonths = (): string[] => {
        const seed = new Date(2024, 0, 1);
        return Array.from({length: 12}, (_, i) => {
            return tools.format(tools.setMonth(seed, i), config.lang === "fa" ? "LLLL" : "LLL");
        });
    };

    const getWeekDayName = (
        minName: boolean = true,
    ) => {
        // Build one full ISO week (Mon-Sun)
        const days = tools.eachDayOfInterval({
            start: new Date(2021, 0, 4), // Monday
            end: new Date(2021, 0, 10)   // Sunday
        });

        // Pick the right token for short vs long names
        const token = minName ? "EEEEE" : "EEEE";

        let dayNames = days.map(d => format(d, token));

        if (config.lang === "fa") {
            dayNames.unshift(dayNames.pop() as string);
        }

        return dayNames;
    };

    const getMonth = (
        baseDate: Date,
        month?: number,
        addMonth: boolean = true,
    ) => {
        let date = baseDate;

        if (month !== undefined) {
            if (addMonth) {
                date = tools.addMonths(baseDate, month);
            } else {
                date = tools.setMonth(baseDate, month);
            }
        }

        return {
            countDay: tools.getDaysInMonth(date),
            name: format(date, "MMM"),
            fullName: format(date, "MMMM"),
            date
        };
    };
    return {
        format,
        isSameDay,
        getMonth,
        maxMonth: 12,
        maxWeak: 7,
        year,
        getMonthStartWith,
        date: date,
        value,
        getMonths,
        setValue: config.setValue,
        getWeekDayName,
    };
};

export default useDateTools;
