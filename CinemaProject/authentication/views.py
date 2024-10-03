from dj_rest_auth.views import UserDetailsView
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse
from django.template.loader import render_to_string
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer, CustomUserSerializer


def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_BASE_URL}{uidb64}/{token}"
    )


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserSerializer

