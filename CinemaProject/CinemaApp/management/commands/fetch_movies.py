from django.core.management.base import BaseCommand
from CinemaApp.models import Movie, Genre, Order


class Command(BaseCommand):
    help = 'Add a movie to the database'

    def handle(self, *args, **kwargs):

        for order in Order.objects.all():
            try:
                ticket = order.tickets.all()[0]
                start_time = ticket.seat.showTime.startTime
                order.showStartTime = start_time
                order.save()
            except IndexError:
                print("No tickets")


        """
        comedy = Genre.objects.get(name='Comedy')
        drama = Genre.objects.get(name='Drama')
        epic = Genre.objects.get(name='Epic')
        fantasy = Genre.objects.get(name='Fantasy')
        historical = Genre.objects.get(name='Historical')
        scifi = Genre.objects.get(name='Sci-Fi')
        thriller = Genre.objects.get(name='Thriller')
        action = Genre.objects.get(name='Action')
        movie_name = 'Avengers: Endgame'
        rating = 'R'
        runtime = 181  # Integer
        year = 2019  # Integer
        critics_score = 94  # Integer
        audience_score = 90  # Integer
        description = ('Scary Movie')
        thumbnail = ('https://resizing.flixster.com/2yTtbYaljlzWgEhOCUTrH55jjfM=/206x305/v2/https://resizing.flixster.com/fC7nU6iTRQk02tS0SDS1ylx-G34=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2QxZjE5ZDgzLTRiY2MtNDFkYS04NWQ4LTRkYzc1ZTAwNWE2NC53ZWJw')
        photo = ('https://resizing.flixster.com/2yTtbYaljlzWgEhOCUTrH55jjfM=/206x305/v2/https://resizing.flixster.com/fC7nU6iTRQk02tS0SDS1ylx-G34=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2QxZjE5ZDgzLTRiY2MtNDFkYS04NWQ4LTRkYzc1ZTAwNWE2NC53ZWJw')
        studio = 'Marvel Studio Pictures'
        trailer = 'https://www.youtube.com/watch?v=TcMBFSGVi1c'
        
        # Check if the movie already exists to avoid duplicates
        if not Movie.objects.filter(movieName=movie_name, year=year).exists():
            movie = Movie.objects.create(
                movieName=movie_name, rating=rating, runtime=runtime, year=year,
                critics_score=critics_score, audience_score=audience_score,
                description=description, thumbnail=thumbnail, photo=photo,
                studio=studio, trailer=trailer
            )
            movie.genres.add(genre1)
            self.stdout.write(self.style.SUCCESS(f'Successfully added movie: {movie_name}'))

        else:
            self.stdout.write(self.style.WARNING(f'Movie {movie_name} already exists in the database'))

        movie = Movie.objects.get(movieName=movie_name)
        movie.genres.add(action, comedy, drama, epic, scifi, thriller)

        """
