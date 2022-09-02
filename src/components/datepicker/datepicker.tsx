import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import DatepickerDropdown from "./datepicker-dropdown/datepickerDropdown";
import { DatepickerProvider } from "../../provider";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import moment from "moment";
import "./style.scss";
import { EnumLang, EnumTheme } from "./enum";
var moment_jalali = require("jalali-moment");
moment_jalali.locale("fa");

export interface IPropsDatepicker {
    theme?: keyof typeof EnumTheme;
    lang?: keyof typeof EnumLang;
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
}: IPropsDatepicker) => {
    const moment_ = lang === "fa" ? moment_jalali : moment;
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState(value_);
    const ref = useRef(null);
    const refInput = useRef<any>();
    const Input = React.cloneElement(input, {
        ref: refInput,
        onFocus: () => setOpen(true),
        disabled: disabled,
        onChange: (e: any) => {
            let date;
            if (typeof e === "string") {
                date = moment_(e);
            } else if (e.target !== undefined) {
                date = moment_(e.target.value);
            }

            if (date && date.isValid()) {
                setValue(date);
            }
        },
    });

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
                className={`__datepicker __datepicker-theme-${theme} __datepicker-theme-mode-${modeTheme}`}
                style={{
                    width: refInput.current?.offsetWidth,
                }}
                ref={ref}>
                <div className={"__datepicker-input"}>{Input}</div>
                {open && (
                    <DatepickerDropdown
                        open={open}
                        footer={footer}
                        loading={loading}
                        spinnerComponent={spinnerComponent}
                    />
                )}
            </div>
        </DatepickerProvider>
    );
};

export default Datepicker;
