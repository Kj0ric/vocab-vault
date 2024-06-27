# Generated by Django 4.1 on 2024-06-26 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_userprofile"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="favorite_words",
            field=models.ManyToManyField(
                blank=True, related_name="users", to="users.favoriteword"
            ),
        ),
    ]
