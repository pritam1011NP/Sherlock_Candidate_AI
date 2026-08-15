from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json

router = APIRouter()


class DashboardManager:

    def __init__(self):
        self.connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.connections:
            self.connections.remove(websocket)

    async def broadcast(self, event: str, data):

        payload = {
            "event": event,
            "data": data,
        }

        dead = []

        for connection in self.connections:

            try:
                await connection.send_text(
                    json.dumps(payload)
                )

            except Exception:
                dead.append(connection)

        for ws in dead:
            self.disconnect(ws)


dashboard_manager = DashboardManager()


@router.websocket("/dashboard/ws")
async def dashboard_socket(websocket: WebSocket):

    await dashboard_manager.connect(websocket)

    try:

        while True:
            # Wait for heartbeat/ping from client
            await websocket.receive_text()

    except WebSocketDisconnect:

        dashboard_manager.disconnect(websocket)