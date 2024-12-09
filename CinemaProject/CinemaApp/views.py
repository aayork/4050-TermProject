from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse, Http404
from rest_framework import generics, status, permissions
from .models import Movie, Address, MovieProfile, Payment, Promotion, ShowTime, Order, Seat, Prices, Genre
from .models import MovieRoom
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from authentication.serializers import (MovieSerializer, PromotionSerializer,
                                        MovieProfileSerializer, PaymentSerializer,
                                        AddressSerializer, GetPaymentSerializer, CustomUserSerializer,
                                        ShowTimeSerializer, CreateOrderSerializer, GetSeatSerializer, PricesSerializer,
                                        GenreSerializer)
from authentication.serializers import MovieRoomSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from .utils import get_available_rooms
from datetime import datetime, timedelta
from datetime import date


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = 'pk'


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
                return Response({"error": "Promotion date range doesn't apply to current date"}, status=status.HTTP_400_BAD_REQUEST)
        except Promotion.DoesNotExist: 
                return Response({"error": "Promotion not found"}, status=status.HTTP_404_NOT_FOUND)


class CreateOrderView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

class AddShowtimeView(generics.CreateAPIView):
    queryset = ShowTime.objects.all()
    serializer_class = ShowTimeSerializer

    def create(self, request, *args, **kwargs):
        movie_id = request.data.get('movie_id')
        movieRoom_id = request.data.get('movieRoom_id')
        start_time = request.data.get('startTime')
        date = request.data.get('date')

        if not movie_id or not movieRoom_id or not start_time or not date:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            Movie.objects.get(id=movie_id)
            MovieRoom.objects.get(id=movieRoom_id)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        except MovieRoom.DoesNotExist:
            return Response({"error": "MovieRoom not found"}, status=status.HTTP_404_NOT_FOUND)

        showtime_data = {
            "movie": movie_id,
            "movieRoom": movieRoom_id,
            "startTime": start_time,
            "date": date
        }

        # Pass the validated data to the serializer
        serializer = self.get_serializer(data=showtime_data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class GetSeatsView(APIView):
    def get(self, request, showtime_id):
        try:
            showtime = ShowTime.objects.get(pk=showtime_id)
            seats = Seat.objects.filter(showTime=showtime)
            serializer = GetSeatSerializer(seats, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ShowTime.DoesNotExist:
            return Response({"error": "ShowTime not found"}, status=status.HTTP_404_NOT_FOUND)


class AvailableRoomsView(APIView):
    def get(self, request):
        movie_id = request.query_params.get('movie_id')
        date = request.query_params.get('date')
        time = request.query_params.get('time')

        if not movie_id or not date:
            return Response({"error": "Movie and date are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_404_NOT_FOUND)

        time_obj = None
        if time:
            try:
                time_obj = datetime.strptime(time, '%H:%M').time()
            except ValueError:
                return Response({"error": "Invalid time format. Use HH:MM."}, status=status.HTTP_400_BAD_REQUEST)

        available_rooms = get_available_rooms(movie, date_obj, time_obj)
        serializer = MovieRoomSerializer(available_rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ShowtimeByDateAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Parse the date from query parameters (e.g., ?date=2024-12-05)
        date_str = request.query_params.get('date', None)
        if not date_str:
            return Response({"error": "Date parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert the date string to a datetime object
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Filter showtimes by the provided date
        showtimes = ShowTime.objects.filter(date=date_obj)
        if not showtimes.exists():
            return Response([], status=status.HTTP_200_OK)


        # Get the movies associated with the filtered showtimes
        movies = set() 
        for showtime in showtimes:
            movies.add(showtime.movie) 

        # Serialize the queryset and return the response
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PaymentCardInfoAPIView(APIView):
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        try:
            payment = Payment.objects.get(id=id)
        except Payment.DoesNotExist:
            raise NotFound("Payment with this ID does not exist")

        # Assuming get_card_number() returns the card number, which could be sensitive information.
        # For security reasons, you might want to mask or avoid returning the full card number.
        card_number = payment.get_card_number()
        return Response({'card_number': card_number})


class PriceListView(generics.ListAPIView):
    serializer_class = PricesSerializer

    def get_queryset(self):
        return Prices.objects.all()[:1]  

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)


        if response.data:
            response.data = response.data[0] 
        return response


class PriceEditView(generics.UpdateAPIView):
    queryset = Prices.objects.all()
    serializer_class = PricesSerializer

    def get_object(self):
        return self.queryset.first()


class GetGenresView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class RefundOrderView(APIView):
    def post(self, request, id, *args, **kwargs):
        try:
            order = Order.objects.get(id=id)

            for ticket in order.tickets.all():
                ticket.seat = None
                ticket.save()

            order.is_refunded = True
            order.save()

            return Response({'message': f'Order {id} has been refunded'}, status=status.HTTP_200_OK)

        except Order.DoesNotExist:
            return Response({'message': f'Order {id} does not exist'}, status=status.HTTP_404_NOT_FOUND)

