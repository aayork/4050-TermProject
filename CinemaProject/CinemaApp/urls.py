from django.urls import path
from django.contrib.auth import views as auth_views
from .views import (MovieListView, MovieDetailView, PromotionDetailView,
                    MovieCreateView, MovieUpdateView, MovieDeleteView)

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list'),
    path('getMovieDetails/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('getPromotions/', PromotionDetailView.as_view(), name='promotion-details'),
    path('createMovie/', MovieCreateView.as_view(), name='movie-create'),
    path('updateMovie/<int:id>/', MovieUpdateView.as_view(), name='movie-update'),
    path('deleteMovie/<int:id>/', MovieDeleteView.as_view(), name='movie-delete'),
]

