from django.urls import path
from django.contrib.auth import views as auth_views
from .views import MovieListView, MovieDetailView, PromotionDetailView, GetAllProfiles, MovieCreateView, MovieUpdateView, MovieDeleteView
from .views import (DeletePaymentView, UserPaymentView, AddPaymentView,
                    AddAddressView, DeleteAddressView, UserAddressView, AddPromotionView, UpdatePromotionView,
                    validatePromotion, CreateOrderView, DeleteShowTimeView,AddShowtimeView,EditShowtimeView,
                    GetSeatsView, AvailableRoomsView, ShowtimeByDateAPIView, PaymentCardInfoAPIView, PriceListView,
                    PriceEditView, GetGenresView, RefundOrderView)

urlpatterns = [
    path('getMovies/', MovieListView.as_view(), name='movie-list'),
    path('getMovieDetails/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('createMovie/', MovieCreateView.as_view(), name='movie-create'),
    path('updateMovie/<int:id>/', MovieUpdateView.as_view(), name='movie-update'),
    path('deleteMovie/<int:id>/', MovieDeleteView.as_view(), name='movie-delete'),


    path('user/payment/delete/<int:id>/', DeletePaymentView.as_view(), name='payment-delete'),
    path('user/payment/<int:user_id>/', UserPaymentView.as_view(), name='payment-view'),
    path('user/payment/add/', AddPaymentView.as_view(), name='payment-add'),
    path('user/payment/card_info/<int:id>/', PaymentCardInfoAPIView.as_view(), name='payment-card-info'),

    path('user/address/add/', AddAddressView.as_view(), name='address-add'),
    path('user/address/delete/<int:id>/', DeleteAddressView.as_view(), name='address-delete'),
    path('user/address/<int:user_id>/', UserAddressView.as_view(), name='address-view'),

    path('getPromotions/', PromotionDetailView.as_view(), name='promotion-details'),
    path('promotion/add/', AddPromotionView.as_view(), name='promotion-add'),
    path('promotion/update/<str:code>/', UpdatePromotionView.as_view(), name='promotion-update'),
    path('promotion/validate/<str:code>/', validatePromotion.as_view(), name="validate-promotion"),

    path('createOrder/', CreateOrderView.as_view(), name='create-order'),
    path('refundOrder/<int:id>/', RefundOrderView.as_view(), name='refund-order'),

    # showtime
    path('showtime/add/', AddShowtimeView.as_view(), name='AddShowtime'),
    path('showtime/edit/<int:id>/', EditShowtimeView.as_view(), name='EditShowtime'),
    path('showtime/delete/<int:id>/', DeleteShowTimeView.as_view(), name='DeleteShowtime'),
    path('showtime/available-rooms/', AvailableRoomsView.as_view(), name='AvailableRooms'),
    path('showtime/date/', ShowtimeByDateAPIView.as_view(), name='showtimes-by-date'), # ex. ../showtime/date/?date=2025-12-03

    path('getSeats/<int:showtime_id>/', GetSeatsView.as_view(), name='seats-view'),

    path('prices/', PriceListView.as_view(), name='prices'),
    path('prices/update/', PriceEditView.as_view(), name='prices-edit'),

    path('getGenres/', GetGenresView.as_view(), name='genres-list'),
]
