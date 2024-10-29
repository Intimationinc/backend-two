from datetime import UTC, datetime, timedelta

import jwt
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.hashers import check_password
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View

from di import Repository
from domain.models import User

from ..forms import RoomForm, get_form_errors


class Chat(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__repository = Repository()

    @staticmethod
    def get(request: HttpRequest) -> HttpResponse:
        return render(request, "chat/chat.html")

    def post(self, request: HttpRequest) -> HttpResponse:
        form = self.__get_form(request.POST)
        if not form.is_valid():
            for error_message in get_form_errors(form):
                messages.error(request, error_message)
            return redirect("index")

        name = form.cleaned_data.get("name")
        room_name = form.cleaned_data.get("room_name")
        password = form.cleaned_data.get("password")

        room = self.__repository.room_repository.get(room_name)
        if room is None:
            messages.error(request, "Invalid room name.")
            return redirect("index")

        holding_valid_access_code = check_password(
            password=password, encoded=room.access_code
        )
        if room_name == "public-room":
            holding_valid_access_code = True

        if not holding_valid_access_code:
            messages.error(request, "You do not have access to the is room.")
            return redirect("index")

        user = User(name=name)
        try:
            self.__repository.room_repository.join(room_name, user)
        except RuntimeError as e:
            messages.error(request, str(e))
            return redirect("index")

        token = jwt.encode(
            payload={
                "userId": user.user_id,
                "roomName": room_name,
                "password": password,
            },
            key=settings.SECRET_KEY,
        )
        response = redirect("chat")
        response.set_cookie(
            key="token",
            value=token,
            expires=datetime.now(tz=UTC) + timedelta(hours=1),
            secure=True,
            httponly=True,
        )

        return response

    @staticmethod
    def __get_form(data: dict[str, str]) -> RoomForm:
        return RoomForm(
            data={
                "name": data.get("name"),
                "room_name": data.get("room-name"),
                "password": data.get("password"),
            }
        )
