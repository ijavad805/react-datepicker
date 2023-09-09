import React, { useContext } from "react";
import { IEvent } from "../../../..";
import { DatepickerContext } from "../../../../../../provider";
import { Moment } from "moment";
import useDateTools from "../../../../../../hooks/useDateTools";

interface IProps {
    index: number;
    item: IEvent & {
        date: {
            start: string;
            end: string;
        };
    };
    date: moment.MomentInput;
    cellIndexInWeek: number;
    cellWith: number;
}
const RangeEvent: React.FC<IProps> = ({ index, item, cellIndexInWeek, date, cellWith }) => {
    const config = useContext(DatepickerContext);
    const { moment } = useDateTools();
    date = moment(date).locale("en").format("YYYY-MM-DD");
    const hide = cellIndexInWeek !== 0 && item.date.start !== date;

    const calcStyleForRange = (): React.CSSProperties => {
        const calcRight = () => {
            const difDays = moment(item.date.end).diff(moment(date), "days") + 1;
            console.log(difDays, cellIndexInWeek - 7, difDays - (cellIndexInWeek - 6));

            if (7 - cellIndexInWeek > difDays) {
                return difDays;
            } else {
                return 7 - cellIndexInWeek;
            }
        };
        if (!hide) {
            return {
                width: calcRight() * cellWith + "vw",
            };
        }

        return {};
    };

    return (
        <div
            key={index}
            className={`__calendar-table-td-body-events-item ${item?.className} ${
                hide ? "hide" : ""
            }`}
            style={{ ...item?.style, ...calcStyleForRange() }}
            onClick={config.onClickEvent?.bind(this, item)}
            onDoubleClick={config.onDoubleClickEvent?.bind(this, item)}>
            {!item.icon ? (
                <div
                    className={`__calendar-table-td-body-events-item-circle`}
                    style={{ background: item.dotColor }}
                />
            ) : (
                item.icon
            )}
            {item.title}
        </div>
    );
};

export default RangeEvent;
