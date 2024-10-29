from abc import ABC, abstractmethod

from ..models import Room, User


class RoomRepository(ABC):
    @abstractmethod
    def add(self, room: Room) -> Room:
        raise NotImplementedError("Implement add method")

    @abstractmethod
    def get(self, room_name: str) -> Room | None:
        raise NotImplementedError("Implement get method")

    @abstractmethod
    def join(self, room_name: str, user: User):
        raise NotImplementedError("Implement join method")

    @abstractmethod
    def delete(self, room_name: str):
        raise NotImplementedError("Implement delete method")
