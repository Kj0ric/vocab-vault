from django.db import models
from django.contrib.auth.models import User


# A custom user model extending Django's built-in User model with additional information.
""" class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username """

class FavoriteWord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Example field, adjust as per your 
    phonetic = models.CharField(max_length=255, blank=True, null=True)
    meaning = models.CharField(max_length=2000, blank=True, null=True)
    date = models.CharField(max_length=255, blank=True, null=True)
    function = models.CharField(max_length=255, blank=True, null=True)
    word = models.CharField(max_length=255, blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.word