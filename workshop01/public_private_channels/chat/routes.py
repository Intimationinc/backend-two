from django.urls import path

from .consumers import ChatConsumer

websocket_routes = [path("ws/chat", ChatConsumer.as_asgi())]
