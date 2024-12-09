from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from CinemaApp.models import (MovieProfile, Payment, Address, Order,
Ticket, Seat, ShowTime, MovieRoom, Theatre, Movie, Actor, Director, Promotion, Genre, Prices)
from allauth.account.models import EmailAddress
from datetime import timedelta
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    status = serializers.ChoiceField(choices=[('admin', 'ADMIN'), ('customer', 'CUSTOMER')])
    receive_promotions = serializers.BooleanField(required=False)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        data['status'] = self.validated_data.get('status', 'customer')
        data['receive_promotions'] = self.validated_data.get('receive_promotions', '')
        return data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.save()

        # Create MovieProfile with the status passed
        status = self.validated_data.get('status', 'customer')
        receive_promotions = self.validated_data.get('receive_promotions', '')
        movie_profile, created = MovieProfile.objects.get_or_create(
            user=user, defaults={'status': status, 'receive_promotions': receive_promotions})

        if created:
            print(f"MovieProfile created for {user} with status {status}")
            movie_profile.customer_state = "inactive"
            movie_profile.save()
        else:
            print(f"MovieProfile already exists for {user}")

        return user


class TheatreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Theatre
        fields = ['name', 'street', 'city', 'state', 'zipcode', 'is_active']


class MovieRoomSerializer(serializers.ModelSerializer):
    theatre = TheatreSerializer(many=False, read_only=True)
    class Meta:
        model = MovieRoom
        fields = ['id', 'number', 'is_active', 'theatre']


class ShowTimeSerializer(serializers.ModelSerializer):
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all())
    movieRoom = serializers.PrimaryKeyRelatedField(queryset=MovieRoom.objects.all())
    endTime = serializers.DateTimeField(read_only=True)  # Mark endTime as read-only

    class Meta:
        model = ShowTime
        fields = ['id', 'movie', 'movieRoom', 'date', 'startTime', 'endTime']
    
    def create(self, validated_data):
        movie = validated_data.get('movie')
        start_time = validated_data.get('startTime')

        # Calculate the end time
        try:
            end_time = start_time + timedelta(minutes=movie.runtime + 10)  # Adding 10 minutes after runtime
            showtime = ShowTime.objects.create(endTime=end_time, **validated_data)
            return showtime

        except ValueError:
            raise ValidationError("Date or start time is not valid")


class SeatSerializer(serializers.ModelSerializer):
    showtime = ShowTimeSerializer(many=False, read_only=True)
    class Meta:
        model = Seat
        fields = ['id', 'seatID', 'showtime']


class GetSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'seatID', 'is_available']


class TicketSerializer(serializers.ModelSerializer):
    seat = serializers.PrimaryKeyRelatedField(queryset=Seat.objects.all())

    class Meta:
        model = Ticket
        fields = ['seat', 'type']


class OrderDetailsSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'totalPrice', 'discountPercentage', 'purchaseDate',
                  'tickets', 'payment', 'street', 'city', 'state', 'zip', 'is_refunded']


class CreateOrderSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True)
    userId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = ['discountPercentage', 'totalPrice', 'userId', 'purchaseDate', 'tickets',
                  'cardNumber', 'street', 'city', 'state', 'zip']

    def create(self, validated_data):
        tickets_data = validated_data.pop('tickets', [])
        userId = validated_data.pop('userId')

        user = User.objects.get(pk=userId)
        movieProfile = MovieProfile.objects.get(user=user)

        # Create the movie object
        order = Order.objects.create(movieProfile=movieProfile, **validated_data)

        print("tickets_data:", tickets_data)

        for ticket_data in tickets_data:
            seat = Seat.objects.get(id=ticket_data['seat'].id)  # Ensure a single Seat instance is retrieved
            Ticket.objects.create(
                seat=seat,
                type=ticket_data['type'],
                order=order
            )
            seat.is_available = False
            seat.save()
        return order

    def to_representation(self, instance):
        return {'id': instance.pk}


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['id', 'first_name', 'last_name']


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ['id', 'first_name', 'last_name']


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['id', 'name']

    def to_internal_value(self, data):
        # If data is a string or dict with a name, try to retrieve existing genre
        if isinstance(data, dict) and 'name' in data:
            genre_name = data['name']
            try:
                # Fetch the genre if it already exists
                genre = Genre.objects.get(name=genre_name)
                return genre
            except Genre.DoesNotExist:
                # If it doesn't exist, call the normal validation for creating a new genre
                return super().to_internal_value(data)
        return super().to_internal_value(data)


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, required=False)
    actors = ActorSerializer(many=True, required=False)
    directors = DirectorSerializer(many=True, required=False)
    showtimes = ShowTimeSerializer(many=True, required=False)
    theatre = TheatreSerializer(many=False, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'theatre', 'movieName', 'year', 'trailer', 'rating',
                  'runtime', 'critics_score', 'audience_score',
                  'description', 'photo', 'studio', 'is_active',
                  'actors', 'directors', 'genres', 'showtimes']

    def create(self, validated_data):
        genres_data = validated_data.pop('genres', [])
        actors_data = validated_data.pop('actors', [])
        directors_data = validated_data.pop('director', [])

        # Create the movie object
        movie = Movie.objects.create(**validated_data)

        # Handle genres: Fetch existing ones or create new ones if not found
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(name=genre_data.name)
            movie.genres.add(genre)

        # Handle actors: Fetch existing ones or create new ones if not found
        for actor_data in actors_data:
            actor, created = Actor.objects.get_or_create(
                first_name=actor_data['first_name'],
                last_name=actor_data['last_name']
            )
            movie.actors.add(actor)

        # Handle directors: Fetch existing ones or create new ones if not found
        for director_data in directors_data:
            director, created = Director.objects.get_or_create(
                first_name=director_data['first_name'],
                last_name=director_data['last_name']
            )
            movie.director.add(director)

        return movie

    def update(self, instance, validated_data):
        # Update basic fields
        instance.movieName = validated_data.get('movieName', instance.movieName)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.trailer = validated_data.get('trailer', instance.trailer)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.runtime = validated_data.get('runtime', instance.runtime)
        instance.year = validated_data.get('year', instance.year)
        instance.critics_score = validated_data.get('critics_score', instance.critics_score)
        instance.audience_score = validated_data.get('audience_score', instance.audience_score)
        instance.description = validated_data.get('description', instance.description)
        instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.studio = validated_data.get('studio', instance.studio)

        # Update genres, actors, and director if provided
        if 'genres' in validated_data:
            genres_data = validated_data.pop('genres')
            instance.genres.clear()  # Remove all existing genres
            for genre_data in genres_data:
                genre, created = Genre.objects.get_or_create(name=genre_data.name)
                instance.genres.add(genre)

        if 'actors' in validated_data:
            actors_data = validated_data.pop('actors')
            instance.actors.clear()  # Remove all existing actors
            for actor_data in actors_data:
                actor, created = Actor.objects.get_or_create(
                    first_name=actor_data['first_name'],
                    last_name=actor_data['last_name']
                )
                instance.actors.add(actor)

        if 'director' in validated_data:
            directors_data = validated_data.pop('director')
            instance.director.clear()  # Remove all existing directors
            for director_data in directors_data:
                director, created = Director.objects.get_or_create(
                    first_name=director_data['first_name'],
                    last_name=director_data['last_name']
                )
                instance.director.add(director)

        instance.save()
        return instance


