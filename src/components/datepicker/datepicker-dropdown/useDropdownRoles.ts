import { useContext, useEffect, useState } from "react";
import { DatepickerContext } from "../../../provider";

export enum EDropdownPositions {
    rightBottom = "right-bottom",
    leftBottom = "left-bottom",
    rightTop = "right-top",
    leftTop = "left-top",
}

const useDropdownRoles = (ref: any, open: boolean) => {
    const [position, setPosition] = useState<EDropdownPositions>();
    const [fix, setFix] = useState<"fix-top" | "fix-bottom">();
    const config = useContext(DatepickerContext);

    const autoPosition = () => {
        const rect = ref.current.getBoundingClientRect();
        const windowOffsets = {
            height: window.innerHeight,
            width: window.innerWidth,
            scroll: window.scrollX,
        };

        console.log(rect);
        
        if (rect.top < 0) setFix("fix-top");
        else setFix(undefined);
        
        if (rect.right > windowOffsets.width - rect.left) {
            if (rect.top <= windowOffsets.height - rect.bottom) {
                setPosition(EDropdownPositions.rightBottom);
            } else {
                setPosition(EDropdownPositions.rightTop);
            }
        } else {
            if (rect.top < windowOffsets.height - rect.bottom) {
                setPosition(EDropdownPositions.leftBottom);
            } else {
                setPosition(EDropdownPositions.leftTop);
            }
        }
    };

    useEffect(() => {
        if (ref && open) {
            window.addEventListener("scroll", autoPosition);
            window.addEventListener("resize", autoPosition);
        }

        return () => {
            window.removeEventListener("scroll", autoPosition);
            window.removeEventListener("resize", autoPosition);
        };
    }, [open]);

    return { position, fix };
};

export default useDropdownRoles;
