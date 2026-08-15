from fastapi import WebSocket
from typing import List
import json


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

        for d in dead:
            self.disconnect(d)


dashboard_manager = DashboardManager()