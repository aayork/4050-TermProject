# Generated by Django 5.1.1 on 2024-10-07 20:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CinemaApp', '0010_remove_movie_director_director'),
    ]

    operations = [
        migrations.AlterField(
            model_name='director',
            name='movies',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='director', to='CinemaApp.movie'),
        ),
    ]
