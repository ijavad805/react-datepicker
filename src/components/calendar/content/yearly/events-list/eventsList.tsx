import { Moment } from "moment";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { DatepickerContext } from "../../../../../provider";
import useTranslate from "../../../../../hooks/useTranslate";
import { EventItem } from "./event-item";
import "./style.scss";
import useDateTools from "../../../../../hooks/useDateTools";

interface IProps {
    date?: Moment;
    onClose: () => void;
    visible: boolean;
}

export const EventsList: React.FC<IProps> = props => {
    const config = useContext(DatepickerContext);
    const { _t } = useTranslate();
    const ref = useRef<HTMLDivElement>(null);
    const { moment } = useDateTools();

    const events = useMemo(() => {
        return (
            config.events?.filter(i => {
                if (!props.date) return false;

                if (typeof i.date === "string") {
                    return moment(i.date).format() === moment(props.date).locale("en").format();
                } else if (typeof i.date === "object") {
                    return (
                        props.date.isBetween(
                            moment(i.date.start),
                            moment(i.date.end),
                            null,
                            "[]"
                        ) ||
                        moment(props.date).locale("en").format("YYYY-MM-D") ===
                            moment(i.date.start).format("YYYY-MM-D")
                    );
                }
            }) || []
        );
    }, [props.date, props.visible, config.events]);

    useEffect(() => {
        setTimeout(() => {
            if (props.visible && ref.current) {
                ref.current.classList.add("visible");
            }
        }, 0);
    }, [props.visible]);

    return (
        <div className={`__datepicker-events-list`} ref={ref}>
            <div className="__events-list-header">
                <div className="__events-back-button" onClick={props.onClose}>
                    {_t("back")}
                    <svg
                        width="108"
                        height="108"
                        viewBox="0 0 108 108"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M91.9687 49.9922H30.259L67.1941 17.9297C67.7847 17.4129 67.4261 16.4531 66.6457 16.4531H57.3117C56.9004 16.4531 56.5101 16.6008 56.2043 16.8645L16.3476 51.4477C15.9826 51.7641 15.6898 52.1553 15.4892 52.5947C15.2885 53.0342 15.1847 53.5116 15.1847 53.9947C15.1847 54.4778 15.2885 54.9553 15.4892 55.3947C15.6898 55.8342 15.9826 56.2254 16.3476 56.5418L56.4363 91.3359C56.5945 91.473 56.7843 91.5469 56.9847 91.5469H66.6351C67.4156 91.5469 67.7742 90.5766 67.1836 90.0703L30.259 58.0078H91.9687C92.4328 58.0078 92.8125 57.6281 92.8125 57.1641V50.8359C92.8125 50.3719 92.4328 49.9922 91.9687 49.9922Z"
                            fill="var(--primary)"
                        />
                    </svg>
                </div>
                <div className={"__event-day"}>{moment(props.date).locale("fa").format("LL")}</div>
            </div>
            <div className={"__event-list-body"}>
                {events.map(event => (
                    <EventItem
                        className={event.className}
                        event={event}
                        id={event.id}
                        style={event.style}>
                        {event.title}
                    </EventItem>
                ))}
            </div>
            {events.length === 0 && (
                <div className={"__event-empty"}>
                    <svg
                        width="108"
                        height="108"
                        viewBox="0 0 108 108"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clip-rule="evenodd"
                            d="M54 5.625C51.2775 5.625 48.771 6.3 46.0305 7.434C43.38 8.532 40.302 10.1475 36.4725 12.159L27.1665 17.0415C22.464 19.5075 18.7065 21.483 15.795 23.4225C12.789 25.434 10.467 27.549 8.7795 30.4155C7.0965 33.273 6.3405 36.369 5.976 40.0545C5.625 43.632 5.625 48.0285 5.625 53.5635V54.4365C5.625 59.9715 5.625 64.368 5.976 67.9455C6.3405 71.6355 7.101 74.727 8.7795 77.5845C10.467 80.451 12.7845 82.566 15.7995 84.5775C18.702 86.517 22.464 88.4925 27.1665 90.9585L36.4725 95.841C40.302 97.8525 43.38 99.468 46.0305 100.566C48.7755 101.7 51.2775 102.375 54 102.375C56.7225 102.375 59.229 101.7 61.9695 100.566C64.62 99.468 67.698 97.8525 71.5275 95.841L80.8335 90.963C85.536 88.4925 89.2935 86.517 92.2005 84.5775C95.2155 82.566 97.533 80.451 99.2205 77.5845C100.903 74.727 101.66 71.631 102.024 67.9455C102.375 64.368 102.375 59.9715 102.375 54.441V53.559C102.375 48.0285 102.375 43.632 102.024 40.0545C101.66 36.3645 100.899 33.273 99.2205 30.4155C97.533 27.549 95.2155 25.434 92.2005 23.4225C89.298 21.483 85.536 19.5075 80.8335 17.0415L71.5275 12.159C67.698 10.1475 64.62 8.532 61.9695 7.434C59.2245 6.3 56.7225 5.625 54 5.625ZM39.465 18.207C43.47 16.1055 46.278 14.6385 48.609 13.6755C50.877 12.735 52.4745 12.375 54 12.375C55.53 12.375 57.123 12.735 59.391 13.6755C61.722 14.6385 64.5255 16.1055 68.5305 18.207L77.5305 22.932C82.4355 25.5015 85.878 27.315 88.4565 29.034C89.7255 29.8845 90.72 30.672 91.53 31.464L76.5405 38.9565L38.2905 18.8235L39.465 18.207ZM31.2525 22.518L30.4695 22.932C25.5645 25.5015 22.122 27.315 19.548 29.034C18.4497 29.746 17.4207 30.5596 16.4745 31.464L54 50.229L69.1065 42.669L32.1795 23.238C31.8308 23.0541 31.517 22.8104 31.2525 22.518ZM13.221 37.3815C12.996 38.3445 12.8205 39.438 12.6945 40.7115C12.3795 43.9245 12.375 47.988 12.375 53.7345V54.261C12.375 60.012 12.375 64.0755 12.6945 67.284C13.005 70.4205 13.5945 72.45 14.598 74.16C15.597 75.8565 17.0415 77.292 19.548 78.966C22.122 80.685 25.5645 82.4985 30.4695 85.068L39.4695 89.793C43.4745 91.8945 46.278 93.3615 48.609 94.3245C49.347 94.6305 50.0085 94.8735 50.625 95.067V56.0835L13.221 37.3815ZM57.375 95.0625C57.9915 94.8735 58.653 94.6305 59.391 94.3245C61.722 93.3615 64.5255 91.8945 68.5305 89.793L77.5305 85.068C82.4355 82.494 85.878 80.685 88.4565 78.966C90.9585 77.292 92.403 75.8565 93.4065 74.16C94.41 72.45 94.995 70.425 95.3055 67.284C95.6205 64.0755 95.625 60.012 95.625 54.2655V53.739C95.625 47.988 95.625 43.9245 95.3055 40.716C95.2042 39.5955 95.0283 38.4831 94.779 37.386L79.875 44.8335V58.5C79.875 59.3951 79.5194 60.2535 78.8865 60.8865C78.2536 61.5194 77.3951 61.875 76.5 61.875C75.6049 61.875 74.7464 61.5194 74.1135 60.8865C73.4806 60.2535 73.125 59.3951 73.125 58.5V48.213L57.375 56.088V95.0625Z"
                            fill="#FAFAFA"
                        />
                    </svg>
                </div>
            )}
            {config.onAddEventClick && props.date && (
                <div
                    className={"__add-event"}
                    onClick={config.onAddEventClick.bind(
                        this,
                        moment(props.date).locale("en").format()
                    )}>
                    <div>+</div>
                </div>
            )}
        </div>
    );
};
