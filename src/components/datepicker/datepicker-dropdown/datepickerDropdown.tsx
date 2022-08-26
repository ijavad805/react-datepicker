import "./datepickerDropdown.scss";
import React, { useRef, useState } from "react";
import useDropdownRoles from "./useDropdownRoles";
import { Body } from "./body";
import PickDay from "./pick-day/pickDay";
import PickMonth from "./pick-month";
import moment from "moment";
import useDateTools from "../../../hooks/useDateTools";

interface IProps {
    open: boolean;
    footer?: (
        moment: moment.Moment,
        setValue?: (val?: moment.Moment) => void
    ) => JSX.Element | JSX.Element[] | string;
}
const DatepickerDropdown = ({ open, footer }: IProps) => {
    const dropdownRef = useRef(null);
    const [step, setStep] = useState(0);
    const { moment, setValue } = useDateTools();
    useDropdownRoles(dropdownRef, open);

    return (
        <div
            ref={dropdownRef}
            className={`__datepicker-dropdown ${open ? "__datepicker-dropdown-active" : ""} `}>
            {step === 0 && <PickDay onStep={setStep} />}
            {step === 1 && <PickMonth onStep={setStep} />}
            {footer && (
                <div className={`__datepicker-dropdown-footer`}>{footer(moment, setValue)}</div>
            )}
        </div>
    );
};

export default DatepickerDropdown;