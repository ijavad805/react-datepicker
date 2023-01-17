import { render, screen } from "@testing-library/react";
import Datepicker from "./datepicker";
import React from "react";
import moment from "moment";

test("normal render", async () => {
    render(<Datepicker />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("");
});

test("normal render with english : 1", async () => {
    render(<Datepicker value={moment("2022-12-24")} lang={"en"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("2022/12/24");
});

test("normal render with english : 2", async () => {
    render(<Datepicker value={"2022-12-24"} lang={"en"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("2022/12/24");
});

test("send milady date to show jalali date : 1", async () => {
    render(<Datepicker value={moment("2022-12-24")} lang={"fa"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("1401/10/03");
});

test("send milady date to show jalali date : 2", async () => {
    render(<Datepicker value={"2022-12-24"} lang={"fa"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("1401/10/03");
});

test("send incurrent milady date to get invalid date", async () => {
    render(<Datepicker value={"20"} lang={"fa"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("Invalid Date");
});

test("test with give jalali date", async () => {
    render(<Datepicker value={"1401-10-05"} lang={"fa"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("Invalid Date");
});

test("test with all attrs", async () => {
    render(<Datepicker value={"20"} lang={"fa"} />);

    expect(screen.getByPlaceholderText("datepicker")).toHaveValue("Invalid Date");
});
