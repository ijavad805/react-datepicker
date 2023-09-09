import React, { useContext } from "react";
import { IEvent } from "../../../..";
import { DatepickerContext } from "../../../../../../provider";

interface IProps {
    index: number;
    item: IEvent;
}
const NormalEvent: React.FC<IProps> = ({ index, item }) => {
    const config = useContext(DatepickerContext);

    return (
        <div
            key={index}
            draggable={config.onDropEvent !== undefined}
            onDrag={(e: any) => {
                e.target.style.opacity = 0;
            }}
            onDragStart={e => {
                e.dataTransfer.setData("text", item.id.toString());
            }}
            onDragEnd={(e: any) => {
                e.target.style.opacity = 1;
            }}
            className={`__calendar-table-td-body-events-item ${item?.className}`}
            style={item?.style}
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

export default NormalEvent;
