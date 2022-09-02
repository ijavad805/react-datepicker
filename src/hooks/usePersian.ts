import { useContext } from "react";
import { DatepickerContext } from "../provider";

const usePersian = () => {
    const config = useContext(DatepickerContext);

    const convertNumbers = (number: number | string) => {
        if (config.lang === "fa") {
            const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

            return number
                .toString()
                .split("")
                .map(x => farsiDigits[parseInt(x)])
                .join("");
        }

        return number;
    };

    return { convertNumbers };
};

export default usePersian;
