from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse, Http404
from rest_framework import generics, status, permissions
from .models import Movie, Address
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Promotion
from .models import MovieProfile
from .models import Payment
from authentication.serializers import (MovieSerializer, PromotionSerializer,
                                        MovieProfileSerializer, PaymentSerializer,
                                        AddressSerializer, GetPaymentSerializer, CustomUserSerializer)
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieCreateView(generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieUpdateView(generics.UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = 'id'


class MovieDeleteView(generics.DestroyAPIView):
    queryset = Movie.objects.all()
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        movie = self.get_object()  # Fetch the movie instance that is going to be deleted
        self.perform_destroy(movie)  # Deletes the movie

        # Return a custom success message
        return Response({
            'message': f'Movie "{movie.movieName}" was successfully deleted.'
        }, status=status.HTTP_200_OK)


# So basically here, we are creating a view that contains all the promotion
# objects and the serializer that can turn those python object -> JSON objects
# I need to understand what each parameter means
class PromotionDetailView(generics.ListAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer


class GetAllProfiles(generics.ListAPIView):
    # retrieving the movieprofile objects that have a status of admin using the 
    # filter() method
    queryset = MovieProfile.objects.all()
    serializer_class = MovieProfileSerializer


class UserPaymentView(generics.ListAPIView):
    serializer_class = GetPaymentSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            movie_profile = MovieProfile.objects.get(user=user)
        except User.DoesNotExist:
            raise NotFound("User with this ID does not exist")
        except MovieProfile.DoesNotExist:
            raise NotFound("MovieProfile for this user does not exist")

        return Payment.objects.filter(user=movie_profile)


class DeletePaymentView(generics.DestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    lookup_field = 'id'

    # return an exception message if the payment in question can't be found
    def perform_destroy(self, instance):
        instance.delete()
        
    
class AddPaymentView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user')
        user = get_object_or_404(User, pk=user_id)  # Adjust based on your User model
        payment_data = request.data.copy()
        payment_data['user'] = user.movie_profile.id  # Set the user field

        serializer = self.get_serializer(data=payment_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserAddressView(generics.ListAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            movie_profile = MovieProfile.objects.get(user=user)
        except User.DoesNotExist:
            raise NotFound("User with this ID does not exist")
        except MovieProfile.DoesNotExist:
            raise NotFound("MovieProfile for this user does not exist")

        return Address.objects.filter(user=movie_profile)


class AddAddressView(generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user')
        user = get_object_or_404(User, pk=user_id)  # Adjust based on your User model
        payment_data = request.data.copy()
        payment_data['user'] = user.movie_profile.id  # Set the user field

        serializer = self.get_serializer(data=payment_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeleteAddressView(generics.DestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    lookup_field = 'id'

    # return an exception message if the payment in question can't be found
    def perform_destroy(self, instance):
        instance.delete()


class AddPromotionView(generics.CreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer


class UpdatePromotionView(generics.UpdateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer


class validatePromotion(generics.RetrieveAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    lookup_field = 'code'

    def validate(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
