from django.shortcuts import render
from django.http.response import JsonResponse
from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.urls import reverse

from .models import Bikes
from .serializers import BikesSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def bikes_list(request):
    if request.method == 'GET':
        # return JsonResponse({'message': '{} Bikes were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        bikes = Bikes.objects.all()

        name_bike = request.GET.get('name_bike', None)
        if name_bike is not None:
            bikes = bikes.filter(name_bike__icontains=name_bike)

        bikes_serializer = BikesSerializer(bikes, many=True)
        return JsonResponse(bikes_serializer.data, safe=False)
    
    elif request.method == 'POST':
        # return JsonResponse({'message': '{} Bikes were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        bikes_data = JSONParser().parse(request)
        # print(bikes_data)
        # return JsonResponse({'message': '{} Bikes were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        bikes_serializer = BikesSerializer(data=bikes_data)
        # print(bikes_serializer)
        # return JsonResponse({'message': '{} Bikes were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

        if bikes_serializer.is_valid():
            bikes_serializer.save()
            return JsonResponse(bikes_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(bikes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Bikes.objects.all().delete()
        return JsonResponse({'message': '{} Bikes were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def bikes_detail(request, pk):
    try:
        bike = Bikes.objects.get(id=pk)
    except Bikes.DoesNotExist:
        return JsonResponse({'message': 'The bike does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        bikes_serializer = BikesSerializer(bike)
        return JsonResponse(bikes_serializer.data)

    elif request.method == 'PUT':
        bikes_data = JSONParser().parse(request)
        bikes_serializer = BikesSerializer(bike, data=bikes_data)
        if bikes_serializer.is_valid():
            bikes_serializer.save()
            return JsonResponse(bikes_serializer.data)
        return JsonResponse(bikes_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        bike.delete()
        return JsonResponse({'message': 'bike was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
