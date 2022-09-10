import "./datepickerDropdown.scss";
import React, { useRef, useState } from "react";
import useDropdownRoles, { EDropdownPositions } from "./useDropdownRoles";
import { Body } from "./body";
import PickDay from "./pick-day/pickDay";
import PickMonth from "./pick-month";
import moment from "moment";
import useDateTools from "../../../hooks/useDateTools";
import Loading from "../../loading/loading";
import PickYear from "./pick-year/pickYear";

interface IProps {
    open: boolean;
    footer?: (moment: Function, setValue?: any) => JSX.Element | JSX.Element[] | string;
    loading?: boolean;
    spinnerComponent?: any;
    refMain?: any;
    adjustPosition: typeof EDropdownPositions | "modal" | "auto";
    setOpen: Function;
}
const DatepickerDropdown = ({
    open,
    footer,
    loading,
    spinnerComponent,
    refMain,
    adjustPosition,
    setOpen,
}: IProps) => {
    const [step, setStep] = useState(0);
    const { moment, setValue } = useDateTools();
    const { fix, position } = useDropdownRoles(refMain, open);

    return (
        <>
            {adjustPosition === "modal" && (
                <div className={`__datepicker-modal-bg`} onClick={() => setOpen(false)} />
            )}
            <div
                className={`__datepicker-dropdown ${open ? "__datepicker-dropdown-active" : ""} ${
                    adjustPosition !== "auto"
                        ? adjustPosition === "modal"
                            ? "__datepicker-modal"
                            : adjustPosition
                        : position
                } ${fix ? fix : ""}`}>
                <Loading loading={loading} spinnerComponent={spinnerComponent}>
                    <>
                        {step === 0 && <PickDay onStep={setStep} />}
                        {step === 1 && <PickMonth onStep={setStep} />}
                        {step === 2 && <PickYear onStep={setStep} />}
                        {footer && (
                            <div className={`__datepicker-dropdown-footer`}>
                                {footer(moment, setValue)}
                            </div>
                        )}
                    </>
                </Loading>
            </div>
        </>
    );
};

export default DatepickerDropdown;
