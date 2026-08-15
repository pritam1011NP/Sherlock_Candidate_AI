import { createContext, useContext, useEffect, useState } from "react";

import {
    connectDashboardSocket,
    disconnectDashboardSocket,
} from "../api/websocket";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {

        connectDashboardSocket((message) => {

            console.log("Dashboard Event:", message);

            setRefreshKey((prev) => prev + 1);

        });

        return () => {

            disconnectDashboardSocket();

        };

    }, []);

    return (

        <DashboardContext.Provider
            value={{ refreshKey }}
        >

            {children}

        </DashboardContext.Provider>

    );

}

export function useDashboard() {

    return useContext(DashboardContext);

}