import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function MainLayout() {

    return (

        <div
            style={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                background: "#f5f7fb",
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                }}
            >

                <Navbar />

                <main
                    style={{
                        padding: 24,
                        flex: 1,
                    }}
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}