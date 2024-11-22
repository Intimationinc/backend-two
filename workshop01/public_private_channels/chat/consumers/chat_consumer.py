import json
from datetime import UTC, datetime

import jwt
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings
from django.contrib.auth.hashers import check_password

from di import Repository
from domain.models import Conversation, MessageType

from ..forms import ConversationForm, get_form_errors


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__repository = Repository()

    def connect(self):
        try:
            payload = self.__get_payload(headers=self.scope.get("headers", []))
            self.__check_session_validity(payload)
        except RuntimeError as e:
            self.disconnect(close_code={"message": str(e)})
            return

        self.accept()

        user_id = payload.get("userId")
        room = self.__repository.room_repository.get(room_name=payload.get("roomName"))
        joining_conversation = None
        current_datetime = datetime.now(tz=UTC)
        for index, user in enumerate(room.users):
            if user.user_id == user_id:
                joining_conversation = Conversation(
                    name=user.name,
                    message=f"{user.name} joined the conversation at {current_datetime.strftime('%d %B %Y %I:%M:%S %p (%Z)')}",
                    message_type=MessageType.Notification,
                    datetime=current_datetime,
                )
                room.conversations.append(joining_conversation)
                room.users[index].socket = self
                break

        for user in room.users:
            if user.user_id != user_id and joining_conversation is not None:
                user.socket.send(
                    text_data=json.dumps(
                        {
                            "type": MessageType.Chat,
                            "message": joining_conversation.as_dict(),
                        }
                    )
                )

        self.send(
            text_data=json.dumps(
                {
                    "type": "chatHistory",
                    "messages": [
                        conversation.as_dict() for conversation in room.conversations
                    ],
                }
            )
        )

    def disconnect(self, close_code):
        print(f"{close_code=}")

    def receive(self, text_data=None, bytes_data=None):
        try:
            payload = self.__get_payload(headers=self.scope.get("headers", []))
            self.__check_session_validity(payload)
            data = json.loads(text_data)
        except RuntimeError as e:
            self.send(
                text_data=json.dumps({"type": MessageType.Error, "message": str(e)})
            )
            self.disconnect(close_code={"message": str(e)})
            return

        form = ConversationForm(data={"message": data.get("message")})
        if not form.is_valid():
            self.send(
                text_data=json.dumps(
                    {
                        "type": MessageType.Error,
                        "message": "Invalid data sent. Please fix the error.",
                        "errors": get_form_errors(form),
                    }
                )
            )

        room = self.__repository.room_repository.get(room_name=payload.get("roomName"))
        user = list(filter(lambda x: x.user_id == payload.get("userId"), room.users))[0]

        conversation = Conversation(
            name=user.name, message=form.cleaned_data.get("message")
        )
        room.conversations.append(conversation)

        for user in room.users:
            user.socket.send(
                text_data=json.dumps(
                    {"type": "chatMessage", "message": conversation.as_dict()}
                )
            )

    def __get_payload(self, headers: list[tuple[bytes, bytes]]) -> dict[str, str]:
        token = self.__get_token(headers)
        if token is None:
            raise RuntimeError("Invalid session")

        try:
            return jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
        except Exception as e:
            print(e)

    def __check_session_validity(self, payload: dict[str, str]):
        room = self.__repository.room_repository.get(room_name=payload.get("roomName"))
        if room is None:
            raise RuntimeError("Invalid room name")

        user_exists = False
        for user in room.users:
            if user.user_id == payload.get("userId"):
                user_exists = True
                break

        holding_valid_access_code = check_password(
            password=payload.get("password"), encoded=room.access_code
        )
        if room.name == "public-room":
            holding_valid_access_code = True

        valid_session = holding_valid_access_code and user_exists
        if not valid_session:
            raise RuntimeError("You do not have access to this room.")

    @staticmethod
    def __get_token(headers: list[tuple[bytes, bytes]]) -> str | None:
        for key, value in headers:
            if key.decode() == "cookie":
                cookies = [
                    cookie.strip().split("=") for cookie in value.decode().split(";")
                ]
                for name, cookie_value in cookies:
                    if name == "token":
                        return cookie_value
                break

        return None
