from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Promotion, MovieProfile, ShowTime, Seat
from allauth.account.models import EmailAddress
from django.db import transaction


@receiver(post_save, sender=ShowTime)
def create_seats(sender, instance, created, **kwargs):
    print(f"Creating seats for {instance}")
    if created:
        seat_ids = ['1A', '1B', '1C', '1D', '1E', '1F', '1G', '1H',
                    '2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H',
                    '3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H',
                    '4A', '4B', '4C', '4D', '4E', '4F', '4G', '4H',
                    '5A', '5B', '5C', '5D', '5E', '5F', '5G', '5H',
                    '6A', '6B', '6C', '6D', '6E', '6F', '6G', '6H',
                    '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H',
                    '8A', '8B', '8C', '8D', '8E', '8F', '8G', '8H',
                    '9A', '9B', '9C', '9D', '9E', '9F', '9G', '9H',
                    '10A', '10B', '10C', '10D', '10E', '10F', '10G', '10H',
                    '11A', '11B', '11C', '11D', '11E', '11F', '11G', '11H',
                    '12A', '12B', '12C', '12D', '12E', '12F', '12G', '12H']

        seats = [Seat(seatID=s, showTime=instance) for s in seat_ids]
        try:
            with transaction.atomic():
                Seat.objects.bulk_create(seats)
        except Exception as e:
            print(f"Error creating seats for ShowTime {instance}: {e}")


@receiver(post_save, sender=Promotion)
def send_promotion_email(sender, instance, created, **kwargs):
    print("Signal Received")
    if created:
        # Get all users who want to receive promotions
        users = MovieProfile.objects.filter(receive_promotions=True)

        for user in users:
            print(user)
            send_mail(
                subject='New Promotion Available!',
                message=f'Check out our new promotion: {instance.name} with {instance.discountPercentage}% off! '
                        f'The promo-code is {instance.code}! The code starts on {instance.startDate} '
                        f'expires {instance.endDate}, so use it while you can!',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.user.email],
            )


@receiver(post_save, sender=EmailAddress)
def update_user_profile_state(sender, instance, **kwargs):
    print("Email signal ...")
    print(instance.verified)
    # Check if the 'verified' attribute changed to True
    if instance.verified:
        # Get the related UserProfile
        movie_profile = instance.user.movie_profile
        if movie_profile.customer_state == "inactive":
            movie_profile.customer_state = "active"
            movie_profile.save()
