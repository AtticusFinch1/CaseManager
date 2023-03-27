from rest_framework import serializers
from .models import TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = [
            'id',
            'user',
            'title',
            'description',
            'steps',
            'expected',
            'actual',
            'comments',
            'test_suit',
            'status',
        ]