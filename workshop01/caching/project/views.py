from django.http import JsonResponse
from django.views import View


class Endpoint(View):
    @staticmethod
    def get(_) -> JsonResponse:
        response = JsonResponse(data={"message": "You have hit the endpoint"}, status=200)
        response.setdefault("Cache-Control", "public,max-age=3600,s-maxage=8600")
        return response
