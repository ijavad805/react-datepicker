import { useEffect } from "react";

/**
 * Hook that callback() clicks outside of the passed ref
 */
function useOutsideClick(ref: any, callback: any) {
    useEffect(() => {
        /**
         * Callback if clicked on outside of element
         */

        function handleClickOutside(event: any) {
            if (typeof ref.current === "function" || typeof ref.current === "object")
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export { useOutsideClick };
