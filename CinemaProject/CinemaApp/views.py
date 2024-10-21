from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Movie
from rest_framework.response import Response
from .models import Promotion
from .models import MovieProfile
from authentication.serializers import MovieSerializer, PromotionSerializer


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

