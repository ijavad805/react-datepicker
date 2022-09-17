const useTranslate = () => {
    const _t = (text: string, params?: string[]) => {
        if (params) {
            params.forEach((param, index) => {
                text.replace(`{${index}}`, param);
            });
        }

        return text;
    };

    return { _t };
};
