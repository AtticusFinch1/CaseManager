from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()

class TestSuit(models.Model):
    class Meta:
        verbose_name=('Test Suit')
        verbose_name_plural = ('Test Suits')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='photos/%Y/%m/', blank=True)
    
    def get_thumbnail(self):
        if self.photo:
            return "http://127.0.0.1:8000" + self.photo.url
        return ''

    def get_id(self):
        return self.pk

    def __str__(self):
        return self.name



