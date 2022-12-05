import React from "react";
import useTranslate from "../../../hooks/useTranslate";
import { CaretIcon } from "../../datepicker/datepicker-dropdown/body/body";
import "./style.scss";

interface IProps {
    onNextClick?: () => void;
    onPrevClick?: () => void;
    children?: JSX.Element[] | JSX.Element;
    header?: JSX.Element[] | JSX.Element;
    side?: JSX.Element[] | JSX.Element;
}

const Body = ({ children, onNextClick, onPrevClick, header, side }: IProps) => {
    const { _t } = useTranslate();

    return (
        <div className={`__calendar-body`}>
            <div className={`__calendar-header`}>
                <div className={`__calender-header-controllers`}>
                    <div className={`__calendar-controller`} onClick={onNextClick}>
                        <CaretIcon color="rgba(59, 59, 59,0.8)" />
                    </div>
                    <div className={`__calender-header-children`}>{header}</div>
                    <div className={`__calendar-controller`} onClick={onPrevClick}>
                        <CaretIcon color="rgba(59, 59, 59,0.8)" />
                    </div>
                </div>
                {side && <div className={`__calender-right-side`}>{side}</div>}
            </div>
            <div className={`__calender-content`}>{children}</div>
        </div>
    );
};

export default Body;
