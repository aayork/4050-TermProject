from dj_rest_auth.views import UserDetailsView
from django.shortcuts import render
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponseRedirect, HttpResponse
from django.template.loader import render_to_string
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer, CustomUserSerializer, MovieProfileSerializer
from django.contrib.auth.models import User
from CinemaApp.models import MovieProfile
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token


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

class validateAdmin(APIView):
    # use a class based view because only returning boolean not entity JSON
    # return a boolean instead of the actual record

    # to make an endpoint be a get endpoint I must include a get method with the appropriate parameters 
    def get(self, request, *args, **kwargs):
        # retrieve movieProfile associated with passedIN UserId
        # must include 
        try:
            auth = self.kwargs.get('auth_token')
            token = Token.objects.get(pk=auth)
            user = User.objects.get(auth_token=token)
            movieProfile = MovieProfile.objects.get(user=user)
            if (movieProfile.status=='admin'):
                return Response(True, status=status.HTTP_200_OK)
            else:
                return Response(False, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(f"Token {auth} cannot be found", status=status.HTTP_404_NOT_FOUND)
        
class suspendAccount(generics.UpdateAPIView):
    queryset=MovieProfile.objects.all()
    serializer_class = MovieProfileSerializer
    lookup_field='id'
    # clarify with will whether the movie_profileId or the user_id will be passed in 
    # by the frontend

    def update(self, request, *args, **kwargs):
        # alter the is_active property on the default django user object
        user_id = self.kwargs.get('id')

        try:
            user = User.objects.get(pk=user_id)
            movieProfile = MovieProfile.objects.get(user=user)
            user.is_active = False
            movieProfile.customer_state = "suspended"
            user.save()
            movieProfile.save()

            return Response(f'Suspended {user.first_name} {user.last_name}', status=status.HTTP_200_OK)
        
        except MovieProfile.DoesNotExist:
            return Response(f'User with Id of {user_id} does not exist', status=status.HTTP_404_NOT_FOUND)


        
class unSuspendAccount(generics.UpdateAPIView):
    queryset=MovieProfile.objects.all()
    serializer_class = MovieProfileSerializer
    lookup_field='id'

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs.get('id')
        
        try:
            user = User.objects.get(pk=user_id)
            movieProfile = MovieProfile.objects.get(user=user)
            user.is_active = True
            movieProfile.customer_state = "active"
            user.save()
            movieProfile.save()

            return Response(f'Unsuspended {user.first_name} {user.last_name}', status=status.HTTP_200_OK)
    
        except MovieProfile.DoesNotExist:
            return Response(f'User with Id of {user_id} does not exist', status=status.HTTP_404_NOT_FOUND)

        


