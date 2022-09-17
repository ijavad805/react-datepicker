import React from "react";

const Header = () => {
    const { _t } = useTranslate();

    return (
        <div className={`__calendar-header`}>
            <div className={`__calendar-header-controllers`}>
                <div className={`__calendar-controller`}>{_t("Next")}</div>
                <div className={`__calendar-controller`}>{_t("Prev")}</div>
            </div>
        </div>
    );
};

export default Header;
