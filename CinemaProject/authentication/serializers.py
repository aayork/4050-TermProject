from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from CinemaApp.models import (MovieProfile, Payment, Address, Order,
Ticket, Seat, ShowTime, MovieRoom, Theatre, Movie, Actor, Director, Promotion, Genre)


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    status = serializers.ChoiceField(choices=[('admin', 'ADMIN'), ('customer', 'CUSTOMER')])

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        data['status'] = self.validated_data.get('status', 'customer')
        return data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name')
        user.last_name = self.validated_data.get('last_name')
        user.save()

        # Create MovieProfile with the status passed
        status = self.validated_data.get('status', 'customer')
        movie_profile, created = MovieProfile.objects.get_or_create(user=user, defaults={'status': status})

        if created:
            print(f"MovieProfile created for {user} with status {status}")
        else:
            print(f"MovieProfile already exists for {user}")

        return user


class TheatreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Theatre
        fields = ['name', 'address', 'is_active']


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

    class Meta:
        model = Movie
        fields = ['id', 'movieName', 'year', 'trailer', 'rating',
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
        fields = ['id', 'user', 'street', 'city', 'state', 'postalCode']


class OrderSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(many=False, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'purchaseDate']


class MovieProfileSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    orders = OrderSerializer(many=True, read_only=True)
    receive_promotion = PromotionSerializer(many=True, read_only=True)

    class Meta:
        model = MovieProfile
        fields = ['status', 'payments', 'addresses', 'orders']


class CustomUserSerializer(serializers.ModelSerializer):
    movie_profile = MovieProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'movie_profile']

    def update(self, instance, validated_data):
        # Update User fields
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update UserProfile fields
        status = validated_data.get('status', None)
        if status:
            movie_profile = instance.movie_profile  # Access the related MovieProfile
            movie_profile.status = status
            movie_profile.save()

        return instance

# need a way to convert promotion python objects into JSON
