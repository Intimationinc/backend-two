from dataclasses import dataclass
from datetime import datetime


@dataclass
class Conversation:
    name: str
    datetime: datetime
    message: str
    message_type: str = "chat"

    def as_dict(self) -> dict:
        return {
            "name": self.name,
            "datetime": str(self.datetime),
            "message": self.message,
            "messageType": self.message_type,
        }
