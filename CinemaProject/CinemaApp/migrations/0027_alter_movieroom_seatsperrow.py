# Generated by Django 5.1.1 on 2024-11-07 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CinemaApp', '0026_rename_seatperrow_movieroom_seatsperrow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieroom',
            name='seatsPerRow',
            field=models.IntegerField(default=12),
        ),
    ]
