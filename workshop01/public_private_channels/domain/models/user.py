from dataclasses import dataclass, field
from uuid import uuid4

from channels.generic.websocket import WebsocketConsumer


@dataclass
class User:
    name: str
    user_id: str = ""
    socket: WebsocketConsumer | None = field(default=None, repr=False, init=False)

    def __post_init__(self):
        self.user_id = str(uuid4())
