import { useContext } from "react";
import locales from "../locales";
import { DatepickerContext } from "../provider";

const useTranslate = () => {
    const config = useContext(DatepickerContext);
    const _t = (text: string, params?: string[]) => {
        const dic = locales[config.lang as "fa"] as any;
        text = dic[text] ? dic[text] : text;
        if (params) {
            params.forEach((param, index) => {
                text.replace(`{${index}}`, param);
            });
        }

        return text;
    };

    return { _t };
};

export default useTranslate;
