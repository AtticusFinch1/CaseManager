from django.shortcuts import render
from django.urls import path
from .views import ListTestSuitsView, SuitDetailView

urlpatterns = [
    path('', ListTestSuitsView.as_view()),
    path('<suitId>', SuitDetailView.as_view()),
]
