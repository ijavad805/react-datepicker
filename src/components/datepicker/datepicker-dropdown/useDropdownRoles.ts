import { useEffect } from "react";

const useDropdownRoles = (ref: any,open: boolean) => {
    const moveDropDownToRightPosition = () => {
        // TODO : move dropdown to current position
    }

    useEffect(() => {
        window.addEventListener("scroll",moveDropDownToRightPosition);
        return () => window.removeEventListener("scroll",moveDropDownToRightPosition);
    },[open]);
};

export default useDropdownRoles;