import React, {BaseSyntheticEvent, useEffect, useRef, useState} from "react";
import DatepickerDropdown from "./datepicker-dropdown/datepickerDropdown";
import {DatepickerProvider} from "../../provider";
import {useOutsideClick} from "../../hooks/useOutSideClick";
import moment from "moment";
import "./style.scss";
import {EnumLang, EnumTheme} from "./enum";
import {EDropdownPositions} from "./datepicker-dropdown/useDropdownRoles";

var moment_jalali = require("jalali-moment");

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
    value?: moment.Moment | string;
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
    name?: string;
    allowClear?: boolean;
    onChangeMonth?: (start: string, end: string) => void;
}

const Datepicker = ({
                        theme = EnumTheme.blue,
                        lang = EnumLang.fa,
                        input = <input placeholder="datepicker"/>,
                        format = "YYYY/MM/DD",
                        modeTheme = "light",
                        adjustPosition = "auto",
                        closeWhenSelectADay = true,
                        value: value_,
                        footer,
                        onChange,
                        defaultValue,
                        dayEffects,
                        disabled,
                        disabledDate,
                        loading,
                        onOpen,
                        spinnerComponent,
                        name,
                        allowClear = true,
                        onChangeMonth,
                    }: IPropsDatepicker) => {
    const moment_ = lang === "fa" ? moment_jalali : moment;
    moment_.locale(lang);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState(
        defaultValue !== undefined ? moment_(defaultValue.format()) : undefined
    );
    const ref = useRef<any>(null);
    const [cloneInputRef, setCloneRef] = useState<any>();
    const refInput = useRef<any>(null);

    useOutsideClick(ref, () => {
        setOpen(false);
    });

    useEffect(() => {
        let v = moment_(value_);
        if (lang === "fa") {
            v = moment_.from(value_, "en");
        }
        if (value_ && value_ !== value) setValue(v.locale(lang));
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
                onMonthChange: onChangeMonth
            }}
            format={format}
            setOpen={setOpen}
            onChange={date => {
                setValue(date);
                onChange && onChange(date?.clone()?.locale("en"));
            }}
            value={value}
            defaultValue={defaultValue}
            closeWhenSelectADay={closeWhenSelectADay}
            input={refInput}>
            <div
                className={`__datepicker __datepicker-theme-${theme} __datepicker-theme-mode-${modeTheme} ${lang}`}
                ref={ref}>
                <div className={"__datepicker-input"}>
                    {cloneInputRef === undefined && <div style={{display: "none"}}>{input}</div>}
                    <input
                        ref={refInput}
                        className={cloneInputRef?.getAttribute("class")}
                        placeholder={cloneInputRef?.getAttribute("placeholder")}
                        onFocus={() => {
                            setOpen(true);
                            if (adjustPosition === "modal") {
                                if (refInput.current) refInput.current?.blur();
                            }
                        }}
                        autoComplete={"disabled"}
                        disabled={disabled}
                        onChange={(e: any) => {
                            let date;
                            if (typeof e === "string") {
                                date = moment_(e.replace("/", "-"));
                            } else if (e.target !== undefined) {
                                date = moment_(e.target.value.replaceAll("/", "-"));
                            }

                            if (date && date.isValid()) {
                                if (lang === "en" || date.year() >= 1000) {
                                    setValue(date);
                                    if (onChange) onChange(date);
                                }
                            }
                        }}
                        name={name ? name : cloneInputRef?.getAttribute("name")}
                    />
                    {allowClear && value !== undefined && value !== null ? (
                        <div
                            className={"__datepicker-clear-btn"}
                            onClick={() => {
                                setValue(undefined);
                                if (onChange) onChange(undefined);
                            }}>
                            X
                        </div>
                    ) : null}
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
