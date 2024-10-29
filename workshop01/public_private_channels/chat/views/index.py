import random
import string
from uuid import uuid4

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.hashers import make_password
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render
from django.views import View

from di import Repository
from domain.models import Room

from ..forms import RoomForm, get_form_errors


class Index(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__repository = Repository()

    @staticmethod
    def get(request: HttpRequest) -> HttpResponse:
        return render(request, "chat/index.html")

    def post(self, request: HttpRequest) -> HttpResponse:
        form = self.__get_form(data=request.POST)
        if not form.is_valid():
            for message in get_form_errors(form):
                messages.error(request, message)
                return redirect("index")

        room = self.__repository.room_repository.add(
            room=Room(
                name=form.cleaned_data.get("room_name"),
                access_code=make_password(
                    password=form.cleaned_data.get("password"), salt=settings.SECRET_KEY
                ),
            )
        )
        messages.info(request, f"Room name: {room.name}")
        messages.info(
            request,
            f"Password: {form.cleaned_data.get("password")}",
        )
        return redirect("index")

    @staticmethod
    def __get_form(data: dict) -> RoomForm:
        allowed_characters = string.digits + string.ascii_letters + string.punctuation
        return RoomForm(
            data={
                "name": data.get("name"),
                "room_name": str(uuid4()),
                "password": "".join(
                    random.choices(population=allowed_characters, k=25)
                ),
            }
        )
