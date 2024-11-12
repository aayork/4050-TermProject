from django.conf import settings
from cryptography.fernet import Fernet
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import datetime, now
from django.core.validators import MaxLengthValidator, MinLengthValidator, RegexValidator
import base64
key = settings.ENCRYPTION_KEY.encode()
cipher = Fernet(key)

from django.db import models
from django.core.validators import RegexValidator, ValidationError


class Theatre(models.Model):
    name = models.CharField(max_length=250)
    street = models.CharField(max_length=100, default='1020 Milledge Ave')
    city = models.CharField(max_length=50, default='Athens')
    state = models.CharField(max_length=50, default='GA')
    zipcode = models.CharField(max_length=20, default=30019)
    is_active = models.BooleanField(default=True)
    # movie rooms = self.movie_rooms

    def save(self, *args, **kwargs):
        # Check if a Theatre instance already exists
        if Theatre.objects.exclude(id=self.id).exists():  # Exclude the current instance if it exists
            raise ValidationError("Only one theatre instance is allowed.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # movies = self.movies

    def __str__(self):
        return self.name


class Movie(models.Model):
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)
    movieName = models.CharField(max_length=225, blank=False)
    is_active = models.BooleanField(default=False)

    ### movie trailer
    trailer = models.URLField(blank=True)

    ### movie info:
    rating = models.CharField(max_length=10, blank=False)
    runtime = models.IntegerField(blank=False)
    year = models.IntegerField(blank=False)
    critics_score = models.IntegerField(blank=False)
    audience_score = models.IntegerField(blank=False)
    description = models.TextField(max_length=500, blank=False)
    thumbnail = models.URLField(blank=False)
    photo = models.URLField(blank=False)
    studio = models.CharField(max_length=100, blank=False)
    # actors = self.actors
    # director = self.director
    # showtimes = self.showtimes

    def __str__(self):
        return f"{self.movieName} - {self.id}"


