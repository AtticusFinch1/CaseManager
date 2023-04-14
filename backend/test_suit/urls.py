from django.shortcuts import render
from django.urls import path
from .views import ListTestSuitsView, SuitDetailView, ListSearchView

urlpatterns = [
    path('', ListTestSuitsView.as_view()),
    path('<suitId>', SuitDetailView.as_view()),
    path('search/<suitId>', ListSearchView.as_view()),
]
