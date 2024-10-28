from data.repository.room_repository import InMemoryRoomRepository
from domain.repository import RoomRepository


class Repository:
    @property
    def room_repository(self) -> RoomRepository:
        return InMemoryRoomRepository()
