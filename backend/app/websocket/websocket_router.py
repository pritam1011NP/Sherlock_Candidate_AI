from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
)

from app.websocket.manager import manager
from app.api.dashboard_socket import dashboard_manager

router = APIRouter()


# --------------------------
# Dashboard WebSocket
# --------------------------

@router.websocket("/ws/dashboard")
async def dashboard_ws(websocket: WebSocket):

    await dashboard_manager.connect(websocket)

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        dashboard_manager.disconnect(websocket)


# --------------------------
# Interview WebSocket
# --------------------------

@router.websocket("/ws/{meeting_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    meeting_id: str,
):

    await manager.connect(
        meeting_id,
        websocket,
    )

    try:

        while True:

            data = await websocket.receive_text()

            await manager.send_json(
                meeting_id,
                {
                    "status": "connected",
                    "message": data,
                },
            )

    except WebSocketDisconnect:

        manager.disconnect(
            meeting_id,
        )