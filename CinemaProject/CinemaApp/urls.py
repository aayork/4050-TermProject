from django.urls import path
from django.contrib.auth import views as auth_views
from .views import MovieListView, MovieDetailView, PromotionDetailView, GetAllProfiles, MovieCreateView, MovieUpdateView, MovieDeleteView
from .views import PaymentDelete, PaymentAdd, PaymentView

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list'),
    path('getMovieDetails/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('getPromotions/', PromotionDetailView.as_view(), name='promotion-details'),
    path('createMovie/', MovieCreateView.as_view(), name='movie-create'),
    path('updateMovie/<int:id>/', MovieUpdateView.as_view(), name='movie-update'),
    path('deleteMovie/<int:id>/', MovieDeleteView.as_view(), name='movie-delete'),
    path('deletePayment/<int:id>/', PaymentDelete.as_view(), name='payment-delete'),
    path('createPayment/', PaymentAdd.as_view(), name='payment-add'),
    path('getPayments/', PaymentView.as_view(), name='payment-view')
]

