from dj_rest_auth.views import UserDetailsView
from django.shortcuts import render
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponseRedirect, HttpResponse
from django.template.loader import render_to_string
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer, CustomUserSerializer
from django.contrib.auth.models import User


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


class GetAllUsers(generics.ListAPIView):
    # retrieving the user objects that have a status of admin using the
    # filter() method
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'id'


class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()  # Fetch the movie instance that is going to be deleted
        self.perform_destroy(user)  # Deletes the movie

        # Return a custom success message
        return Response({
            'message': f'User "{user.username}" was successfully deleted.'
        }, status=status.HTTP_200_OK)

