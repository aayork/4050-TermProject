from django.core.management.base import BaseCommand
from CinemaApp.models import Movie, Genre


class Command(BaseCommand):
    help = 'Add a movie to the database'

    def handle(self, *args, **kwargs):
        genre1 = Genre.objects.get(name='Space Sci-Fi')
        genre2 = Genre.objects.get(name='Superhero')
        genre3 = Genre.objects.get(name='Time Travel')
        genre4 = Genre.objects.get(name='Tragedy')
        genre5 = Genre.objects.get(name='Action')
        genre6 = Genre.objects.get(name='Adventure')
        genre7 = Genre.objects.get(name='Drama')
        genre8 = Genre.objects.get(name='Sci-Fi')
        movie_name = 'Avengers: Endgame'
        rating = 'PG-13'
        runtime = 181  # Integer
        year = 2019  # Integer
        critics_score = 94  # Integer
        audience_score = 90  # Integer
        description = ('After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.')
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
            movie.genres.add(genre1, genre2, genre3, genre4, genre5, genre6, genre7, genre8)
            self.stdout.write(self.style.SUCCESS(f'Successfully added movie: {movie_name}'))

        else:
            self.stdout.write(self.style.WARNING(f'Movie {movie_name} already exists in the database'))
