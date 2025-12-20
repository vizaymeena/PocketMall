

from google.oauth2 import id_token
from google.auth.transport import requests

from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings


User = get_user_model() 

GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID

def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return { "access":str(refresh.access_token),
             "refresh":str(refresh)  }
@api_view(["POST"])
def google_auth(request):
    token = request.data.get("token")

    if not token:
        return Response(
            {"message": "Token not provided"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        id_info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = id_info.get("email")
        name = id_info.get("name")

        if not email:
            return Response(
                {"message": "Email not available"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(
            username=email,
            defaults={
                "email": email,
                "first_name": name or ""
            }
        )

        tokens = get_tokens(user)

        return Response(
            {
                "email": email,
                "tokens": tokens
            },
            status=status.HTTP_200_OK
        )

    except ValueError:
        return Response(
            {"message": "Invalid Google Token"},
            status=status.HTTP_400_BAD_REQUEST
        )
