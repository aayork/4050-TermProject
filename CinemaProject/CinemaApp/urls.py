from django.urls import path
from django.contrib.auth import views as auth_views
from .views import MovieListView, MovieDetailView

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list'),
    path('getMovieDetails/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
]

