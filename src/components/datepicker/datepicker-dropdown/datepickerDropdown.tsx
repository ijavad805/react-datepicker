import "./datepickerDropdown.scss";
import React, { useRef, useState } from "react";
import useDropdownRoles from "./useDropdownRoles";
import { Body } from "./body";
import PickDay from "./pick-day/pickDay";
import PickMonth from "./pick-month";
import moment from "moment";
import useDateTools from "../../../hooks/useDateTools";
import Loading from "../../loading/loading";

interface IProps {
    open: boolean;
    footer?: (moment: Function, setValue?: any) => JSX.Element | JSX.Element[] | string;
    loading?: boolean;
    spinnerComponent?: any;
}
const DatepickerDropdown = ({ open, footer, loading, spinnerComponent }: IProps) => {
    const dropdownRef = useRef(null);
    const [step, setStep] = useState(0);
    const { moment, setValue } = useDateTools();
    useDropdownRoles(dropdownRef, open);

    return (
        <div
            ref={dropdownRef}
            className={`__datepicker-dropdown ${open ? "__datepicker-dropdown-active" : ""} `}>
            <Loading loading={loading} spinnerComponent={spinnerComponent}>
                <>
                    {step === 0 && <PickDay onStep={setStep} />}
                    {step === 1 && <PickMonth onStep={setStep} />}
                    {footer && (
                        <div className={`__datepicker-dropdown-footer`}>
                            {footer(moment, setValue)}
                        </div>
                    )}
                </>
            </Loading>
        </div>
    );
};

export default DatepickerDropdown;
