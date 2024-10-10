from django.urls import path
from django.contrib.auth import views as auth_views
from .views import MovieListView

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list')
]

