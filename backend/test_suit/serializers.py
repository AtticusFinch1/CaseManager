from rest_framework import serializers
from .models import TestSuit

class TestSuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSuit
        fields = [
            'id',
            'user',
            'name',
            'description',         
        ]