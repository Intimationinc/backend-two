from django.contrib.auth.hashers import check_password

from domain.models import Conversation
from domain.repository import ChatRepository


class InMemoryChatRepository(ChatRepository):
    __rooms = {
        "public-room": {
            "access_key": "public-room-password",
            "people": [],
            "conversations": []
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

    def get_conversations(self, room_name: str) -> list[Conversation]:
        room = self.__rooms.get(room_name)
        if room is None:
            return []

        return room.get("conversations", [])
