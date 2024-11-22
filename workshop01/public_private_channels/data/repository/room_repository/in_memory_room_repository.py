from domain.models import Room, User
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

    def add(self, room: Room) -> Room:
        if room.name not in self.__rooms:
            self.__rooms[room.name] = room

        return self.__rooms[room.name]

    def get(self, room_name: str) -> Room | None:
        return self.__rooms.get(room_name)

    def join(self, room_name: str, user: User):
        room = self.__rooms.get(room_name)
        if room is None:
            raise ValueError("Invalid room name")

        room.users.append(user)

    def delete(self, room_name: str):
        del self.__rooms[room_name]
