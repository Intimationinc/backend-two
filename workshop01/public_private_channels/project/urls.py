from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from chat.views import Chat, Index

urlpatterns = [
    path("", Index.as_view(), name="index"),
    path("chat", Chat.as_view(), name="chat"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
