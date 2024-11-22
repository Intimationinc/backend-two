from dataclasses import dataclass, field

from .conversation import Conversation
from .user import User


@dataclass
class Room:
    name: str
    access_code: str
    user_limit: int = 2
    users: list[User] = field(default_factory=list)
    max_conversation_length: int = 100
    conversations: list[Conversation] = field(default_factory=list)
