import json

import jwt
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings

from di import Repository


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__repository = Repository()

    def connect(self):
        payload = None
        headers = [
            (key.decode(), value.decode())
            for key, value in self.scope.get("headers", [])
        ]
        for key, value in headers:
            if key == "cookie":
                cookies = [cookie.strip().split("=") for cookie in value.split(";")]
                for name, cookie_value in cookies:
                    if name == "token":
                        payload = self.__get_payload(cookie_value)
                        break
                break

        if payload is None:
            self.disconnect(close_code={"message": "Invalid session token. Please join again."})
            return

        room_name = payload.get("roomName")
        has_access = self.__repository.chat_repository.has_access(
            room_name=room_name, password=payload.get("password")
        )
        if not has_access:
            self.disconnect(
                close_code={"message": "You do not have access to this room."}
            )
            return

        try:
            self.__repository.chat_repository.join_conversation(
                room_name=room_name, name=payload.get("name")
            )
        except RuntimeError as e:
            self.disconnect(close_code={"message": str(e)})
            return

        self.accept()
        conversations = self.__repository.chat_repository.get_conversations(
            room_name=room_name
        )
        self.send(
            text_data=json.dumps(
                {
                    "type": "chatHistory",
                    "messages": [
                        conversation.as_dict() for conversation in conversations
                    ],
                }
            )
        )

    def disconnect(self, close_code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        print(text_data_json)

        self.send(text_data=json.dumps(text_data_json))

    @staticmethod
    def __get_payload(token: str) -> dict[str, str] | None:
        try:
            return jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"])
        except Exception as e:
            print(e)

        return None
