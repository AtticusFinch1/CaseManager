from django.urls import path
from .views import ListTestCaseView, CaseDetailView, ListSearchView

urlpatterns = [
    path('', ListTestCaseView.as_view()),
    path('<caseId>', CaseDetailView.as_view()),
    path('search', ListSearchView.as_view())
]
