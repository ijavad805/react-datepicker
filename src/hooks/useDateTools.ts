import moment from "moment";
import { useContext } from "react";
import { DatepickerContext } from "../provider";
var moment_jalali = require("jalali-moment");

const useDateTools = () => {
    const config = useContext(DatepickerContext);
    const date = config.date.clone();
    const value = config.value;

    const getMonth = (month?: number) => {
        const cloneDate = date.clone();
        if (month !== undefined) {
            cloneDate.add(month, "M");
        }

        return {
            countDay: cloneDate.daysInMonth(),
            name: cloneDate.format("MMM"),
            fullName: cloneDate.format("MMMM"),
        };
    };

    const getYear = (date_?: string) => {
        return date.format("YYYY");
    };

    const getMonthStartWith = () => {
        return date.startOf("month").weekday();
    };

    const momentDatePicker = () => {
        if (config.lang === "en") return moment;
        return moment_jalali;
    };
    const getMonths = () => {
        if (config.lang === "fa") {
            try {
                return momentDatePicker()().locale("fa").localeData().jMonths();
            } catch (e) {
                console.log("react-datepicker Error:", e);
                return [
                    "فروردین",
                    "اردیبهشت",
                    "خرداد",
                    "تیر",
                    "مرداد",
                    "شهریور",
                    "مهر",
                    "ابان",
                    "اذر",
                    "دی",
                    "بهمن",
                    "اسفند",
                ];
            }
        }

        return momentDatePicker()().localeData().monthsShort();
    };

    const getWeakDayName = () => {
        let dayNames = [...date.localeData().weekdaysMin()];
        if (config.lang === "fa") {
            dayNames.unshift(dayNames.pop() as any);
        }

        return dayNames;
    };
    return {
        getMonth,
        maxMonth: 12,
        maxWeak: 7,
        getYear,
        getMonthStartWith,
        date: date,
        value,
        getMonths,
        setValue: config.setValue,
        moment: momentDatePicker(),
        getWeakDayName,
    };
};

export default useDateTools;
