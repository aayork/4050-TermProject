from django.urls import path
from django.contrib.auth import views as auth_views
from .views import MovieListView, MovieDetailView, PromotionDetailView, GetAllProfiles, MovieCreateView, MovieUpdateView, MovieDeleteView
from .views import (DeletePaymentView, UserPaymentView, AddPaymentView,
                    AddAddressView, DeleteAddressView, UserAddressView, AddPromotionView, UpdatePromotionView, validatePromotion)

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list'),
    path('getMovieDetails/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('createMovie/', MovieCreateView.as_view(), name='movie-create'),
    path('updateMovie/<int:id>/', MovieUpdateView.as_view(), name='movie-update'),
    path('deleteMovie/<int:id>/', MovieDeleteView.as_view(), name='movie-delete'),


    path('user/payment/delete/<int:id>/', DeletePaymentView.as_view(), name='payment-delete'),
    path('user/payment/<int:user_id>/', UserPaymentView.as_view(), name='payment-view'),
    path('user/payment/add/', AddPaymentView.as_view(), name='payment-add'),

    path('user/address/add/', AddAddressView.as_view(), name='address-add'),
    path('user/address/delete/<int:id>/', DeleteAddressView.as_view(), name='address-delete'),
    path('user/address/<int:user_id>/', UserAddressView.as_view(), name='address-view'),

    path('getPromotions/', PromotionDetailView.as_view(), name='promotion-details'),
    path('promotion/add/', AddPromotionView.as_view(), name='promotion-add'),
    path('promotion/update/<int:pk>/', UpdatePromotionView.as_view(), name='promotion-update'),
    path('validate/<str:code>/', validatePromotion.as_view(), name="validate-promotion")
]

