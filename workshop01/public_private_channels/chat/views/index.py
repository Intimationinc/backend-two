from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views import View


class Index(View):
    @staticmethod
    def get(request: HttpRequest) -> HttpResponse:
        return render(request, "chat/index.html")
