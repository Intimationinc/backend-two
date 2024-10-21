from data.repository.chat_repository import InMemoryChatRepository
from domain.repository import ChatRepository


class Repository:
    @property
    def chat_repository(self) -> ChatRepository:
        return InMemoryChatRepository(max_conversation_limit=100)
