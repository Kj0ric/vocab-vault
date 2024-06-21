from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# A custom user model extending Django's built-in User model with additional information.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)