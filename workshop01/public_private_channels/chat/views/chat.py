from datetime import UTC, datetime, timedelta

import jwt
from django.conf import settings
from django.contrib import messages
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View

from di import Repository

from ..forms import ChatJoiningForm, get_form_errors


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

        fullname = form.cleaned_data.get("fullname")
        room_name = form.cleaned_data.get("room_name")
        password = form.cleaned_data.get("password")
        has_access = self.__repository.chat_repository.has_access(room_name, password)
        if not has_access:
            messages.error(
                request, "Invalid room name or you do not have access to this room."
            )
            return redirect("index")

        token = jwt.encode(
            payload={
                "fullname": fullname,
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
    def __get_form(data: dict[str, str]) -> ChatJoiningForm:
        return ChatJoiningForm(
            data={
                "fullname": data.get("fullname"),
                "room_name": data.get("room-name"),
                "password": data.get("password"),
            }
        )
