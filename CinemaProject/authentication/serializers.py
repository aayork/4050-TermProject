from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from CinemaApp.models import (MovieProfile, Payment, Address, Order,
                              Ticket, Seat, ShowTime, MovieRoom, Theatre, Movie, Actor, Director)


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        return data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.save()
        return user


class TheatreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Theatre
        fields = ['name', 'address', 'is_active']


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['first_name', 'last_name']


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ['first_name', 'last_name']


class MovieSerializer(serializers.ModelSerializer):
    actors = ActorSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'movieName', 'year', 'trailer', 'rating',
                  'runtime', 'critics_score', 'audience_score',
                  'description', 'photo', 'studio', 'is_active', 'actors']


class MovieRoomSerializer(serializers.ModelSerializer):
    theatre = TheatreSerializer(read_only=True)

    class Meta:
        model = MovieRoom
        fields = ['number', 'theatre']


class ShowTimeSerializer(serializers.ModelSerializer):
    movie_room = MovieRoomSerializer(many=False, read_only=True)

    class Meta:
        model = ShowTime
        fields = ['movie', 'start_time', 'end_time', 'movie_room']


class SeatSerializer(serializers.ModelSerializer):
    showtime = ShowTimeSerializer(many=False, read_only=True)

    class Meta:
        model = Seat
        fields = ['seatID', 'price', 'showtime']


class TicketSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ['seats']


class OrderDetailsSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Payment
        fields = ['purchaseDate', 'tickets']

###############################################################


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['cardNumber', 'expirationDate', 'CVV', 'firstName', 'lastName']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'postalCode']


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id']


class MovieProfileSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = MovieProfile
        fields = ['status', 'payments', 'addresses', 'orders']


class CustomUserSerializer(serializers.ModelSerializer):
    movie_profile = MovieProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'movie_profile']

