let socket = null;

export function connectDashboardSocket(onMessage) {

    if (socket) {
        socket.close();
    }

    socket = new WebSocket("ws://127.0.0.1:8000/ws/dashboard");

    socket.onopen = () => {

        console.log("✅ Dashboard WebSocket Connected");

        // Heartbeat every 30 seconds
        const interval = setInterval(() => {

            if (socket?.readyState === WebSocket.OPEN) {
                socket.send("ping");
            }

        }, 30000);

        socket._heartbeat = interval;

    };

    socket.onmessage = (event) => {

        try {

            const message = JSON.parse(event.data);

            onMessage?.(message);

        } catch {

            console.log(event.data);

        }

    };

    socket.onerror = (err) => {

        console.error("WebSocket Error:", err);

    };

    socket.onclose = () => {

        console.log("❌ Dashboard WebSocket Disconnected");

        if (socket?._heartbeat) {
            clearInterval(socket._heartbeat);
        }

    };

    return socket;

}

export function disconnectDashboardSocket() {

    if (socket) {

        if (socket._heartbeat) {
            clearInterval(socket._heartbeat);
        }

        socket.close();

        socket = null;

    }

}