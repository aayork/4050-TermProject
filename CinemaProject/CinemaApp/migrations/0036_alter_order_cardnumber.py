# Generated by Django 5.1.1 on 2024-12-06 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CinemaApp', '0035_alter_order_cardnumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='cardNumber',
            field=models.BigIntegerField(default=0),
        ),
    ]
