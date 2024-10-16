from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import Movie
from .models import Promotion
from .models import MovieProfile
from authentication.serializers import MovieSerializer
from authentication.serializers import PromotionSerializer
from authentication.serializers import MovieProfileSerializer

class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(generics.RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

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