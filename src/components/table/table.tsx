import React from "react";
import "./style.scss";

interface IProps {
    children: React.ReactNode;
    className?: string;
}
const Table = ({ children, className }: IProps) => {
    return <table className={`__datepicker-table ${className}`}>{children}</table>;
};

export default Table;
