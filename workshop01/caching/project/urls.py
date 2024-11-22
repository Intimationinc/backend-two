from django.urls import path

from .views import Endpoint

urlpatterns = [
    path("api/endpoint", Endpoint.as_view(), name="endpoint"),
]
