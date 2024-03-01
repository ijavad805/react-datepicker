import { render, screen } from "@testing-library/react";
import useDateTools from "../useDateTools";
import React, { useContext } from "react";
import moment from "moment";
import { DatepickerContext, DatepickerProvider } from "../../provider";

const TestComponent = () => {
    const { getMonth, getMonthStartWith, getMonths, getWeakDayName } = useDateTools();

    return (
        <ul>
            <li data-testid="getMonth">
                {getMonth(1).name}:{getMonth(12).name}
            </li>
            <li data-testid="getMonthStartWith">{getMonthStartWith()}</li>
            <li data-testid="getMonths">
                {getMonths().map((i: string) => (
                    <>{i}, </>
                ))}
            </li>
            <li data-testid="getWeakDayName">
                {getWeakDayName().map(i => (
                    <>{i}, </>
                ))}
            </li>
            <li data-testid="getWeakDayNameFullName">
                {getWeakDayName(false).map(i => (
                    <>{i}, </>
                ))}
            </li>
        </ul>
    );
};

interface IProps {
    children: React.ReactNode;
}
const FaProvider: React.FC<IProps> = ({ children }) => {
    return (
        <DatepickerProvider
            config={{
                lang: "fa",
                theme: "blue",
            }}>
            {children}
        </DatepickerProvider>
    );
};
describe("useDateTools hook", () => {
    test("getMonth method -> have to add month to current month", async () => {
        render(<TestComponent />);
        const getMonth = await screen.findByTestId("getMonth");
        const date = moment();
        expect(getMonth.textContent).toBe(
            `${date.add(1, "M").format("MMM")}:${date.add(11, "M").format("MMM")}`
        );
    });

    test("getMonthStartWith method -> have to get first day name of the month", async () => {
        render(<TestComponent />);
        const getMonth = await screen.findByTestId("getMonthStartWith");
        const date = moment();
        expect(getMonth.textContent).toBe(date.startOf("M").weekday().toString());
    });

    test("getMonths method -> have to get first day name of the month", async () => {
        render(<TestComponent />);
        const getMonth = await screen.findByTestId("getMonths");
        expect(getMonth.textContent).toBe(
            "Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, "
        );
    });

    test("getMonths method -> have to get first day name of the month with Persian months", async () => {
        render(
            <FaProvider>
                <TestComponent />
            </FaProvider>
        );
        const getMonth = await screen.findByTestId("getMonths");
        expect(getMonth.textContent).toBe(
            "فروردین, اردیبهشت, خرداد, تیر, مرداد, شهریور, مهر, آبان, آذر, دی, بهمن, اسفند, "
        );
    });

    test("getMonths method -> have to get first day name of the month with Persian months", async () => {
        render(
            <FaProvider>
                <TestComponent />
            </FaProvider>
        );
        const getMonth = await screen.findByTestId("getMonths");
        expect(getMonth.textContent).toBe(
            "فروردین, اردیبهشت, خرداد, تیر, مرداد, شهریور, مهر, آبان, آذر, دی, بهمن, اسفند, "
        );
    });

    test("getWeakDayName method -> week days ( persian )", async () => {
        render(
            <FaProvider>
                <TestComponent />
            </FaProvider>
        );
        const getWeakDayName = await screen.findByTestId("getWeakDayName");
        expect(getWeakDayName.textContent).toBe("ش, ی, د, س, چ, پ, ج, ");
    });

    test("getWeakDayName method -> week full name days ( persian )", async () => {
        render(
            <FaProvider>
                <TestComponent />
            </FaProvider>
        );
        const getWeakDayNameFullName = await screen.findByTestId("getWeakDayNameFullName");
        expect(getWeakDayNameFullName.textContent).toBe(
            "شنبه, یک‌شنبه, دوشنبه, سه‌شنبه, چهارشنبه, پنج‌شنبه, جمعه, "
        );
    });
});
