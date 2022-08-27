import React from "react";
import "./loading.scss";

interface IProps {
    children?: JSX.Element | JSX.Element[] | string;
    loading?: boolean;
}

const Loading = ({ children, loading }: IProps) => {
    
    return (
        <div className={`__datepicker-loading-container`}>
            <div className={`__datepicker-loading`}>
                <span className={"__datepicker-loading-spin"} />
            </div>
        </div>
    );
};

export default Loading;
