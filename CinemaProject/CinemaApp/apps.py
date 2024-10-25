from django.apps import AppConfig


class CinemaappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CinemaApp'

    def ready(self):
        import CinemaApp.signals
