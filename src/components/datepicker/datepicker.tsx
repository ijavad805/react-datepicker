import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import DatepickerDropdown from "./datepicker-dropdown/datepickerDropdown";
import { DatepickerProvider } from "../../provider";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import moment from "moment";
import "./style.scss";
import { EnumLang, EnumTheme } from "./enum";
import { EDropdownPositions } from "./datepicker-dropdown/useDropdownRoles";
var moment_jalali = require("jalali-moment");
moment_jalali.locale("fa");

export interface IPropsDatepicker {
    theme?: keyof typeof EnumTheme;
    lang?: keyof typeof EnumLang;
    adjustPosition?: typeof EDropdownPositions | "modal" | "auto";
    input?: JSX.Element;
    format?: string;
    footer?: (
        moment?: any,
        setValue?: (val?: moment.Moment) => void
    ) => JSX.Element | JSX.Element[] | string;
    onChange?: (val?: moment.Moment) => void;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    modeTheme?: "dark" | "light";
    dayEffects?: {
        title?: string;
        color?: string;
        dotColor?: string;
        day: string;
    }[];
    disabledDate?: (date: moment.Moment) => Boolean;
    disabled?: boolean;
    loading?: boolean;
    closeWhenSelectADay?: boolean;
    onOpen?: Function;
    spinnerComponent?: JSX.Element | JSX.Element[];
}

const Datepicker = ({
    theme = EnumTheme.blue,
    lang = EnumLang.fa,
    input = <input placeholder="datepicker" />,
    format = "YYYY/MM/DD",
    footer,
    onChange,
    value: value_,
    defaultValue,
    modeTheme = "light",
    dayEffects,
    disabled,
    disabledDate,
    loading,
    closeWhenSelectADay = true,
    onOpen,
    spinnerComponent,
    adjustPosition = "auto",
}: IPropsDatepicker) => {
    moment.locale(lang);
    moment_jalali.locale(lang);
    const moment_ = lang === "fa" ? moment_jalali : moment;
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState(value_ !== undefined ? moment_(value_) : undefined);
    const ref = useRef<any>(null);
    const [cloneInputRef, setCloneRef] = useState<any>();
    const refInput = useRef<any>(null);

    moment.locale(lang);

    useOutsideClick(ref, () => {
        setOpen(false);
    });

    useEffect(() => {
        if (value_ && value_ !== value) setValue(value_);
    }, [value_]);

    useEffect(() => {
        if (open && onOpen) onOpen();
    }, [open]);

    useEffect(() => {
        setCloneRef(ref.current !== null ? ref.current.querySelector("input") : undefined);
    }, [ref]);

    return (
        <DatepickerProvider
            config={{
                lang: lang,
                theme: theme,
                disabledDate,
                dayEffects,
            }}
            format={format}
            setOpen={setOpen}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            closeWhenSelectADay={closeWhenSelectADay}
            input={refInput}>
            <div
                className={`__datepicker __datepicker-theme-${theme} __datepicker-theme-mode-${modeTheme} `}
                ref={ref}>
                <div className={"__datepicker-input"}>
                    {cloneInputRef === undefined && <div style={{ display: "none" }}>{input}</div>}
                    <input
                        ref={refInput}
                        className={cloneInputRef?.getAttribute("class")}
                        placeholder={cloneInputRef?.getAttribute("placeholder")}
                        onFocus={() => setOpen(true)}
                        autoComplete={"disabled"}
                        disabled={disabled}
                        onChange={(e: any) => {
                            let date;
                            if (typeof e === "string") {
                                date = moment_(e);
                            } else if (e.target !== undefined) {
                                date = moment_(e.target.value);
                            }

                            if (date && date.isValid()) {
                                if (lang === "en" || date.year() >= 1000) setValue(date);
                            }
                        }}
                    />
                    {/* TODO :: add delete icon if user select a date and if not show date icon */}
                </div>
                {open && (
                    <DatepickerDropdown
                        open={open}
                        footer={footer}
                        loading={loading}
                        spinnerComponent={spinnerComponent}
                        adjustPosition={adjustPosition}
                        refMain={ref}
                        setOpen={setOpen}
                    />
                )}
            </div>
        </DatepickerProvider>
    );
};

export default Datepicker;
