from abc import ABC, abstractmethod

from ..models import Conversation


class ChatRepository(ABC):
    @abstractmethod
    def has_access(self, room_name: str, password: str) -> bool:
        raise NotImplementedError("Implement has_access method")

    @abstractmethod
    def join_conversation(self, room_name: str, name: str):
        raise NotImplementedError("Implement join_conversation method")

    @abstractmethod
    def get_conversations(self, room_name: str) -> list[Conversation]:
        raise NotImplementedError("Implement get_conversations method")