class Actor(models.Model):
    movies = models.ManyToManyField(Movie, related_name='actors', blank=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Director(models.Model):
    movies = models.ManyToManyField(Movie, related_name='director')
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class MovieRoom(models.Model):
    number = models.IntegerField(blank=False, default=0)
    theatre = models.ForeignKey(Theatre, related_name='movie_rooms', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    numOfRows = models.IntegerField(default=8)
    seatsPerRow = models.IntegerField(default=12)
    # showtimes = self.showtimes

    def __str__(self):
        return f"{self.id}"


class ShowTime(models.Model):
    movieRoom = models.ForeignKey(MovieRoom, related_name="showtimes", on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name="showtimes", on_delete=models.CASCADE)
    startTime = models.DateTimeField(blank=False, null=False)
    endTime = models.DateTimeField(blank=False, null=False)
    date = models.DateField(blank=True, null=True, default=None)
    # seats = self.seats

    def __str__(self):
        return f"Id: {self.id} - Room Id: {self.movieRoom} - Start Time: {self.startTime}"


class Seat(models.Model):
    seatID = models.CharField(max_length=5, blank=False, null=False)
    showTime = models.ForeignKey(ShowTime, related_name="seats", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    is_available = models.BooleanField(default=True)
    # ticket = self.ticket

    def movieroom(self):
        return self.showTime.movieRoom

    def movie(self):
        return self.showTime.movie

    def __str__(self):
        return f"{self.seatID} | {self.showTime}"


class MovieProfile(models.Model):
    class StatusChoices(models.TextChoices):
        CUSTOMER = 'customer', 'Customer'
        ADMIN = 'admin', 'Admin'

    class CustomerState(models.TextChoices):
        ACTIVE = 'active', 'Active'
        INACTIVE = 'inactive', 'Inactive'
        SUSPENDED = 'suspended', 'Suspended'

    user = models.OneToOneField(User, related_name="movie_profile", on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(max_length=100, choices=StatusChoices.choices, default=StatusChoices.CUSTOMER)
    customer_state = models.CharField(
        max_length=50,
        choices=CustomerState.choices,
        null=True,  # Allows the customer_state to be null
        blank=True,  # Allows empty values in forms
        default=CustomerState.ACTIVE
    )
    receive_promotions = models.BooleanField(default=False)
    # orders = self.orders
    # payments = self.payments
    # address = self.address

    def save(self, *args, **kwargs):
        # Enforce that admin users have a null customer_state
        if self.status == MovieProfile.StatusChoices.ADMIN:
            self.customer_state = None
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.status}"


class Payment(models.Model):
    user = models.ForeignKey(MovieProfile, related_name="payments", on_delete=models.CASCADE)
    cardNumber = models.BinaryField(blank=False, null=False, default=0000000000000000)
    CVV = models.BinaryField(blank=False, null=False, default=000)
    expirationDate = models.DateField(blank=False, null=False, default=datetime.now)
    firstName = models.CharField(max_length=40, blank=False, null=False, default="Jon")
    lastName = models.CharField(max_length=40, blank=False, null=False, default="Doe")

    card_number_validator = RegexValidator(
        regex=r'^\d{16}$', message="Card number must be 16 digits."
    )

    cvv_validator = RegexValidator(
        regex=r'^\d{3,4}$', message="CVV must be 3 or 4 digits."
    )

    def save(self, *args, **kwargs):
        # Check if the user already has 3 payment options
        if self.user.payments.count() >= 3 and not self.pk:  # Exclude existing records
            raise ValidationError("You cannot have more than 3 payment methods.")

        if isinstance(self.cardNumber, str):
            self.card_number_validator(self.cardNumber)  # Validate the card number
            self.cardNumber = cipher.encrypt(self.cardNumber.encode())

        if isinstance(self.CVV, str):
            self.cvv_validator(self.CVV)  # Validate the CVV
            self.CVV = cipher.encrypt(self.CVV.encode())

        super().save(*args, **kwargs)

    def get_card_number(self):
        return cipher.decrypt(self.cardNumber).decode()

    def get_cvv(self):
        return cipher.decrypt(self.CVV).decode()

    def __str__(self):
        return f"{self.firstName} - {self.lastName} - (**** **** **** {self.get_card_number()[-4:]})"


class Address(models.Model):
    user = models.OneToOneField(MovieProfile, related_name="address", on_delete=models.CASCADE)
    street = models.CharField(max_length=150, blank=False, null=False)
    city = models.CharField(max_length=150, blank=False, null=False)
    state = models.CharField(max_length=40, blank=False, null=False)
    postalCode = models.CharField(max_length=15, blank=False, null=False)

    def __str__(self):
        return f"{self.user} - {self.street}"


class Promotion(models.Model):
    name = models.CharField(max_length=2250, blank=False, null=False)
    discountPercentage = models.IntegerField(blank=False, null=False)
    code = models.CharField(max_length=15, blank=False, null=False, unique=True)
    startDate = models.DateField(blank=False, null=False)
    endDate = models.DateField(blank=False, null=False)
    # orders = self.orders

    def __str__(self):
        return f"{self.name}"


class Order(models.Model):
    discountPercentage = models.FloatField(blank=False, null=False, default=0)
    totalPrice = models.FloatField(blank=False, null=False, default=0)
    movieProfile = models.ForeignKey(MovieProfile, related_name="orders", on_delete=models.CASCADE)
    purchaseDate = models.DateField(blank=False, null=False)
    # tickets = self.tickets

    def __str__(self):
        return f"{self.id} - {self.movieProfile} - {self.purchaseDate}"


class Ticket(models.Model):
    class TicketType(models.TextChoices):
        ADULT = 'adult', 'Adult'
        SENIOR = 'senior', 'Senior'
        CHILD = 'child', 'Child'

    seat = models.OneToOneField(Seat, related_name="ticket", on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name="tickets", on_delete=models.CASCADE)
    type = models.CharField(
        choices=TicketType.choices, max_length=10, blank=False, null=False, default=TicketType.ADULT
    )

    def showtime(self):
        return self.seat.showTime

    def movie(self):
        return self.seat.showTime.movie

    def price(self):
        return self.seat.price

    def __str__(self):
        return f"{self.id} - {self.seat}"
# Create your models here.