class PromotionSerializer(serializers.ModelSerializer):
    # for the foreign keys connected to Promotion, we need to also
    # have a way for this serializer to access them

    # needs the attirbutes of promotion so it can be converted
    class Meta:
        model = Promotion
        fields = ['name', 'discountPercentage', 'code', 'startDate', 'endDate']

###############################################################


class PaymentSerializer(serializers.ModelSerializer):
    cardNumber = serializers.CharField(
        max_length=16,
        min_length=16,
        write_only=False
    )
    CVV = serializers.CharField(
        max_length=4,
        min_length=3,
        write_only=False
    )

    class Meta:
        model = Payment
        fields = ['id', 'user', 'cardNumber', 'CVV', 'expirationDate', 'firstName', 'lastName']


class GetPaymentSerializer(serializers.ModelSerializer):
    maskedCardNumber = serializers.SerializerMethodField()
    maskedCVV = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['id', 'user', 'maskedCardNumber', 'expirationDate', 'maskedCVV', 'firstName', 'lastName']

    def get_maskedCardNumber(self, obj):
        # Get the last 4 digits of the card number
        decrypted_card_number = obj.get_card_number()  # Call the decryption method
        return f"**** **** **** {decrypted_card_number[-4:]}" if decrypted_card_number else None

    def get_maskedCVV(self, obj):
        # Return the masked CVV
        return "***"  # Return a static mask for the CVV


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'postalCode']


class OrderSerializer(serializers.ModelSerializer):
    tickets = TicketSerializer(many=True)
    movie = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ['id', 'discountPercentage', 'totalPrice', 'purchaseDate', 'tickets',
                  'cardNumber', 'street', 'city', 'state', 'zip', 'movie', 'is_refunded']

    def get_movie(self, obj):
        # Get the movie from the first ticket's seat's showtime
        if obj.is_refunded is False:
            ticket = obj.tickets.first()  # Get the first ticket (you can adjust if necessary)
            if ticket:
                seat = ticket.seat
                if seat:
                    showtime = seat.showTime
                    if showtime:
                        return showtime.movie.movieName
        else:
            return obj.movie_name_refunded
        return None   


class MovieProfileSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    address = AddressSerializer()
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = MovieProfile
        fields = ['status', 'receive_promotions', 'address', 'payments', 'orders', 'customer_state']


class CustomEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAddress
        fields = ['verified']


class CustomUserSerializer(serializers.ModelSerializer):
    movie_profile = MovieProfileSerializer()
    emailStatus = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'emailStatus', 'movie_profile']

    def update(self, instance, validated_data):
        # Update User fields
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update MovieProfile fields
        movie_profile_data = validated_data.get('movie_profile', {})
        movie_profile, _ = MovieProfile.objects.get_or_create(user=instance)

        movie_profile.status = movie_profile_data.get('status', movie_profile.status)
        movie_profile.receive_promotions = movie_profile_data.get('receive_promotions',
                                                                  movie_profile.receive_promotions)
        movie_profile.save()

        # Update Address fields if provided
        address_data = movie_profile_data.get('address', {})
        if address_data is not None:
            address, _ = Address.objects.get_or_create(user=movie_profile)

            address.street = address_data.get('street', address.street)
            address.city = address_data.get('city', address.city)
            address.state = address_data.get('state', address.state)
            address.postalCode = address_data.get('postalCode', address.postalCode)
            address.save()

        return instance

    def get_emailStatus(self, obj):
        try:
            email_address = EmailAddress.objects.get(user_id=obj.id)  # Assuming a OneToOneField or ForeignKey to User
            return CustomEmailSerializer(email_address).data
        except EmailAddress.DoesNotExist:
            return None
# need a way to convert promotion python objects into JSON


class PricesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prices
        fields = ['adult_price', 'senior_price', 'child_price', 'booking_fee', 'sales_tax']
