import { useEffect } from "react";

const useTitle = (title) => {
    
    useEffect(() => {
        const prevtitle = document.title;
        document.title = title;

        return () => document.title = prevtitle;
    }, [title]);
}


export default useTitle;