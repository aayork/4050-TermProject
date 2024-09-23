from django.db import models
from django.contrib.auth.models import User


class Theatre(models.Model):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    # movie rooms = self.movie_rooms

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
    is_active = models.BooleanField(default=True)
    # showtimes = self.showtimes

    ### movie info:
    rating = models.CharField(max_length=10, blank=False)
    mpaa_rating = models.CharField(max_length=10, blank=False)
    runtime = models.IntegerField(blank=False)
    year = models.IntegerField(blank=False)
    critics_score = models.IntegerField(blank=False)
    audience_score = models.IntegerField(blank=False)
    description = models.TextField(max_length=500, blank=False)
    thumbnail = models.URLField(blank=False)
    photo = models.URLField(blank=False)
    studio = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return f"{self.movieName} - {self.id}"


class MovieRoom(models.Model):
    theatre = models.ForeignKey(Theatre, related_name='movie_rooms', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    # showtimes = self.showtimes

    def __str__(self):
        return f"{self.id}"


class ShowTime(models.Model):
    movieRoom = models.ForeignKey(MovieRoom, related_name="showtimes", on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name="showtimes", on_delete=models.CASCADE)
    startTime = models.DateTimeField(blank=False, null=False)
    endTime = models.DateTimeField(blank=False, null=False)
    # seats = self.seats

    def __str__(self):
        return f"{self.id} - {self.movieRoom} - {self.startTime}"


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
    user = models.OneToOneField(User, related_name="movie_profile", on_delete=models.CASCADE)
    userName = models.CharField(max_length=225, blank=False)
    address = models.CharField(max_length=225, blank=False)
    status = models.CharField(max_length=100, default="Member")
    # orders = self.orders

    def __str__(self):
        return f"{self.userName}"


class Order(models.Model):
    movieProfile = models.ForeignKey(MovieProfile, related_name="orders", on_delete=models.CASCADE)
    purchaseDate = models.DateField(blank=False, null=False)
    # tickets = self.tickets

    def __str__(self):
        return f"{self.id} - {self.movieProfile} - {self.purchaseDate}"


class Ticket(models.Model):
    seat = models.OneToOneField(Seat, related_name="ticket", on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name="tickets", on_delete=models.CASCADE)

    def showtime(self):
        return self.seat.showTime

    def movie(self):
        return self.seat.showTime.movie

    def movieprofile(self):
        return self.order.movieProfile

    def price(self):
        return self.seat.price

    def __str__(self):
        return f"{self.id} - {self.seat}"
# Create your models here.
