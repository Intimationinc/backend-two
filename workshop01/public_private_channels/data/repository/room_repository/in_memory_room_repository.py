from datetime import UTC, datetime

from domain.models import Conversation, MessageType, Room, User
from domain.repository import RoomRepository


class InMemoryRoomRepository(RoomRepository):
    __rooms = {
        "public-room": Room(
            name="public-room",
            access_code="",
            user_limit=20,
            max_conversation_length=200,
        ),
    }

    def add(self, room: Room):
        if room.name not in self.__rooms:
            self.__rooms[room.name] = room

    def get(self, room_name: str) -> Room | None:
        return self.__rooms.get(room_name)

    def join(self, room_name: str, user: User):
        room = self.__rooms.get(room_name)
        if room is None:
            raise ValueError("Invalid room name")

        current_datetime = datetime.now(tz=UTC)
        room.users.append(user)
        room.conversations.append(
            Conversation(
                name=user.name,
                message=f"{user.name} joined the conversation at {current_datetime.strftime('%d %B %Y %I:%M:%S %p (%Z)')}",
                message_type=MessageType.Notification,
                datetime=current_datetime,
            )
        )

    def delete(self, room_name: str):
        del self.__rooms[room_name]
