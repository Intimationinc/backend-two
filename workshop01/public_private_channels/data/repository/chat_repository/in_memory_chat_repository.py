from datetime import UTC, datetime

from django.contrib.auth.hashers import check_password

from domain.models import Conversation
from domain.repository import ChatRepository


class InMemoryChatRepository(ChatRepository):
    __rooms = {
        "public-room": {
            "accessKey": "public-room-password",
            "maxUserLimit": 20,
            "maxConversationLength": 100,
            "people": [],
            "conversations": [],
        }
    }

    def __init__(self, max_conversation_limit: int = 100):
        self.max_conversation_limit = max_conversation_limit

    def has_access(self, room_name: str, password: str) -> bool:
        room = self.__rooms.get(room_name)
        if room is None:
            return False

        if room_name == "public-room":
            return True

        valid_password = check_password(
            password=password, encoded=room.get("access_key")
        )
        return valid_password

    def join_conversation(self, room_name: str, name: str):
        room = self.__rooms.get(room_name)
        if room is None:
            raise RuntimeError("Room name is not correct.")

        max_user_limit = room.get("maxUserLimit", 0)
        if len(room.get("people", [])) >= max_user_limit:
            raise RuntimeError("The room is full. Please try again later.")

        if name not in self.__rooms[room_name]["people"]:
            current_datetime = datetime.now(tz=UTC)
            self.__rooms[room_name]["people"].append(name)
            self.__rooms[room_name]["conversations"].append(
                Conversation(
                    name="System",
                    datetime=current_datetime,
                    message=f"{name} has joined the conversation at {current_datetime.strftime('%d %B %Y %I:%M:%S %p (%Z)')}",
                    message_type="notification",
                )
            )

    def get_conversations(self, room_name: str) -> list[Conversation]:
        room = self.__rooms.get(room_name)
        if room is None:
            return []

        return room.get("conversations", [])
