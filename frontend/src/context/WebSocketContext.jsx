import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {

    const socketRef = useRef(null);

    const [connected, setConnected] = useState(false);

    const [lastEvent, setLastEvent] = useState(null);

    useEffect(() => {

        const socket = new WebSocket(
            "ws://127.0.0.1:8000/ws/dashboard"
        );

        socketRef.current = socket;

        socket.onopen = () => {

            console.log("✅ Dashboard WebSocket Connected");

            setConnected(true);

        };

        socket.onclose = () => {

            console.log("❌ Dashboard WebSocket Disconnected");

            setConnected(false);

        };

        socket.onerror = (err) => {

            console.error("WebSocket Error", err);

        };

        socket.onmessage = (event) => {

            try {

                const data = JSON.parse(event.data);

                setLastEvent(data);

            }

            catch (err) {

                console.error(err);

            }

        };

        // Keep connection alive
        const heartbeat = setInterval(() => {

            if (
                socket.readyState === WebSocket.OPEN
            ) {

                socket.send("ping");

            }

        }, 30000);

        return () => {

            clearInterval(heartbeat);

            socket.close();

        };

    }, []);

    return (

        <WebSocketContext.Provider
            value={{
                socket: socketRef.current,
                connected,
                lastEvent,
            }}
        >

            {children}

        </WebSocketContext.Provider>

    );

}

export function useDashboardSocket() {

    return useContext(WebSocketContext);

}