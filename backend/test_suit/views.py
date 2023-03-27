from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models import Prefetch

from .models import TestSuit
from test_case.models import TestCase
from test_suit.serializers import TestSuitSerializer
from test_case.serializers import TestCaseSerializer

class ListTestSuitsView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            test_suits = TestSuit.objects.filter(user=user)
            results = []
            for suit in test_suits:
                item = {}
                item['id'] = suit.get_id()
                item['name'] = suit.name
                item['description'] = suit.description
                results.append(item)
            return Response(
                {'test_suits':results},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error':'Something went wrong'},
                status = status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, format=None):
        user = self.request.user
        try:
            serializer = TestSuitSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {'new_suit':serializer.data},
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

class SuitDetailView(APIView):
    def get(self, request, suitId, format=None):
        user = self.request.user
        try:
            if TestSuit.objects.filter(user=user).exists():
                test_suit = TestSuit.objects.filter(user=user, id=suitId)
                serializer=TestSuitSerializer(test_suit, many=True)
                test_suit_cases = TestCase.objects.filter(user=user, test_suit=suitId)
                case_serializer = TestCaseSerializer(test_suit_cases, many=True)
                return Response(
                    {'test_suit':serializer.data, 'test_suit_cases':case_serializer.data},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error':serializer.errors},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except:
            return Response(
                {'error':'User does not have Suits'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    def put(self, request, suitId, format=None):
        user = self.request.user
        try:
            if TestSuit.objects.filter(user=user, id=suitId).exists():
                test_suit = TestSuit.objects.get(user=user, id=suitId)               
                serializer = TestSuitSerializer(test_suit, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(
                        {'suit_updated':serializer.data},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {'error':serializer.errors},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
        except:
            return Response(
                        {'error':"Something went wrong"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

    def delete(self, request, suitId, format=None):
        user = self.request.user
        try:
            if TestSuit.objects.filter(user=user, id=suitId).exists():
                test_suit = TestSuit.objects.get(user=user, id=suitId)
                test_suit.delete()
                return Response(
                    {'success':'Test Suit Deleted'},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'fail':'Test Suit Deleted Fail'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except:
            return Response(
                    {'fail':'Test Suit Deleted Fail'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
         
            
