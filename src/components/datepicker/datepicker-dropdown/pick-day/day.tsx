import React, { useMemo } from "react";
import { useContext } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import usePersian from "../../../../hooks/usePersian";
import { DatepickerContext } from "../../../../provider";

interface IProps {
    day: string;
    date: moment.Moment;
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    onlyView?: boolean;
}
const Day = ({ day, date, disabled, onClick, style, onlyView }: IProps) => {
    const config = useContext(DatepickerContext);
    const { moment } = useDateTools();
    const { convertNumbers } = usePersian();

    const effect = useMemo(() => {
        return config.dayEffects?.find(
            item => moment(item.day).format("YYYY-MM-D") === moment(day).format("YYYY-MM-D")
        );
    }, []);

    const events = useMemo(() => {
        return (
            config.events?.filter(i => {
                if (typeof i.date === "string") {
                    return moment(i.date).format() === moment(day).locale("en").format();
                } else if (typeof i.date === "object") {
                    return (
                        moment(day)
                            .locale("en")
                            .isBetween(moment(i.date.start), moment(i.date.end), null, "[]") ||
                        moment(day).locale("en").format() === moment(i.date.start).format()
                    );
                }
            }) || []
        );
    }, [config.events]);

    const classes = () => {
        let class_ = "__datepicker-days";
        if (day === moment().format("YYYY-MM-D")) {
            class_ += " __datepicker-today";
        }
        if (day === config.value?.format("YYYY-MM-D")) {
            class_ += " __datepicker-selected";
        }
        if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
            class_ += " __datepicker-day-disabled";
        }

        if (config?.onDay) {
            const dayClass = config.onDay(moment(day).locale("en").format("YYYY-MM-DD"))?.className;
            if (dayClass) {
                class_ += ` ${dayClass}`;
            }
        }

        return class_;
    };

    return (
        <div
            className={classes()}
            style={{
                ...style,
                color: effect ? effect?.color : "",
            }}
            onClick={() => {
                if (config.setValue) {
                    if (onClick) onClick();
                    if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
                        return false;
                    }
                    if (onlyView) {
                        config.setValue(moment(day));
                    }
                }
            }}
            title={effect?.title}>
            {convertNumbers(moment(day).format("D"))}
            {effect && (
                <span
                    className="__datepicker-day-effect"
                    style={{ background: effect?.dotColor }}
                />
            )}
            {events?.length > 0 && (
                <span
                    className="__datepicker-day-effect"
                    style={{ background: "var(--primary)" }}
                />
            )}
        </div>
    );
};

export default Day;
