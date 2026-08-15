from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):

        self.active_connections = {}

    async def connect(
        self,
        meeting_id: str,
        websocket: WebSocket,
    ):

        await websocket.accept()

        self.active_connections[
            meeting_id
        ] = websocket

    def disconnect(
        self,
        meeting_id: str,
    ):

        self.active_connections.pop(
            meeting_id,
            None,
        )

    async def send_json(
        self,
        meeting_id: str,
        message: dict,
    ):

        websocket = self.active_connections.get(
            meeting_id
        )

        if websocket:

            await websocket.send_json(
                message
            )


manager = ConnectionManager()