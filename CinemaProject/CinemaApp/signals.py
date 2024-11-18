from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Promotion, MovieProfile


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
