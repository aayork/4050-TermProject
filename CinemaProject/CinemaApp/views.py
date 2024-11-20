from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse, Http404
from rest_framework import generics, status, permissions
from .models import Movie, Address, MovieProfile, Payment, Promotion, ShowTime, Order
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from authentication.serializers import (MovieSerializer, PromotionSerializer,
                                        MovieProfileSerializer, PaymentSerializer,
                                        AddressSerializer, GetPaymentSerializer, CustomUserSerializer,
                                        ShowTimeSerializer, CreateOrderSerializer)
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from datetime import date


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


# Test out 161 class and confirm it works PLEASE!!!
class UpdatePromotionView(generics.UpdateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    lookup_field = 'code'

    def get_object(self):
        code = self.kwargs.get("code")
        try:
            return Promotion.objects.get(code=code)
        except Promotion.DoesNotExist:
            raise NotFound("Promotion not found")


class validatePromotion(generics.RetrieveAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = Promotion.objects.get(code=self.kwargs.get('code'))
            serializer = self.get_serializer(instance)
            # creates a Promotion object based on the 
            # so I need to retrieve the startDate and endDate for the promotion
            # retrieve the Promotion object in question
            if(date.today() >= instance.startDate and date.today() <= instance.endDate):
                return Response(serializer.data)
            else:
                return Response("Promotion date range doesn't apply to current date", status=status.HTTP_200_OK)
        except Promotion.DoesNotExist: 
                return Response("Promotion not found", status=status.HTTP_404_NOT_FOUND)


class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

class AddShowtimeView(generics.CreateAPIView):
    queryset = ShowTime.objects.all()
    serializer_class = ShowTimeSerializer

class EditShowtimeView(generics.UpdateAPIView):
    lookup_field='id'
    queryset=ShowTime.objects.all()
    serializer_class=ShowTimeSerializer

    
class DeleteShowTimeView (generics.DestroyAPIView):
    queryset = ShowTime.objects.all()
    # what is the purpose of the queryset variable: 
    # it retireves all the possible objects that are in consideration for having the lookup field
    # how come queryset doesn't hold .get(pk = self.kwargs.get(lookup_field))
    lookup_field = 'id'
    serializer_class = ShowTimeSerializer