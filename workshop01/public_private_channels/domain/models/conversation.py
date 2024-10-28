from dataclasses import dataclass
from datetime import UTC, datetime

from .message_type import MessageType


@dataclass
class Conversation:
    name: str
    message: str
    message_type: MessageType = MessageType.Chat
    datetime: datetime = None
    _datetime_format: str = "%d %B %Y %I:%M:%S %p (%Z)"

    def __post_init__(self):
        if self.datetime is None:
            self.datetime = datetime.now(tz=UTC)

    def as_dict(self) -> dict:
        return {
            "name": self.name,
            "datetime": self.datetime.strftime(format=self._datetime_format),
            "message": self.message,
            "messageType": self.message_type,
        }
