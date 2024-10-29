from enum import StrEnum


class MessageType(StrEnum):
    Chat = "chatMessage"
    System = "system"
    Notification = "notification"
    Error = "error"
