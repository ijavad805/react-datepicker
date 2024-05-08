import React, { useContext } from "react";
import { DatepickerContext } from "../../../../../../provider";
import { IEvent } from "../../../..";
import "./style.scss";

interface IProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    id: number;
    event: IEvent;
}
export const EventItem: React.FC<IProps> = props => {
    const config = useContext(DatepickerContext);
    return (
        <div
            className={`__event-item ${props.className}`}
            style={props.style}
            onClick={() => {
                config.onClickEvent && config.onClickEvent(props.event);
            }}>
            {props.children}
        </div>
    );
};
