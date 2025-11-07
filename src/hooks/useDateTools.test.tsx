import React, {act} from "react";
import moment from "moment";
import { renderHook } from '@testing-library/react';
import useDateTools from "./useDateTools";

// --- Controlled provider mock so we can inject config per test ---
jest.mock("../provider", () => {
    const React = require("react");
    // Default value; tests will override via Provider
    const defaultValue = {
        lang: "en" as "en" | "fa",
        date: require("moment")(), // now
        value: null as number | number[] | null,
        setValue: jest.fn(),
    };
    return {DatepickerContext: React.createContext(defaultValue)};
});
import {DatepickerContext} from "../provider";

// --- Mock jalali-moment to avoid real dependency & force fallback path ---
jest.mock("jalali-moment", () => {
    const base = require("moment");
    const proxy = (...args: any[]) => base(...args);
    (proxy as any).isMoment = (base as any).isMoment;
    return proxy;
});

type Cfg = React.ContextType<typeof DatepickerContext>;
const cfgOf = (patch: Partial<Cfg> = {}): Cfg =>
    ({
        lang: "en",
        date: moment.utc("2024-02-18T12:00:00Z"), // stable anchor
        value: null,
        setValue: jest.fn(),
        ...patch,
    } as Cfg);

const wrap =
    (cfg: Cfg): React.FC<{ children: React.ReactNode }> =>
        ({children}) =>
            <DatepickerContext.Provider value={cfg}>{children}</DatepickerContext.Provider>;

describe("useDateTools characterization", () => {
    test("constants, passthroughs, and selected moment adapter", () => {
        const cfg = cfgOf();
        const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});

        expect(result.current.maxMonth).toBe(12);
        expect(result.current.maxWeak).toBe(7);
        expect(moment.isMoment(result.current.date)).toBe(true);
        expect(result.current.value).toBeNull();
        expect(typeof result.current.setValue).toBe("function");
        // For lang=en the adapter should be 'moment' (mock proves shape)
        expect((result.current.moment as any).isMoment).toBe(moment.isMoment);
    });

    test("getYear uses context date by default; respects customDate override", () => {
        const cfg = cfgOf({date: moment.utc("2021-10-05")});
        const {result, rerender} = renderHook(
            ({cd}: { cd?: moment.Moment }) => useDateTools(cd),
            {initialProps: {cd: undefined}, wrapper: wrap(cfg)}
        );
        expect(result.current.getYear()).toBe("2021");

        rerender({cd: moment.utc("1999-07-01") as unknown as undefined});
        expect(result.current.getYear()).toBe("1999");
    });

    test("getMonthStartWith matches startOf('month').weekday()", () => {
        const d = moment.utc("2024-02-18"); // Feb 1, 2024 was a Thursday
        const cfg = cfgOf({date: d});
        const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});
        expect(result.current.getMonthStartWith()).toBe(d.clone().startOf("month").weekday());
    });

    test("getMonths: English uses monthsShort; Persian falls back to hardcoded list when jMonths missing", () => {
        const en = cfgOf({lang: "en"});
        const {result: r1} = renderHook(() => useDateTools(), {wrapper: wrap(en)});
        expect(r1.current.getMonths()).toEqual(moment().localeData().monthsShort());

        const fa = cfgOf({lang: "fa"});
        const {result: r2} = renderHook(() => useDateTools(), {wrapper: wrap(fa)});
        expect(r2.current.getMonths()).toEqual([
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "ابان",
            "اذر",
            "دی",
            "بهمن",
            "اسفند",
        ]);
    });

    test("getWeakDayName: min vs full, and Persian shift (move last to front)", () => {
        const base = moment.utc("2023-06-07"); // fixed day
        // en
        {
            const cfg = cfgOf({lang: "en", date: base});
            const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});
            expect(result.current.getWeakDayName(true)).toEqual(base.localeData().weekdaysMin());
            expect(result.current.getWeakDayName(false)).toEqual(base.localeData().weekdays());
        }
        // fa shift
        {
            const cfg = cfgOf({lang: "fa", date: base});
            const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});
            const min = base.localeData().weekdaysMin();
            const full = base.localeData().weekdays();
            const shift = (arr: string[]) => {
                const c = [...arr];
                c.unshift(c.pop() as string);
                return c;
            };
            expect(result.current.getWeakDayName(true)).toEqual(shift(min));
            expect(result.current.getWeakDayName(false)).toEqual(shift(full));
        }
    });

    test("getMonth without args returns current month info; does not mutate context date", () => {
        const d = moment.utc("2022-12-10");
        const cfg = cfgOf({date: d.clone()});
        const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});

        const m = result.current.getMonth();
        expect(m.countDay).toBe(d.daysInMonth());
        expect(m.name).toBe(d.format("MMM"));
        expect(m.fullName).toBe(d.format("MMMM"));
        expect(moment.isMoment(m.date)).toBe(true);
        // immutability: context date unchanged
        expect(cfg.date.format()).toBe(d.format());
        expect(m.date.format("YYYY-MM-DD")).toBe(d.format("YYYY-MM-DD"));
    });

    test("getMonth with relative offset (addMonth=true) and absolute index (addMonth=false)", () => {
        const d = moment.utc("2021-01-15");
        const cfg = cfgOf({date: d});
        const {result} = renderHook(() => useDateTools(), {wrapper: wrap(cfg)});

        const plus1 = result.current.getMonth(1, true);
        const expPlus1 = d.clone().add(1, "M");
        expect(plus1.name).toBe(expPlus1.format("MMM"));
        expect(plus1.countDay).toBe(expPlus1.daysInMonth());

        const janAbs = result.current.getMonth(0, false);
        const expJan = d.clone().month(0);
        expect(janAbs.fullName).toBe(expJan.format("MMMM"));
        expect(janAbs.countDay).toBe(expJan.daysInMonth());
    });

    test("month-length edge cases: Feb in leap year vs non-leap year", () => {
        const leap = cfgOf({date: moment.utc("2024-02-10")}); // leap year
        const nonLeap = cfgOf({date: moment.utc("2023-02-10")});

        const {result: r1} = renderHook(() => useDateTools(), {wrapper: wrap(leap)});
        const {result: r2} = renderHook(() => useDateTools(), {wrapper: wrap(nonLeap)});

        expect(r1.current.getMonth().countDay).toBe(29);
        expect(r2.current.getMonth().countDay).toBe(28);
    });

    test("customDate parameter is honored across all getters", () => {
        const base = moment.utc("2020-06-20");
        const cfg = cfgOf({date: moment.utc("1990-01-01")});
        const {result} = renderHook(() => useDateTools(base), {wrapper: wrap(cfg)});

        expect(result.current.getYear()).toBe("2020");
        expect(result.current.getMonthStartWith()).toBe(base.clone().startOf("month").weekday());

        const m = result.current.getMonth();
        expect(m.name).toBe(base.format("MMM"));
        expect(m.fullName).toBe(base.format("MMMM"));
    });
});
