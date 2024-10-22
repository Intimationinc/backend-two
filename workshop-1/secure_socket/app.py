from fastapi import FastAPI, WebSocket
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from fake import users_db, session
import jwt


JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class TokenData(BaseModel):
    username: str


app = FastAPI()


def get_current_user(user_db, session):
    current_user_id = session.get("current_user_id")
    current_user_info = users_db.get(current_user_id)
    return current_user_info


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.get("/get_access_token")
async def get_acess_token(token_data: TokenData):
    payload = {"username": token_data.username}
    token = create_access_token(data=payload)
    return {"access_token": token}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, access_token: str):
    decoded = jwt.decode(access_token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
    current_user = get_current_user(users_db, session)
    if decoded.username != current_user.username:
        return
    await websocket.accept()
    try:
        await websocket.send_text("WebSocket connection established!")
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message received: {data}")
    except websocket.WebSocketDisconnect:
        print("WebSocket connection closed")
    return None
