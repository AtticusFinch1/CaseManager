from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from core.pagination import CustomPagination
from rest_framework.response import Response
from rest_framework import permissions, status

from test_case.models import TestCase
from test_suit.models import TestSuit
from test_case.serializers import TestCaseSerializer

from django.db.models import Q
import calendar
import time

class TestCasePagination(CustomPagination):
    page_size = 10

class ListTestCaseView(ListAPIView):
    serializer_class = TestCaseSerializer
    pagination_class = TestCasePagination

    def get_queryset(self):
        user = self.request.user.id
        queryset = TestCase.objects.filter(user=user)
        print(queryset)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        try:
            serializer = self.get_serializer(queryset, many=True)
            return Response({'test_cases':serializer.data}, status=status.HTTP_200_OK)
        except:
            return Respone(
                {"error":serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, format=None):
        user = self.request.user
        try:
            serializer = TestCaseSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'new_case':serializer.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error':serializer.errors},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except:
            return Response(
                    {'error':serializer.errors},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
class CaseDetailView(APIView):
    def get(self, request, caseId, format=None):
        user = self.request.user
        try:
            if TestCase.objects.filter(user=user).exists():
                test_case = TestCase.objects.filter(user=user, id=caseId)
                serializer = TestCaseSerializer(test_case, many=True)
                return Response(
                    {'test_case':serializer.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error':serializer.errors},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except:
            return Response(
                {'error':'Something went wrong'},
                statue=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def put(self, request, caseId, format=None):
        user = self.request.user
        try:
            if TestCase.objects.filter(user=user).exists():
                test_case = TestCase.objects.get(user=user, id=caseId)
                serializer = TestCaseSerializer(test_case, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(
                        {'case_updated':serializer.data},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            else:
                return Response(
                        {'error': "User does not have test cases"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
        except:
            return Response(
                        {'error': serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
    def delete(self, request, caseId, format=None):
        user = self.request.user
        try:
            if TestCase.objects.filter(user=user, id=caseId).exists():
                test_case = TestCase.objects.get(user=user, id=caseId)
                test_case.delete()
                return Response(
                    {'success':'Tese Case Deleted'},
                    status = status.HTTP_200_OK
                )
            else:
                return Respone(
                    {'fail':'Test Case Delete Failed'},
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except:
            return Respone(
                    {'fail':'Test Case Delete Failed'},
                    status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ListSearchView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        search = data['search']
        if len(search) == 0:
            search_results = TestCase.objects.order_by('-data_created').all()
        else:
            search_results = TestCase.objects.filter(Q(title__icontains=search) | Q(description__icontains=search))
        search_results = TestCaseSerializer(search_results, many=True)
        return Respone(
            {'search_cases':search_results.data},
            status=status.HTTP_200_OK
        )