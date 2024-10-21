from dataclasses import dataclass
from datetime import datetime


@dataclass
class Conversation:
    name: str
    datetime: datetime
    message: str
