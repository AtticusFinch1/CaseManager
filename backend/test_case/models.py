from django.db import models
from datetime import datetime
from test_suit.models import TestSuit
from django.contrib.auth import get_user_model

User = get_user_model()

class TestCase(models.Model):
    class CaseStatus(models.TextChoices):
        not_processed = 'not_processed'
        fail = 'fail'
        passes = 'passes'
        fixed = 'fixed'
        not_bug = 'not_bug'

    class CaseEnvironment(models.TextChoices):
        chrome = 'chrome'
        safari = 'safari'
        firefox = 'firefox'
        ios = 'ios'
        android = 'android'    
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    steps = models.TextField(max_length=1000)
    expected = models.TextField(max_length=1000)
    actual = models.TextField(max_length=1000)
    comments = models.TextField(max_length=1000)
    env = models.CharField(max_length=255, choices=CaseEnvironment.choices, default=CaseEnvironment.chrome)
    test_suit = models.ForeignKey(TestSuit, on_delete=models.CASCADE)
    status = models.CharField(max_length=255, choices=CaseStatus.choices, default=CaseStatus.not_processed)
    date_created = models.DateTimeField(default=datetime.now)
    link = models.CharField(max_length=255)

    def get_id(self):
        return self.pk
    def __str__(self):
        return self.title
