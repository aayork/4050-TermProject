from dj_rest_auth import serializers
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Movie
from rest_framework.response import Response
from .models import Promotion
from .models import MovieProfile
from .models import Payment
from authentication.serializers import MovieSerializer
from authentication.serializers import PromotionSerializer
from authentication.serializers import MovieProfileSerializer
from authentication.serializers import PaymentSerializer
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

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


class PaymentView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

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


class GetAllProfiles(generics.ListAPIView):
    # retrieving the movieprofile objects that have a status of admin using the 
    # filter() method
    queryset = MovieProfile.objects.all()
    serializer_class = MovieProfileSerializer

class PaymentDelete(generics.DestroyAPIView):
    queryset = Payment.objects.all()
    lookup_field = 'id'
    serializer_class = PaymentSerializer

    # return an exception message if the payment in question can't be found

    def paymentDelete(self, request, *args, **kwargs):
        
        payment = self.get_object()

        if not payment.id == "valid_id":
            # if the self.get_found() cannot find an appropriate card then a NotFound error is raised which creates a 404 error
            return Response({'message': f'Payment "{payment.cardNumber}" was not found'}, status=status.HTTP_404_NOT_FOUND)

        self.perform_destroy(payment)
        
        # Returns a HTTP Response Object upon deletion
        return Response({
            'message': f'Payment "{payment.cardNumber}" under "{payment.firstName}" "{payment.lastName}" was successfully deleted.'
        }, status=status.HTTP_200_OK)
        
    
class PaymentAdd(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

        # I need to determine a way to retrieve the attributes that the user passed in on the frontend through JSON
        # then I ned to initialize a Payments objects with those attributes and then 
        # I need to add that object to my database
