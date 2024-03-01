import { act, fireEvent, render, screen } from "@testing-library/react";
import Day from "../day";
import moment from "moment";
import React from "react";
import { DatepickerProvider } from "../../../../../provider";

interface IProps {
    children: React.ReactNode;
}
const FakeProvider: React.FC<IProps> = ({ children }) => {
    return (
        <DatepickerProvider
            config={{
                lang: "en",
                theme: "blue",
                dayEffects: [
                    {
                        day: moment().format("YYYY-MM-DD"),
                        title: "test",
                        dotColor: "red",
                    },
                ],
            }} defaultValue={moment()}>
            {children}
        </DatepickerProvider>
    );
};
describe("datepicker day component", () => {
    test("Showing the day number ( only D have to showed )", () => {
        render(<Day date={moment()} day={moment().format("YYYY-MM-DD")} />);

        // it cant be bigger then this only D have to show
        expect(screen.getByTestId("day-component").textContent).toBe(moment().format("D"));
    });

    test("Show this day have event", async () => {
        render(
            <FakeProvider>
                <Day date={moment()} day={moment().format("YYYY-MM-DD")} />
            </FakeProvider>
        );

        const findEvent = await screen.findByTestId("effects");
        expect(findEvent).not.toBe(undefined);
        expect(findEvent.style.background).toBe("red");
    });

    test("click on days -> have be clicked", async () => {
        const fnClick = jest.fn();
        render(
            <FakeProvider>
                <Day date={moment()} day={moment().format("YYYY-MM-DD")} onClick={fnClick} />
            </FakeProvider>
        );
        await act(() =>
            fireEvent(
                screen.getByTestId("day-component"),
                new MouseEvent("click", { cancelable: true, bubbles: true })
            )
        );
        expect(fnClick).toHaveBeenCalled();
    });
    // TODO :: check color of day effects
    test("disabled days -> have not be clickable", async () => {
        const fnClick = jest.fn();
        render(
            <FakeProvider>
                <Day
                    date={moment()}
                    day={moment().format("YYYY-MM-DD")}
                    disabled
                    onClick={fnClick}
                />
            </FakeProvider>
        );

        await act(() =>
            fireEvent(
                screen.getByTestId("day-component"),
                new MouseEvent("click", { cancelable: true, bubbles: true })
            )
        );

        expect(fnClick).not.toHaveBeenCalled();
    });
    test("selected days -> should have a class",() => {
        render(
            <FakeProvider>
                <Day
                    date={moment()}
                    day={moment().format("YYYY-MM-DD")}
                />
            </FakeProvider>
        );

        expect(screen.getByTestId("day-component").className.includes("selected")).toBe(true);
    })
    // TODO :: check selected days
    // TODO :: check today style
});
