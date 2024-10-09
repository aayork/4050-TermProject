from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import Movie
from authentication.serializers import MovieSerializer


class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

