import jwt
from django.conf import settings
from django.http import HttpRequest, JsonResponse
from django.views import View

from di import Repository


class ChatHistory(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__repository = Repository()

    def get(self, request: HttpRequest) -> JsonResponse:
        print(request.headers.get("token"))
        payload = jwt.decode(
            jwt=request.headers.get("token"),
            key=settings.SECRET_KEY,
            algorithms=["SH256"],
        )
        has_access = self.__repository.chat_repository.has_access(
            room_name=payload.get("roomName"), password=payload.get("password")
        )
        if not has_access:
            return JsonResponse(data={"conversations": []}, status=400)

        return JsonResponse(
            data={
                "conversations": self.__repository.chat_repository.get_conversations(
                    room_name=payload.get("roomName")
                )
            }
        )
