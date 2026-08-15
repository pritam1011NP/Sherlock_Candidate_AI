from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket.connection_manager import manager

router = APIRouter(
    prefix="/ws",
    tags=["WebSocket"],
)


@router.websocket("/dashboard")
async def dashboard_socket(websocket: WebSocket):

    await manager.connect(websocket)

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(websocket)