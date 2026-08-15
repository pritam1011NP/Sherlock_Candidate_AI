import { useEffect } from "react";

export default function useAutoRefresh(callback, delay = 10000) {

    useEffect(() => {

        callback();

        const interval = setInterval(() => {

            callback();

        }, delay);

        return () => clearInterval(interval);

    }, []);

}